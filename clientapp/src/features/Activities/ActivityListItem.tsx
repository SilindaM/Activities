import React, {  } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../Models/activity";
import {format} from 'date-fns'
import ActivityListitemAttendees from "./dashboard/ActivityListItemAttendees";
import ActivityListItemAttendees from "./dashboard/ActivityListItemAttendees";


interface Props{
    activity:Activity
}


export default function ActivityListItem({activity}:Props){

   
    return(
       <Segment.Group>
            <Segment>
                {activity.isCancelled &&
                    <Label attached="top" color="red"
                    content="cancelled" style={{textAlign:'center'}}/>
                }
                <Item.Group>
                    <Item>
                        <Item.Image style={{marginBotton:3}}size='tiny' circular src={activity.host?.image ||'/assets/user.png'}/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                        </Item.Content>
                        <Item.Description>
                            Hosted By <Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link> 
                        </Item.Description>
                        {activity.isHost && (
                            <Item.Description>
                                <Label basic color="orange"> You are hosting this activity</Label>
                            </Item.Description>
                        )}
                        {activity.isGoing && !activity.isHost && (
                            <Item.Description>
                                <Label basic color="green"> You are going to this activity</Label>
                            </Item.Description>
                        )}
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock"/>{format (activity.date!,'dd MMMM yyyy h:mm aa')}
                    <Icon name="marker"/>{activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendees attendees={activity.attendees!}/>
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