/* eslint-disable react/no-unescaped-entities */
import { Button, Carousel, Divider, Space, Tooltip } from "antd";
import "./home_page.css";
import banner1 from "../../../assets/home-banner/banner1.png";
import banner2 from "../../../assets/home-banner/banner2.png";
import banner3 from "../../../assets/home-banner/banner3.png";
import banner4 from "../../../assets/home-banner/banner4.png";
import {
  CarOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  DeliveredProcedureOutlined,
  HeartOutlined,
  SecurityScanOutlined,
  ShoppingCartOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProductCondition } from "../../../service/productService";
import { getAllBrand } from "../../../service/brandService";
import { useDispatch, useSelector } from "react-redux";
import { toggle_wishlist } from "../../../redux/action/wishlistActions";
import { addToCart } from "../../../redux/action/cartActions";
import { formatCurrency } from "../../../components/formatCurrency";

function Home() {
  const nav = useNavigate();
  const rate = 4;
  const slide_cardRef = useRef(null);
  const slide_brandRef = useRef(null);
  const slide_ourProductRef = useRef(null);
  const [listFlashSale, setListFlashSale] = useState([]);
  const [listBrands, setListBrands] = useState([]);
  const [listBestSeller, setListBestSeller] = useState([]);
  const [listProductNewest, setListProductNewest] = useState([]);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const checkInWishlist = (id) => {
    return wishlist.some((item) => item._id === id);
  };

  const handleScrollNext = () => {
    slide_cardRef.current.scrollLeft += 280;
  };
  const handleScrollPrev = () => {
    slide_cardRef.current.scrollLeft -= 280;
  };

  const handleScrollNextBrand = () => {
    slide_brandRef.current.scrollLeft += slide_brandRef.current.offsetWidth;
  };

  const handleScrollPrevBrand = () => {
    slide_brandRef.current.scrollLeft -= slide_brandRef.current.offsetWidth;
  };

  const handleScrollNextOurProducts = () => {
    slide_ourProductRef.current.scrollLeft +=
      slide_ourProductRef.current.offsetWidth + 10;
  };

  const handleScrollPrevOurProducts = () => {
    slide_ourProductRef.current.scrollLeft -=
      slide_ourProductRef.current.offsetWidth + 10;
  };

  const fetchApiGetProductFlashSale = async () => {
    try {
      const result = await getProductCondition({ discount: "true" });
      setListFlashSale(result.products);
    } catch (error) {
      console.log(error.message);
      nav("/404");
    }
  };

  const fetchApiGetAllBrand = async () => {
    try {
      const result = await getAllBrand();
      setListBrands(result.data);
    } catch (error) {
      console.log(error.message);
      nav("/404");
    }
  };

  const fetchApiGetProductBestSeller = async () => {
    try {
      const result = await getProductCondition({
        sort: "best_seller",
        limit: 4,
      });
      setListBestSeller(result.products);
    } catch (error) {
      console.log(error.message);
      nav("/404");
    }
  };

  const fetchApiGetProductNewest = async () => {
    try {
      const result = await getProductCondition({ sort: "newest", limit: 16 });
      setListProductNewest(result.products);
    } catch (error) {
      console.log(error.message);
      nav("/404");
    }
  };

  useEffect(() => {
    fetchApiGetProductFlashSale();
    fetchApiGetAllBrand();
    fetchApiGetProductBestSeller();
    fetchApiGetProductNewest();
  }, []);

  return (
    <div className="home">
      <div className="content-first">
        <div className="content-first__carousel">
          <Carousel dotPosition="bottom" autoplay autoplaySpeed={1500}>
            <div className="slider_carousel">
              <img src={banner1} alt="background" />
            </div>
            <div className="slider_carousel">
              <img src={banner2} alt="background" />
            </div>
            <div className="slider_carousel">
              <img src={banner3} alt="background" />
            </div>
            <div className="slider_carousel">
              <img src={banner4} alt="background" />
            </div>
          </Carousel>
        </div>
      </div>
      <div className="popular-product">
        <h3 className="popular-product__title">Today's</h3>
        <div className="popular-product__flash-sale">
          <div className="flash-sale__text">Flash Sales</div>
          <div className="flash-sale__time">
            <div className="flash-sale__time--days">
              <p>Days</p>
              <h3>03</h3>
            </div>
            <div className="flash-sale__time--hours">
              <p>Hours</p>
              <h3>20</h3>
            </div>
            <div className="flash-sale__time--minutes">
              <p>Minutes</p>
              <h3>44</h3>
            </div>
            <div className="flash-sale__time--seconds">
              <p>Seconds</p>
              <h3>59</h3>
            </div>
          </div>
          <div className="flash-sale__button">
            <Button
              onClick={() => {
                nav("product");
              }}
              size="large"
              className="flash-sale__button--btn"
            >
              View All Products
            </Button>
          </div>
        </div>
        <div className="popular-product__slide-card" ref={slide_cardRef}>
          <div className="slide-card__list-card">
            {listFlashSale.map((item, index) => (
              <div className="list-card__card" key={index}>
                <div className="card__discount">{item.discount}%</div>
                <div
                  onClick={() => dispatch(toggle_wishlist(item))}
                  className={`card__like ${
                    checkInWishlist(item._id) ? "active" : ""
                  }`}
                >
                  <HeartOutlined />
                </div>
                <img
                  onClick={() => {
                    nav("product-detail");
                  }}
                  src={item.image_main.url}
                  alt="card"
                />
                <div
                  onClick={() => dispatch(addToCart(item))}
                  className="card__btnAdd"
                >
                  Add to cart
                </div>
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
                    {formatCurrency(
                      item.price - (item.discount / 100) * item.price
                    )}
                    đ
                  </div>
                  <div className="card__price--original">
                    {formatCurrency(item.price)}đ
                  </div>
                </div>
                <div className="card__rate">
                  {[...Array(5)].map((_, index) => {
                    return (
                      <span
                        key={index}
                        style={{
                          color: rate < index + 1 ? "gray" : "gold",
                        }}
                      >
                        <StarFilled />
                      </span>
                    );
                  })}
                  <div className="card__rate--quantity">(88)</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="popular-product__button-slide">
          <Space>
            <Button
              onClick={handleScrollPrev}
              className="popular-product__button-slide--prev"
            >
              {"<"}
            </Button>
            <Button
              onClick={handleScrollNext}
              className="popular-product__button-slide--next"
            >
              {">"}
            </Button>
          </Space>
        </div>
      </div>
      <Divider />
      <div className="brand">
        <h3 className="brand__title">Outstanding brands</h3>
        <p className="brand__desc">
          WatchStore commits to 100% genuine, 20 times compensation if fake
          goods are detected
        </p>
        <div ref={slide_brandRef} className="slide">
          <div className="list-brand">
            {listBrands.map((item, index) => (
              <div key={index} className="card">
                <img src={item.image.url} alt={item.name} />
              </div>
            ))}
          </div>
        </div>
        <div className="brand__button-slide">
          <Space>
            <Button
              onClick={handleScrollPrevBrand}
              className="brand__button-slide--prev"
            >
              {"<"}
            </Button>
            <Button
              onClick={handleScrollNextBrand}
              className="brand__button-slide--next"
            >
              {">"}
            </Button>
          </Space>
        </div>
      </div>
      <Divider />
      <div className="this-month">
        <h3 className="this-month__title">This month</h3>
        <div className="this-month__desc">
          <h2 className="desc__text">Best Selling Products</h2>
          <div className="desc__button">
            <Button size="large" className="desc__button--btn">
              View All
            </Button>
          </div>
        </div>
        <div className="this-month__content">
          {listBestSeller.map((item, index) => (
            <div key={index} className="item">
              <Tooltip placement="top" title="Add to Wishlist">
                <div
                  onClick={() => dispatch(toggle_wishlist(item))}
                  className={`item__like ${
                    checkInWishlist(item._id) ? "active" : ""
                  }`}
                >
                  <HeartOutlined />
                </div>
              </Tooltip>
              <Tooltip placement="top" title="Add to Cart">
                <div
                  onClick={() => dispatch(addToCart(item))}
                  className="item__review"
                >
                  <ShoppingCartOutlined />
                </div>
              </Tooltip>
              <img
                onClick={() => {
                  nav("product-detail");
                }}
                src={item.image_main.url}
                alt="Best-seller image"
              />
              <div
                onClick={() => {
                  nav("product-detail");
                }}
                className="item__name"
              >
                {item.name}
              </div>
              <div className="item__price">
                <div className="item__price--sell">
                  {formatCurrency(
                    item.price - (item.discount / 100) * item.price
                  )}
                  đ
                </div>
                <div className="item__price--discount">
                  {formatCurrency(item.price)}đ
                </div>
              </div>
              <div className="item__rate">
                {[...Array(5)].map((_, index) => {
                  return (
                    <span
                      key={index}
                      style={{
                        color: rate < index + 1 ? "gray" : "gold",
                      }}
                    >
                      <StarFilled />
                    </span>
                  );
                })}
                <div className="card__rate--quantity">(88)</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="our-products">
        <div className="our-products__title">Our products</div>
        <div className="our-products__desc">
          <div className="desc__text">Explore our products</div>
          <div className="desc__button">
            <Button size="large" className="desc__button--btn">
              View All
            </Button>
          </div>
        </div>
        <div ref={slide_ourProductRef} className="our-products__content">
          <div className="list-our-products">
            {listProductNewest.map((item, index) => (
              <div key={index} className="content__item">
                <Tooltip placement="top" title="Add to Wishlist">
                  <div
                    onClick={() => dispatch(toggle_wishlist(item))}
                    className={`item__like ${
                      checkInWishlist(item._id) ? "active" : ""
                    }`}
                  >
                    <HeartOutlined />
                  </div>
                </Tooltip>
                <Tooltip placement="top" title="Add to Cart">
                  <div
                    onClick={() => dispatch(addToCart(item))}
                    className="item__review"
                  >
                    <ShoppingCartOutlined />
                  </div>
                </Tooltip>
                <img src={item.image_main.url} alt="this-month image" />
                <div className="item__name">{item.name}</div>
                <div className="item__price">
                  <div className="item__price--sell">
                    {formatCurrency(
                      item.price - (item.discount / 100) * item.price
                    )}
                    đ
                  </div>
                  <div className="item__price--discount">
                    {formatCurrency(item.price)}đ
                  </div>
                </div>
                <div className="item__rate">
                  {[...Array(5)].map((_, index) => {
                    return (
                      <span
                        key={index}
                        style={{
                          color: rate < index + 1 ? "gray" : "gold",
                        }}
                      >
                        <StarFilled />
                      </span>
                    );
                  })}
                  <div className="card__rate--quantity">(88)</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="brand__button-slide">
          <Space>
            <Button
              onClick={handleScrollPrevOurProducts}
              className="brand__button-slide--prev"
            >
              {"<"}
            </Button>
            <Button
              onClick={handleScrollNextOurProducts}
              className="brand__button-slide--next"
            >
              {">"}
            </Button>
          </Space>
        </div>
      </div>
      <div className="featured-product">
        <h3 className="featured-product__title">Featured</h3>
        <p className="featured-product__desc">New Arrival</p>
        <div className="featured-product__content">
          <div className="content__item1">
            <h2>Đồng hồ Cơ Longines Conquest Classic Nam</h2>
            <p>Version limited is coming out of sale</p>
            <Link to="/">Shop Now</Link>
          </div>
          <div className="content__item2">
            <h2>Đồng hồ Cơ Seiko 5 Sport Nam SRPG31K1</h2>
            <p>Version limited is coming out of sale</p>
            <Link to="/">Shop Now</Link>
          </div>
          <div className="content__item3">
            <h3>Đồng hồ Cơ Omega De ville Nam</h3>
            <Link to="/">Shop Now</Link>
          </div>
          <div className="content__item4">
            <h3>Fossil Nam FS6102SET</h3>
            <Link to="/">Shop Now</Link>
          </div>
        </div>
      </div>
      <div className="commits">
        <div className="item1">
          <div className="icon">
            <ClockCircleOutlined />
          </div>
          <h3>The most diverse designs</h3>
          <p>Refund if found to be selling fake goods</p>
        </div>
        <div className="item2">
          <div className="icon">
            <CarOutlined />
          </div>
          <h3>Free Shipping</h3>
          <p>Fast delivery, carefully packaged</p>
        </div>
        <div className="item3">
          <div className="icon">
            <DeliveredProcedureOutlined />
          </div>
          <h3>7 Day return</h3>
          <p>1 for 1 exchange within 7 days for defective products</p>
        </div>
        <div className="item4">
          <div className="icon">
            <SecurityScanOutlined />
          </div>
          <h3>5 years warranty</h3>
          <p>Quick procedure, free battery replacement</p>
        </div>
        <div className="item5">
          <div className="icon">
            <CheckSquareOutlined />
          </div>
          <h3>Wear first, pay later</h3>
          <p>Pay 1 part in advance, pay the remaining 2 parts later</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
