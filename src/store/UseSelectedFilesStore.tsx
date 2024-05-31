import { create } from 'zustand'


type UseSelectedFilesStoreType = {
    selectedFiles: string[]
    setSelectedFiles: (files: string[]) => void
    addSelectedFiles: (files: string[]) => void
    removeSelectedFiles: (files: string[]) => void
    clearSelectedFiles: () => void
    }

export const useSelectedFilesStore = create<UseSelectedFilesStoreType>((set) => ({
    selectedFiles: [],
    setSelectedFiles: (files) => set(() => ({ selectedFiles: files })),
    addSelectedFiles: (files) => set((state) => ({ selectedFiles: [...state.selectedFiles, ...files] })),
    removeSelectedFiles: (files) => set((state) => ({ selectedFiles: state.selectedFiles.filter((file) => !files.includes(file)) })),
    clearSelectedFiles: () => set(() => ({ selectedFiles: [] })),
}))