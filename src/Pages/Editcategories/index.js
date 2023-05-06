import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";

function EditCategory() {
    const [categoryData, setCategoryData] = useState({
        name: "",
        image: "",
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { id } = useParams();



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategoryData({ ...categoryData, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setCategoryData({ ...categoryData, image: event.target.result });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("name", categoryData.name);
        formData.append("image", categoryData.image);

        fetch(`http://localhost:8000/api/categories/${id}`, {
            method: "PUT",
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    setSuccessMessage("Category updated successfully!");
                } else {
                    setErrorMessage("Error updating category");
                }
            })
            .catch((error) => {
                setErrorMessage("Error updating category");
                console.error(error);
            });
    };


    return (
        <div>
            <h2>Edit Category</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Form onFinish={handleSubmit}>
                    <Form.Item label="Name" name="name">
                        <Input
                            value={categoryData.name}
                            name="name"
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Item>
                    <Form.Item label="Image">
                        {categoryData.image && (
                            <img
                                src={categoryData.image}
                                alt={categoryData.name}
                                style={{ maxWidth: "300px", marginBottom: "10px" }}
                            />
                        )}
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            )}
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default EditCategory;
