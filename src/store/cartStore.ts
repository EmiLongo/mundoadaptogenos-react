import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IProduct } from '@/shared/types/ProductTypes';
import { ICart, ICartItem } from '@/shared/types/CartTypes';

// Tipos específicos para el store
export interface CartState {
  cart: ICart | null;
  isLoading: boolean;
  error: string | null;
}

export interface CartActions {
  // Acciones básicas del carrito
  initializeCart: (userId?: number, sessionId?: string) => void;
  addToCart: (product: IProduct, quantity?: number, options?: string[]) => void;
  removeFromCart: (productId: number) => void;
  removeFromCartByCartItemId: (cartItemId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  clearLastAdded: () => void;
  
  // Utilidades
  getCartItemsCount: () => number;
  getCartTotal: () => number;
  getCartItemByProductId: (productId: number) => ICartItem | undefined;
  isProductInCart: (productId: number) => boolean;
  
  // Gestión de estado
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Gestionar opciones
  addOptionToCartItem: (cartId: number, option: string) => void;
  removeOptionFromCartItem: (cartId: number, option: string) => void;
  updateCartItemOptions: (cartId: number, options: string[]) => void;
  clearCartItemOptions: (cartId: number) => void;
}

export type CartStore = CartState & CartActions;

// Función para generar un ID único temporal
const generateTempId = () => Date.now() + Math.random();

// Función para crear un carrito vacío
const createEmptyCart = (userId?: number, sessionId?: string): ICart => {
  const now = new Date().toISOString();
  return {
    id: generateTempId(),
    userId,
    sessionId: sessionId || `session_${generateTempId()}`,
    status: 'active',
    createdAt: now,
    updatedAt: now,
    lastActivity: now,
    lastAddedProduct: null,
    lastAddedAt: null,
    emailSent: false,
    cartItems: []
  };
};

// Función para crear un item del carrito
const createCartItem = (product: IProduct, quantity: number, cartId: number, options?: string[]): ICartItem => {
  return {
    id: generateTempId(),
    cartId,
    productId: product.id,
    quantity,
    options,
    addedAt: new Date().toISOString(),
    product
  };
};

// Función para actualizar la actividad del carrito
const updateCartActivity = (cart: ICart): ICart => {
  const now = new Date().toISOString();
  return {
    ...cart,
    updatedAt: now,
    lastActivity: now
  };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      cart: null,
      isLoading: false,
      error: null,
      lastAddedProduct: null,
      lastAddedAt: null,

      // Inicializar carrito
      initializeCart: (userId?: number, sessionId?: string) => {
        const { cart } = get();
        if (!cart) {
          set({ cart: createEmptyCart(userId, sessionId) });
        }
      },

      // Agregar producto al carrito
      addToCart: (product: IProduct, quantity = 1, options = []) => {
        const { cart } = get();
        let updatedCart: ICart;

        if (!cart) {
          // Crear carrito si no existe
          updatedCart = createEmptyCart();
        } else {
          updatedCart = { ...cart };
        }

        // Buscar si el producto ya está en el carrito
        const existingItemIndex = updatedCart.cartItems.findIndex(
          item => item.productId === product.id
        );

        if (existingItemIndex >= 0) {
          // Si no tiene opciones, Actualizar cantidad si ya existe
          if (!product.hasOptions) {
          updatedCart.cartItems[existingItemIndex] = {
            ...updatedCart.cartItems[existingItemIndex],
            quantity: updatedCart.cartItems[existingItemIndex].quantity + quantity}
          } else {
            // Si ya hay un producto con el id y tiene opciones Agregar nuevo item
            const newItem = createCartItem(product, quantity, updatedCart.id, options);
            updatedCart.cartItems.push(newItem);
          }
        } else {
          // Si tiene opciones Agregar nuevo item
          const newItem = createCartItem(product, quantity, updatedCart.id, options);
          updatedCart.cartItems.push(newItem);
        }

        updatedCart.lastAddedProduct = { ...product, quantity };
        updatedCart.lastAddedAt = new Date().toISOString();

        // Actualizar actividad del carrito
        updatedCart = updateCartActivity(updatedCart);

        set({ 
          cart: updatedCart, 
          error: null,
        });
      },

      // Remover producto del carrito por productId
      removeFromCart: (productId: number) => {
        const { cart } = get();
        if (!cart) return;

        const updatedCart = {
          ...updateCartActivity(cart),
          cartItems: cart.cartItems.filter(item => item.productId !== productId)
        };

        set({ cart: updatedCart, error: null });
      },

      // Remover producto del carrito por productId
      removeFromCartByCartItemId: (cartItemId: number) => {
        const { cart } = get();
        if (!cart) return;

        const updatedCart = {
          ...updateCartActivity(cart),
          cartItems: cart.cartItems.filter(item => item.id !== cartItemId)
        };

        set({ cart: updatedCart, error: null });
      },

      // limpiar el ultimo producto agregado
      clearLastAdded: () => {
        const { cart } = get();
        if (!cart) return;
        set({ cart: { 
          ...cart, 
          lastAddedProduct: null, 
          lastAddedAt: null 
        }});
      },
      

      // Actualizar cantidad de un producto
      updateQuantity: (productId: number, quantity: number) => {
        const { cart } = get();
        if (!cart) return;

        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        const updatedCart = {
          ...updateCartActivity(cart),
          cartItems: cart.cartItems.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          )
        };

        set({ cart: updatedCart, error: null });
      },

