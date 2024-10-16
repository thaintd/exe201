import axiosInstance from "./axiosInstance";

export const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get(`/api/Post/getAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
