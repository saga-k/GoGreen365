import { defineStore } from 'pinia'
import { useUserStore } from './userStore'

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

    // Uppdaterad för att använda userStore istället för localStorage
    setCurrentUser(userId) {
      const userStore = useUserStore()
      const user = userStore.getUserById(userId)

      if (user) {
        this.currentUserId = userId
        // Kontrollera om användaren har registreringsdatum
        if (!user.registrationDate) {
          const today = new Date()
          userStore.updateUserInBe(
            {
              ...user,
              registrationDate: today.toDateString(), // Sparar i formatet "Tue Feb 25 2025"
            },
            userId,
          )
        }
      }
    },
  },

  getters: {
    // Använder userStore för att hämta användardata
    currentUser() {
      const userStore = useUserStore()
      return userStore.getUserById(this.currentUserId)
    },

    // Hämtar registreringsdatum från userStore och hanterar string-format
    registrationDate() {
      if (!this.currentUser?.registrationDate) return null
      // Hanterar det befintliga formatet "Tue Feb 25 2025"
      return new Date(this.currentUser.registrationDate)
    },

    // Beräknar dagar sedan registrering
    daysSinceRegistration() {
      const regDate = this.registrationDate
      if (!regDate) return 0

      const today = new Date()
      today.setHours(0, 0, 0, 0) // Sätter tiden till midnatt

      const regDateMidnight = new Date(regDate)
      regDateMidnight.setHours(0, 0, 0, 0)

      const diffMs = today - regDateMidnight
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      console.log('Days since registration:', days)
      return days
    },
    todaysChallenge() {
      if (!this.challenges.length) return null
      const dayNumber = this.daysSinceRegistration + 1
      return this.challenges.find((ch) => ch.date === dayNumber) || null
    },
  },
})
