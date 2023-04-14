export const BASE_QUERY = `
  query GetPageMeta {
    meta(where: { clientId: { _eq: "${process.env.GATSBY_CLIENT_ID}" } }) {
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
      injectedHTML
      injectedHTMLPosition
      links(order_by: { order: asc }) {
        calendar
        calendarLabel
        calendarUrl
        calendarId
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
`;
