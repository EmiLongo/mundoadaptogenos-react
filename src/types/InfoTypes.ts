export interface IContactInfo {
  icon: React.ElementType;
  title: string;
  text: string;
  type: string;
  url: string;
}

export interface IProductsItems {
  text: string;
  path: string;
  hasSubproducts: boolean;
}
export interface IMenuOption {
  text: string;
  icon: React.ReactNode;
  path: string;
}

export interface ISubproductsItems {
  text: string;
  path: string;
}