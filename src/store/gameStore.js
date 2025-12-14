import { create } from 'zustand'

export const useGameStore = create((set) => ({
  // Park stats
  money: 50000,
  parkRating: 0,
  visitors: 0,
  happiness: 50,
  
  // Building mode
  buildMode: 'track', // 'track', 'station', 'scenery'
  isBuilding: false,
  
  // Track data
  tracks: [],
  currentTrack: null,
  trackPoints: [],
  
  // Coaster state
  coasterRunning: false,
  coasterPosition: 0,
  
  // Actions
  addMoney: (amount) => set((state) => ({ money: state.money + amount })),
  spendMoney: (amount) => set((state) => ({ money: Math.max(0, state.money - amount) })),
  
  setBuildMode: (mode) => set({ buildMode: mode }),
  setIsBuilding: (building) => set({ isBuilding: building }),
  
  addTrackPoint: (point) => set((state) => ({
    trackPoints: [...state.trackPoints, point]
  })),
  
  clearTrackPoints: () => set({ trackPoints: [] }),
  
  finishTrack: () => set((state) => {
    if (state.trackPoints.length < 4) return state
    const newTrack = {
      id: Date.now(),
      points: [...state.trackPoints],
      cost: state.trackPoints.length * 100
    }
    return {
      tracks: [...state.tracks, newTrack],
      trackPoints: [],
      money: Math.max(0, state.money - newTrack.cost),
      isBuilding: false
    }
  }),
  
  startCoaster: () => set({ coasterRunning: true, coasterPosition: 0 }),
  stopCoaster: () => set({ coasterRunning: false }),
  updateCoasterPosition: (position) => set({ coasterPosition: position }),
  
  updateParkStats: () => set((state) => ({
    visitors: Math.floor(state.parkRating * 10),
    happiness: Math.min(100, state.happiness + (state.tracks.length * 2))
  }))
}))

