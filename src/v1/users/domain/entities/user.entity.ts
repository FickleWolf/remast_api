import { UserRole, PrivateData } from "src/common/types/user.type";

export class UserEntity {
  id: string;
  userName: string;
  iconUrl: string;
  role: UserRole;
  createdAt: number;
  privateData: PrivateData;
  shopAccount?: string;

  constructor(
    id: string,
    userName: string,
    iconUrl: string,
    role: UserRole,
    createdAt: number,
    privateData: PrivateData,
    shopAccount?: string,
  ) {
    this.id = id;
    this.userName = userName;
    this.iconUrl = iconUrl;
    this.role = role;
    this.createdAt = createdAt;
    this.privateData = privateData;
    this.shopAccount = shopAccount;
  }

  isAdmin(): boolean {
    return this.role === "admin";
  }

  isShopRegistered(): boolean {
    return !!this.shopAccount;
  }

  toPublicData(): Omit<
    UserEntity,
    "privateData" | "isAdmin" | "isShopRegistered" | "toPublicData"
  > {
    return {
      id: this.id,
      userName: this.userName,
      iconUrl: this.iconUrl,
      role: this.role,
      createdAt: this.createdAt,
      shopAccount: this.shopAccount,
    };
  }
}
