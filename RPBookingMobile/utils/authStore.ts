import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
    isLoggedIn: boolean;
    shouldCreateAccount: boolean;
    hasCompletedOnboarding: boolean;
    isAdmin: boolean;


    logIn:() => void;
    logOut:() => void;
    completeOnboarding:() => void;
    resetOnboarding:() => void;
    logInAsAdmin: () => void;
}

export const useAuthStore = create(
    persist<UserState>((set) => ({

    isLoggedIn: false,
    shouldCreateAccount: false,
    hasCompletedOnboarding: false,
    isAdmin: false,

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

    completeOnboarding: () => {
        set((state) => {
            return{
            ...state,
            hasCompletedOnboarding:true,
        };
        });    
    },

    resetOnboarding: () => {
        set((state) => {
            return{
            ...state,
            hasCompletedOnboarding:false,
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