import { useState } from "react";
import {
  Card,
  Button,
  Rate,
  Radio,
  InputNumber,
  Row,
  Col,
  Typography,
} from "antd";
import { HeartOutlined } from "@ant-design/icons";
import "./product-detail_page.css";

const { Title, Text } = Typography;

const ProductPage = () => {
  const [quantity, setQuantity] = useState(2);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("red");

  return (
    <Row gutter={16} className="product-container">
      <Col span={10} className="product-images">
        <img
          src="/images/controller-main.png"
          alt="Gamepad"
          className="main-image"
        />
        <div className="thumbnail-container">
          <img src="/images/thumb1.png" alt="thumb1" className="thumbnail" />
          <img src="/images/thumb2.png" alt="thumb2" className="thumbnail" />
          <img src="/images/thumb3.png" alt="thumb3" className="thumbnail" />
          <img src="/images/thumb4.png" alt="thumb4" className="thumbnail" />
        </div>
      </Col>
      <Col span={14} className="product-details">
        <Title level={3}>Havic HV G-92 Gamepad</Title>
        <Rate disabled defaultValue={4} /> <Text>(150 Reviews)</Text>{" "}
        <Text type="success">| In Stock</Text>
        <Title level={4} className="price">
          $192.00
        </Title>
        <Text>
          PlayStation 5 Controller Skin High quality vinyl with air channel
          adhesive for easy bubble-free install & mess free removal. Pressure
          sensitive.
        </Text>
        <div className="options">
          <Text strong>Colours: </Text>
          <Radio.Group value={color} onChange={(e) => setColor(e.target.value)}>
            <Radio.Button value="red" className="color-option red" />
            <Radio.Button value="blue" className="color-option blue" />
          </Radio.Group>
        </div>
        <div className="options">
          <Text strong>Size: </Text>
          <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
            <Radio.Button value="XS">XS</Radio.Button>
            <Radio.Button value="S">S</Radio.Button>
            <Radio.Button value="M">M</Radio.Button>
            <Radio.Button value="L">L</Radio.Button>
            <Radio.Button value="XL">XL</Radio.Button>
          </Radio.Group>
        </div>
        <div className="options">
          <InputNumber min={1} value={quantity} onChange={setQuantity} />
          <Button type="primary" className="buy-now">
            Buy Now
          </Button>
          <Button icon={<HeartOutlined />} className="wishlist" />
        </div>
        <Card className="delivery-info">
          <Text strong>Free Delivery</Text>
          <Text type="secondary">
            Enter your postal code for Delivery Availability
          </Text>
          <Text strong>Return Delivery</Text>
          <Text type="secondary">Free 30 Days Delivery Returns. Details</Text>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductPage;
