import axiosInstance from "./axiosInstance";

export const registerUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("api/Auth/Register", null, {
      params: {
        email,
        password
      }
    });
    console.log("Success:", response);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/Auth/Login", null, {
      params: {
        email,
        password
      }
    });
    return response;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const getUserProfile = async ({ userId }) => {
  try {
    const response = await axiosInstance.get(`/api/Account/GetById/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};
