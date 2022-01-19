import { $authHost } from ".";

export const fetchTasks = async (collectionId) => {
  const { data } = await $authHost.get(`api/tasks/${collectionId}`);
  return data;
};

export const createTask = async (task) => {
  const { data } = await $authHost.post("api/tasks", task);
  return data;
};

export const updateTask = async (task) => {
  const { data } = await $authHost.put(`api/tasks/${task.id}`, task);
  return data;
};
