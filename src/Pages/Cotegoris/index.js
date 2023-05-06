import React, { useState, useEffect } from "react";
import { Table, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";

function Categories() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:8000/api/categories")
            .then((response) => {
                setCategories(response.data["hydra:member"]);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/categories/${id}`)
    .then(() => {
            setCategories(categories.filter((item) => item.id !== id));
        })
            .catch((error) => console.log(error));
    };

    const columns = [
        {
            title: "ID_categories",
            dataIndex: "id",
        },
        {
            title: "image_categories",
            dataIndex: "image",
            render: (image) => {
                return image ? (
                    <div style={{ display: "flex", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                        <img src={`http://localhost:8000/${image}`} alt="" style={{ maxWidth: "100%" }} />
                    </div>
                ) : (
                    "No image"
                );
            },
        },


        {
            title: "Nom_categories",
            dataIndex: "name",
        },
        {
            title: "Action",
            dataIndex: "",
            width: "80%",
            render: (params) => {
                return (
                    <>
                        <Link to={`/Editcategories/${params.id}`}>
                            <button className="edit_categories">Edit</button>
                        </Link>
                        <DeleteOutlineIcon
                            className="delete_categories"
                            onClick={() => handleDelete(params.id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Catégories</Typography.Title>
            <Link to="/Addcategoris">
                <button className="add_category">Ajouter une catégorie</button>
            </Link>
            <div className="search-container">
                <input type="text" placeholder="Rechercher..." />
                <SearchIcon />
            </div>
            <Table
                loading={loading}
                columns={columns}
                dataSource={categories}
                pagination={{
                    pageSize: 4,
                }}
            />
        </Space>
    );
}

export default Categories;