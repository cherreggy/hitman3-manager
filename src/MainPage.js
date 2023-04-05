import "./MainPage.css";
import {
  ConfigProvider,
  Button,
  Form,
  Input,
  Row,
  Col,
  Space,
  Table,
  Tag,
  Select,
  Modal,
} from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const { Column, ColumnGroup } = Table;

export default function MainPage({ token, setToken }) {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [winForm] = Form.useForm();
  const [curr, setCurr] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const curForm = winForm.validateFields();
    curForm
      .then((val) => {
        var values = winForm.getFieldValue();
        let tmp = [...data];
        let ind = 0;
        data.forEach((item, id) => {
          if (item.key === curr.key) ind = id;
        });
        tmp[ind] = { ...values };
        // console.log(tmp);
        setData(tmp);
        localStorage.setItem(token, JSON.stringify([...tmp]));
        // console.log(data);
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let d = JSON.parse(localStorage.getItem(token));
    if (d) setData(d);
    else setData([]);
  }, []);

  const handleDelete = (id) => {
    // console.log(id);
    setData(data.filter((item) => item.key !== id));
    localStorage.setItem(
      token,
      JSON.stringify(data.filter((item) => item.key != id))
    );
  };

  const handleSubmit = (f) => {
    const curForm = f.validateFields();
    curForm
      .then((val) => {
        var values = f.getFieldValue();
        let date = new Date();
        values = { ...values, key: date.getTime() };
        console.log(data);
        setData([...data, values]);
        localStorage.setItem(token, JSON.stringify([...data, values]));
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const handleClick = () => {
    Cookies.remove("token", {
      path: "",
    });
    setToken(null);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(200, 0, 0)",
        },
      }}
    >
      <div className="main_pannel">
        {/* 上面的用户信息部分和登出 */}
        <div className="welcome">
          <p className="welcome1">
            请开启你的任务，特工 <span className="red">{token}</span>
          </p>
          <p className="welcome2">
            Please Enter Your Missions, Agent{" "}
            <span className="red">{token}</span>
          </p>
          <Button type="primary" onClick={handleClick}>
            登出 LogOut
          </Button>
        </div>
        {/* 输入信息表单部分 */}
        <div className="add_info">
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            form={form}
          >
            {/* <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item> */}
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="目标 Target"
                  name="target"
                  rules={[
                    {
                      required: true,
                      message: "请输入目标姓名! Please Enter Targets' Name!",
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="地点 Position"
                  name="position"
                  rules={[
                    {
                      required: true,
                      message: "请输入目的地! Please Enter The Position!",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    options={[
                      {
                        value: "巴黎",
                        label: "法国巴黎",
                      },
                      {
                        value: "北海道",
                        label: "日本北海道",
                      },
                      {
                        value: "迪拜",
                        label: "阿联酋迪拜",
                      },
                      {
                        value: "达特穆尔",
                        label: "英国达特穆尔",
                      },
                      {
                        value: "柏林",
                        label: "德国柏林",
                      },
                      {
                        value: "重庆",
                        label: "中国重庆",
                      },
                      {
                        value: "门多萨",
                        label: "阿根廷门多萨",
                      },
                      {
                        value: "喀尔巴阡山",
                        label: "罗马尼亚喀尔巴阡山",
                      },
                      {
                        value: "迈阿密",
                        label: "美国迈阿密",
                      },
                      {
                        value: "孟买",
                        label: "印度孟买",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="工具 Tool"
                  name="tool"
                  rules={[
                    {
                      required: true,
                      message: "请输入使用的工具! Please Enter The Tool!",
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="藏匿 Hide"
                  name="hide"
                  rules={[
                    {
                      required: true,
                      message: "请输入藏匿物品! Please Enter The Hidden Tool!",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    options={[
                      {
                        value: "银色舞者",
                        label: "银色舞者",
                      },
                      {
                        value: "消音手枪",
                        label: "消音手枪",
                      },
                      {
                        value: "遥控炸药",
                        label: "遥控炸药",
                      },
                      {
                        value: "狙击枪",
                        label: "狙击枪",
                      },
                      {
                        value: "无",
                        label: "无",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="入口 Entrance"
                  name="entrance"
                  rules={[
                    {
                      required: true,
                      message: "请输入入口! Please Enter Entrance!",
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="细节 Details"
                  name="details"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className="operates">
            <Space size="large">
              <Button
                style={{ width: "8vw" }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                重置 Reset
              </Button>
              <Button
                style={{ width: "8vw" }}
                type="primary"
                onClick={() => {
                  handleSubmit(form);
                }}
              >
                添加 Add
              </Button>
            </Space>
          </div>
        </div>
        {/* 表格展示区域 */}
        <div>
          <Table dataSource={data} pagination={{ defaultPageSize: 6 }}>
            <Column
              title="目标 Target"
              dataIndex="target"
              key="target"
              align="center"
            />
            <Column
              title="工具 Tool"
              dataIndex="tool"
              key="tool"
              align="center"
            />
            <Column
              title="藏匿 Hide"
              dataIndex="hide"
              key="hide"
              align="center"
            />
            <Column
              title="入口 Entrance"
              dataIndex="entrance"
              key="entrance"
              align="center"
            />
            <Column
              title="目的地 Position"
              dataIndex="position"
              key="position"
              render={(position) => (
                <>
                  <Tag color="red" key={position}>
                    {position}
                  </Tag>
                </>
              )}
              align="center"
            />
            <Column
              title="操作 Action"
              key="action"
              render={(record) => (
                <Space size="middle">
                  <a
                    onClick={() => {
                      setCurr(record);
                      winForm.setFieldsValue(record);
                      showModal();
                    }}
                  >
                    查看细节 Details
                  </a>
                  <a
                    onClick={() => {
                      handleDelete(record.key);
                    }}
                  >
                    删除 Delete
                  </a>
                </Space>
              )}
              align="center"
            />
          </Table>
        </div>
      </div>
      <Modal
        title="任务细节 Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="修改 Edit"
        cancelText="取消 Cancel"
        centered
        width={"40vw"}
      >
        <Form
          name="wind"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          form={winForm}
        >
          {/* <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item> */}
          <Col span={12}>
            <Form.Item
              label="目标 Target"
              name="target"
              rules={[
                {
                  required: true,
                  message: "请输入目标姓名! Please Enter Targets' Name!",
                },
              ]}
              style={{ marginTop: "2vw" }}
            >
              <Input value="" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="地点 Position"
              name="position"
              rules={[
                {
                  required: true,
                  message: "请输入目的地! Please Enter The Position!",
                },
              ]}
            >
              <Select
                allowClear
                options={[
                  {
                    value: "巴黎",
                    label: "法国巴黎",
                  },
                  {
                    value: "北海道",
                    label: "日本北海道",
                  },
                  {
                    value: "迪拜",
                    label: "阿联酋迪拜",
                  },
                  {
                    value: "达特穆尔",
                    label: "英国达特穆尔",
                  },
                  {
                    value: "柏林",
                    label: "德国柏林",
                  },
                  {
                    value: "重庆",
                    label: "中国重庆",
                  },
                  {
                    value: "门多萨",
                    label: "阿根廷门多萨",
                  },
                  {
                    value: "喀尔巴阡山",
                    label: "罗马尼亚喀尔巴阡山",
                  },
                  {
                    value: "迈阿密",
                    label: "美国迈阿密",
                  },
                  {
                    value: "孟买",
                    label: "印度孟买",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="工具 Tool"
              name="tool"
              rules={[
                {
                  required: true,
                  message: "请输入使用的工具! Please Enter The Tool!",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="藏匿 Hide"
              name="hide"
              rules={[
                {
                  required: true,
                  message: "请输入藏匿物品! Please Enter The Hidden Tool!",
                },
              ]}
            >
              <Select
                allowClear
                options={[
                  {
                    value: "银色舞者",
                    label: "银色舞者",
                  },
                  {
                    value: "消音手枪",
                    label: "消音手枪",
                  },
                  {
                    value: "遥控炸药",
                    label: "遥控炸药",
                  },
                  {
                    value: "狙击枪",
                    label: "狙击枪",
                  },
                  {
                    value: "无",
                    label: "无",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="入口 Entrance"
              name="entrance"
              rules={[
                {
                  required: true,
                  message: "请输入入口! Please Enter Entrance!",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="细节 Details"
              name="details"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}
