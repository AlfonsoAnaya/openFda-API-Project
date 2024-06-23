import { create } from 'zustand'

interface DataState {
    data: any
    updateData: (payload:any) => void
}

const useDataStore = create<DataState>()((set) => ({
    data: null,
    updateData: (payload: any) => set(() => ({ data: payload })),
  }))

export default useDataStore