import React, { useState } from 'react';
import { Form,Button,Container,Row,Col } from 'react-bootstrap';
import { login } from '../../actions/authActions';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input/Input';
import { useDispatch ,useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';
import { axios } from 'axios';
const SignIn = (props) => {

const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [error,setError] = useState('');
const auth=useSelector(state => state.auth);
const dispatch=useDispatch();

    const userLogin=(e)=>{
       
        e.preventDefault();
        const user={
            email,password
        }
        dispatch(login(user));
    }
    if(auth.authenticate){
        return <Navigate to={'/'}></Navigate>
    }
    return (
        <div>
            <Layout></Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input
                                level="Email"
                                placeholder="Email"
                                value={email}
                                type="text"
                                onChange={(e) =>setEmail(e.target.value)} />

                            <Input
                                level="Password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            
        </div>
    );
};

export default SignIn;