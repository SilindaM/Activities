import {  makeAutoObservable} from "mobx";
import { Activity } from "../../Models/activity";
import agent from "../api/agent";

export default  class ActivityStore{
    activities:Activity[]=[];
    selectedActivity:Activity|undefined=undefined;
    editMode=false;
    loading=false;
    loadingInitial=false;

    constructor(){
        makeAutoObservable(this)
    }

    loadActivities=async()=>{
        this.setLoadingInitial(true);
        try {
            const activities =await agent.Activities.list();

                //FORMAT DATE
               activities.forEach(activity=>{
                activity.date=activity.date.split('T')[0];
                this.activities.push(activity);
              
            })
            this.setLoadingInitial(false);
        } 
        catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    setLoadingInitial=(state:boolean)=>{
        this.loadingInitial=state;
    }
    selectActivity=(id:string)=>{
        this.selectedActivity=this.activities.find(a=>a.id===id);
    }
    cancelSeletedActivity=()=>{
        this.selectedActivity=undefined;
    }
    openForm=(id?:string)=>{
        id?this.selectActivity(id): this.cancelSeletedActivity();
        this.editMode=true;
    }
    closeForm=()=>{
        this.editMode=false;
    }
}