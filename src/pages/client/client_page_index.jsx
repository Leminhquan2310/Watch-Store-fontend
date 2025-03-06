import { Button, Input, Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./client_page_index.css";
import logoClient from "../../assets/logo_client.png";
import appStore from "../../assets/icons/app-store.png";
import ggPlay from "../../assets/icons/google-play.png";
import qrCodeImage from "../../assets/icons/qrcode.png";
import {
  FacebookOutlined,
  HeartOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  SendOutlined,
  ShoppingCartOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
const { Search } = Input;
function ClientPage() {
  const nav = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  return (
    <Layout className="client">
      <Header className="header">
        <div className="logo">
          <img
            onClick={() => {
              nav("/");
            }}
            src={logoClient}
            alt="logo"
          />
        </div>
        <div className="navbar">
          <Link
            to="/"
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="contact"
            className={`nav-item ${
              location.pathname === "/contact" ? "active" : ""
            }`}
          >
            Contact
          </Link>
          <Link
            to="about"
            className={`nav-item ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            About
          </Link>
          {/* <Link
            className={`nav-item ${
              location.pathname === "/profile" ? "active" : ""
            }`}
          >
            Profile
          </Link> */}
        </div>
        <div className="header-right">
          <div className="header-right_search-box">
            <Search placeholder="What are you looking for?" />
          </div>
          <div className="header-right_cart">
            <div className="header-right_cart_cart-icon">
              <HeartOutlined />
            </div>
            <div className="header-right_cart_heart-icon">
              <ShoppingCartOutlined />
            </div>
          </div>
        </div>
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
      <Footer
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#000",
          color: "white",
          padding: "20px 0",
        }}
      >
        <div className="footer-container">
          {/* Exclusive */}
          <div className="footer-column">
            <h3>Exclusive</h3>
            <p>Subscribe</p>
            <p>Get 10% off your first order</p>
            <Space.Compact style={{ width: "90%", marginTop: "10px" }}>
              <Input placeholder="Enter your email" />
              <Button type="primary">
                <SendOutlined />
              </Button>
            </Space.Compact>
          </div>

          {/* Support */}
          <div className="footer-column">
            <h3>Support</h3>
            <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>

          {/* Account */}
          <div className="footer-column">
            <h3>Account</h3>
            <ul>
              <li>
                <a href="#">My Account</a>
              </li>
              <li>
                <a href="#">Login / Register</a>
              </li>
              <li>
                <a href="#">Cart</a>
              </li>
              <li>
                <a href="#">Wishlist</a>
              </li>
              <li>
                <a href="#">Shop</a>
              </li>
            </ul>
          </div>

          {/* Quick Link */}
          <div className="footer-column">
            <h3>Quick Link</h3>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms Of Use</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div className="footer-column">
            <h3>Download App</h3>
            <p>Save $3 with App New User Only</p>
            <div className="qr-container">
              <img src={qrCodeImage} alt="QR Code" className="qr-code" />
              <div className="app-links">
                <img src={ggPlay} alt="Google Play" className="app-img" />
                <img src={appStore} alt="App Store" className="app-img" />
              </div>
            </div>
            <div className="social-icons">
              <FacebookOutlined />
              <TwitterOutlined />
              <InstagramOutlined />
              <LinkedinOutlined />
            </div>
          </div>
        </div>
      </Footer>
    </Layout>
  );
}

export default ClientPage;
