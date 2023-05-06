import React from "react";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";



function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);


  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);

    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);

  return (
    
      <div className="AppD">
          <Space size={20} direction="vertical">
              <Typography.Title level={4}>Dashboard</Typography.Title>
              <Space direction="horizontal">
                  <DashboardCard
                      icon={
                          <ShoppingCartOutlined
                              style={{
                                  color: "green",
                                  backgroundColor: "rgba(0,255,0,0.25)",
                                  borderRadius: 20,
                                  fontSize: 24,
                                  padding: 8,
                              }}
                          />
                      }
                      title={"Orders"}
                      value={orders}
                  />
                  <DashboardCard
                      icon={
                          <ShoppingOutlined
                              style={{
                                  color: "blue",
                                  backgroundColor: "rgba(0,0,255,0.25)",
                                  borderRadius: 20,
                                  fontSize: 24,
                                  padding: 8,
                              }}
                          />
                      }
                      title={"Inventory"}
                      value={inventory}
                  />
                  <DashboardCard
                      icon={
                          <UserOutlined
                              style={{
                                  color: "purple",
                                  backgroundColor: "rgba(0,255,255,0.25)",
                                  borderRadius: 20,
                                  fontSize: 24,
                                  padding: 8,
                              }}
                          />
                      }
                      title={"Customer"}
                      value={customers}
                  />
              </Space>
          </Space>
      </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}




export default Dashboard;
