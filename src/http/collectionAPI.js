import { $authHost } from "./";

export const createCollection = async (collection) => {
  const { data } = await $authHost.post("api/collections", collection);
  return data;
};

export const fetchCollections = async () => {
  const { data } = await $authHost.get("api/collections");
  return data;
};

export const updateCollection = async (collection) => {
  const { data } = await $authHost.put(
    `api/collections/${collection.id}`,
    collection
  );
  return data;
};

export const deleteCollection = async (id) => {
  const { data } = await $authHost.delete(`api/collections/${id}`);
  return data;
};
