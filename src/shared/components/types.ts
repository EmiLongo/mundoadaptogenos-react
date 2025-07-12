// model Articulo {
//   id            Int     @id @default(autoincrement())
//   idSection     Int
//   isValid       Boolean @default(true)
//   title         String
//   description   String?
//   urlPhoto      String?
//   price         Decimal @db.Decimal(10, 2)
//   discount      Decimal @default(0) @db.Decimal(5, 2)
//   priceTransfer Decimal @db.Decimal(10, 2)
//   pricePlan     Decimal @db.Decimal(10, 2)
//   createdAt     DateTime @default(now())
// }
export interface IProduct {
  id: number;
  sectionId: number;
  title: string;
  description?: string;
  discount: number;
  price: number;
  priceDiscount: number;
  priceTransfer: number;
  plan: string;
  urlPhoto: string;
  urlThumbnail: string;
  isValid: boolean;
  createdAt?: string;
}