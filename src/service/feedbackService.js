import instance from "./configService";

export const getAllFeedback = async () => {
  const response = await instance.get("feedback", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const createFeedback = async (data) => {
  const response = await instance.post("feedback", data);
  return response.data;
};
