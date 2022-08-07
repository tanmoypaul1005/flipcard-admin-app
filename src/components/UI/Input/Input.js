import React from 'react';
import {Form} from 'react-bootstrap';
const Input = (props) => {
    return (
      
           <Form.Group className="mb-5" >
           <Form.Label>{props.level}</Form.Label>
                <Form.Control 
                className="m-2"
                type={props.type} 
                placeholder={props.placeholder} 
                value={props.value}
                onChange={props.onChange}
                {...props}
                />
                <Form.Text className="text-muted m-2">
                {props.errorMessage}
                </Form.Text>
            </Form.Group>
       
    );
};

export default Input;