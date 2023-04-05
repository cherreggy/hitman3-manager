import React, { Suspense, lazy, useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { Spin } from "antd";
import { ConfigProvider } from "antd";
import Cookies from "js-cookie";

const PageHome = lazy(() => import("./MainPage"));

function App() {
  // 存储登录的用户名
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);

  if (!token) {
    // 如果登录失败或者没有登录，显示登录页面
    return <Login setToken={setToken}></Login>;
  } else {
    // 否则显示路由页
    return (
      <Suspense
        fallback={
          <div className="spin">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "red",
                },
              }}
            >
              <Spin size="large" style={{ marginTop: "30vw" }} />
            </ConfigProvider>
          </div>
        }
      >
        <PageHome token={token} setToken={setToken} />
      </Suspense>
    );
  }
}

export default App;
