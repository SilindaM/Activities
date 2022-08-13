import React from "react";
import { Message } from "semantic-ui-react";

interface Props{
    errors:any;
}
export default function ValidationErros({errors}:Props){
    return(
        <Message error>
            {errors &&(
                <Message.List>
                    {errors.map((err:any,i:any)=>(
                        <Message.Item key={i}></Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}