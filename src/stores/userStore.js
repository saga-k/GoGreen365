import { defineStore } from 'pinia'
export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
    currentUser: null,
  }),

  actions: {
    async fetchUsers() {
      try {
        const promise = await fetch('http://localhost:3000/users')
        if (!promise.ok) {
          throw new Error('fetch error')
        }
        const users = await promise.json()
        this.users = users
        // console.log('this.users:', this.users)
      } catch (error) {
        console.error(error)
      }
    },

    updatedUser(user) {
      const updatedUser = {
        id: String(this.users.length + 1),
        ...user,
      }
      this.users.push(updatedUser)
      console.log('this.users', this.users)
      this.updateUser(updatedUser)
    },

    async updateUser(user, id) {
      const promise = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      const data = await promise.json()
      console.log('post succesful', data)
    },

    addUser(user) {
      const newUser = {
        id: String(this.users.length + 1),
        ...user,
      }
      this.users.push(newUser)
      console.log('this.users', this.users)
      this.postUser(newUser)
    },

    async postUser(newUser) {
      const promise = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      const data = await promise.json()
      console.log(data)
    },

    getUserById(id) {
      let foundUser = this.users.find((user) => user.id === id)
      return foundUser
    },

    addEcoPoints(user, points) {
      console.log('user', user)
      user.ecoPoints += points
      console.log('user after points:', user)
      this.currentUser = user
      this.updateUserInBe(user, user.id)
      localStorage.setItem('currentUser', JSON.stringify(user))
    },

    donatePoints(user) {
      console.log('user', user)
      user.ecoPoints = Number(user.ecoPoints - 100)
      this.updateUserInBe(user, user.id)
      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
    },

    async updateUserInBe(user, id) {
      const promise = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      const data = await promise.json()
      console.log('post succesful', data)
    },

    loginUser(email, password) {
      const user = this.users.find(
        (u) => u.mail.toLowerCase() === email.toLowerCase() && u.password === password,
      )

      if (user) {
        this.currentUser = user
        localStorage.setItem('currentUser', JSON.stringify(user))
        return true
      }

      return false
    },

    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    },

    async deleteUser() {
      if (!this.currentUser) return false

      try {
        const response = await fetch(`http://localhost:3000/users/${this.currentUser.id}`, {
          method: 'DELETE',
        })

        if (!response.ok) throw new Error('Failed to delete user')

        // Clear local user data
        this.users = this.users.filter((user) => user.id !== this.currentUser.id)
        localStorage.removeItem('currentUser')
        this.currentUser = null

        console.log('User deleted successfully')
        return true
      } catch (error) {
        console.error('Error deleting user:', error)
        return false
      }
    },
  },
})
