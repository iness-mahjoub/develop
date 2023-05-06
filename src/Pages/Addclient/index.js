import { Form, Input, Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const { Option } = Select;

function AddProduct() {
    const [productData, setProductData] = useState({
        name: '',
        prix:'',
        image: '',
        category: '',
        sousCatgory:''
    });

    const [categories, setCategories] = useState([]);
    const [Souscategories, setSousCategories] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleCategoryChange = (value) => {
        setProductData({ ...productData, category: value });
    };
    const handleSousCategoryChange = (value) => {
        setProductData({ ...productData, sousCatgory: value });
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setProductData({ ...productData, image: files });
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                name: productData.name,
                prix:'',
                image: productData.image,
                categorie: productData.category,
                Souscategories:productData.sousCatgory
            };
            const response = await axios.post('http://localhost:8000/api/produits', payload);
            console.log(response.data);
            setProductData({
                name: '',
                image: '',
                category: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/categories');
                setCategories(response.data['hydra:member']);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Add New Product</h2>
            <Form onFinish={handleSubmit}>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the product name!' }]}>
                    <Input name="name" value={productData.name} onChange={handleInputChange} />
                </Form.Item>

                <Form.Item label="Image" name="image">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </Form.Item>
                <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
                    <Select value={productData.category} onChange={handleCategoryChange}>
                        <Option value="">Select a category</Option>
                        {categories.map((category) => (
                            <Option key={category.id} value={category['@id']}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddProduct;
