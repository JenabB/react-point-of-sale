import { ShopModels } from "../shop";
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
  isLoading: boolean;
  user: User;
  shop: ShopModels.Shop | null;
  products: Array<Product>;
  invoices: Array<Invoice>;
  invoiceDetails: Invoice | null;
}
