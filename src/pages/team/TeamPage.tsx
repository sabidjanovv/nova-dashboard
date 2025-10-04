import React, { useState } from "react";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TeamModal from "./TeamModal";
import TeamList from "./TeamList";

const { Title } = Typography;

const TeamPage = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const handleOpen = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (data: any) => {
    setEditData(data);
    setOpen(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Team Members
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpen}
          style={{ backgroundColor: "black", borderColor: "black" }}
        >
          Add Member
        </Button>
      </div>

      <TeamList onEdit={handleEdit} />

      <TeamModal open={open} setOpen={setOpen} editData={editData} />
    </div>
  );
};

export default React.memo(TeamPage);
