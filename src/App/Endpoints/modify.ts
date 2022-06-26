import { item } from "src/App/Entities";

export async function fetchItems(roomId: string, token: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`/api/rooms/${roomId}/items/`, requestOptions);

  const text = await response.text();
  const data: item[] = text && JSON.parse(text);

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
}

export async function addItem(item: item, token: string) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };
  const response = await fetch(`/api/items/add/`, requestOptions);

  const text = await response.text();
  const data = text && JSON.parse(text);

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
}

export async function updateItem(
  itemId: string,
  updatedItem: item,
  token: string
) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedItem),
  };

  const response = await fetch(`/api/items/update/${itemId}`, requestOptions);

  const text = await response.text();
  const data = text && JSON.parse(text);

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
}

export async function deleteItem(itemId: string, token: string) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`/api/items/${itemId}`, requestOptions);

  const text = await response.text();
  const data = text && JSON.parse(text);

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
}
