import { observer } from "mobx-react-lite";
import React, {  useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader,  } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { PagingParams } from "../../../Models/pagination";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";



export default observer (function ActivityDashboard(){

    const {activityStore}=useStore();
    const {loadActivities,activityRegistry,setPagingParams,pagination}=activityStore;
    const [loadingNext,setLoadingNext]=useState(false);

    function HandleGetNext(){
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage+1))
        loadActivities().then(()=>setLoadingNext(false));
    }
  useEffect(()=>{
   if(activityRegistry.size<=1) activityStore.loadActivities();
  },[activityRegistry.size,loadActivities])





    return(
        <Grid>
        <Grid.Column width='10'>
            {activityStore.loadingInitial && !loadingNext?(
                <>
                    <ActivityListItemPlaceholder/>
                    <ActivityListItemPlaceholder/>
                </>
            ):(
                <InfiniteScroll

                pageStart={0}
                loadMore={HandleGetNext}
                hasMore={!loadingNext && !!pagination && pagination.currentPage<pagination?.totalPages}
                initialLoad={false}
            >
                
            <ActivityList   />
            </InfiniteScroll>
            )}
           
        </Grid.Column>
        <Grid.Column width='6'>
                    <ActivityFilters/>
        </Grid.Column>
        <Grid.Column width={10}>
            <Loader active={loadingNext}/>
        </Grid.Column>
        
        </Grid>
    )
})