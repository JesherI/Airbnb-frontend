import { create } from "zustand";

interface AddPropertyModal {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddPropertyModal = create<AddPropertyModal>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export default useAddPropertyModal;