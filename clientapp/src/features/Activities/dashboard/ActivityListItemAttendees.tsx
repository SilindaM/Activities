import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom';
import { Image, List, Popup } from 'semantic-ui-react'
import { Profile } from '../../../Models/profile'
import ProfileCard from '../../Profiles/ProfileCard';
import ProfileCars from '../../Profiles/ProfileCard';


interface Props{
    attendees:Profile[];
}

export default observer( function  ActivityListitemAttendees({attendees}:Props){
    const styles={
        borderColor:'red',
        borderWidth:5
    }
    return(
        <List horizontal>
            {attendees.map(attendee=>(
                <Popup
                   hoverable
                   key={attendee.username}
                   trigger={
                    <List.Item key={attendee.username} as={Link}  to={`/profiles/${attendee.username}`}>
                        <Image size='mini' circular 
                        style={attendee.following ? styles :null}
                        src={attendee.image || '/assets/user.png'}/>
                    </List.Item>
                }
                >
                    <Popup.Content>
                        <ProfileCard profile={attendee}/>
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
})