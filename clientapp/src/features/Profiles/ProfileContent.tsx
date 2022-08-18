import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { Profile } from '../../Models/profile';
import ProfileFollowing from './ProfileFollowings';
import ProfilePhotos from './ProfilePhotos';

interface Props{
    profile:Profile;

}
export default observer(function ProfileContent({profile}:Props){
    const  {profileStore}=useStore();

    const panes=[
        {menuItem:'About',render:()=><Tab.Pane>About</Tab.Pane>},
        {menuItem:'Photos',render:()=><ProfilePhotos profile={profile}/>},
        {menuItem:'Events',render:()=><Tab.Pane>Events</Tab.Pane>},
        {menuItem:'Followers',render:()=><ProfileFollowing/>},
        {menuItem:'Following',render:()=><ProfileFollowing/>},
    ];

    return(
        <Tab
            menu={{fluid:true,vertical:true}}
            menuPosition='right'
            panes={panes}
            onTabChange={(e,data)=>profileStore.setActiveTab(data.activeIndex)}
     />
    )

})