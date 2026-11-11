import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
    isLoggedIn: boolean;
    hasCompletedSignUp: boolean;
    isAdmin: boolean;


    logIn:() => void;
    logOut:() => void;
    completeSignUp:() => void;
    resetOnboarding:() => void;
    logInAsAdmin: () => void;
}

export const useAuthStore = create(
    persist<UserState>((set) => ({

    isLoggedIn: true,
    hasCompletedSignUp: true,
    isAdmin: true,

    logIn: () => {
        set((state) => {
            return{
            ...state,
            isLoggedIn:true,
        };
        });    
    },

     logOut: () => {
        set((state) => {
            return{
            ...state,
            isLoggedIn:false,
            isAdmin: false,
        };
        });    
    },

    completeSignUp: () => {
        set((state) => {
            return{
            ...state,
            hasCompletedSignUp:true,
        };
        });    
    },

    resetOnboarding: () => {
        set((state) => {
            return{
            ...state,
            hasCompletedSignUp:false,
            isLoggedIn: false,
            isAdmin:false,
        };
        });    
    },

    logInAsAdmin: () => {
        set((state) => {
            return{
            ...state,
            isLoggedIn: true,
            isAdmin:true,
        };
        });    
    },

}),
{
 name: "auth-store",
 storage: createJSONStorage(()=>({
    setItem,
    getItem,
    removeItem: deleteItemAsync,
 }))

} )
);