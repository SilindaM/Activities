import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

interface Props{
    openForm: () => void;
}

export default function NavBar({openForm}:Props){
    const {activityStore} = useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item name= 'Activities'/>
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}