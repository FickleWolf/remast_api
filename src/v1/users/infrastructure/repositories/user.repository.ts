import { FirebaseService } from "@common/providers/firebase.service";
import { Injectable } from "@nestjs/common";
import { UserRepositoryInterface } from "@v1/users/application/interfaces/user-repository.interface";
import { UserEntity } from "@v1/users/domain/entities/user.entity";
import { UserDbModel } from "../models/user-db.model";

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  private readonly collection = "users";

  constructor(private readonly firebaseService: FirebaseService) {}

  async save(user: UserEntity): Promise<UserEntity> {
    const firestore = this.firebaseService.getFirestore();
    const userRef = firestore.collection(this.collection).doc(user.id);
    await userRef.set(
      {
        user_name: user.userName,
        icon_url: user.iconUrl,
        role: user.role,
        created_at: user.createdAt,
      },
      { merge: true },
    );

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const firestore = this.firebaseService.getFirestore();
    const usersRef = firestore.collection(this.collection);
    const userDocs = await usersRef.get();
    const userEntities: UserEntity[] = [];

    for (const doc of userDocs.docs) {
      const userData = doc.data() as UserDbModel;
      const userEntity = await this.mapToUserEntity(doc.id, userData);

      if (userEntity) userEntities.push(userEntity);
    }

    return userEntities;
  }

  async findById(userId: string): Promise<UserEntity | null> {
    const firestore = this.firebaseService.getFirestore();
    const userRef = firestore.collection(this.collection).doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) return null;

    const userData = userDoc.data() as UserDbModel;
    const userEntity = await this.mapToUserEntity(userId, userData);
    return userEntity;
  }

  private async mapToUserEntity(
    userId: string,
    userData: UserDbModel,
  ): Promise<UserEntity> {
    const userEntity = new UserEntity(
      userId,
      userData.user_name,
      userData.icon_url,
      userData.role,
      userData.created_at,
      userData.shop_account,
    );

    return userEntity;
  }
}
