import { Button, Modal, Space, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteProduct, getAllProduct } from "../../../service/productService";
import { getAllBrand } from "../../../service/brandService";
import {
  ClearOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { NotifyContext } from "../../../components/notifyContext";
// import "./product-css/product-list.css";

function ProductList() {
  const [isModalOpenDel, setIsModalOpenDel] = useState(false);
  const [idProductDel, setIdProductDel] = useState("");
  const [listProduct, setListProduct] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [loadingTable, setLoadingTable] = useState(false);
  const nav = useNavigate();
  const { runNotification } = useContext(NotifyContext);
  const location = useLocation();

  const notifyFunc = () => {
    if (location.state !== null) {
      runNotification(
        "success",
        location.state.notification,
        "top",
        location.state.description
      );
      nav(location.pathname, { replace: true });
    }
  };

  const handleOkDel = async () => {
    try {
      const result = await deleteProduct(idProductDel);
      if (result.status === 204) {
        runNotification(
          "success",
          "Deleted",
          "top",
          "Deleted this product in databases!"
        );
      }
    } catch (error) {
      runNotification(
        "warning",
        "Delete Failed",
        "top",
        "Can't delete this product!"
      );
    } finally {
      setIsModalOpenDel(false);
      fetchApiGetAllProduct();
    }
  };

  const fetchApiGetAllProduct = async () => {
    setLoadingTable(true);
    try {
      const result = await getAllProduct();
      const dataProduct = result.data.map((value, index) => {
        return { ...value, key: index, brand_info: value.brand_info.name };
      });
      setListProduct(dataProduct);
      setLoadingTable(false);
    } catch (error) {
      nav("/login");
    }
  };

  const fetchApiGetAllBrand = async () => {
    try {
      const result = await getAllBrand();
      setListBrand(result.data);
    } catch (error) {
      nav("/login");
    }
  };

  useEffect(() => {
    notifyFunc();
    fetchApiGetAllProduct();
    fetchApiGetAllBrand();
  }, []);

  const columns = [
    {
      title: "Product",
      dataIndex: "image_main",
      key: "image_main",
      width: 130,
      fixed: "left",
      render: (text, record) => {
        return (
          <img
            src={record.image_main.url}
            alt={record.name}
            style={{ width: "100px", height: "auto" }}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 200,
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 500,
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: 80,
      filters: [
        {
          text: "Unisex",
          value: "Unisex",
        },
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
        },
      ],
      filteredValue: filteredInfo.sex || null,
      onFilter: (value, record) => record.sex.includes(value),
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
      width: 120,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
      sorter: (a, b) => a.price - b.price,
      render: (_, record) => {
        return record.price.toLocaleString() + " VND";
      },
    },
    {
      title: "warranty",
      dataIndex: "warranty",
      key: "warranty",
      width: 100,
    },
    {
      title: "Brand",
      dataIndex: "brand_info",
      key: "brand_info",
      width: 120,
      filters: listBrand.map((item) => {
        return { text: item.name, value: item.name };
      }),
      filteredValue: filteredInfo.brand_info || null,
      onFilter: (value, record) => record.brand_info.includes(value),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 100,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: 100,
      render: (_, record) => {
        return record.discount + "%";
      },
    },
    {
      title: "Image Details",
      dataIndex: "image_detail",
      key: "image_detail",
      width: 600,
      render: (_, record) => {
        return (
          <>
            {record.image_detail.map((item, index) => {
              return (
                <img
                  key={index}
                  src={item.url}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "5px",
                    border: "1px solid #999",
                  }}
                />
              );
            })}
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <>
          <Button
            size="small"
            type="link"
            onClick={() => {
              nav("/dashboard/update-product", { state: { data: record } });
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            size="small"
            type="link"
            onClick={() => {
              setIsModalOpenDel(true);
              setIdProductDel(record._id);
            }}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Button>
        </>
      ),
      fixed: "right",
    },
  ];
  return (
    <div className="product-list">
      <Modal
        title="Delete Product"
        open={isModalOpenDel}
        onOk={handleOkDel}
        onCancel={() => {
          setIsModalOpenDel(false);
          setIdProductDel("");
        }}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
      <h4 className="title">PRODUCT MANAGEMENT</h4>
      <Space className="btn-action">
        <Button
          icon={<PlusSquareOutlined />}
          onClick={() => {
            nav("/dashboard/create-product");
          }}
        >
          Add
        </Button>
        <Button
          icon={<ClearOutlined />}
          className="custom-button"
          onClick={() => {
            setFilteredInfo({});
          }}
        >
          Clear Filters
        </Button>
      </Space>
      <Table
        loading={loadingTable}
        bordered="bordered"
        onChange={(pagination, filters) => {
          setFilteredInfo(filters);
        }}
        scroll={{
          x: 1000,
        }}
        dataSource={listProduct}
        columns={columns}
      ></Table>
    </div>
  );
}

export default ProductList;
