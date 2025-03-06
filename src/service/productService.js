import instance from "./configService.js";

export const createProduct = async (data) => {
  const response = await instance.post("product/create-product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  return response.data;
};

export const getAllProduct = async () => {
  const response = await instance.get("product", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  return response.data;
};

export const getProductCondition = async (data) => {
  const response = await instance.get(
    `product/product-condition?sold=${data.sort}&discount=${
      data.discount
    }&limit=${data.limit ?? 0}&skip=${data.skip ?? 0}`
  );
  return response.data;
};

export const getOneProduct = async (id) => {
  const response = await instance.get(
    "product/get-product",
    { params: { id } },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
  return response.data;
};

export const updateProduct = async (data) => {
  const response = await instance.post("product/update-product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  return response.data;
};

export const deleteProduct = async (pro_id) => {
  const response = await instance.delete(`product/delete-product/${pro_id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  return response;
};
