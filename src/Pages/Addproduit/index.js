import { Form, Input, Button, Upload } from 'antd';
import React, { useState } from "react";
import { addProduct } from "../../API";
import "./index.css";
import { Typography } from "antd";

function AddProduit() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  
  const handleFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("stock", values.stock);
    formData.append("category", values.category);
    formData.append("brand", values.brand);
    formData.append("thumbnail", values.thumbnail[0]);

    try {
      await addProduct(formData);
      form.resetFields();
      alert("Product added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      form.setFieldsValue({ thumbnail: [info.file.response.url] });
    }
  };

  return (
    <><Typography.Title level={4} style={{ color: 'rgb(220, 17, 17)' }}>Ajouter un nouveau produit</Typography.Title><div className="container">
      <Form form={form} onFinish={handleFinish} labelCol={{ span: 5 }} labelAlign='left'>
        <Form.Item label="Nom" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Prix" name="price" rules={[{ required: true }]}>
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item label="Catégories" name="category" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Sous_Categorie" name="brand" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Image" name="thumbnail" rules={[{ required: true }]}>
          <Upload
            action="/api/upload"
            listType="picture"
            onChange={handleUploadChange}
          >
            <Button type='default' style={{ backgroundColor: 'white', color: 'black' }}>importer Image</Button>
          </Upload>
        </Form.Item>
        <div className="button-container">
          <Button type="primary" loading={loading} htmlType="submit">Ajouter </Button>
          <Button  onClick={() => form.resetFields()}>Effacer</Button>
        </div>
      </Form>
    </div></>
  );
}

export default AddProduit;
