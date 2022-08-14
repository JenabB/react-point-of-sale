import { ShopModels } from "../shop";
export interface User {
  email: string;
  fullName: string;
  contactNumber: string;
  address: string;
  userType: string;
  createdAt: string;
}

export interface Dashboard {
  isLoading: boolean;
  user: User;
  shop: ShopModels.Shop | null;
}
