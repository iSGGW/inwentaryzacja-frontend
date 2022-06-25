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
