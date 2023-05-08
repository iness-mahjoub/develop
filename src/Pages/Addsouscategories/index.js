import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        imageFile: null,
        categorie_id: '',

    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/categories')
            .then((response) => {
                setCategories(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleInputChange = (event) => {
        setProductData({
            ...productData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        setProductData({
            ...productData,
            imageFile: event.target.files[0],
        });
    };

    const handleSelectChange = (event) => {
        setProductData({
            ...productData,
            categorie_id: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('imageFile', productData.imageFile);
        formData.append('categorie_id', productData.categorie_id);


        axios.post('http://localhost:8000/api/sous_categories', formData)
            .then((response) => {
                console.log(response.data);
                // handle success
            })
            .catch((error) => {
                console.log(error.response.data);
                // handle error
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={productData.name} onChange={handleInputChange} />

            <label htmlFor="imageFile">Image:</label>
            <input type="file" id="imageFile" name="imageFile" onChange={handleFileChange} />

            <label htmlFor="categorie_id">Category:</label>
            <select id="categorie_id" name="categorie_id" value={productData.categorie_id} onChange={handleSelectChange}>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>


            <button type="submit">Submit</button>
        </form>
    );
};

export default AddProduct;
