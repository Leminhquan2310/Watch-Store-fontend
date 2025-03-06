import instance from "./configService.js";

export const getAllUser = async () => {
  try {
    const response = await instance.get("user/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getOneUser = async (userId) => {
  try {
    const response = await instance.get(
      "user/get-user",
      { data: { userId } },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createUser = async (data) => {
  const response = await instance.post("user/create-user", data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  return response;
};

export const updateUser = async (data) => {
  const response = await instance.put("user/update-user", data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  return response;
};

export const deleteUser = async (userId) => {
  await instance.delete(
    "user/delete-user",
    { data: { userId } },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
};
