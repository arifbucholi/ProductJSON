export const getCurrency = async () => {
  const response = await fetch(
    "https://open.er-api.com/v6/latest/USD"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rate");
  }

  return response.json();
};