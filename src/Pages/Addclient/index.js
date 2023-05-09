import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        email: '',
        password: '',
        fname: null,
        lname: '',
        numTel: '',
        adresse1: '',
        adresse2: '',
        ville: '',
        codeP: '',
        pay: '',

    });



    const handleInputChange = (event) => {
        setProductData({
            ...productData,
            [event.target.name]: event.target.value,
        });
    };





    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', productData.email);
        formData.append('password', productData.password);
        formData.append('fname', productData.fname);
        formData.append('lname', productData.lname);
        formData.append('numTel', productData.numTel);
        formData.append('adresse1', productData.adresse1);
        formData.append('adresse2', productData.adresse2);
        formData.append('ville', productData.ville);
        formData.append('codeP', productData.codeP);
        formData.append('pay', productData.pay);

        axios.post('http://localhost:8000/api/users', formData)
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
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={productData.email} onChange={handleInputChange} />
            <label htmlFor="password">Mot de passe:</label>
            <input type="password" id="password" name="password" value={productData.password} onChange={handleInputChange} />
            <label htmlFor="fname">Nom:</label>
            <input type="text" id="fname" name="fname" value={productData.fname} onChange={handleInputChange} />
            <label htmlFor="lname">Prenom:</label>
            <input type="text" id="lname" name="lname" value={productData.lname} onChange={handleInputChange} />
            <label htmlFor="numTel">Numero:</label>
            <input type="text" id="numTel" name="numTel" value={productData.numTel} onChange={handleInputChange} />
            <label htmlFor="adresse1">Adresse:</label>
            <input type="text" id="adresse1" name="adresse1" value={productData.adresse1} onChange={handleInputChange} />
            <label htmlFor="adresse2">Adresse2:</label>
            <input type="text" id="adresse2" name="adresse2" value={productData.adresse2} onChange={handleInputChange} />
            <label htmlFor="ville">Ville:</label>
            <input type="text" id="ville" name="ville" value={productData.ville} onChange={handleInputChange} />
            <label htmlFor="codeP">Code postal:</label>
            <input type="int" id="codeP" name="codeP" value={productData.codeP} onChange={handleInputChange} />
            <label htmlFor="pay">Pay:</label>
            <input type="text" id="pay" name="pay" value={productData.pay} onChange={handleInputChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddProduct;
