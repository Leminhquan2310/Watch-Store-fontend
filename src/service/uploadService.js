import instance from "./configService.js";

export const uploadImage = async (formData) => {
  const response = await instance.post("upload/upload-images", formData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  return response.data;
};

export const removeImages = async (data) => {
  const response = await instance.delete(
    "upload/delete-images",
    { data: { idImages: data } },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
  return response.data;
};
