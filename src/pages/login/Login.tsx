import React, { useState } from "react";
import type { FormProps } from "antd";
import { Alert, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useSignInAdminMutation } from "../../redux/api/auth";
import { useDispatch } from "react-redux";
import { setRole } from "../../redux/features/role.slice";
import { login } from "../../redux/features/auth.slice";

type FieldType = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const [signInAdmin, { isLoading }] = useSignInAdminMutation();
  const [forbiddenError, setForbiddenError] = useState(false);
  const [otherError, setOtherError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setForbiddenError(false);
    setOtherError(null);

    signInAdmin(values)
      .unwrap()
      .then((response) => {
        const { access_token, id, role } = response || {};

        if (!role) {
          console.log(role);
          
          setOtherError("Admin roli aniqlanmadi!");
          return;
        }

        dispatch(login({ access_token, id }));
        dispatch(setRole(role));

        if (role === "admin" || role === "superadmin") {
          navigate("/categories");
        } else {
          setOtherError("Siz admin emassiz!");
        }
      })
      .catch((err) => {
        if (err?.status === 403) {
          setForbiddenError(true);
        } else {
          setOtherError(err?.data?.message || "Login xatosi!");
        }
      });
  };

  return (
    <section className="w-full bg-bg min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-[450px] bg-white w-full border p-4 border-border rounded-[6px]">
        <p className="text-2xl mb-5 text-text">Admin tizimga kirish</p>

        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username kiriting" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Parol"
            name="password"
            rules={[{ required: true, message: "Parol kiriting" }]}
          >
            <Input.Password />
          </Form.Item>

          {forbiddenError && (
            <Alert
              message="Demo muddati tugagan. Iltimos, obuna sotib oling."
              description={
                <Button
                  type="link"
                  onClick={() => navigate("/subscription")}
                  style={{ paddingLeft: 0 }}
                >
                  To‘lov sahifasiga o‘tish
                </Button>
              }
              type="warning"
              showIcon
              style={{ marginBottom: "1rem" }}
            />
          )}

          {otherError && (
            <Alert
              message={otherError}
              type="error"
              showIcon
              style={{ marginBottom: "1rem" }}
            />
          )}

          <Form.Item>
            <Button
              className="w-full"
              color="primary"
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              loading={isLoading}
            >
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default React.memo(Login);
