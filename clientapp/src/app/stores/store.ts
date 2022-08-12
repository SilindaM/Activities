import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import commonStore from "./commonStore";
import UserStore from "./userStore";

interface Store 
{
    activityStore : ActivityStore
    commonStore:commonStore;
    userStore:UserStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore:new commonStore(),
    userStore:new UserStore()
}

export const StoreContext = createContext(store); 

export function useStore(){
    return useContext(StoreContext);  
}