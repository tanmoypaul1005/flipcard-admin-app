import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { addProduct } from '../../actions/productsActions';
import Modal from '../../components/UI/Modal/Modal';
import './Products.css';

const Products = () => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productPicture, setProductPicture] = useState("");
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();
console.log('productDetails',productDetails)
    const handleClose = () => {
        const form = new FormData();
        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryId);
        form.append("productPicture",productPicture)   
        // for (let pic of productPictures) {
        //     form.append("productPicture", pic);
        // }

        // dispatch(addProduct(form)).then(() => setShow(false));
        dispatch(addProduct(form));
        setShow(false);
    };

    const handleShow = () => setShow(true);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

  

    const renderProducts = () => {
        return (
            <div>
            { product.products.length > 0 ?(
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Desperation</th>
                    </tr>
                </thead>
                <tbody>

                    { product.products.map((product) => (
                            <tr onClick={()=>showProductDetailsModal(product)} key={product._id}>
                                <td>2</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.description}</td>
                                {/* <td>{product.category.name}</td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </Table> ): null}
            </div>
        )
    }






    const renderAddProductModal = () => {
        return (
            <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={'Add New Product'}
        >
            <Form.Label>Product Name</Form.Label>
            <Form.Control
                value={name}
                placeholder={`Product Name`}
                onChange={(e) => setName(e.target.value)}
            />

            <Form.Label>Product Quantity</Form.Label>
            <Form.Control
                value={quantity}
                placeholder={`Product Quantity`}
                onChange={(e) => setQuantity(e.target.value)}
            />

            <Form.Label>Product Price</Form.Label>
            <Form.Control
                value={price}
                placeholder={`Price`}
                onChange={(e) => setPrice(e.target.value)}
            />

            <Form.Label>Product Description</Form.Label>
            <Form.Control
                value={description}
                placeholder={`Description`}
                onChange={(e) => setDescription(e.target.value)}
            />

             
            <select
                className='form-select'
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                <option>select category</option>
                {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>

            {/* {productPictures.length > 0
                ? productPictures.map((pic, index) => (
                    <div key={index}>{pic.name}</div>
                ))
                : null} */}

            <Form.Label>Product Picture</Form.Label>
                <Form.Control
                 placeholder={`Product Picture`}
                value={productPicture}
                onChange={(e)=>setProductPicture(e.target.value)}
            />
        </Modal>
        )
    }

   




    const handleCloseProductDetailsModal = () => {
        setProductDetailModal(false);
      };

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailModal(true);
        console.log(product);
      };

    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null;
          }
        return (
        <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
       <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
         <label className="key">Product Pictures</label>
         <img className="productImgContainer" src={productDetails.productPicture}></img>
          </Col>
        </Row>

      </Modal>
        )
    }









    return (
        <div>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Products</h3>
                                <Button onClick={handleShow}>Add</Button>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {renderProducts()}
                        </Col>
                    </Row>
                </Container>
                {renderAddProductModal()}
                {renderProductDetailsModal()}
            </Layout>

        </div>
       
    );
};

export default Products;