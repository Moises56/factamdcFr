const API = "http://172.21.2.100:3001/api";

// Get all markets
export const getMarkets = async () => {
  try {
    const response = await fetch(`${API}/markets`);
    const markets = await response.json();
    return markets;
  } catch (error) {
    console.error("Error fetching markets", error);
  }
};
