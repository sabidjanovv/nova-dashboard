import React, { useState } from "react";
import { Button, Table, Tag, Space, Typography } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
;
import AdminModal from "./AdminModal";
import { useGetAllAdminsQuery } from "../../redux/api/admins";

const { Title } = Typography;

const AdminPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  // API hooks
  const { data, isLoading, refetch } = useGetAllAdminsQuery({});

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditData(record);
    setOpen(true);
  };


  const columns = [
    {
      title: "Ism",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Familiya",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active: boolean) =>
        is_active ? (
          <Tag color="green">Faol</Tag>
        ) : (
          <Tag color="red">Faol emas</Tag>
        ),
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Tahrirlash
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Title level={3}>Adminlar ro‘yxati</Title>
        <Button
          type="primary"
          className="bg-black"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Admin qo‘shish
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data || []}
        loading={isLoading}
      />

      <AdminModal
        open={open}
        setOpen={setOpen}
        editData={editData}
        refetch={refetch}
      />
    </div>
  );
};

export default React.memo(AdminPage);
