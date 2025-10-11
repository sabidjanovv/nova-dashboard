import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { useUpdateAdminMutation } from "../../redux/api/admins";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  editData?: any;
  refetch: () => void;
}

const AdminSelfModal: React.FC<Props> = ({
  open,
  setOpen,
  editData,
  refetch,
}) => {
  const [form] = Form.useForm();
  const [updateAdmin] = useUpdateAdminMutation();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        first_name: editData.first_name,
        last_name: editData.last_name,
        username: editData.username,
        password: "",
        confirm_password: "",
      });
    } else {
      form.resetFields();
    }
  }, [editData, form]);

  const handleSubmit = async (values: any) => {
    try {
      const payload: any = { ...values };
      if (!payload.password) delete payload.password;
      delete payload.confirm_password; // serverga yuborilmaydi

      console.log("🧩 SELF UPDATE PAYLOAD:", payload);

      await updateAdmin({ id: editData.id, data: payload }).unwrap();

      message.success("Profil muvaffaqiyatli yangilandi ✅");
      setOpen(false);
      refetch();
    } catch (error) {
      console.error("❌ Xatolik:", error);
      message.error("Yangilashda xatolik yuz berdi");
    }
  };

  return (
    <Modal
      title="Profilni tahrirlash"
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
          <Input placeholder="Masalan: Sobitjonov" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Username kiritilishi shart" }]}
        >
          <Input placeholder="Masalan: sardor" />
        </Form.Item>

        {/* Yangi parol */}
        <Form.Item
          label="Yangi parol (ixtiyoriy)"
          name="password"
          rules={[]}
          hasFeedback
        >
          <Input.Password placeholder="Yangi parol yoki bo‘sh qoldiring" />
        </Form.Item>

        {/* Parolni tasdiqlash */}
        <Form.Item
          label="Parolni tasdiqlang"
          name="confirm_password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Parollar bir xil emas! Iltimos, tekshirib yozing.")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Parolni qayta kiriting" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(AdminSelfModal);
