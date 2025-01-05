import { UserRole } from "src/common/types/user.type";

export class UserEntity {
  id: string;
  userName: string;
  iconUrl: string;
  role: UserRole;
  createdAt: number;
  shopAccount?: string;

  constructor(
    id: string,
    userName: string,
    iconUrl: string,
    role: UserRole,
    createdAt: number,
    shopAccount?: string,
  ) {
    this.id = id;
    this.userName = userName;
    this.iconUrl = iconUrl;
    this.role = role;
    this.createdAt = createdAt;
    this.shopAccount = shopAccount;
  }

  isAdmin(): boolean {
    return this.role === "admin";
  }

  isShopRegistered(): boolean {
    return !!this.shopAccount;
  }
}