      // Vaciar carrito
      clearCart: () => {
        const { cart } = get();
        if (!cart) return;

        const updatedCart = {
          ...updateCartActivity(cart),
          cartItems: []
        };

        set({ cart: updatedCart, error: null });
      },

      // Obtener cantidad total de items
      getCartItemsCount: () => {
        const { cart } = get();
        if (!cart) return 0;
        return cart.cartItems.reduce((total, item) => total + item.quantity, 0);
      },

      // Obtener total del carrito
      getCartTotal: () => {
        const { cart } = get();
        if (!cart) return 0;
        
        return cart.cartItems.reduce((total, item) => {
          const price = item.product.discount > 0 
            ? item.product.priceDiscount 
            : item.product.price;
          return total + (price * item.quantity);
        }, 0);
      },

      // Obtener item por ID de producto
      getCartItemByProductId: (productId: number) => {
        const { cart } = get();
        if (!cart) return undefined;
        return cart.cartItems.find(item => item.productId === productId);
      },

      // Verificar si producto está en carrito
      isProductInCart: (productId: number) => {
        const { cart } = get();
        if (!cart) return false;
        return cart.cartItems.some(item => item.productId === productId);
      },

      // Gestión de estado de carga
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Gestión de errores
      setError: (error: string | null) => {
        set({ error });
      },

      // Agregar una opción a un item específico
      addOptionToCartItem: (cartId: number, option: string) => {
        const { cart } = get();
        if (!cart) return;

        const updatedCart = {
          ...updateCartActivity(cart),
          cartItems: cart.cartItems.map(item => {
            if (item.id === cartId) {
              const currentOptions = item.options || [];
              // Evitar duplicados
              if (currentOptions.includes(option)) {
                return item;
              }
              return {
                ...item,
                options: [...currentOptions, option]
              };
            }
            return item;
          })
        };

        set({ cart: updatedCart, error: null });
      },

      // Remover una opción específica
      removeOptionFromCartItem: (cartId: number, option: string) => {
        const { cart } = get();
        if (!cart) return;

        const updatedCart = {
          ...updateCartActivity(cart),
          cartItems: cart.cartItems.map(item => {
            if (item.id === cartId && item.options) {
              return {
                ...item,
                options: item.options.filter(opt => opt !== option)
              };
            }
            return item;
          })
        };

        set({ cart: updatedCart, error: null });
      },

      // Reemplazar todas las opciones de un item
      updateCartItemOptions: (cartId: number, options: string[]) => {
        const { cart } = get();
        if (!cart) return;

        const updatedCart = {
          ...updateCartActivity(cart),
          cartItems: cart.cartItems.map(item => 
            item.id === cartId 
              ? { ...item, options: [...options] }
              : item
          )
        };

        set({ cart: updatedCart, error: null });
      },

      // Limpiar todas las opciones de un item
      clearCartItemOptions: (cartId: number) => {
        const { cart } = get();
        if (!cart) return;

        const updatedCart = {
          ...updateCartActivity(cart),
          cartItems: cart.cartItems.map(item => 
            item.id === cartId 
              ? { ...item, options: undefined }
              : item
          )
        };

        set({ cart: updatedCart, error: null });
      },
    }),
    {
      name: 'cart-storage', // Nombre para localStorage
      // Solo persistir el carrito, no el estado de carga ni errores
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);