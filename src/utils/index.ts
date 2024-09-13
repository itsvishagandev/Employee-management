export const getOrganizationDetails = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/sample-api-response.json`
    );
    const data = await response.json();
    return data.organization;
  } catch (error) {
    console.error("Error fetching the data:", error);
    return [];
  }
};
