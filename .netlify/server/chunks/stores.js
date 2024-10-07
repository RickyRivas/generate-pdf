import { h as getContext } from "./ssr.js";
import "./exports.js";
import "devalue";
const business = {
  canonical: "https://site.com",
  name: "Rivas Web Designs",
  cityAndState: "Tulsa, Ok",
  industry: "Web Design",
  ogImage: "",
  phone: "(918) 123-4567",
  address: "1234 East Tulsa, Ok 12345",
  email: "biz@email.com",
  homepage: {
    metaDescription: "This is the homepage description"
  },
  interiorPages: [
    // if client opts for blog
  ],
  businessHours: {
    monday: "8:00am to 5:00pm",
    tuesday: "8:00am to 5:00pm",
    wednesday: "8:00am to 5:00pm",
    thursday: "8:00am to 5:00pm",
    friday: "8:00am to 5:00pm",
    saturday: "Closed",
    sunday: "Closed"
  },
  socials: {
    facebook: "/",
    instagram: "/",
    xTwitter: "/",
    youtube: "/",
    google: "/"
  }
};
function get(key, parse = JSON.parse) {
  try {
    return parse(sessionStorage[key]);
  } catch {
  }
}
const SNAPSHOT_KEY = "sveltekit:snapshot";
const SCROLL_KEY = "sveltekit:scroll";
get(SCROLL_KEY) ?? {};
get(SNAPSHOT_KEY) ?? {};
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
export {
  business as b,
  page as p
};
