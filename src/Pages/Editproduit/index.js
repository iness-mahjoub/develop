

import { Form, Input, Button, Upload } from 'antd';
import { useParams } from "react-router-dom";
import React from "react"; // <-- Add this line
import { updateProduct } from "../../API";
import { Space, Typography } from "antd";
import "./index.css";




function EditProduit() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false); // <-- Use React.useState instead of useState
  const [form] = Form.useForm();

  React.useEffect(() => {
    // Get product data and set form fields
  }, [id]);

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      updateProduct(id, values).then(() => {
        // Handle successful update
      }).finally(() => {
        setLoading(false);
      });
    });
  };
  const handleClear = () => {
    form.resetFields();
  };
  
  const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      form.setFieldsValue({ image: info.file.response.url });
    }
  };

  return (
    <><Typography.Title level={4} style={{ color: 'rgb(220, 17, 17)' }}>Modifier le Prouit    {id}   </Typography.Title><div className="container">
      <div>

        <Form form={form} labelCol={{ span: 5 }} labelAlign='left'>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {/* Add this block */}
          
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Sous_category" name="Sous_category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Image" name="image" rules={[{ required: true }]}>
            <Upload
              action="/api/upload"
              listType="picture"
              onChange={handleUploadChange}
            >
              <Button type='default' style={{ backgroundColor: 'white', color: 'black' }}> importer  Image</Button>
            </Upload>
          </Form.Item>

          {/* End of added block */}

          <div class="button-container">
            <Button type="primary" loading={loading} onClick={handleUpdate}>
              Modifier
            </Button>

            <Button onClick={handleClear}>Clear</Button>
          </div>
        </Form>
      </div>
    </div></>

  );
}

export default EditProduit;