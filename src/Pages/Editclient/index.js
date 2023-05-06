import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateCustomer } from "../../API";
import { Typography } from "antd";

import "./index.css";

function EditClient() {
  const { id } = useParams();
  const [client, setClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    rating: 0,
    inventory: [],
  });

  useEffect(() => {
    // get customer by id and set the state
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:3000/customers/${id}`);
        const data = await response.json();
        setClient(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateCustomer(id, client);
      alert("Customer updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setClient({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      rating: 0,
      inventory: [],
    });
  };

  return (
    <div  className="title-container">
      <Typography.Title level={4} style={{ color: 'rgb(220, 17, 17)' }}> Modifier client  { id }  </Typography.Title>

      <div > 
        <label htmlFor="firstName">Nom:</label>
        <input
          type="text"
          name="firstName"
          value={client.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Prénom:</label>
        <input
          type="text"
          name="lastName"
          value={client.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={client.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phone"
          value={client.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          name="address"
          value={client.address}
          onChange={handleChange}
        />
      </div>
      <div >
  <button  className="azhar" onClick={handleUpdate}>Modifier</button>
  <button   onClick={handleClear}>Effacer</button>
</div>

    </div>
  );
}

export default EditClient;
