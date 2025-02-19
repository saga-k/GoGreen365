import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [
      {
        id: 1,
        firstName: 'Kate',
        lastName: 'Lastname',
        mail: 'kate@gmail.com',
        password: 'Password123',

        completedTasks: [
          {
            id: '1',
            date: '1/2/2025',
            title: 'Bring your own shopping bag',
            description: 'Lorem ipsum dolor sit amet',
          },
        ],
      },
    ],
    currentUser: null,
  }),

  actions: {
    loginUser(email, password) {
      const user = this.users.find(
        (u) => u.mail.toLowerCase() === email.toLowerCase() && u.password === password,
      )

      if (user) {
        this.currentUser = user // Set the logged-in user in the store
        localStorage.setItem('currentUser', JSON.stringify(user)) // Optional: store user in localStorage
        localStorage.setItem('token', 'dummy-token') // Store a token for route protection
        return true // Login successful
      }

      return false // Login failed
    },
  },
})
