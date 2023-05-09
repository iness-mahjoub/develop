import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [categoryData, setCategoryData] = useState({
        name: '',
        imageFile: null,
    });

    const handleInputChange = (event) => {
        setCategoryData({
            ...categoryData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        setCategoryData({
            ...categoryData,
            imageFile: event.target.files[0],
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', categoryData.name);
        formData.append('imageFile', categoryData.imageFile);

        axios.post('http://localhost:8000/api/categories', formData)
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
            <input type="text" id="name" name="name" value={categoryData.name} onChange={handleInputChange} />
            <label htmlFor="imageFile">Image:</label>
            <input type="file" id="imageFile" name="imageFile" onChange={handleFileChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddCategory;
