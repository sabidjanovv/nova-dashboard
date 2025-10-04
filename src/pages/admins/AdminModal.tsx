import React, { useEffect } from "react";
import { Modal, Form, Input, Switch, Select, message } from "antd";
import {
  useAddAdminMutation,
  useUpdateAdminMutation,
} from "../../redux/api/admins";

const { Option } = Select;

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  editData?: any;
  refetch: () => void;
}

const AdminModal: React.FC<Props> = ({ open, setOpen, editData, refetch }) => {
  const [form] = Form.useForm();
  const [addAdmin] = useAddAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        first_name: editData.first_name,
        last_name: editData.last_name,
        username: editData.username,
        is_active: editData.is_active,
        role: editData.role,
        password: "", // parol har doim bo‘sh bo‘ladi
      });
    } else {
      form.resetFields();
    }
  }, [editData, form]);

  const handleSubmit = async (values: any) => {
    try {
      const payload = { ...values };

      // agar password bo‘sh bo‘lsa, update queryga yubormaymiz
      if (editData && !values.password) {
        delete payload.password;
      }

      // 🧾 LOG: update uchun yuborilayotgan ma’lumotni chiqaramiz
      if (editData) {
        console.log("🔄 UPDATE PAYLOAD:", { id: editData.id, data: payload });
      } else {
        console.log("➕ CREATE PAYLOAD:", payload);
      }

      if (editData) {
        await updateAdmin({ id: editData.id, data: payload }).unwrap();
        message.success("Admin ma’lumotlari yangilandi");
      } else {
        await addAdmin(payload).unwrap();
        message.success("Yangi admin qo‘shildi");
      }

      setOpen(false);
      form.resetFields();
      refetch();
    } catch (error) {
      message.error("Saqlashda xatolik yuz berdi");
      console.error("❌ Xatolik:", error);
    }
  };

  return (
    <Modal
      title={editData ? "Adminni tahrirlash" : "Yangi admin qo‘shish"}
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => form.submit()}
      okText="Saqlash"
      cancelText="Bekor qilish"
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Ism"
          name="first_name"
          rules={[{ required: true, message: "Ism kiritilishi shart" }]}
        >
          <Input placeholder="Masalan: Sardor" />
        </Form.Item>

        <Form.Item
          label="Familiya"
          name="last_name"
          rules={[{ required: true, message: "Familiya kiritilishi shart" }]}
        >
          <Input placeholder="Masalan: Sobidjonov" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Username kiritilishi shart" }]}
        >
          <Input placeholder="Masalan: sardor" />
        </Form.Item>

        <Form.Item
          label={editData ? "Yangi parol (ixtiyoriy)" : "Parol"}
          name="password"
          rules={
            editData
              ? [] // update paytida majburiy emas
              : [{ required: true, message: "Parol kiritilishi shart" }]
          }
        >
          <Input.Password placeholder="Yangi parol yoki admin123" />
        </Form.Item>

        <Form.Item
          label="Rol"
          name="role"
          rules={[{ required: true, message: "Rol tanlanishi shart" }]}
        >
          <Select>
            <Option value="admin">Admin</Option>
            <Option value="superadmin">Super Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Faollik"
          name="is_active"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(AdminModal);
