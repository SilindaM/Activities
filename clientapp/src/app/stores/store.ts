import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import commonStore from "./commonStore";
import modalStore from "./modalStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store 
{
    activityStore : ActivityStore
    commonStore:commonStore;
    userStore:UserStore;
    modalStore:ModalStore;
    profileStore:ProfileStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore:new commonStore(),
    userStore:new UserStore(),
    modalStore:new ModalStore(),
    profileStore:new ProfileStore()

}

export const StoreContext = createContext(store); 

export function useStore(){
    return useContext(StoreContext);  
}