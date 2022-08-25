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

export interface Country {
  countryId: number;
  iso: string;
  iso3: string;
  name: string;
  niceName: string;
  numCode: number;
  phonePrefix: string;
}

export interface Province {
  provinceId: number;
  provinceName: string;
  countryId: number | null;
}

export interface Regency {
  regencyId: number;
  regencyName: string;
  provinceId: number;
  countryId: number | null;
}

export interface Shop {
  shopId: number;
  shopName: string;
  ownerId: number;
  countryId: number;
  provinceId: number;
  regencyId: number;
  address: string;
  contactNumber: string;
  invoiceFormat: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  Country: Country;
  Province: Province;
  Regency: Regency;
}

export interface ShopState {
  countries: Array<Country>;
  provinces: Array<Province>;
  regencies: Array<Regency>;
  shops: RequestableList<Shop>;
}

export const getDefaultShop = (): ShopState => ({
  countries: [],
  provinces: [],
  regencies: [],
  shops: getDefaultRequestableList<Shop>(),
});
