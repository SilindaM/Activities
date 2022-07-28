import React, { Fragment, useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../../Models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';

function App() {

  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity]=useState<Activity|undefined>(undefined);
  const [editMode,setEditMode]=useState(false);

  useEffect(()=>{
    agent.Activities.list().then(response=>{

      let activities:Activity[]=[];

      //FORMAT DATE
      response.forEach(activity=>{
        activity.date=activity.date.split('T')[0];

        activities.push(activity);
      })
      setActivities(response);
    })
  },[])


  //find the selected activity
  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x=>x.id===id))
  }
  //cancel selected activithy 
  function handleCancelSelectedActivity(){
     setSelectedActivity(undefined);
  }

  //open form
  function handleFormOpen(id?:string){
    id? handleSelectActivity(id):handleCancelSelectedActivity();
    setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity:Activity){
    //check if the activity exists by checking the id
    activity.id?
     setActivities([...activities.filter(x=>x.id!==activity.id),activity])
    //if there is no id we create new activity
    :setActivities([...activities,{...activity,id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity)
  }
  //delete activity
  function handleDeleteActivity(id:string){
      setActivities([...activities.filter(x=> x.id !== id)])
  }
  return (
    < >
      <Navbar openForm={handleFormOpen}/>

        <Container style={{marginTop:'7em'}}>
          <ActivityDashboard
           activities={activities}
           selectedActivity={selectedActivity}
           selectActivity={handleSelectActivity}
           cancelSelectActivity={handleCancelSelectedActivity}
           editMode={editMode}
           openForm={handleFormOpen}
           closeForm={handleFormClose}
           createOrEdit={handleCreateOrEditActivity}
           deleteActivity={handleDeleteActivity}
           />
        </Container>
    </>
  );
}

export default App;
