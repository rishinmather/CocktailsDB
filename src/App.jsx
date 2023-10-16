import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Landing,
  NewsLetter,
  Cocktail,
  HomeLayout,
  Error,
  SinglePageError,
} from "./pages/Index";

import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCockTailLoader } from "./pages/Cocktail";

import { action as newsLetterAction } from "./pages/NewsLetter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,

        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryClient),
      },
      {
        path: "/cocktail/:id",
        element: <Cocktail />,
        loader: singleCockTailLoader(queryClient),
        errorElement: <SinglePageError />,
      },
      {
        path: "/newsletter",
        element: <NewsLetter />,
        action: newsLetterAction,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
