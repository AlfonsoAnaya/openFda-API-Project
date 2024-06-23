import { create } from 'zustand'

interface SearchQueryStore {
    searchQuery: string
    updateSearchQuery: (payload:string) => void
}

const useSearchQueryStore = create<SearchQueryStore>()((set) => ({
    searchQuery: '',
    updateSearchQuery: (payload: string) => set(() => ({searchQuery: payload})),
}))

export default useSearchQueryStore