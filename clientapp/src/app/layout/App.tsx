import React, { Fragment, useEffect, useState } from 'react';
import {  Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../../Models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  
  const {activityStore}=useStore();

  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity]=useState<Activity|undefined>(undefined);
  const [editMode,setEditMode]=useState(false);
  const [submitting,setSubmitting]=useState(false);

  useEffect(()=>{
    activityStore.loadActivities();
  },[activityStore])


  //find the selected activity
  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x=>x.id===id))
  }

 
  function handleCreateOrEditActivity(activity:Activity){
    setSubmitting(true);

    //check if there is an id existing
    if(activity.id){
        agent.Activities.update(activity).then(()=>{
          setActivities([...activities.filter(x=>x.id!==activity.id),activity])
          setSelectedActivity(activity)
          setEditMode(false);
          setSubmitting(false)
        })
    }
    //create new activity 
    else{
      activity.id=uuid();
      agent.Activities.create(activity).then(()=>{
         setActivities([...activities,activity])
         setSelectedActivity(activity)
         setEditMode(false);
         setSubmitting(false)
      })
    }
  }
  function handleCancelSelectedActivity()
    {
      setSelectedActivity(undefined)
    }
  function handleFormOpen(id? : string)
  {
    id ?  handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }
  //delete activity
  function handleDeleteActivity(id:string){
      setSubmitting(true);
      agent.Activities.delete(id).then(()=>{
        setActivities([...activities.filter(x=> x.id !== id)])
        setSubmitting(false);
      })
  }

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    < >
      <Navbar openForm={handleFormOpen}/>

        <Container style={{marginTop:'7em'}}>

          <ActivityDashboard
           activities={activityStore.activities}
           createOrEdit={handleCreateOrEditActivity}
           deleteActivity={handleDeleteActivity}
           submitting={submitting}
           />
        </Container>
    </>
  );
}

export default observer (App);
