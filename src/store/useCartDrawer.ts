// src/hooks/useCartDrawer.ts
import { cartDrawerStore } from '@/store/cartDrawerStore';

export const useCartDrawer = () => {
  const isOpenCartDrawer = cartDrawerStore(state => state.isOpenCartDrawer);
  const setCartDrawer = cartDrawerStore(state => state.setCartDrawer);
  const toggleCartDrawer = cartDrawerStore(state => state.toggleCartDrawer);

  return {
    isOpenCartDrawer,
    setCartDrawer,
    toggleCartDrawer,
  };
};