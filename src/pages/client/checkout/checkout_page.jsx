import { Form, Input, Select, Button, Row, Col, Radio } from "antd";
import "./checkout_page.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../components/formatCurrency";
import provinceJSON from "../../../assets/tinh_tp.json";
import districtJSON from "../../../assets/quan_huyen.json";
import wardJSON from "../../../assets/xa_phuong.json";

const { Option } = Select;

const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD") // Tách dấu khỏi ký tự gốc
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/đ/g, "d") // Chuyển "đ" thành "d"
    .replace(/Đ/g, "D"); // Chuyển "Đ" thành "D"
};

const Checkout = () => {
  const [radioPaymentMethod, setRadioPaymentMethod] = useState("cod");
  const cart = useSelector((state) => state.cart);
  const [provinceData, setProvinceData] = useState("");
  const [districtData, setDistrictData] = useState("");
  const [wardData, setWardData] = useState("");

  const provinces = Object.values(provinceJSON).map((item) => {
    return {
      label: item.name,
      code: item.code,
    };
  });

  const districts = Object.values(districtJSON).filter(
    (item) => item.parent_code === provinceData
  );

  const wards = Object.values(wardJSON).filter(
    (item) => item.parent_code === districtData
  );

  const handleChangePaymentMethod = (e) => {
    setRadioPaymentMethod(e.target.value);
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="checkout">
      <Form className="form-check" onFinish={onFinish} layout="vertical">
        <div className="list-payment">
          {cart.listCart.map((item, index) => (
            <div key={index} className="card">
              <div className="card__title">
                <img src={item.image} alt="product" />
                <h3>{item.name}</h3>
              </div>
              <div className="card__price">
                <h4
                  style={{
                    color: "var(--client-color-1)",
                    fontSize: "17px",
                  }}
                >
                  {formatCurrency(item.totalPrice)}đ
                </h4>
                <p style={{ textDecoration: "line-through" }}>
                  {formatCurrency(item.price)}đ
                </p>
                <p style={{ color: "#88888899" }}>x{item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="provisionalPrice">
            <h3>Provisional total amount:</h3>
            <h4
              style={{
                color: "var(--client-color-1)",
                fontSize: "17px",
              }}
            >
              {formatCurrency(cart.totalAmount)}đ
            </h4>
          </div>
        </div>
        <Row justify="space-between">
          <Col span={24}>
            <Form.Item
              name="sex"
              rules={[
                {
                  required: true,
                  message: "Choose your sex",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="male">Mr</Radio>
                <Radio value="female">Mrs</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={11}>
            <Form.Item
              name="fullname"
              style={{ height: "50px" }}
              label="Fullname"
              rules={[
                {
                  required: true,
                  message: "Enter your fullname",
                },
              ]}
            >
              <Input placeholder="Fullname" />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="phoneNumber"
              label="Phone number"
              rules={[
                {
                  required: true,
                  message: "Enter your phone number",
                },
              ]}
            >
              <Input placeholder="Phone number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Enter your email",
                },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email format is incorrect!",
                },
              ]}
              name="email"
              label="Email"
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name={["address", "city"]}>
              <Select
                style={{ height: "40px" }}
                placeholder="Select City/Province"
                onChange={(value) => setProvinceData(value)}
                showSearch
                filterOption={(input, option) =>
                  removeVietnameseTones(option.children.toLowerCase()).includes(
                    removeVietnameseTones(input.toLowerCase())
                  )
                }
              >
                {provinces.map((item, index) => (
                  <Option key={index} value={item.code}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name={["address", "district"]}>
              <Select
                showSearch
                filterOption={(input, option) =>
                  removeVietnameseTones(option.children.toLowerCase()).includes(
                    removeVietnameseTones(input.toLowerCase())
                  )
                }
                style={{ height: "40px" }}
                placeholder="Select District"
                onChange={(value) => setDistrictData(value)}
              >
                {districts.map((item, index) => (
                  <Option key={index} value={item.code}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name={["address", "ward"]}>
              <Select
                showSearch
                filterOption={(input, option) =>
                  removeVietnameseTones(option.children.toLowerCase()).includes(
                    removeVietnameseTones(input.toLowerCase())
                  )
                }
                style={{ height: "40px" }}
                placeholder="Select Ward"
              >
                {wards.map((item, index) => (
                  <Option key={index} value={item.code}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Enter this field",
                },
              ]}
              name="houseNo"
              style={{ height: "40px" }}
            >
              <Input placeholder="House No. / street name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="noteMore" style={{ height: "40px" }}>
              <Input placeholder="Note more (Not Required)" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Payment Method">
              <Radio.Group
                onChange={handleChangePaymentMethod}
                style={{ width: "100%" }}
                defaultValue={radioPaymentMethod}
              >
                <Row
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Radio
                    value="cod"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #88888888",
                      marginBottom: "5px",
                      borderRadius: "4px",
                    }}
                  >
                    <div>Cash on Delivery (COD)</div>
                  </Radio>
                  <Radio
                    value="bank"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #88888888",
                      borderRadius: "4px",
                      marginBottom: "5px",
                    }}
                  >
                    <div>Bank Transfer</div>
                  </Radio>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form.Item>
              <Button
                style={{
                  width: "400px",
                  height: "80px",
                }}
                type="primary"
                htmlType="submit"
              >
                <h3>Done Order</h3>
                {radioPaymentMethod === "cod" ? (
                  <p>Cash on Delivery (COD)</p>
                ) : (
                  <p>Bank Transfer</p>
                )}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Checkout;
