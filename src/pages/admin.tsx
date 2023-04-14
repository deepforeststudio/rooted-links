import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { Auth0Provider } from "@auth0/auth0-react";
import { getBaseServerData } from "../data/getServerData";
import { HeadBase } from "../components/Head";
import { BaseApp } from "../components/BaseApp";

const App: React.FC<PageProps> = (props) => {
  if (process.env.GATSBY_AUTH0_CLIENT_ID) {
    return (
      <Auth0Provider
        domain={process.env.GATSBY_AUTH0_DOMAIN || ""}
        clientId={process.env.GATSBY_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.href,
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <BaseApp {...props} />
      </Auth0Provider>
    );
  }

  return <BaseApp {...props} />;
};

export default App;

export async function getServerData() {
  return getBaseServerData();
}

export const Head: HeadFC = HeadBase;
