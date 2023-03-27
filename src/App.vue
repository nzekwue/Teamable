<template>
        <div v-show="!isEditMode">
       <h1>User Profile</h1>
       <img :src="image">
      

       <span>Name: </span><b id="name">{{ name }}</b>
       <hr/>

       <span>Email: </span><b id="email">{{ email }}</b>
       <hr/>

       <span>Interest: </span><b id="interest">{{ interest }}</b>
       <hr/>

       <button @click="handleEditprofile">Edit Profile</button>
    </div>

    <div v-show="isEditMode"> 
        <h1>User Profile</h1>
        <img :src="image">
 
        <span>Name: </span>
        <input type="text" id="Input-name" v-model="name"/>
        <hr/>
 
        <span>Email: </span>
        <input type="text" id="Input-email" v-model="email"/>
        <hr/>
 
        <span>Interest: </span><input type="text" id="Input-interest" v-model="interest"/>
        <hr/>

        <button @click="handleUpdateprofile">Update Profile</button>
     </div>
</template>

<script>
     import image from "./profile.jpeg" 
     export default{
        name:"App",
        data(){
         return{
          image: image,
          name: "",
          email: "",
          interest: "",
          isEditMode: false
         }
        },

        async created(){
            const userData = await this.fetchUserprofile()
             this.name = userData.name
             this.email = userData.email
             this.interest = userData.interest

        },

     methods:{
       handleEditprofile(){
        
            this.isEditMode = true
                },

       async handleUpdateprofile() {
        const payload ={
          name: this.name,
          email: this.email,
          interest: this.interest,
        }

       const resJson = await this.updateUserprofile(payload)
       console.log(resJson)

          this.isEditMode = false
        },
   async fetchUserprofile() {
        const res = await fetch( 'get-profile')
             return await res.json()
        },

       async updateUserprofile(payload) {
        const res = await fetch('update-profile',{
          method: "POST",
          headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }, 
          body: JSON.stringify(payload)
        })
          return await res.json()
       } 

     }

        }

</script>

<style>
img{
    width: 320px;
    height: 270px;
    display: block;
    margin-bottom: 40px;
}

  Div{
    margin: 40px auto;
    width: 80%;
  }

  hr{
    width: 400px;
    margin: 25px 0;
  }

  button{
    width: 160px;
    font-size: 15px;
    height: 45px;
    border-radius: 5px;
    
  }

  button:hover {
    cursor: pointer;
  }

  input{
    width: 200px;
    font-size: 15px;
    padding: 10px;
}

</style>