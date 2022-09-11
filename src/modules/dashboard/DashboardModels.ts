import { Dashboard } from ".";
import { ShopModels } from "../shop";

export interface RequestModel {
  isLoading: boolean;
  timestamp: string;
  status: number;
  error: boolean;
  message?: string;
}

export interface RequestableItem<T> extends RequestModel {
  data?: T;
}

export interface RequestableList<T> extends RequestModel {
  data: Array<T>;
}

export const getDefaultRequestableItem = <T>(): RequestableItem<T> => ({
  isLoading: false,
  timestamp: "",
  status: 0,
  error: false,
  message: "",
});

export const getDefaultRequestableList = <T>(): RequestableList<T> => ({
  isLoading: false,
  timestamp: "",
  status: 0,
  error: false,
  message: "",
  data: [],
});

export interface User {
  email: string;
  fullName: string;
  contactNumber: string;
  address: string;
  userType: string;
  createdAt: string;
}

export interface Product {
  productId: number;
  shopId: number;
  productName: string;
  productPrice: number;
  quantity?: number;
}

export interface InvoiceProduct {
  invoiceProductId: number;
  productName: string;
  productPrice: number;
  quantity: number;
}

export interface Invoice {
  invoiceId: number;
  invoiceCode: string;
  totalPrice: number;
  customerName: string;
  createdAt: string;
  products?: Array<InvoiceProduct>;
  productInsertMode?: string | undefined;
}

export interface Dashboard {
  user: RequestableItem<User>;
  shop: RequestableItem<ShopModels.Shop>;
  products: RequestableList<Product>;
  invoices: RequestableList<Invoice>;
  invoiceDetails: Invoice | null;
}

export const getDefaultDashboard = (): Dashboard => ({
  user: getDefaultRequestableItem<User>(),
  shop: getDefaultRequestableItem<ShopModels.Shop>(),
  products: getDefaultRequestableList<Product>(),
  invoices: getDefaultRequestableList<Invoice>(),
  invoiceDetails: null,
});
