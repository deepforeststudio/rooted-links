import * as React from "react";
import { HeadFC } from "gatsby";


export const HeadBase: HeadFC = ({ serverData }) => {
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
