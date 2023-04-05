import "./Login.css";
import { ConfigProvider } from "antd";
import { Input, Button } from "antd";
import {
  UserOutlined,
  BorderInnerOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Login({ setToken }) {
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(account, password);
    // 判断输入帐号和密码
    if (
      (account === "宣宣" && password === "123") ||
      (account === "航航" && password === "123") ||
      (account === "123" && password === "123") ||
      (account === "111" && password === "111")
    ) {
      saveToken(account);
    } else {
      alert("用户名或密码错误！\nInvalid account or password!");
    }
  };

  const saveToken = (token) => {
    Cookies.set("token", token, {
      expires: 1,
      sameSite: "strict",
    });
    setToken(token);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000",
        },
      }}
    >
      <div className="login_pannel">
        <h1 className="title">杀手3 任务管理系统</h1>
        <h2 className="sub-title">HITMAN 3 MANAGEMENT SYSTEM</h2>
        <Input
          size="large"
          placeholder="用户名 UserName"
          prefix={<UserOutlined style={{ marginRight: "1vw" }} />}
          className="username"
          style={{ height: "4vw", padding: "1vw", fontSize: "1.5vw" }}
          onChange={(e) => setAccount(e.target.value)}
        />

        <Input.Password
          placeholder="密码 Password"
          className="username"
          prefix={<BorderInnerOutlined style={{ marginRight: "1vw" }} />}
          style={{
            height: "4vw",
            padding: "1vw",
            fontSize: "1.5vw",
            marginTop: "1.5vw",
          }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="primary"
          icon={<SendOutlined className="arrow" />}
          className="username button"
          size="large"
          style={{
            height: "4.5vw",
            padding: "1vw",
            fontSize: "1.5vw",
            marginTop: "2vw",
          }}
          onClick={handleSubmit}
        >
          登录 Login
        </Button>

        <p className="copyright">版权所有：xuanzhengji 762543342@qq.com</p>
      </div>
    </ConfigProvider>
  );
}
