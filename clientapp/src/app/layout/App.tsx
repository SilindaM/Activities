import React, {  useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Router, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/Activities/form/ActivityForm';
import ActivityDetails from '../../features/Activities/details/ActivityDetails';
import TestError from '../../features/error/TestError';
import { ToastContainer } from 'react-toastify';
import NotFounds from '../../features/error/NotFounds';
import ServerError from '../../features/error/ServerError';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/Modals/ModalContainer';
import ProfilePage from '../../features/Profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';


function App() {

  const location= useLocation();
  const {commonStore,userStore}=useStore();

  useEffect(()=>{

    if(commonStore.token){
        userStore.getUser().finally(()=>commonStore.setAppLoaded())
    }
    else{
      commonStore.setAppLoaded();
    }
  },
  [commonStore,useStore])
 

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading App..'/>

  return (
    < >
    <ToastContainer position='bottom-right' hideProgressBar/>
    <ModalContainer/>
    <Route exact  path='/' component={HomePage}/>
    
    <Route
       path={'/(.+)'}
      render={()=>(
        <>
          <Navbar/>

          <Container style={{marginTop:'7em'}}>

            <Switch>
              <PrivateRoute exact path='/activities' component={ActivityDashboard}  />
              <PrivateRoute path='/activities/:id' component={ActivityDetails } />
              <PrivateRoute key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm } />
              <PrivateRoute path='/profiles/:username' component={ProfilePage}/>
              <Route path='/errors' component={TestError}/>
              <Route path='/server-error' component={ServerError}/>
              <Route component={NotFounds}/>
            </Switch>
          </Container>
        </>
      )}
    />
      
    </>
  );
}

export default observer (App);
