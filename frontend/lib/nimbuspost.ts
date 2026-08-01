const API_BASE = "https://ship.nimbuspost.com/api";

export async function getNimbusToken() {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: process.env.NIMBUSPOST_API_EMAIL,
      password: process.env.NIMBUSPOST_API_PASSWORD,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || "NimbusPost login failed");
  }

  return data.data; // <-- returns JWT token
}
export async function createShipment(token: string, body: any) {
  const response = await fetch("https://api.nimbuspost.com/v1/shipments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

console.log("Nimbus Response:", JSON.stringify(data, null, 2));

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Failed to create shipment");
  }

  return data.data;
}