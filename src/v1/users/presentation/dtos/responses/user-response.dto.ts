import { UserRole, PrivateData } from "src/common/types/user.type";

export class UserResponseDto {
  id: string;
  userName: string;
  iconUrl: string;
  role: UserRole;
  createdAt: number;
  shopAccount?: string;
  privateData?: PrivateData;

  constructor(
    id: string,
    userName: string,
    iconUrl: string,
    role: UserRole,
    createdAt: number,
    shopAccount?: string,
    privateData?: PrivateData,
  ) {
    this.id = id;
    this.userName = userName;
    this.iconUrl = iconUrl;
    this.role = role;
    this.shopAccount = shopAccount;
    this.createdAt = createdAt;
    this.privateData = privateData;
  }
}
