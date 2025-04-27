import axios from "axios";
const API_BASE_URL = "https://wayi.league-funny.com/api";

export const getTasks = async (page, type) => {
  const response = await axios.get(`${API_BASE_URL}/task`, {
    params: {
      page: page,
      type: type,
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch tasks");
  }
  return response.data;
};

//post
export const createTask = async (taskData) => {
  const response = await axios.post(`${API_BASE_URL}/task`, {
    ...taskData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  return response.data;
};

//patch
export const patchTask = async (id, updateData) => {
  const response = await axios.patch(`${API_BASE_URL}/task/${id}`, {
    ...updateData,
    updated_at: new Date().toISOString(),
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/task/${id}`);
  return response.data;
};
