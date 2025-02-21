import { defineStore } from 'pinia'

export const useChallengeStore = defineStore('challenge', {
  state: () => ({
    challenges: [],
    loading: false,
    error: null,
    currentUserId: null,
  }),

  actions: {
    async fetchChallenges() {
      this.loading = true
      try {
        const response = await fetch('/challenges.json')
        if (!response.ok) {
          throw new Error('Failed to load challenges')
        }
        const data = await response.json()
        this.challenges = data
        console.log('Challenges loaded:', this.challenges)
      } catch (error) {
        console.error('Error loading challenges:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    setCurrentUser(userId) {
      this.currentUserId = userId
      this.ensureRegistrationDate()
    },
    ensureRegistrationDate() {
      if (!this.currentUserId) return
      const key = `firstLoginDate_${this.currentUserId}`
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, new Date().toISOString())
      }
    },
  },
})
