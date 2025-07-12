import { IProduct } from "@/shared/components/types";

// Modelo para Items del Carrito
// model CartItem {
//   id         Int      @id @default(autoincrement())
//   cartId     Int
//   articuloId Int
//   quantity   Int      @default(1)
//   addedAt    DateTime @default(now())

//   // Relaciones
//   cart     Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)
//   articulo Articulo @relation(fields: [articuloId], references: [id])

//   // Índice compuesto para evitar duplicados
//   @@unique([cartId, articuloId])
//   @@map("cart_items")
// }
export interface ICartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  addedAt: string;
  product: IProduct;
}

// Modelo para Carrito (unificado con carritos abandonados)
// model Cart {
//   id           Int       @id @default(autoincrement())
//   userId       Int?      // Nullable para usuarios invitados
//   sessionId    String?   // Para usuarios no registrados
//   email        String?   // Para carritos abandonados
//   status       String    @default("active") // 'active', 'abandoned', 'converted', 'expired'
//   // Timestamps importantes
//   createdAt    DateTime  @default(now())
//   updatedAt    DateTime  @updatedAt
//   lastActivity DateTime  @default(now())
//   // Metadata para abandono
//   abandonedAt  DateTime?
//   emailSent    Boolean   @default(false)
//   emailSentAt  DateTime?
//   // Relaciones
//   user      User?      @relation(fields: [userId], references: [id], onDelete: SetNull)
//   cartItems CartItem[]
//   @@map("carts")
// }
export interface ICart {
  id: number;
  userId?: number;
  sessionId?: string;
  email?: string;
  status: 'active' | 'abandoned' | 'converted' | 'expired';
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  lastAddedProduct: IProduct | null;
  lastAddedAt: string | null;
  abandonedAt?: string;
  emailSent: boolean;
  emailSentAt?: string;
  cartItems: ICartItem[];
}
