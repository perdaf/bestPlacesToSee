const API_URL = "http://localhost:3000";

export const listeplace = async () => {
  const resp = await fetch(`${API_URL}/api/place`);
  return resp.json();
};
