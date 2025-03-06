import {
  CheckOutlined,
  ExclamationCircleFilled,
  LeftOutlined,
} from "@ant-design/icons";
import { Button, Form, Image, Input, Modal, Select, Spin, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createBrand, getAllBrand } from "../../../service/brandService";
import { updateProduct } from "../../../service/productService";
import { NotifyContext } from "../../../components/notifyContext";
import { useForm } from "antd/es/form/Form";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ProductUpdate() {
  const nav = useNavigate();
  const location = useLocation();
  const [initProductValue, setInitProductValue] = useState(
    location.state?.data
  );
  const { runNotification } = useContext(NotifyContext);
  const [listBrand, setListBrand] = useState([]);
  const [percent, setPercent] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [imageMain, setImageMain] = useState([initProductValue.image_main]);
  const [listFileUpload, setListFileUpload] = useState(
    initProductValue.image_detail
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isOpenModalAddBrand, setIsOpenModalAddBrand] = useState(false);
  const [loadingBtnAddBrand, setLoadingBtnAddBrand] = useState(false);
  const [imageBrand, setImageBrand] = useState([]);
  const [form] = useForm();

  // function show loading and display notify when create failed
  const showLoaderDanger = (message) => {
    let ptg = -10;
    const interval = setInterval(() => {
      ptg += 10;
      setPercent(ptg);
      if (ptg > 100) {
        clearInterval(interval);
        setSpinning(false);
        setPercent(0);
        runNotification("error", "Created failed", "top", message);
      }
    }, 100);
  };

  const customRequest = ({ onSuccess }) => {
    let time = 10;
    setInterval(() => {
      time += 10;
      if (time === 100) {
        onSuccess();
      }
    }, 100);
    return false;
  };

  const fetchApiGetAllBrand = async () => {
    try {
      const result = await getAllBrand();
      setListBrand(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiGetAllBrand();
  }, []);

  const handleFinish = (value) => {
    const formData = new FormData();
    const saved_image_detail = [];
    if (value.image_detail.fileList) {
      value.image_detail.fileList.forEach((file) => {
        if (!file.originFileObj) {
          saved_image_detail.push(file.public_id);
        } else {
          formData.append("image_detail", file.originFileObj);
        }
      });
    }

    if (value.image_main.fileList) {
      if (value.image_main.fileList[0]) {
        formData.append(
          "image_main",
          value.image_main.fileList[0].originFileObj
        );
      }
    }
    formData.append("_id", initProductValue._id);
    formData.append("name", value.name);
    formData.append("description", value.description);
    formData.append("brand_id", value.brand_id);
    formData.append("sex", value.sex);
    formData.append("price", value.price);
    formData.append("origin", value.origin);
    formData.append("warranty", value.warranty);
    formData.append("color", value.color);
    formData.append("discount", value.discount);
    formData.append(
      "saved_image_detail",
      saved_image_detail.length == 0
        ? initProductValue.image_detail.map((image) => image.public_id)
        : saved_image_detail
    );

    const fetchApiCreateProduct = async () => {
      setSpinning(true);
      if (value.image_main.fileList) {
        if (value.image_main.fileList?.length !== 1) {
          return showLoaderDanger('Please enter 1 file "Image Main"');
        }
      }

      if (value.image_detail.fileList) {
        if (value.image_detail.fileList?.length !== 5) {
          return showLoaderDanger('Please enter  5 file "Image Detail"');
        }
      }

      const result = await updateProduct(formData);
      if (result.message === "Updated") {
        setSpinning(false);
        nav("/dashboard/product", {
          state: {
            notification: "Updated",
            description: "Updated product in database",
          },
        });
      } else {
        showLoaderDanger("Update product failed!");
      }
    };

    fetchApiCreateProduct();
  };

  const handleChangeImageMain = ({ fileList: newFileList }) => {
    setImageMain(newFileList);
  };

  const handleChangeImageDetails = ({ fileList: newFileList }) => {
    setListFileUpload(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const showModalAddBrand = () => {
    setIsOpenModalAddBrand(true);
  };

  const hideModalAddBrand = () => {
    setIsOpenModalAddBrand(false);
  };

  const handleChangeImageBrand = ({ fileList: newFileList }) => {
    setImageBrand(newFileList);
  };

  const handleOkAddBrand = () => {
    form.submit();
  };
  const onFinishAddBrand = (values) => {
    setLoadingBtnAddBrand(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.imageBrand.file.originFileObj);
    const fetchApiCreateBrand = async () => {
      try {
        const result = await createBrand(formData);
        runNotification("success", "Created!", "top", "Created new brand!");
      } catch (error) {
        runNotification(
          "warning",
          "Create Failed!",
          "top",
          "Created new brand failed"
        );
      } finally {
        setLoadingBtnAddBrand(false);
        setIsOpenModalAddBrand(false);
        setImageBrand([]);
        fetchApiGetAllBrand();
      }
    };
    fetchApiCreateBrand();
  };

  const toProductPage = () => {
    nav("/dashboard/product");
  };

  return (
    <div className="product-list">
      <Spin spinning={spinning} percent={percent} fullscreen />
      <Modal
        title="Add new Brand"
        open={isOpenModalAddBrand}
        onCancel={hideModalAddBrand}
        onOk={handleOkAddBrand}
        confirmLoading={loadingBtnAddBrand}
      >
        <Form form={form} onFinish={onFinishAddBrand}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter brand name!",
              },
            ]}
            style={{ width: "100%", marginTop: "20px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image"
            name="imageBrand"
            style={{ width: "100%", marginTop: "20px" }}
            rules={[
              {
                required: true,
                message: "Please choose image!",
              },
            ]}
          >
            <Upload
              customRequest={customRequest}
              onChange={handleChangeImageBrand}
              fileList={imageBrand}
              listType="picture-card"
              onPreview={handlePreview}
              style={{
                width: "300px",
              }}
            >
              {imageBrand.length < 1 && <Button type="dashed">Upload</Button>}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <h4 className="title">
        <LeftOutlined onClick={toProductPage} />
        UPDATE PRODUCT
      </h4>
      <Form
        onFinish={handleFinish}
        initialValues={initProductValue}
        {...formItemLayout}
        variant="outlined"
        style={{
          width: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <TextArea style={{ minHeight: "100px" }} />
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand_id"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
            extra={<Link onClick={showModalAddBrand}>Add new a brand</Link>}
          >
            <Select
              options={listBrand.map((brand) => {
                return { value: brand._id, label: brand.name };
              })}
            />
          </Form.Item>
          <Form.Item
            label="Sex"
            name="sex"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select
              options={[
                { value: "Unisex", label: "Unisex" },
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
              {
                pattern: /[0-9]/,
                message: "Invalid value",
              },
            ]}
          >
            <Input
              style={{
                width: "100%",
              }}
              placeholder="VND"
            />
          </Form.Item>

          <Form.Item
            label="Origin"
            name="origin"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Warranty"
            name="warranty"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Color"
            name="color"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button className="btn-submit" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </div>
        <div
          style={{
            width: "50%",
          }}
        >
          <Form.Item
            labelCol={{ span: 24 }}
            label={
              <>
                Image Main ({imageMain.length}/1)
                {imageMain.length === 1 ? (
                  <CheckOutlined
                    style={{
                      marginLeft: "5px",
                      fontWeight: "bold",
                      color: "rgb(0, 227, 150)",
                    }}
                  />
                ) : (
                  <ExclamationCircleFilled
                    style={{
                      marginLeft: "5px",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  />
                )}
              </>
            }
            name="image_main"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
            style={{
              minHeight: "142px",
            }}
          >
            <Upload
              customRequest={customRequest}
              onChange={handleChangeImageMain}
              listType="picture-card"
              fileList={imageMain}
              onPreview={handlePreview}
            >
              {imageMain.length < 1 && <Button type="dashed">Upload</Button>}
            </Upload>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{
              span: 24,
            }}
            label={
              <>
                Image Details ({listFileUpload.length}/5)
                {listFileUpload.length === 5 ? (
                  <CheckOutlined
                    style={{
                      marginLeft: "5px",
                      fontWeight: "bold",
                      color: "rgb(0, 227, 150)",
                    }}
                  />
                ) : (
                  <ExclamationCircleFilled
                    style={{
                      marginLeft: "5px",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  />
                )}
              </>
            }
            name="image_detail"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Upload
              customRequest={customRequest}
              onChange={handleChangeImageDetails}
              listType="picture-card"
              fileList={listFileUpload}
              onPreview={handlePreview}
              showUploadList={true}
            >
              {listFileUpload.length < 5 && (
                <Button type="dashed">Upload</Button>
              )}
            </Upload>
          </Form.Item>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </div>
      </Form>
    </div>
  );
}

export default ProductUpdate;
