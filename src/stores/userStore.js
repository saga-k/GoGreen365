import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('userStore',{
  state: () => ({
    users:[]
  }),

  actions:{

    async fetchUsers(){
      try{
        const promise = await fetch('http://localhost:3000/users');
        if(!promise.ok){
          throw new Error('fetch error');
        }
        const users = await promise.json();
        this.users = users
        console.log('this.users:',this.users)
      }
      catch(error){
        console.error(error)
      }
    },
    
     addUser(user) {
      const newUser = {
        id: String(this.users.length+1),
        ...user,
      }
      this.users.push(newUser)
      console.log('this.users', this.users)
      this.postUser(newUser)
      },

    async postUser(newUser){
      const promise = await fetch('http://localhost:3000/users',{
        method: 'POST',
        headers:{
        'Content-Type': 'application/json'
        },
        body: 
        JSON.stringify(newUser)
        });
      const data = await promise.json();
      console.log(data);
    },

    getUserById(id){
      let foundUser = this.users.find(user => user.id === id);
      return foundUser;
    },

    addEcoPoints(id, points){
      let user = this.users.find(user => user.id === id);
      console.log('user', user)
      let userPoints = Number(user.ecoPoints)
      console.log(userPoints)
      user.ecoPoints += points;
      console.log('users after points:',this.users);
      this.updateUserInBe(user, id);
    }, 
    
    async updateUserInBe(user, id) {

      const promise = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      })

      const data = await promise.json();
      console.log('post succesful', data);

    }
  }
})
