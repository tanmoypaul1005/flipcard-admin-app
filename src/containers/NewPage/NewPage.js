import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/UI/Modal/Modal';
import { Row, Col, Form, Container } from 'react-bootstrap';
import linearCategories from '../../Helpers/linearCategories';
import { useSelector, useDispatch } from 'react-redux';
import { createPage } from '../../actions/pageAction';


const NewPage = (props) => {
    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [bannerPicture, setBannersPicture] = useState([]);
    const [productPicture, setProductPicture] = useState([]);
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);


    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category])
    console.log('Categories', categories);

    useEffect(() => {
        console.log(page);
        if(!page.loading){
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }
    }, [page]);


    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }
    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value == e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);    
    }

    const submitPageForm = (e) => {
        //e.target.preventDefault();

        if (title === "") {
            alert('Title is required');
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        form.append('bannerPicture', bannerPicture);
        form.append('productPicture', productPicture);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });
        console.log({ title, desc, categoryId, type, banners, products, bannerPicture, productPicture });

        dispatch(createPage(form));
        // setCreateModal(false)

    }

    const submit=(e)=>{
    setCreateModal(false)
    submitPageForm()
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={'Create New Modal'}
                handleClose={submit}
                // onSubmit={submitPageForm}
            >

                <Container>
                    <Row>
                        <Col>
                            <select
                                className="form-select"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                            <option>Select Category</option>
                            {
                             categories.map(cat =>
                            <option key={cat.value} value={cat.value}>{cat.name}</option>
                            )
                            }
                            </select>


                            {/* <Form.Control
                                type="select"
                                value={categories.name}
                                onChange={onCategoryChange}
                                placeholder={'Select Category'}
                            /> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                            />
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Form.Control
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Page Desc'}
                                className=""
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Control
                                value={bannerPicture}
                                placeholder={'Banner Images'}
                                onChange={(e) => setBannersPicture(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Control
                                value={productPicture}
                                placeholder={'Banner Images'}
                                onChange={(e) => setProductPicture(e.target.value)}
                            />
                        </Col>
                    </Row>




                    {
                        banners.length > 0 ?
                            banners.map((banner, index) =>
                                <Row key={index}>
                                    <Col>{banner.name}</Col>
                                </Row>
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Form.Control
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>





                    {
                        products.length > 0 ?
                            products.map((product, index) =>
                                <Row key={index}>
                                    <Col>{product.name}</Col>
                                </Row>
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Form.Control
                                className="form-control"
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal>
        );
    }
    return (

        <Layout sidebar>
            {
            page.loading ?<p>Creating Page...please wait</p> :
            <>
            {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create Page</button>
            </>}
        </Layout>
    );
};

export default NewPage;