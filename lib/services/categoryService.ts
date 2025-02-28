export const fetchCategories = async () => {
  const BASE_URL = `https://localhost:7290`; //`${process.env.VACANCIES_API_URL}/api/vacancies`
  try {
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const response = await fetch(`${BASE_URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
