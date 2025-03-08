import { Breadcrumb, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../components/formatCurrency";
import "./wishlist_page.css";
import { useDispatch, useSelector } from "react-redux";
import { toggle_wishlist } from "../../../redux/action/wishlistActions";

function Wishlist() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  return (
    <div>
      <Breadcrumb
        className="contact__breadcrumb"
        items={[
          {
            title: <a href="/">Home</a>,
          },
          {
            title: "Favorite List",
          },
        ]}
      />
      {wishlist.length > 0 ? (
        <div className="favorite-list">
          {wishlist.map((item, index) => (
            <div key={index} className="card">
              <img
                // onClick={() => {
                //   nav("product-detail");
                // }}
                src={item.image}
                alt="product"
              />
              <div
                onClick={() => {
                  nav("product-detail");
                }}
                className="card__name"
              >
                {item.name}
              </div>
              <div className="card__price">
                <div className="card__price--sell">
                  {formatCurrency(item.netPrice)}đ
                </div>
                <div
                  style={{ display: "flex" }}
                  className="card__price--original"
                >
                  <p
                    style={{
                      textDecoration: "line-through",
                      margin: "0 5px 5px 0",
                      fontSize: "13px",
                    }}
                  >
                    {formatCurrency(item.price)}đ
                  </p>
                  <div className="card__discount">{item.discount}%</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Button
                  type="primary"
                  style={{ marginBottom: "10px" }}
                  // onClick={() => dispatch(addToCart(item))}
                  className="card__btnAdd"
                >
                  Buy Now
                </Button>
                <Button
                  onClick={() => dispatch(toggle_wishlist(item))}
                  className="card__btnAdd"
                >
                  Delete Product
                </Button>
              </div>
            </div>
          ))}
        </div>
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
          <h2 style={{ color: "red" }}>KHÔNG CÓ SẢN PHẨM NÀO ĐƯỢC LƯU</h2>
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
}

export default Wishlist;
