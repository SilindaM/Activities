import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

interface Props{
    openForm: () => void;
}

export default function NavBar(){
    const {activityStore} = useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item exact as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="Logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name= 'Activities'/>
                <Menu.Item as={NavLink} to='/createActivity'>
                    <Button onClick={() => activityStore.openForm()} positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}