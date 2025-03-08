import {
  Table,
  Button,
  Input,
  Card,
  Row,
  Col,
  Space,
  Breadcrumb,
  InputNumber,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../../components/formatCurrency";
import { DeleteOutlined } from "@ant-design/icons";
import {
  changeQuantity,
  removeProduct,
} from "../../../redux/action/cartActions";

const Cart = () => {
  const nav = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Cấu hình cột cho bảng Ant Design
  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <Space>
            <img style={{ width: "30px", height: "30px" }} src={record.image} />
            <h4>{record.name}</h4>
          </Space>
        );
      },
    },
    {
      title: "Origin Price",
      dataIndex: "price",
      key: "price",
      render: (index, record) => (
        <p style={{ textDecoration: "line-through" }}>
          {formatCurrency(record.price)}đ
        </p>
      ),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (_, record) => (
        <h4 style={{ color: "red" }}>- {record.discount}%</h4>
      ),
    },
    {
      title: "netPrice",
      dataIndex: "netPrice",
      key: "netPrice",
      render: (_, record) => (
        <h4>
          {formatCurrency(
            record.price - (record.price / 100) * record.discount
          )}
        </h4>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          min={1}
          max={10}
          value={record.quantity}
          onChange={(value) => {
            dispatch(changeQuantity(record.id, value));
          }}
        />
      ),
    },

    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (_, record) => formatCurrency(record.totalPrice) + "đ",
    },
    {
      title: "Remove",
      dataIndex: "remove",
      key: "remove",
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => {
            dispatch(removeProduct(record.id));
          }}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "100%" }}>
      <Breadcrumb
        className="contact__breadcrumb"
        items={[
          {
            title: <a href="/">Home</a>,
          },
          {
            title: "Cart",
          },
        ]}
      />
      {/* Bảng sản phẩm */}
      {cart.listCart.length > 0 ? (
        <>
          <Row justify="space-between" style={{ margin: "20px 0" }}>
            <Button
              onClick={() => {
                nav("/");
              }}
            >
              Return To Shop
            </Button>
          </Row>
          <Table
            columns={columns}
            dataSource={cart.listCart}
            rowKey="id"
            pagination={false}
            bordered
          />

          {/* Nhập mã giảm giá */}
          <Row justify={"space-between"} style={{ marginTop: 20 }} gutter={10}>
            <Col span={6}>
              <Input
                placeholder="Enter coupon code"
                // value={coupon}
                // onChange={(e) => setCoupon(e.target.value)}
              />
              <Button type="primary" style={{ marginTop: "10px" }} danger block>
                Apply Coupon
              </Button>
            </Col>
            <Col span={8}>
              {/* Tổng đơn hàng */}
              <Card title="Cart Total">
                <div
                  style={{
                    padding: "10px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #88888888",
                  }}
                >
                  <p>Subtotal:</p>
                  <p>{formatCurrency(cart.totalAmount)}đ</p>
                </div>
                <div
                  style={{
                    padding: "10px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #88888888",
                  }}
                >
                  <p>Shipping:</p>
                  <p>Free</p>
                </div>
                <div
                  style={{
                    padding: "10px 0",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ fontWeight: "600" }}>Total:</p>
                  <strong>{formatCurrency(cart.totalAmount)}đ</strong>
                </div>
                <Button
                  onClick={() => {
                    nav("/checkout");
                  }}
                  type="primary"
                  danger
                  block
                >
                  Proceed to Checkout
                </Button>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Card
          style={{
            textAlign: "center",
            padding: "20px",
            border: "1px solid #f0f0f0",
            maxWidth: 600,
            margin: "50px auto",
            minHeight: "41.4vh",
          }}
        >
          <h2 style={{ color: "red" }}>KHÔNG CÓ SẢN PHẨM TRONG GIỎ HÀNG</h2>
          <div style={{ marginTop: 20 }}>
            <Button
              type="default"
              style={{ borderColor: "#1890ff", color: "#1890ff" }}
              onClick={() => {
                nav("/");
              }}
            >
              Về trang chủ
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Cart;
