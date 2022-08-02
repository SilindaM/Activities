import React, {  useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Router } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/Activities/form/ActivityForm';
import ActivityDetails from '../../features/Activities/details/ActivityDetails';


function App() {
 
  return (
    < >
      <Navbar/>

        <Container style={{marginTop:'7em'}}>

          
          <Route exact  path='/' component={HomePage}/>
          <Route exact path='/activities' component={ActivityDashboard } />
          <Route path='/activities/:id' component={ActivityDetails } />
          <Route path='/createActivity' component={ActivityForm } />
          
       
        </Container>
    </>
  );
}

export default observer (App);
