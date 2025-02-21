import { defineStore } from 'pinia'

export const useChallengeStore = defineStore('challenge', {
  state: () => ({
    challenges: [],
    loading: false,
    error: null,
    currentUserId: null,
  }),
})
