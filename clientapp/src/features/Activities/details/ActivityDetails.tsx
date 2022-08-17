import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Grid, Icon, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";



export default observer (function ActivityDetails(){

  const {activityStore}=useStore();
  const {selectedActivity:activity,loadActivity,loadingInitial,clearSelectedActivity}=activityStore;
  const {id}=useParams<{id:string}>();

  useEffect(()=>{
    if(id) loadActivity(id);
    return ()=>clearSelectedActivity();
  },[id,loadActivity]);

  if(loadingInitial || !activity) return <LoadingComponent />;

    return(
        <Grid>
          <Grid.Column width={10}>
              <ActivityDetailedHeader activity={activity}/>
              <ActivityDetailedInfo activity={activity}/>
              <ActivityDetailedChat activityId={activity.id}/>
          </Grid.Column>
          <Grid.Column width={6}>
             <ActivityDetailedSideBar activity={activity}/>
          </Grid.Column>
        </Grid>
    )
})