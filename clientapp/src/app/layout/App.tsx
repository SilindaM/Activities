import React, {  useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  
  const {activityStore}=useStore();


  useEffect(()=>{
    activityStore.loadActivities();
  },[activityStore])




  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    < >
      <Navbar/>

        <Container style={{marginTop:'7em'}}>

          <ActivityDashboard   />
        </Container>
    </>
  );
}

export default observer (App);
