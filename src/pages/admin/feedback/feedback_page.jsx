import { Button, Table } from "antd";
import "./feedback_page.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllFeedback } from "../../../service/feedbackService";

function Feedback() {
  const [listFeedback, setListFeedback] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  const fetchApiGetFeedbacks = async () => {
    setLoadingTable(true);
    try {
      const result = await getAllFeedback();
      setListFeedback(result.data);
      setLoadingTable(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiGetFeedbacks();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 100,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 180,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 100,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: 500,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
      render: () => (
        <>
          <Button size="small" type="link">
            <EditOutlined />
          </Button>
          <Button size="small" type="link">
            <DeleteOutlined style={{ color: "red" }} />
          </Button>
        </>
      ),
      fixed: "right",
    },
  ];
  return (
    <div className="feedback-list">
      <h4 className="title">FEEDBACK MANAGEMENT</h4>
      <Table
        loading={loadingTable}
        bordered="bordered"
        scroll={{
          x: 1000,
        }}
        dataSource={listFeedback}
        columns={columns}
      ></Table>
    </div>
  );
}

export default Feedback;
