import { Breadcrumb, Button, Divider, Form, Input } from "antd";
import "./contact_page.css";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { createFeedback } from "../../../service/feedbackService";
import { useContext } from "react";
import { NotifyContext } from "../../../components/notifyContext";
import { useForm } from "antd/es/form/Form";

function Contact() {
  const { runNotification } = useContext(NotifyContext);
  const [form] = useForm();

  const handleSubmit = (values) => {
    const fetchApiCreateFeedback = async () => {
      try {
        const result = await createFeedback(values);
        if (result) {
          form.resetFields();
          runNotification(
            "success",
            "Thank you!",
            "top",
            "Thanks you for feedback"
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiCreateFeedback();
  };

  return (
    <div className="contact">
      <Breadcrumb
        className="contact__breadcrumb"
        items={[
          {
            title: <a href="/">Home</a>,
          },
          {
            title: "Contact",
          },
        ]}
      />
      <div className="contact__content">
        <div className="content__information">
          <div className="call-us">
            <div className="call-us__box">
              <div className="call-us__box--icon">
                <PhoneOutlined />
              </div>
              <div className="call-us__box--text">Call To Us</div>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </div>
          <Divider />
          <div className="write-us">
            <div className="write-us__box">
              <div className="write-us__box--icon">
                <MailOutlined />
              </div>
              <div className="write-us__box--text">Write To Us</div>
            </div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
          </div>
        </div>
        <div className="content__feedback">
          <Form form={form} onFinish={handleSubmit}>
            <div className="feedback__form">
              <div className="input__name">
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </div>
              <div className="input__email">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Your Email" />
                </Form.Item>
              </div>
              <div className="input__phone">
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Your Phone Number" />
                </Form.Item>
              </div>
              <div className="input__message">
                <Form.Item
                  name="message"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea
                    autoSize={{ minRows: 8, maxRows: 12 }}
                    placeholder="Your Message"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="input_submit">
              <Form.Item>
                <Button htmlType="submit">Send Message</Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
