import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Button, Form, Image, Input, Modal, Table, Upload } from "antd";
import { useContext, useEffect, useState } from "react";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  updateBrand,
} from "../../../service/brandService";
import { useNavigate } from "react-router-dom";
import { NotifyContext } from "../../../components/notifyContext";
import "./brand-list.css";

// func convert file image to file base64 for preview
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function BrandList() {
  const nav = useNavigate();
  const { runNotification } = useContext(NotifyContext);
  const [listBrand, setListBrand] = useState([]);
  const [brandIdDel, setBrandIdDel] = useState("");
  const [brandIdUpdate, setBrandIdUpdate] = useState("");
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [form] = Form.useForm();
  const [titleModal, setTitleModal] = useState("");
  const [isLoadingBtnAdd, setIsLoadingBtnAdd] = useState(false);
  const [isLoadingBtnDel, setIsLoadingBtnDel] = useState(false);
  const [image, setImage] = useState([]);
  const [previewImage, setPreviewImage] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    fetchCallApiGetAllBrand();
  }, []);

  const fetchCallApiGetAllBrand = async () => {
    try {
      const result = await getAllBrand();
      const listData = result.data.map((item) => {
        return { ...item, key: item._id };
      });
      setListBrand(listData);
    } catch (error) {
      nav("/login");
    }
  };

  const handleOkDel = () => {
    setIsLoadingBtnDel(true);
    const fetchCallApiDelBrand = async () => {
      try {
        await deleteBrand(brandIdDel);
        runNotification(
          "success",
          "Deleted",
          "top",
          "Delete this brand successfully!!"
        );
      } catch (error) {
        runNotification(
          "warning",
          "Delete Failed",
          "top",
          "Delete this brand Failed!!"
        );
      } finally {
        setBrandIdDel("");
        setIsOpenModalDel(false);
        setIsLoadingBtnDel(false);
        fetchCallApiGetAllBrand();
      }
    };
    fetchCallApiDelBrand();
  };

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image.file.originFileObj);
    const fetchCallApiUpdateBrand = async () => {
      formData.append("id", brandIdUpdate);
      setIsLoadingBtnAdd(true);
      try {
        const result = await updateBrand(formData);
        if (result.message == "Updated") {
          runNotification(
            "success",
            "Updated",
            "top",
            "Updated new brand successfully!"
          );
          fetchCallApiGetAllBrand();
        }
      } catch (error) {
        runNotification(
          "warning",
          "Update Failed",
          "top",
          "Update new brand failed!"
        );
      } finally {
        setIsOpenModalAdd(false);
        setBrandIdUpdate("");
        form.resetFields();
        setIsLoadingBtnAdd(false);
        setImage([]);
      }
    };

    const fetchCallApiCreateBrand = async () => {
      setIsLoadingBtnAdd(true);
      try {
        const result = await createBrand(formData);
        if (result.message === "Created") {
          runNotification(
            "success",
            "Created",
            "top",
            "Created new brand successfully!"
          );
        }
      } catch (error) {
        runNotification(
          "warning",
          "Create Failed",
          "top",
          "Create new brand failed!"
        );
      } finally {
        setIsOpenModalAdd(false);
        form.resetFields();
        setIsLoadingBtnAdd(false);
        setImage([]);
        fetchCallApiGetAllBrand();
      }
    };
    if (brandIdUpdate === "") {
      fetchCallApiCreateBrand();
    } else {
      fetchCallApiUpdateBrand();
    }
  };

  const handleChangeImage = ({ fileList: newFileList }) => {
    setImage(newFileList);
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

  const handlePreviewImage = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 200,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 200,
      render: (text, record) => {
        return (
          <img
            width="100%"
            height="80px"
            src={record.image.url}
            alt={record.public_id}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      maxWidth: 900,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <>
            <Button
              size="small"
              type="link"
              onClick={() => {
                setIsOpenModalAdd(true);
                setTitleModal("Update Brand");
                setBrandIdUpdate(record._id);
                form.setFieldValue("name", record.name);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              size="small"
              type="link"
              onClick={() => {
                setIsOpenModalDel(true);
                setBrandIdDel(record._id);
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="brand">
      {/* Modal Add/update Brand */}
      <Modal
        title={titleModal}
        open={isOpenModalAdd}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setIsOpenModalAdd(false);
          setBrandIdUpdate("");
          form.resetFields();
          setImage([]);
        }}
        confirmLoading={isLoadingBtnAdd}
      >
        <Form
          form={form}
          variant="outlined"
          onFinish={onFinish}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
            name="image"
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
              onChange={handleChangeImage}
              fileList={image}
              listType="picture-card"
              onPreview={handlePreviewImage}
              style={{
                width: "300px",
              }}
            >
              {image.length < 1 && <Button type="dashed">Upload</Button>}
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
        </Form>
      </Modal>

      {/* Modal delete brand */}
      <Modal
        title="Delete Brand"
        open={isOpenModalDel}
        onOk={handleOkDel}
        onCancel={() => {
          setIsLoadingBtnDel(false);
          setIsOpenModalDel(false);
        }}
        confirmLoading={isLoadingBtnDel}
      >
        <p>Are you sure you want to delete this brand?</p>
      </Modal>
      <h4 className="title">BRAND MANAGEMENT</h4>
      <Button
        icon={<PlusSquareOutlined />}
        className="btn-action"
        onClick={() => {
          setIsOpenModalAdd(true);
          setTitleModal("Add new a brand");
        }}
      >
        Add
      </Button>
      <Table
        // loading={loadingTable}
        bordered="bordered"
        // onChange={handleChange}
        scroll={{
          x: 1000,
        }}
        dataSource={listBrand}
        columns={columns}
      ></Table>
    </div>
  );
}

export default BrandList;
