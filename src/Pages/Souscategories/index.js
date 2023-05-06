import React, { useState, useEffect } from "react";
import "./index.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Rate, Space, Table, Typography } from "antd";
import { Link } from "react-router-dom";

function Souscategories() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8000/api/sous_categories")
            .then((response) => response.json())
            .then((data) => {
                setDataSource(
                    data["hydra:member"].map((sousCategorie) => {
                        return {
                            key: sousCategorie.id,
                            id: sousCategorie.id,
                            name: sousCategorie.name,
                            image: sousCategorie.image,
                            categoryName: sousCategorie.categorie ? sousCategorie.categorie.name : "",
                        };
                    })
                );
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        setLoading(true);
        fetch(`http://localhost:8000/api/sous_categories/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setDataSource(dataSource.filter((item) => item.id !== id));
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error deleting item: ", error);
                setLoading(false);
            });
    };

    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Sous_Catégorie</Typography.Title>

            <Link to="/Addsouscategories">
                <button className="addsouscategories">
                    Ajouter une sous catégorie
                </button>
            </Link>

            <div className="search-container">
                <input type="text" placeholder="Search..." />
                <SearchIcon />
            </div>

            <Table
                loading={loading}
                columns={[
                    {
                        title: "ID_sous_categories",
                        dataIndex: "id",
                    },
                    {
                        title: "Nom_sous_categories",
                        dataIndex: "name",
                    },
                    {
                        title: "Image",
                        dataIndex: "image",
                        render: (image) => (
                            <Avatar
                                src={image[0] ? `http://localhost:8000${image[0].url}` : ""}
                            />
                        ),
                    },
                    {
                        title: "Nom_categories",
                        dataIndex: "categoryName",
                    },
                    {
                        title: "Action",
                        dataIndex: "",
                        width: "80% ",
                        render: (params) => {
                            return (
                                <>
                                    <Link to={`/EditSOUScategories/${params.id}`}>
                                        <button className="edit_categoris">Edit</button>
                                    </Link>

                                    <DeleteOutlineIcon
                                        className="deletecategories"
                                        onClick={() => handleDelete(params.id)}
                                    />
                                </>
                            );
                        },
                    },
                ]}
                dataSource={dataSource}
                pagination={{
                    pageSize: 4,
                }}
            ></Table>
        </Space>
    );
}



export default Souscategories;
