import { create } from 'zustand'

interface SkipStore {
    skip: number
    updateSkip: (payload:number) => void
}

const useSkipStore = create<SkipStore>()((set) => ({
    skip: 0,
    updateSkip: (payload: number) => set(() => ({skip: payload})),
}))

export default useSkipStore