import { Injectable } from "@nestjs/common";
import { FirebaseService } from "src/common/providers/firebase.service";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepositoryInterface } from "../../application/interfaces/user-repository.interface";
import { UserDbModel } from "src/v1/users/infrastructure/models/user-db.model";

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  private readonly collection = "users";

  constructor(private readonly firebaseService: FirebaseService) {}

  async save(user: UserEntity): Promise<UserEntity> {
    const firestore = this.firebaseService.getFirestore();
    const userRef = firestore.collection(this.collection).doc(user.id);
    await userRef.create({
      user_name: user.userName,
      icon_url: user.iconUrl,
      role: user.role,
      created_at: user.createdAt,
      addresses: user.privateData.addresses,
      bookmarks: user.privateData.bookmarks,
      browsing_histories: user.privateData.browsingHistories,
      push_notification_tokens: user.privateData.pushNotificationTokens,
    });

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const firestore = this.firebaseService.getFirestore();
    const usersRef = firestore.collection(this.collection);
    const userDocs = await usersRef.get();
    const userEntities: UserEntity[] = [];

    for (const doc of userDocs.docs) {
      const userData = doc.data() as UserDbModel;
      const userEntity = await this.mapToEntity(doc.id, userData);
      if (userEntity) {
        userEntities.push(userEntity);
      }
    }

    return userEntities;
  }

  async findById(userId: string): Promise<UserEntity | null> {
    const firestore = this.firebaseService.getFirestore();
    const userRef = firestore.collection(this.collection).doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return null;
    }

    const userData = userDoc.data() as UserDbModel;
    if (!userData) {
      return null;
    }

    const userEntity = await this.mapToEntity(userId, userData);

    return userEntity;
  }

  private async mapToEntity(
    userId: string,
    userData: UserDbModel,
  ): Promise<UserEntity> {
    const privateData = {
      addresses: userData.addresses
        ? userData.addresses.map((address) => {
            return {
              id: address.id,
              firstName: address.first_name,
              firstNameSub: address.first_name_sub,
              lastName: address.last_name,
              lastNameSub: address.last_name_sub,
              phoneNumber: address.phone_number,
              zipcode: address.zipcode,
              prefectures: address.prefectures,
              cities: address.cities,
              street: address.street,
              building: address.building,
              default: address.default,
            };
          })
        : [],
      bookmarks: userData.bookmarks
        ? userData.bookmarks.map((bookMark: any) => {
            return {
              productId: bookMark.product_id,
              registeredAt: bookMark.registered_at,
            };
          })
        : [],
      browsingHistories: userData.browsing_histories
        ? userData.browsing_histories.map((history: any) => {
            return {
              productId: history.product_id,
              registeredAt: history.registered_at,
            };
          })
        : [],
      pushNotificationTokens: userData.push_notification_tokens
        ? userData.push_notification_tokens.map((token: any) => {
            return {
              token: token.token,
              userAgent: token.user_agent,
              registeredAt: token.registered_at,
            };
          })
        : [],
    };
    const userEntity = new UserEntity(
      userId,
      userData.user_name,
      userData.icon_url,
      userData.role,
      userData.created_at,
      privateData,
      userData.shop_account,
    );

    return userEntity;
  }
}
