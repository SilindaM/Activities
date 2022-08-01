import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Grid,  } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../Models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props{
    activities:Activity[];
    submitting:boolean;
    createOrEdit:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;

}

export default observer (function ActivityDashboard({activities,createOrEdit,deleteActivity,submitting}:Props){

    const {activityStore}=useStore();
    const {selectedActivity,editMode}=activityStore;

    
    return(
        <Grid>
        <Grid.Column width='10'>
            <ActivityList activities={activities} 
                deleteActivity={deleteActivity}
                submitting={submitting}
            />
        </Grid.Column>
        <Grid.Column width='6'>

            {selectedActivity && !editMode &&
                <ActivityDetails  /> }
                
                {editMode &&
                     <ActivityForm
                      createOrEdit={createOrEdit}
                      submitting={submitting}
                      />}
        </Grid.Column>
        
        </Grid>
    )
})