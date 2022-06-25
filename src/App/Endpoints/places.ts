import { building, floor, room } from "src/App/Entities";

export async function fetchBuildings(token: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch("/api/buildings/", requestOptions);

  const text = await response.text();
  const data: building[] = text && JSON.parse(text);

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
}

export async function fetchFloors(buildingId: string, token: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `/api/buildings/${buildingId}/floors/`,
    requestOptions
  );

  const text = await response.text();
  const data: floor[] = text && JSON.parse(text);

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
}

export async function fetchRooms(floorId: string, token: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`/api/floors/${floorId}/rooms/`, requestOptions);

  const text = await response.text();
  const data: room[] = text && JSON.parse(text);

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
}
