const API = "http://172.21.2.100:3001/api";
// |const API = "http://192.168.0.10:3001/api";

// http://localhost:3001/api/marketsByLocalidad/2

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

// get marketsByLocalidad
export const getMarketsByLocalidad = async (marketId) => {
  try {
    const response = await fetch(`${API}/marketsByLocalidad/${marketId}`);
    const markets = await response.json();
    return markets;
  } catch (error) {
    console.error("Error fetching markets", error);
  }
};
