import React from 'react';
import Layout from './../../components/Layout/index';
import { Container, Row, Col } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <Layout sidebar>
         
                </Layout>
                {/* <Container fluid>
                   <Row>
                   <Col md={2} id="sidebar">
                       <ul>
                           <li><NavLink to={'/'}>Home</NavLink></li>
                           <li><NavLink to={'/products'}>Products</NavLink></li>
                           <li><NavLink to={'/orders'}>Orders</NavLink></li>
                       </ul>
                   </Col>
                      <Col md={10}  style={{marginLeft:'auto'}} >Container</Col>
                   </Row>
                </Container> */}
        </div>
    );
};

export default Home;
