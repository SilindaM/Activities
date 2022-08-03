import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Activity } from "../../Models/activity";


interface Props{
    activity:Activity
}


export default function ActivityListItem({activity}:Props){

    const {activityStore}=useStore();
    const {deleteActivity,loading}=activityStore;

    const [target,setTarget]=useState('');

    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return(
       <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                        </Item.Content>
                        <Item.Description>
                            Hosted By Mdu
                        </Item.Description>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock"/>{activity.date}
                    <Icon name="marker"/>{activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Atte
            </Segment>
            <Segment clearing>
                <span>
                    {activity.description}
                    <Button 
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated="right"
                    content="View"
                            />
                </span>
            </Segment>
       </Segment.Group>
    )
}