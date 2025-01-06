import { UserRole } from "@common/types/user.type";

export interface UserDbModel {
  user_name: string;
  icon_url: string;
  role: UserRole;
  created_at: number;
  shop_account: string | undefined;
  addresses: Address[];
  bookmarks: BookMark[];
  browsing_histories: BrowsingHistory[];
  push_notification_tokens: PushNotificationToken[];
}

interface Address {
  id: number;
  first_name: string;
  first_name_sub: string;
  last_name: string;
  last_name_sub: string;
  phone_number: string;
  zipcode: string;
  prefectures: string;
  cities: string;
  street: string;
  building: string;
  default: boolean;
}

interface BookMark {
  product_id: string;
  registered_at: number;
}

interface BrowsingHistory {
  product_id: string;
  registered_at: number;
}

interface PushNotificationToken {
  token: string;
  user_agent: string;
  registered_at: number;
}
