import { useLoaderData } from "react-router-dom";
import axios from "axios";
import SearchForm from "../Components/SearchForm";
import CocktailList from "../Components/CocktailList";
import { useQuery } from "@tanstack/react-query";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || " "],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    // console.log(request);

    const url = new URL(request.url);

    const searchTerm = url.searchParams.get("search") || "all";

    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));

    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();

  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
