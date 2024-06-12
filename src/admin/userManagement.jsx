import {
  EyeInvisibleFilled,
  EyeOutlined,
  EyeTwoTone,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
import { useEffect, useState } from "react";
// import province from "../assets/tinh_tp.json";
// import district from "../assets/quan_huyen.json";
// import ward from "../assets/xa_phuong.json";
import { validationAddUser } from "../components/checkValidation";

function UserManagement() {
  const [api, contextHolder] = notification.useNotification();
  const [listUsers, setListUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [modalDeleteData, setModalDeleteData] = useState({});
  const [confirmLoadingBtnConfirmDelete, setConfirmLoadingBtnConfirmDelete] =
    useState(false);
  const [dataUser, setDataUser] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "Customer",
  });
  const [checkInput, setCheckInput] = useState({});
  // const [provinceInput, setProvinceInput] = useState("");
  // const [districtInput, setDistrictInput] = useState("");
  // const [wardInput, setWardInput] = useState("");
  // const [provinceOptions, setProvinceOptions] = useState([]);
  // const [districtOptions, setDistrictOptions] = useState([]);
  // const [wardOptions, setWardOptions] = useState([]);
  // const arrayProvince = Object.values(province);
  // const arrayDistrict = Object.values(district);
  // const arrayWard = Object.values(ward);
  // // load province data
  // useEffect(() => {
  //   const itemProvince = [...provinceOptions];
  //   arrayProvince.map((item) => {
  //     itemProvince.push({
  //       value: item.code,
  //       label: item.name_with_type,
  //     });
  //   });

  //   setProvinceOptions(itemProvince);
  // }, []);

  // // load district data
  // useEffect(() => {
  //   const itemDistrict = [...districtOptions];
  //   arrayDistrict.map((item) => {
  //     if (item.parent_code === provinceInput) {
  //       itemDistrict.push({
  //         value: item.code,
  //         label: item.name_with_type,
  //       });
  //     }
  //   });

  //   setDistrictOptions(itemDistrict);
  // }, [provinceInput]);

  // // load ward data
  // useEffect(() => {
  //   const itemWard = [...wardOptions];
  //   arrayWard.map((item) => {
  //     if (item.parent_code === districtInput) {
  //       itemWard.push({
  //         value: item.code,
  //         label: item.name_with_type,
  //       });
  //     }
  //   });

  //   setWardOptions(itemWard);
  // }, [districtInput]);

  // handle validation enter input
  const handleBlurInput = (e) => {
    const { name, value } = e.target;
    const validations = validationAddUser[name];

    // check: If there is no input value when editing, there is no error
    if (!value && dataUser._id) {
      setCheckInput({
        ...checkInput,
        [name]: { status: "success", message: "" },
      });
    }

    // check: If there is no value when created, there is an error
    if (!value && !dataUser._id) {
      setCheckInput({
        ...checkInput,
        [name]: {
          status: "error",
          message: "This field is required!",
        },
      });
      return;
    }

    // check: If valid, continue error validation
    if (value) {
      if (Array.isArray(validations)) {
        for (let validation of validations) {
          if (!validation.validate(value)) {
            setCheckInput({
              ...checkInput,
              [name]: {
                status: "error",
                message: validation.message,
              },
            });
            return;
          }
        }

        setCheckInput({
          ...checkInput,
          [name]: {
            status: "success",
            message: "",
          },
        });
      } else if (validations && !validations.validate(value)) {
        setCheckInput({
          ...checkInput,
          [name]: {
            status: "error",
            message: validations.message,
          },
        });
      } else {
        setCheckInput({
          ...checkInput,
          [name]: {
            status: "success",
            message: "",
          },
        });
      }
    }
  };

  const handleChangeSelectRole = (value) => {
    setDataUser({ ...dataUser, role: value });
  };

  // handle enter input
  const handleChangeInput = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const showModalAdd = () => {
    setTitleModal("Add New User Information!");
    setIsModalOpen(true);
  };

  // handle tooltip check unique after check
  const onFocusInputAfterCheck = () => {
    if (checkInput?.code === 400) {
      setCheckInput({});
    }
  };

  // check required input and call api insert data user
  const handleOkModalAdd = async () => {
    let errorItem = {};
    if (!dataUser._id) {
      errorItem = Object.entries(dataUser).reduce((acc, [key, value]) => {
        if (value === "") {
          acc[key] = {
            status: "error",
            message: `${key} is required`,
          };
        }

        return acc;
      }, {});
      setCheckInput({ ...checkInput, ...errorItem });
    }

    if (
      Object.values(checkInput).every((item) => item.status === "success") &&
      Object.entries(errorItem).length === 0
    ) {
      if (dataUser._id) {
        axios
          .put("http://localhost:3000/api/v1/user/update-user", { ...dataUser })
          .then((result) => {
            handleCancelModalAdd();
            openNotification(
              "top",
              "Updated",
              `Update ${result.username} user successfully!`
            );
            getAllUsers();
          })
          .catch((err) => {
            if (err.response.status === 400) {
              setCheckInput({ ...err.response.data, code: 400 });
            }
          });
      } else {
        axios
          .post("http://localhost:3000/api/v1/user/create-user", {
            ...dataUser,
          })
          .then((result) => {
            handleCancelModalAdd();
            openNotification(
              "top",
              "Added",
              `Add ${result.username} user successfully!`
            );
            getAllUsers();
          })
          .catch((err) => {
            if (err.response.status === 400) {
              setCheckInput({ ...err.response.data, code: 400 });
            }
          });
      }
    }
  };

  // handle cancel modal add
  const handleCancelModalAdd = async () => {
    await setCheckInput({});
    await setIsModalOpen(false);
    setDataUser({
      name: "",
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      role: "Customer",
    });
  };

  // function call api list users
  const getAllUsers = () => {
    axios
      .get("http://localhost:3000/api/v1/user")
      .then((result) => {
        const listUsers = result.data.data.map((item, index) => {
          return { ...item, key: index };
        });
        setListUsers(listUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get api list users first time
  useEffect(() => {
    getAllUsers();
  }, []);

  // notification function
  const openNotification = (placement, message, description) => {
    api.success({
      message: message,
      description,
      placement,
    });
  };

  const handleUpdateUser = (record) => {
    const { _id, name, username, email, phoneNumber, role } = { ...record };
    setTitleModal("Update User information");
    setIsModalOpen(true);
    setDataUser({
      _id,
      name,
      username,
      email,
      phoneNumber,
      role,
      password: "",
    });
  };

  // call api and delete user
  const handleDeleteUser = () => {
    setConfirmLoadingBtnConfirmDelete(true);
    setTimeout(() => {
      axios
        .delete("http://localhost:3000/api/v1/user/delete-user", {
          data: { userId: modalDeleteData._id },
        })
        .then(() => {
          openNotification("top", "Deleted", `Delete user successfully!`);
          getAllUsers();
        })
        .catch((err) => {
          console.log(err);
        });
      setConfirmLoadingBtnConfirmDelete(false);
      setIsOpenConfirmDelete(false);
    }, 1000);
  };

  return (
    <div>
      {contextHolder}
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        User Management
      </h1>
      <div className="btn-action">
        <Button
          style={{ margin: "10px" }}
          icon={<UserAddOutlined />}
          type="primary"
          onClick={showModalAdd}
        >
          Add new user
        </Button>
        {/* Modal Add new User */}
        <Modal
          width="35%"
          title={titleModal}
          open={isModalOpen}
          onOk={handleOkModalAdd}
          onCancel={handleCancelModalAdd}
        >
          <label className="label-input">Name</label>
          <Tooltip
            placement="right"
            color="red"
            title={checkInput.name?.message}
            open={checkInput.name?.status === "error"}
          >
            <Input
              value={dataUser.name}
              name="name"
              status={checkInput.name?.status}
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
            />
          </Tooltip>

          <label className="label-input">Email</label>
          <Tooltip
            placement="right"
            color="red"
            title={checkInput.email?.message}
            open={checkInput.email?.status === "error"}
          >
            <Input
              value={dataUser.email}
              status={checkInput.email?.status}
              name="email"
              onBlur={handleBlurInput}
              onFocus={onFocusInputAfterCheck}
              onChange={handleChangeInput}
            />
          </Tooltip>

          <label className="label-input">Phone number</label>
          <Tooltip
            placement="right"
            color="red"
            title={checkInput.phoneNumber?.message}
            open={checkInput.phoneNumber?.status === "error"}
          >
            <Input
              value={dataUser.phoneNumber}
              status={checkInput.phoneNumber?.status}
              name="phoneNumber"
              onFocus={onFocusInputAfterCheck}
              onBlur={handleBlurInput}
              onChange={handleChangeInput}
            />
          </Tooltip>
          <br />
          <label className="label-input">Username</label>
          <Tooltip
            placement="right"
            color="red"
            title={checkInput.username?.message}
            open={checkInput.username?.status === "error"}
          >
            <Input
              onFocus={onFocusInputAfterCheck}
              value={dataUser.username}
              name="username"
              status={checkInput.username?.status}
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
            />
          </Tooltip>
          <br />
          <label className="label-input">Password</label>
          <Tooltip
            placement="right"
            color="red"
            title={checkInput.password?.message}
            open={checkInput.password?.status === "error"}
          >
            <div>
              <Input.Password
                value={dataUser.password}
                status={checkInput.password?.status}
                name="password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleFilled />
                }
                type="password..."
                onChange={handleChangeInput}
                onBlur={handleBlurInput}
              />
            </div>
          </Tooltip>
          <label className="label-input">Role:</label>
          <Select
            value={dataUser.role}
            defaultValue="Customer"
            style={{
              width: 200,
              margin: "20px 5px",
            }}
            onChange={handleChangeSelectRole}
            options={[
              {
                value: "Customer",
                label: "Customer",
              },
              {
                value: "Admin",
                label: "Admin",
              },
            ]}
          />

          {/* <label className="label-input">Address Delivery</label>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="address"
          >
            <Select
              id="province"
              style={{
                width: "33%",
                padding: "0 1% 0 0",
              }}
              placeholder="choose Province"
              onChange={(value) => {
                setProvinceInput(value);
              }}
              options={provinceOptions}
            />
            <Select
              id="district"
              style={{
                width: "33%",
              }}
              placeholder="choose District"
              onChange={(value) => {
                setDistrictInput(value);
              }}
              options={districtOptions}
            />
            <Select
              id="ward"
              style={{
                width: "33%",
                padding: "0 0 0 1%",
              }}
              placeholder="choose Ward"
              onChange={(value) => {
                setWardInput(value);
              }}
              options={wardOptions}
            />
          </div>
          <label className="label-input">
            Street Name, Building, House No....
          </label>
          <Input
            onChange={(e) =>
              setDataAccount({ ...dataAccount, street: e.target.value })
            }
          /> */}
        </Modal>
      </div>
      <div className="data-table">
        <Table dataSource={listUsers}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Username" dataIndex="username" key="username" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column
            title="Phone number"
            dataIndex="phoneNumber"
            key="phoneNumber"
          />
          <Column title="Create At" dataIndex="createdAt" key="createdAt" />
          <Column
            title="Role"
            dataIndex="role"
            key="role"
            render={(role) => {
              return (
                <Tag color={role === "Customer" ? "cyan" : "red"}>{role}</Tag>
              );
            }}
          />
          <Column
            width="20%"
            align="right"
            title="AddressDelivery"
            dataIndex="addressDelivery"
            render={(tags) => {
              const color = tags.length == 0 ? "volcano" : "green";
              return (
                <>
                  <Tag color={color}>{tags.length}</Tag>
                  <Button type="text">
                    <EyeOutlined />
                  </Button>
                </>
              );
            }}
            key="AddressDelivery"
          />

          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button type="dashed" onClick={() => handleUpdateUser(record)}>
                  Update
                </Button>
                <Button
                  type="dashed"
                  danger
                  onClick={() => {
                    setModalDeleteData(record);
                    setIsOpenConfirmDelete(true);
                  }}
                  icon={<UserDeleteOutlined />}
                >
                  Delete
                </Button>
                <Modal
                  title="Delete"
                  open={isOpenConfirmDelete}
                  onOk={handleDeleteUser}
                  confirmLoading={confirmLoadingBtnConfirmDelete}
                  onCancel={() => {
                    setModalDeleteData("");
                    setIsOpenConfirmDelete(false);
                  }}
                >
                  <p>
                    Are you sure want to delete{" "}
                    {`'${modalDeleteData.username}'`} user
                  </p>
                </Modal>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
}

export default UserManagement;
