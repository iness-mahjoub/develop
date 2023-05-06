import { Avatar, Rate, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";

function Customers() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8000/api/users")
            .then((response) => response.json())
            .then((data) => {
                setDataSource(data["hydra:member"]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setLoading(false);
            });
    }, []);

    const handleEdit = (id) => {
        // Handle edit button click
    };

    const handleDelete = (id) => {
        setLoading(true);
        fetch(`http://localhost:8000/api/users/${id}`, {
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
            <Typography.Title level={4}>Client </Typography.Title>

            <Link to="/Addclient">
                <button className="addclient">Ajouter un Client </button>
            </Link>
            <div className="search-container">
                <input type="text" placeholder="Search..." />
                <SearchIcon />
            </div>
            <Table
                loading={loading}
                columns={[
                    { width: 260 },
                    {
                        title: "ID_client",
                        dataIndex: "id",
                    },
                    {
                        title: " Nom",
                        dataIndex: "fname",
                    },
                    {
                        title: "Prénom",
                        dataIndex: "lname",
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                    },
                    {
                        title: "Phone",
                        dataIndex: "numTel",
                    },
                    {
                        title: "address",
                        dataIndex: "adresse",
                        render: (address) => {
                            return (
                                <span>
                  {address.address}, {address.city}
                </span>
                            );
                        },
                    },
                    {
                        title: "Action",
                        dataIndex: "",
                        width: 170,
                        render: (params) => {
                            return (
                                <>
                                    <Link to={`/Editclient/${params.id}`}>
                                        <button className="clientedit">Edit</button>
                                    </Link>

                                    <DeleteOutlineIcon
                                        className="clientdelete"
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

export default Customers;
