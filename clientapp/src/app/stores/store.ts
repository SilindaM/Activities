import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import commonStore from "./commonStore";

interface Store 
{
    activityStore : ActivityStore
    commonStore:commonStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),commonStore:new commonStore()
}

export const StoreContext = createContext(store); 

export function useStore(){
    return useContext(StoreContext);  
}