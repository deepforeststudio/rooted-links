import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { ChakraProvider } from "@chakra-ui/react";
import { IndexPage } from "../components/IndexPage";
import { Auth0Provider } from "@auth0/auth0-react";

const App = (props: PageProps) => {
  if (process.env.GATSBY_AUTH0_CLIENT_ID) {
    return (
      <Auth0Provider
        domain={process.env.GATSBY_AUTH0_DOMAIN}
        clientId={process.env.GATSBY_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.href,
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <ChakraProvider>
          <IndexPage {...props} />
        </ChakraProvider>
      </Auth0Provider>
    );
  }

  return (
    <ChakraProvider>
      <IndexPage {...props} />
    </ChakraProvider>
  );
};

export default App;

export async function getServerData() {
  const clientId = process.env.GATSBY_CLIENT_ID;
  const res = await fetch(process.env.GATSBY_GRAPHQL_URL || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetPageMeta {
          meta(where: { clientId: { _eq: "${clientId}" } }) {
            ageRestricted
            background
            defaultButtonColor
            defaultButtonTextColor
            description
            externalCss
            id
            ogDescription
            ogImage
            ogSiteName
            ogTitle
            ogUrl
            profileImage
            textColor
            title
            twitterImageAlt
            twitterSite
            url
            defaultOverrides
            clientId
            overrideCSS
            hasCalendarsEnabled
            links(order_by: { order: asc }) {
              calendar
              calendarLabel
              calendarUrl
              categoryFilters
              clientId
              icon
              icontype
              id
              isAgeRestricted
              label
              url
              order
            }
            links_aggregate {
              aggregate {
                count
              }
            }
          }
        }
      `,
    }),
  });
  const results = await res.json();
  console.log(results);
  return {
    props: {
      meta: results.data.meta[0],
    },
  };
}

export const Head: HeadFC = ({ serverData }) => {
  const config = (serverData as any)?.meta || {};
  return (
    <>
      <title>{config?.title}</title>
      <meta name="description" content={config?.description} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:title" content={config?.ogTitle} />
      <meta property="og:type" content={config?.ogType} />
      <meta property="og:image" content={config?.ogImage} />
      <meta property="og:url" content={config?.ogUrl} />
      <meta name="twitter:card" content={config?.twitterCard} />

      <meta property="og:description" content={config?.ogDescription} />
      <meta property="og:site_name" content={config?.ogSiteName} />
      <meta name="twitter:image:alt" content={config?.twitterImageAlt} />

      <meta name="twitter:site" content={config?.twitterSite} />
    </>
  );
};
