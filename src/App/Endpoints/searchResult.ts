import { searchResult } from "src/App/Entities";

export async function fetchItemsByRoom(roomId: string, token: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`/api/rooms/${roomId}/items`, requestOptions);

  const text = await response.text();
  const data: searchResult[] = text && JSON.parse(text);

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
}

export async function fetchItemsById(id: string, token: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`/api/items/${id}`, requestOptions);

  const text = await response.text();
  const data: searchResult = text && JSON.parse(text);

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
}
