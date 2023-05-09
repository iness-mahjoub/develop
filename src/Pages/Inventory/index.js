import { Table } from "@nextui-org/react";
import "./index.css";
import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

export default function App() {
    const [data, setData] = useState([]);
    const [details, setDetails] = useState([]);
    const [search, setSearch] = useState("");

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8000/api/produits/${id}`)
            .then(() => {
                setData(data.filter((item) => item.id !== id));
            })
            .catch((error) => console.log(error));
    };

    const handleEdit = (id) => {
        console.log(`Edit ${id}`);
    };

    const filteredData = data
        .map((item) => {
            const detail = details.find((d) => d.produit === `/api/produits/${item.id}`);
            return { ...item, ...detail };
        })
        .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/produits")
            .then((response) => setData(response.data["hydra:member"]))
            .catch((error) => console.error(error));

        axios
            .get("http://localhost:8000/api/details")
            .then((response) => setDetails(response.data["hydra:member"]))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div id="app">
            <div className="container">
                <div className="search-and-add">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="red">
                        <Link to="/Addproduit">
                            <button className="add_category">Ajouter un produit </button>
                        </Link>
                    </div>
                </div>
                <div className="table-container">
                    <Table
                        bordered
                        shadow={false}
                        color="secondary"
                        aria-label="Example pagination table"
                        css={{
                            height: "100%",
                            width: "100%",
                            minWidth: "800px", // Increase the minimum width
                            margin: "auto", // Center the table horizontally
                        }}
                    >
                        <Table.Header>
                            <Table.Column width={50}>id</Table.Column>
                            <Table.Column width={50}>Name</Table.Column>
                            <Table.Column width={50}>Prix</Table.Column>
                            <Table.Column width={50}>Image</Table.Column>
                            <Table.Column width={50}>Description</Table.Column>
                            <Table.Column width={50}>Stock</Table.Column>

                            <Table.Column width={70}>Actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {filteredData.map((item) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.prix}</Table.Cell>
                                    <Table.Cell>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <img
                                                src={`http://localhost:8000/${item.image}`}
                                                alt=""
                                                style={{ maxWidth: "100%" }}
                                            />
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>{item.description}</Table.Cell>

                                    <Table.Cell>{item.stock}</Table.Cell>

                                    <Table.Cell>
                                        <div className="actions">
                                            <FaEdit className="edit" onClick={() => handleEdit(item.id)} />
                                            <FaTrashAlt className="delete" onClick={() => handleDelete(item.id)} />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                        <Table.Pagination
                            shadow
                            noMargin

                            align="center"
                            rowsPerPage={7}
                            onPageChange={(page) => console.log({ page })}
                        />
                    </Table>
                </div>
            </div>
        </div>
    );
}

