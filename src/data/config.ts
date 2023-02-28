export const config = {
  title: "Coven of the Woods",
  description: "Links for Coven of the Woods",
  textColor: "#000",
  url: "https://covenofthewoods.church",
  profileImage: "https://i.imgur.com/MnTfPWe.jpeg",
  externalCss: "https://covenofthewoods.church/css/style.css",
  overrideCSS: `
   .background {
      background-position: calc( 50% + 12px );
    }
  `,
  background: "url('https://i.imgur.com/ibPfbGm.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  ageRestricted: true,
  defaultButtonColor: "#7a005e",
  defaultButtonTextColor: "#fff",
  defaultOverrides: {},
  buttons: [
    // Logos: https://imgur.com/a/uHI1BOj
    {
      label: "Wishtender",
      url: "https://www.wishtender.com/covenofthewoods",
      icon: "https://i.imgur.com/bL5UVm7.png",
      icontype: "url",
    },
    {
      label: "WishBiller",
      url: "https://wishbiller.com/u/covenofthewoods",
      icon: "https://i.imgur.com/m2Tav84.png",
      icontype: "url",
    },

    {
      label: "Cash App",
      url: "https://cash.app/$covenofthewoods",
      icon: "SiCashapp",
      icontype: "simpleIcons",
    },
    {
      label: "OnlyFans",
      url: "https://onlyfans.com/covenofthewoods",
      icon: "SiOnlyfans",
      icontype: "simpleIcons",
      isAgeRestricted: true,
    },
    {
      label: "Fansly",
      url: "https://fansly.com/covenofthewoods/posts",
      icon: "https://i.imgur.com/OfqYTNG.png",
      icontype: "url",
      isAgeRestricted: true,
    },
    {
      label: "pantydeal",
      url: "https://pantydeal.com/member/covenofthewoods",
      icon: "https://i.imgur.com/EYvPvX5.png",
      icontype: "url",
      calendar: true,
      calendarLabel: "Availability",
      calendarUrl: "https://wrangler-google-cal-coven.asterhaven.workers.dev",
      /**
       * The calendar url must be publically accessible, and must return the following json format:
       * {
       *   "events": [
       *    {
       *     "category": "Other,
       *     "start": "2021-01-01",
       *     "end": "2021-01-01"
       *    }
       * }
       */
      categoryFilters: [
        "Panty",
        "Socks",
        "Stockings",
        "Shoes",
        "Slippers",
        "Other",
      ],
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/covenofthewoods_/",
      icon: "FaInstagram",
      icontype: "fa",
    },
    {
      label: "Twitter",
      url: "https://twitter.com/CovenoftheWoods",
      icon: "FaTwitter",
      icontype: "fa",
    },
    {
      label: "Email",
      url: "mailto:covenofthewoods@gmail.com",
      icon: "SiMinutemailer",
      icontype: "simpleIcons",
    },
  ],
};
