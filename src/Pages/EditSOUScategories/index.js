import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { getSouscategorieById, updateSouscategorie } from '../../API';
import { Space, Typography } from "antd";

function EditSouscategorie() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSouscategorieById(id).then((souscategorie) => {
      form.setFieldsValue({
       // nom: souscategorie.nom,
        //categorie: souscategorie.categorie,
      });
      setLoading(false);
    });
  }, [form, id]);

  const handleSubmit = (values) => {
    setLoading(true);
    updateSouscategorie(id, values).then(() => {
      message.success('Sous-catégorie modifiée avec succès');
      setLoading(false);
    });
  };

  const handleClear = () => {
    form.resetFields();
  }

  return (
    
    <div >
      <Typography.Title level={4} style={{ color: 'rgb(220, 17, 17)', marginBottom: '50px' }}> Modifier la sous-catégorie {id}   </Typography.Title>

      <Form form={form} labelCol={{ span: 8 }} labelAlign='left'>
        <Form.Item
          label="Nom sous-catégorie"
          name="nom"
          rules={[{ required: true, message: 'Veuillez saisir le nom de la sous-catégorie' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Catégorie"
          name="categorie"
          rules={[{ required: true, message: 'Veuillez saisir la catégorie de la sous-catégorie' }]}
        >
          <Input />
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            Enregistrer
          </Button>
          <Button onClick={handleClear}>
            Effacer
          </Button>
        </Space>
      </Form>
    </div>
  );
}

export default EditSouscategorie;
