import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import "./index.css";
import { Typography } from "antd";

const AddOffre = () => {
const [form] = Form.useForm();
const [loading, setLoading] = useState(false);

const onFinish = (values) => {
setLoading(true);
console.log(values);
// Ajouter l'offre en utilisant l'API ou tout autre moyen
setLoading(false);
form.resetFields();
};

return (
    <><Typography.Title level={4} style={{ color: 'rgb(220, 17, 17)' }}> Ajouter une offre </Typography.Title><div className="add-offre-container">
        <Form form={form} onFinish={onFinish} labelCol={{span:8}} labelAlign='left'>
            <Form.Item
                name="price"
                label="Prix"
                rules={[{ required: true, message: "Veuillez entrer le prix" }]}
            >
                <Input type="number" />
            </Form.Item>
            <Form.Item
                name="discountPercentage"
                label="Pourcentage de réduction"
                rules={[
                    { required: true, message: "Veuillez entrer le pourcentage de réduction" },
                    { type: "number", min: 0, max: 100, message: "Le pourcentage doit être entre 0 et 100" }
                ]}
            >
                <Input type="number" suffix="%" />
            </Form.Item>
            <Form.Item
                name="dateDebut"
                label="Date de début"
                rules={[{ required: true, message: "Veuillez entrer la date de début" }]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                name="dateFin"
                label="Date de fin"
                rules={[{ required: true, message: "Veuillez entrer la date de fin" }]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>Ajouter l'offre</Button>
            </Form.Item>
        </Form>
    </div></>
);
};

export default AddOffre;