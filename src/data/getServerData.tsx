import { BASE_QUERY } from "./constants/BASE_QUERY";

export const getBaseServerData = async () => {
  const clientId = process.env.GATSBY_CLIENT_ID;
  const res = await fetch(process.env.GATSBY_GRAPHQL_URL || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: BASE_QUERY,
    }),
  });
  const results = await res.json();
  console.log(results);
  return {
    props: {
      meta: results.data.meta[0],
    },
  };
};
