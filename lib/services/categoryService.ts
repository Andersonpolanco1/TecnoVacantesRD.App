import config from "@/config/config_dev";
import { arrayBuffer } from "stream/consumers";

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${config.VACANCIES_API_URL}/api/categories`, {
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
    return new Array<Category>();
  }
};
