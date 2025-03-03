export const fetchProvinces = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VACANCIES_API_URL}/api/provinces`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error(`Error fetching provinces: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return new Array<Province>();
  }
};
