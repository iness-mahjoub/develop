import { Table } from "@nextui-org/react";
import "./index.css";
import { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

export default function App() {
    const [data, setData] = useState([
        {
            id: 1,
            name: "Tony Reichert",
            role: "CEO",
            status: "Active",
        },
        {
            id: 2,
            name: "Zoey Lang",
            role: "Technical Lead",
            status: "Paused",
        },
        {
            id: 3,
            name: "Jane Fisher",
            role: "Senior Developer",
            status: "Active",
        },
        {
            id: 4,
            name: "William Howard",
            role: "Community Manager",
            status: "Vacation",
        },
        {
            id: 5,
            name: "Jane Fisher",
            role: "Senior Developer",
            status: "Active",
        },
        {
            id: 6,
            name: "Zoey Lang",
            role: "Technical Lead",
            status: "Paused",
        },
        {
            id: 7,
            name: "Jane Fisher",
            role: "Senior Developer",
            status: "Active",
        },
        {
            id: 8,
            name: "William Howard",
            role: "Community Manager",
            status: "Vacation",
        },
    ]);

    const [search, setSearch] = useState("");

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const handleEdit = (id) => {
        console.log(`Edit ${id}`);
    };

    const filteredData = data.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div id="app">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
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
                    selectionMode="multiple"
                >
                    <Table.Header>
                        <Table.Column>NAME</Table.Column>
                        <Table.Column>ROLE</Table.Column>
                        <Table.Column>STATUS</Table.Column>
                        <Table.Column>ACTIONS</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {filteredData.map(({ id, name, role, status }) => (
                            <Table.Row key={id}>
                                <Table.Cell>{name}</Table.Cell>
                                <Table.Cell>{role}</Table.Cell>
                                <Table.Cell>{status}</Table.Cell>
                                <Table.Cell>
                                    <div className="action-buttons">
                                        <button onClick={() => handleEdit(id)}>
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                    <Table.Pagination
                        shadow
                        noMargin
                        align="center"
                        rowsPerPage={8}
                        onPageChange={(page) => console.log({ page })}
                    />
                </Table>
            </div>
        </div>
    );
}
