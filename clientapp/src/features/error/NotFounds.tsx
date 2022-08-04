import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Segment } from "semantic-ui-react";

export default function NotFounds(){
    return(
        <Segment placeholder>
            <Icon name='search'/>
            Oops-we've looked everywhere and could not find this
            <Segment.Inline>
                <Button as={Link} to='/actities' primary>
                    Return To Activities Page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}