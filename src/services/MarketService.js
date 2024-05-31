const API = "http://192.168.1.55:3001/api";
// const API = "https://backendfactamdc.onrender.com/api";

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
    // console.log("markets", markets);
    return markets;
  } catch (error) {
    console.error("Error fetching markets", error);
  }
};
