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
            .delete(`http://localhost:8000/api/users/${id}`)
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
            const detail = details.find((d) => d.users === `/api/users/${item.id}`);
            return { ...item, ...detail };
        })
        .filter(({ email }) => email.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users")
            .then((response) => setData(response.data["hydra:member"]))
            .catch((error) => console.error(error));

        axios
            .get("http://localhost:8000/api/adresses")
            .then((response) => setDetails(response.data["hydra:member"]))
            .catch((error) => console.error(error));
    }, []);
    console.log(data);
    console.log(filteredData);

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
                        <Link to="/Addclient">
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
                            <Table.Column >name</Table.Column>
                            <Table.Column>lname</Table.Column>
                            <Table.Column>email</Table.Column>
                            <Table.Column  >number</Table.Column>
                            <Table.Column >adresse</Table.Column>
                            <Table.Column  >adresse secondaire</Table.Column>
                            <Table.Column  >pays</Table.Column>
                            <Table.Column  >ville</Table.Column>
                            <Table.Column  >code postale</Table.Column>
                            <Table.Column  >actions</Table.Column>





                        </Table.Header>
                        <Table.Body>
                            {filteredData.map((item) => (
                                <Table.Row key={item.id}>

                                    <Table.Cell>{item.fname}</Table.Cell>
                                    <Table.Cell>{item.lname}</Table.Cell>
                                    <Table.Cell>{item.email}</Table.Cell>
                                    <Table.Cell>{item.numTel}</Table.Cell>
                                    <Table.Cell>{item.adresse1}</Table.Cell>
                                    <Table.Cell>{item.adresse2}</Table.Cell>
                                    <Table.Cell>{item.pay}</Table.Cell>
                                    <Table.Cell>{item.ville}</Table.Cell>
                                    <Table.Cell>{item.codeP}</Table.Cell>




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
                            rowsPerPage={9}
                            onPageChange={(page) => console.log({ page })}
                        />
                    </Table>
                </div>
            </div>
        </div>
    );
}

