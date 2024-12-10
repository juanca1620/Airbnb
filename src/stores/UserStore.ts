import { defineStore } from "pinia";
import type User from "@/interfaces/User";
import { ref } from "vue";
export const useUserStore = defineStore("User",()=>{
    const currentUser = ref<User>({UserName:"Null"} as User)
    const setUser = (user:User)=>{
        currentUser.value = user;
    }

    return{currentUser,setUser}
})