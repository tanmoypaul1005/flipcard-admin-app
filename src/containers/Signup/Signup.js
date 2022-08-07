import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Form,Button,Container,Row,Col } from 'react-bootstrap';
import Input from '../../components/UI/Input/Input';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/userActions';
const Signup = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const auth=useSelector(state => state.auth);
    const user=useSelector(state => state.user);
    const dispatch=useDispatch();


    const userSignup=(e)=>{
        e.preventDefault();
        const user={firstName,lastName,email,password}
           dispatch(signup(user));
    }

    if(auth.authenticate){
        return <Navigate to={'/'}></Navigate>
    }
    if(user.loading){
        return <p>Loading...!</p>
    }
    return (
        <div>
            <Layout></Layout>
            <Container>
                {user.message}
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        level="First Name"
                                        placeholder="First Name"
                                        value={firstName}
                                        type="text"
                                        onChange={(e) => setFirstName(e.target.value)} />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        level="Last Name"
                                        placeholder="Last Name"
                                        value={lastName}
                                        type="text"
                                        onChange={(e) => setLastName(e.target.value)} />
                                </Col>
                            </Row>
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
                                onChange={(e) =>setPassword(e.target.value)} />
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

export default Signup;