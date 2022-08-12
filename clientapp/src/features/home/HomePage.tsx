import React  from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment,Image } from "semantic-ui-react";

export default function HomePage(){
    return(
            <Segment inverted textAlign="center" vertical className="masthead">
                <Container text>
                    <Header as='h1' inverted>
                        <Image size='massive' src='/assets/logo.png'  alt='logo' style={{marginBottom:12}}/>
                        React
                    </Header>
                    <Header as='h2' inverted content='Welcome To Activities'/>
                    <Button as={Link} to='/login' size='huge' inverted>
                        Login
                    </Button>
                </Container>
            </Segment>
    )
}