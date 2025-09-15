import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  message,
  Alert,
  Switch,
} from "antd";
import { useUpdateAdminMutation } from "../../redux/api/admins";

interface AdminPopupProps {
  open: boolean;
  onClose: (isBack?: boolean) => void;
  prevData?: any;
  currentRole?: string;
}

const AdminPopup: React.FC<AdminPopupProps> = ({
  open,
  onClose,
  prevData,
  currentRole,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();
  const [apiMessage, contextHolder] = message.useMessage();

  console.log(currentRole);
  
  const isEditing = Boolean(prevData);

  const handleFinish = async (values: any) => {
    try {
      if (!values.password) delete values.password; // parol bo‘sh bo‘lsa yubormaslik
      await updateAdmin({
        id: prevData.id || prevData._id,
        data: values,
      }).unwrap();
      apiMessage.success("Admin muvaffaqiyatli yangilandi!");
      form.resetFields();
      onClose(true);
    } catch (err: any) {
      setError(err?.data?.message || "Xatolik yuz berdi!");
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose(true);
    setError(null);
  };

  return (
    <Modal
      title={isEditing ? "Adminni tahrirlash" : "Yangi admin yaratish"}
      open={open}
      onCancel={handleClose}
      footer={null}
      className="max-w-[90vw] md:max-w-lg"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={prevData}
        onFinish={handleFinish}
        autoComplete="off"
        className="space-y-3 md:space-y-5"
      >
        <Form.Item
          label="Ism"
          name="f_name"
          rules={[{ required: true, message: "Ismni kiriting!" }]}
        >
          <Input placeholder="Ism" />
        </Form.Item>

        <Form.Item
          label="Familiya"
          name="l_name"
          rules={[{ required: true, message: "Familiyani kiriting!" }]}
        >
          <Input placeholder="Familiya" />
        </Form.Item>

        <Form.Item
          label="Telefon raqam"
          name="phone_number"
          rules={[{ required: true, message: "Telefon raqam kiriting!" }]}
        >
          <Input placeholder="+998901234567" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Username kiriting!" }]}
        >
          <Input placeholder="username" />
        </Form.Item>

        <Form.Item label="Rol" name="role">
          <Select>
            <Select.Option value="ADMIN">ADMIN</Select.Option>
            <Select.Option value="SUPER_ADMIN">SUPER_ADMIN</Select.Option>
            <Select.Option value="USER">USER</Select.Option>
          </Select>
        </Form.Item>

        {/* is_active qo‘shildi */}
        <Form.Item
          label="Faollik holati"
          name="is_active"
          valuePropName="checked" // Switch uchun kerak
          rules={[{ required: true, message: "Faollikni tanlang!" }]}
        >
          <Switch checkedChildren="Faol" unCheckedChildren="Bloklangan" />
        </Form.Item>

        <Form.Item
          label="Parol"
          name="password"
          rules={[{ required: !isEditing, message: "Parol kiriting!" }]}
        >
          <Input.Password placeholder="Parol (ixtiyoriy)" />
        </Form.Item>

        {error && <Alert message={error} type="error" className="mb-3 -mt-2" />}

        <Form.Item style={{ margin: 0 }}>
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            {isLoading ? "Kuting..." : isEditing ? "Saqlash" : "Yaratish"}
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default React.memo(AdminPopup);
