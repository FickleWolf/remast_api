export const UserRoles = ["general", "admin"] as const;
export type UserRole = (typeof UserRoles)[number];

export interface Address {
  id: number;
  firstName: string;
  firstNameSub: string;
  lastName: string;
  lastNameSub: string;
  phoneNumber: string;
  zipcode: string;
  prefectures: string;
  cities: string;
  street: string;
  building: string;
  default: boolean;
}

export interface BookMark {
  productId: string;
  registeredAt: number;
}

export interface BrowsingHistory {
  productId: string;
  registeredAt: number;
}

export interface PushNotificationToken {
  token: string;
  userAgent: string;
  registeredAt: number;
}

export interface PrivateData {
  addresses: Address[];
  bookmarks: BookMark[];
  browsingHistories: BrowsingHistory[];
  pushNotificationTokens: PushNotificationToken[];
}
