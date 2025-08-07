// src/store/useCartStore.ts
import { toast } from 'react-toastify';
import { useCartStore } from './cartStore';
import { IProduct } from '@/shared/types/ProductTypes';

export const useCart = () => {
  const {
    cart,
    isLoading,
    error,
    initializeCart,
    addToCart,
    removeFromCart,
    removeFromCartByCartItemId,
    updateQuantity,
    clearCart,
    clearLastAdded,
    getCartItemsCount,
    getCartTotal,
    getCartItemByProductId,
    isProductInCart,
    setLoading,
    setError,
    addOptionToCartItem,
    removeOptionFromCartItem,
    updateCartItemOptions,
    clearCartItemOptions,
  } = useCartStore();

  // Funciones auxiliares con validaciones adicionales
  const addProduct = async (
    product: IProduct,
    quantity: number = 1,
    options: string[] = []
  ) => {
    if (!product || quantity <= 0) {
      setError('Producto o cantidad inválida');
      return false;
    }
  
    if (!product.isValid) {
      setError('Este producto no está disponible');
      return false;
    }
  
    setLoading(true);
    try {
      await addToCart(product, quantity, options); // 👈 Espera realmente
      setError(null);
      toast.success("El producto se ha agregado con éxito");
      return true;
    } catch (err) {
      setError('Error al agregar producto al carrito');
      toast.error("Error al agregar producto al carrito");
      console.log("Error al agregar producto al carrito", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (productId: number) => {
    setLoading(true);
    try {
      await removeFromCart(productId);
      setError(null);
      toast.success("El producto se ha removido con éxito")
      return true
    } catch (err) {
      toast.error("Error al remover producto del carrito")
      setError('Error al remover producto del carrito');
      console.log("Error al remover producto del carrito: ", err)
      return false
    } finally {
      setLoading(false);
    }
  };

  const removeProductByCartItemId = async (cartItemId: number) => {
    setLoading(true);
    try {
      await removeFromCartByCartItemId(cartItemId);
      setError(null);
      toast.success("El producto se ha removido con éxito")
      return true
    } catch (err) {
      toast.error("Error al remover producto del carrito")
      setError('Error al remover producto del carrito');
      console.log("Error al remover producto del carrito: ", err)
      return false
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

  const addSingleOptionToCartItem = (product: IProduct, option: string) => {
    setLoading(true);
    if(!product.hasOptions){
      setError("El producto no permite opciones")
    }
    try{
      addOptionToCartItem(product.id, option)
    } catch (err) {
    toast.error("Ocurrió un error al agregar la opción")
    console.log(err)
    } finally {
      setLoading(false)
    }
  };

  const removeSingleOptionFromCartItem = (product: IProduct, option: string) =>{
    setLoading(true);
    if(!product.hasOptions){
      setError("El producto no permite opciones")
    }
    try{
      removeOptionFromCartItem(product.id, option)
    } catch (err) {
    toast.error("Ocurrió un error al borrar la opción")
    console.log(err)
    } finally {
      setLoading(false)
    }
  };

  const updateCartItemMultipleOptions = (product: IProduct, options: string[]) =>{
    setLoading(true);
    if(!product.hasOptions){
      setError("El producto no permite opciones")
    }
    try{
      updateCartItemOptions(product.id, options)
    } catch (err) {
    toast.error("Ocurrió un error al actualizar las opciones")
    console.log(err)
    } finally {
      setLoading(false)
    }
  };

  const clearCartItemOptionsByProduct = (product: IProduct) =>{
    setLoading(true);
    if(!product.hasOptions){
      setError("El producto no permite opciones")
    }
    try{
      clearCartItemOptions(product.id)
    } catch (err) {
    toast.error("Ocurrió un error al borrar las opciones")
    console.log(err)
    } finally {
      setLoading(false)
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
    removeProductByCartItemId,
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

    //gestión de opciones
    addSingleOptionToCartItem,
    removeSingleOptionFromCartItem,
    updateCartItemMultipleOptions,
    clearCartItemOptionsByProduct,
  };
};