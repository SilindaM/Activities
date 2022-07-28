import React, { Fragment, useEffect, useState } from 'react';
import axios  from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../../Models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';

function App() {

  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity]=useState<Activity|undefined>(undefined);
  const [editMode,setEditMode]=useState(false);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/Activities').then(response=>{
      console.log(response);
        setActivities(response.data);
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
    //if there is no id we create
    :setActivities([...activities,activity]);
    setEditMode(false);
    setSelectedActivity(activity)
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
           />
        </Container>
    </>
  );
}

export default App;
