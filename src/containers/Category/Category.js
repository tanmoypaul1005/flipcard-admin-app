import React, { useEffect, useState } from 'react';
import Layout from './../../components/Layout/index';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory, updateCategories, deleteCategoriesAction } from '../../actions/categoryActions';
import Modal from '../../components/UI/Modal/Modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoCheckbox, IoCheckmarkCircleOutline, IoArrowForward, IoArrowDown,IoAddCircleSharp,IoTrashSharp,IoCloudUpload } from "react-icons/io5";
import './Category.css';

const Category = () => {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState('');
    const [categoryPicture, setCategoryPicture] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);


    useEffect(() => {
    if (!category.loading) {
        setShow(false);
    }
    }, [category.loading]);

    const [show, setShow] = useState(false);
    const handleClose = () => {

        const form = new FormData();
        if (categoryName === "") {
            alert('Category name is required');
            setShow(false);
            return;
        }

        form.append(`name`, categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        form.append('categoryPicture', categoryPicture);
        dispatch(addCategory(form));
        dispatch(getAllCategory(form));
        setShow(false)
    }

    const handleShow = () => setShow(true);


    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
                //  <li key={category.name}>{category.name}
                //  {category.children.length >0?(<ul>{renderCategories(category.children)}</ul>):null}
                //  </li>
            )
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }


    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }
    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
        const categories = createCategoryList(category.categories);
        console.log(checked, expanded, categories);
    }


    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }



    const handleCategoryInput = (key, value, index, type) => {
        console.log(value);
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }





    const renderAddCategoryModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
            >
               <Row>
                    <Col>
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                        className="mb-4 "
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Col>

                    <Col>
                    <Form.Label>Parent Category</Form.Label>
                <select
                    style={{ marginBottom: '30px' }}
                    onChange={(e) => setParentCategoryId(e.target.value)}
                    value={parentCategoryId}
                    className='form-select'>
                    <option>Select Category</option>
                    {
                    createCategoryList(category.categories).map(option =>
                    <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    }
                </select>
                    </Col>
                </Row>

                <Row>
                    <Col>
                    <Form.Label>Category Picture  </Form.Label>
                    <Form.Control
                    className="mb-4"
                    value={categoryPicture}
                    placeholder={`Category Picture`}
                    onChange={(e) => setCategoryPicture(e.target.value)}
                />
                    </Col>
                </Row>
               
                <Row>
                    <Col> <input type="file" name="categoryImage" onChange={handleCategoryImage} /></Col>
                </Row>
            </Modal>
        );
    }







    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
            form.append('categoryPicture', item.categoryPicture);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
            form.append('categoryPicture', item.categoryPicture);
            console.log('itemType',item.type)
        });
        dispatch(updateCategories(form))
        setUpdateCategoryModal(false);
        dispatch(getAllCategory(form));
    }




    const renderUpdateCategoryModal = () => {
        return (
            /* Edit categories */
            <Modal
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                modalTitle={'Update Categories'}
                size="lg"
            >
                <Row>
                    <Col>Expanded</Col>
                </Row>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Form.Control
                                    value={item.name}
                                    placeholder={`Category Name`}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, ' expanded')}
                                />
                            </Col>
                            <Col>
                                <select
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, ' expanded')}
                                    value={item.parentId}
                                    className='form-select'>
                                    <option>Select Category</option>
                                    {
                                        createCategoryList(category.categories).map(option =>
                                            <option key={option.value} value={option.value}>{option.name}</option>
                                        )
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select className='form-select'
                                 value={item.type}
                                 onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                                >
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }

                <h6>checked categories</h6>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Form.Control
                                    value={item.name}
                                    placeholder={`Category Name`}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                    value={item.parentId}
                                    className='form-select'>
                                    <option>Select Category</option>
                                    {
                                    createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                        )
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select className='form-select'
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                >
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }
                {/* <input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}
            </Modal>
        );
    }







    const DeleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const DeleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        // dispatch(deleteCategoriesAction(idsArray))

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
            dispatch(getAllCategory(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory())
                        setDeleteCategoryModal(false)
                    }
                });
        }
        setDeleteCategoryModal(false);
    }



    const renderDeleteCategoryModal = () => {
        console.log('Delete', checkedArray);
        return (
            <Modal
                modalTitle="Delete Category"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                        alert('no');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: DeleteCategories
                    }
                ]}
             >
                <h5>Expanded</h5>
                {expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
                <h5>Checked</h5>
                {checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}
            </Modal>
        );
    }




    return (
        <div>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Category</h3>

                                <div className="actionBtnContainer">
                                <span>Actions : </span>
                                <button onClick={handleShow}><IoAddCircleSharp/><span>Add</span></button>
                                <button onClick={DeleteCategory}><IoTrashSharp/><span>Delete</span></button>
                                <button onClick={() => updateCategory()}><IoCloudUpload /><span>Edit</span></button>
                                </div>
                                
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            {/* <ul>{renderCategories(category.categories)}</ul> */}
                            <CheckboxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}

                                icons={{
                                    check: <IoCheckbox />,
                                    uncheck: < IoCheckmarkCircleOutline />,
                                    halfCheck: < IoCheckmarkCircleOutline />,
                                    expandClose: <IoArrowForward />,
                                    expandOpen: <IoArrowDown />,
                                }}
                            />

                        </Col>
                    </Row>
                    {/* <Row>
                        <Col>
                            <Button onClick={DeleteCategory}>Delete</Button>
                            <Button onClick={() => updateCategory()}>Edit</Button>
                        </Col>
                    </Row> */}
                </Container>
                {/* Add category */}
                {renderAddCategoryModal()}
                {/* Edit categories  */}
                {renderUpdateCategoryModal()}

                {/* Delete categories  */}
                {renderDeleteCategoryModal()}
            </Layout>

        </div>

    );

};

export default Category;