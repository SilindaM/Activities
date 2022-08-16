import React from 'react'
import { Grid } from 'semantic-ui-react'
import ProfileHeader from './ProfileHeader'

export default function(){

    return(
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader/>
            </Grid.Column>
        </Grid>
    )
}