import instance from "./configService";

export const getAllBrand = async () => {
  const response = await instance.get("brand");
  return response.data;
};

export const createBrand = async (formData) => {
  const response = await instance.post("brand/create-brand", formData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  return response.data;
};

export const updateBrand = async (formData) => {
  const response = await instance.put("brand/update-brand", formData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  return response.data;
};

export const deleteBrand = async (id) => {
  const response = await instance.delete(`brand/delete-brand/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  return response.data;
};
