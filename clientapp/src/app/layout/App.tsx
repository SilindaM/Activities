import React, { Fragment, useEffect, useState } from 'react';
import { ducks } from '../../demo';
import DuckItem from '../../DuckItem';
import axios  from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../../Models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';

function App() {

  const [activities,setActivities]=useState<Activity[]>([]);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/Activities').then(response=>{
      console.log(response);
        setActivities(response.data);
    })
  },[])

  return (
    < >
      <Navbar/>

        <Container style={{marginTop:'7em'}}>
          <ActivityDashboard activities={activities}/>
        </Container>
    </>
  );
}

export default App;
