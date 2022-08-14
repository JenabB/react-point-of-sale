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
  isLoading: boolean;
  countries: Array<Country>;
  provinces: Array<Province>;
  regencies: Array<Regency>;
  shops: Array<Shop>;
}
