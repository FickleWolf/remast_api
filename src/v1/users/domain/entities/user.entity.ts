import { UserRole } from "@common/types/user.type";
import { ForbiddenException } from "@nestjs/common";

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

  updateUserName(newUserName: string): void {
    this.userName = newUserName;
  }

  updateIconUrl(newIconUrl: string): void {
    this.iconUrl = newIconUrl;
  }

  updateRole(newRole: UserRole, isRequesterAdmin: boolean): void {
    if (!isRequesterAdmin) {
      throw new ForbiddenException(
        "You do not have permission to update user role.",
      );
    }
    this.role = newRole;
  }

  updateShopAccount(newShopAccount: string, isRequesterAdmin: boolean): void {
    if (!isRequesterAdmin) {
      throw new ForbiddenException(
        "You do not have permission to update shop account.",
      );
    }
    this.shopAccount = newShopAccount;
  }
}
