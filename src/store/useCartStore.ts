// src/store/useCartStore.ts
import { toast } from 'react-toastify';
import { useCartStore } from './cartStore';
import { IProduct } from '@shared/components/types';

export const useCart = () => {
  const {
    cart,
    isLoading,
    error,
    initializeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    clearLastAdded,
    getCartItemsCount,
    getCartTotal,
    getCartItemByProductId,
    isProductInCart,
    setLoading,
    setError
  } = useCartStore();

  // Funciones auxiliares con validaciones adicionales
  const addProduct = (product: IProduct, quantity: number = 1) => {
    if (!product || quantity <= 0) {
      setError('Producto o cantidad inválida');
      return;
    }

    if (!product.isValid) {
      setError('Este producto no está disponible');
      return;
    }

    setLoading(true);
    try {
      addToCart(product, quantity);
      setError(null);
      toast.success("El producto se ha agregado con éxito")
    } catch (err) {
      setError('Error al agregar producto al carrito');
      toast.error("Error al agregar producto al carrito")
      console.log("Error al agregar producto al carrito", err)
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = (productId: number) => {
    setLoading(true);
    try {
      removeFromCart(productId);
      setError(null);
      toast.success("El producto se ha removido con éxito")
    } catch (err) {
      toast.error("Error al remover producto del carrito")
      setError('Error al remover producto del carrito');
      console.log("Error al remover producto del carrito: ", err)
    } finally {
      setLoading(false);
    }
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    if (quantity < 0) {
      setError('La cantidad no puede ser negativa');
      return;
    }

    setLoading(true);
    try {
      updateQuantity(productId, quantity);
      setError(null);
    } catch (err) {
      setError('Error al actualizar cantidad');
      console.log("Error al actualizar cantidad: ", err)
    } finally {
      setLoading(false);
    }
  };

  // TODO armar modal para esto
  // '¿Estás seguro de que quieres vaciar el carrito?'
  const clearCartWithConfirmation = () => {
      setLoading(true);
      try {
        clearCart();
        setError(null);
        toast.success("El carrito se ha vaciado con éxito")
      } catch (err) {
        toast.error("Error al vaciar carrito")
        setError('Error al vaciar carrito');
        console.log('Error al vaciar carrito:', err)
      } finally {
        setLoading(false);
      }
  };

  // Funciones de utilidad adicionales
  const getProductQuantityInCart = (productId: number): number => {
    const item = getCartItemByProductId(productId);
    return item ? item.quantity : 0;
  };

  const getCartTotalWithDiscount = (): number => {
    if (!cart) return 0;
    
    return cart.cartItems.reduce((total, item) => {
      const price = item.product.discount > 0 
        ? item.product.priceDiscount 
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartTotalWithoutDiscount = (): number => {
    if (!cart) return 0;
    
    return cart.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getTotalSavings = (): number => {
    return getCartTotalWithoutDiscount() - getCartTotalWithDiscount();
  };

  const isEmpty = !cart || cart.cartItems.length === 0;

  return {
    // Estado
    cart,
    isLoading,
    error,
    isEmpty,
    
    // Acciones principales
    initializeCart,
    addProduct,
    removeProduct,
    updateProductQuantity,
    clearCart: clearCartWithConfirmation,
    clearLastAdded,
    
    // Utilidades
    itemsCount: getCartItemsCount(),
    total: getCartTotal(),
    totalWithDiscount: getCartTotalWithDiscount(),
    totalWithoutDiscount: getCartTotalWithoutDiscount(),
    totalSavings: getTotalSavings(),
    
    // Funciones de consulta
    getProductQuantityInCart,
    isProductInCart,
    getCartItemByProductId,
    
    // Gestión de errores
    clearError: () => setError(null),
    
    // Información del carrito
    cartItems: cart?.cartItems || [],
    cartId: cart?.id,
    lastActivity: cart?.lastActivity,
    lastAddedProduct: cart?.lastAddedProduct,
    lastAddedAt: cart?.lastAddedAt,
  };
};