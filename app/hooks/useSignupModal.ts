import { create } from "zustand";

interface SingnupModalState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useSignupModal = create<SingnupModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export default useSignupModal;