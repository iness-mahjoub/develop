import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        let imageData;
        if (image) {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = async () => {
                imageData = reader.result;
                const formData = new FormData();
                formData.append('name', name);
                formData.append('image', imageData);

                try {
                    const response = await axios.post('http://localhost:8000/api/categories', formData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const savedCategory = response.data;
                    console.log(savedCategory);
                    alert('Category added successfully');
                } catch (error) {
                    console.error(error);
                    alert('Failed to add category');
                }
            };
        }
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <br />
            <label>
                Image:
                <input type="file" accept="image/*" onChange={handleFileInputChange} />
            </label>
            <br />
            {imageUrl && <img src={imageUrl} alt="category" style={{ maxWidth: '100px' }} />}
            <br />
            <button type="submit">Add Category</button>
        </form>
    );
};

export default AddCategory;
