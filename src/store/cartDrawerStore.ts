import { create } from 'zustand';

export interface ICartDrawerStore {
  isOpenCartDrawer: boolean;
  setCartDrawer: (option: boolean) => void;
  toggleCartDrawer: () => void;
}
export const cartDrawerStore = create<ICartDrawerStore>()(
  (set, get) => ({
    // Estado inicial
    isOpenCartDrawer: false,

    setCartDrawer: (option: boolean) => {
      set({isOpenCartDrawer: option})
    },

    toggleCartDrawer: () => {
      const { isOpenCartDrawer } = get();
      set({isOpenCartDrawer: !isOpenCartDrawer})
    },
  })
)