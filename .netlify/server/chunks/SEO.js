import { c as create_ssr_component, g as escape, e as add_attribute, b as subscribe } from "./ssr.js";
import { p as page } from "./stores.js";
const AnchorButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { formButton = false, disabled = false, link = "", text, screenreader = "" } = $$props;
  if ($$props.formButton === void 0 && $$bindings.formButton && formButton !== void 0)
    $$bindings.formButton(formButton);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.screenreader === void 0 && $$bindings.screenreader && screenreader !== void 0)
    $$bindings.screenreader(screenreader);
  return `${formButton ? `<button class="btn newbtn" ${disabled ? "disabled" : ""}><span class="text">${escape(text)}</span> <span class="screenreader">${escape(screenreader)}</span> <span class="arrow" data-svelte-h="svelte-74n46l"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" role="img"><path fill="currentcolor" d="M11.92 5.62a1 1 0 0 0-.21-.33l-5-5a1.004 1.004 0 0 0-1.42 1.42L8.59 5H1a1 1 0 1 0 0 2h7.59l-3.3 3.29a.999.999 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 .21-.33 1 1 0 0 0 0-.76Z"></path></svg></span></button>` : `<a${add_attribute("href", link, 0)} class="btn newbtn"><span class="text">${escape(text)}</span> <span class="screenreader">${escape(screenreader)}</span> <span class="arrow" data-svelte-h="svelte-74n46l"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" role="img"><path fill="currentcolor" d="M11.92 5.62a1 1 0 0 0-.21-.33l-5-5a1.004 1.004 0 0 0-1.42 1.42L8.59 5H1a1 1 0 1 0 0 2h7.59l-3.3 3.29a.999.999 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 .21-.33 1 1 0 0 0 0-.76Z"></path></svg></span></a>`}`;
});
const SEO = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { title = "" } = $$props;
  let { description = "" } = $$props;
  let { keywords = "" } = $$props;
  let { canonical = "" } = $$props;
  let { siteName = "" } = $$props;
  let { index = true } = $$props;
  let { twitter = true } = $$props;
  let { openGraph = true } = $$props;
  let { schemaOrg = false } = $$props;
  let { imageURL = "" } = $$props;
  let { logo = "" } = $$props;
  let { author = "" } = $$props;
  let { socials = [] } = $$props;
  let { name = "" } = $$props;
  let socialsString = socials.join(", ");
  let jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Person", "Organization"],
    name: `${name}`,
    url: `${$page.url.origin}`,
    image: `${imageURL}`,
    logo: {
      "@type": "ImageObject",
      url: `${logo}`,
      width: 48,
      height: 48
    },
    sameAs: [`${socialsString}`]
  };
  let jsonLdStrung = JSON.stringify(jsonLd);
  let jsonLdScript = `<script type="application/ld+json">${jsonLdStrung}${"<"}/script>`;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.keywords === void 0 && $$bindings.keywords && keywords !== void 0)
    $$bindings.keywords(keywords);
  if ($$props.canonical === void 0 && $$bindings.canonical && canonical !== void 0)
    $$bindings.canonical(canonical);
  if ($$props.siteName === void 0 && $$bindings.siteName && siteName !== void 0)
    $$bindings.siteName(siteName);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.twitter === void 0 && $$bindings.twitter && twitter !== void 0)
    $$bindings.twitter(twitter);
  if ($$props.openGraph === void 0 && $$bindings.openGraph && openGraph !== void 0)
    $$bindings.openGraph(openGraph);
  if ($$props.schemaOrg === void 0 && $$bindings.schemaOrg && schemaOrg !== void 0)
    $$bindings.schemaOrg(schemaOrg);
  if ($$props.imageURL === void 0 && $$bindings.imageURL && imageURL !== void 0)
    $$bindings.imageURL(imageURL);
  if ($$props.logo === void 0 && $$bindings.logo && logo !== void 0)
    $$bindings.logo(logo);
  if ($$props.author === void 0 && $$bindings.author && author !== void 0)
    $$bindings.author(author);
  if ($$props.socials === void 0 && $$bindings.socials && socials !== void 0)
    $$bindings.socials(socials);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-xaexrq_START -->${title !== "" ? `<meta name="robots"${add_attribute("content", index ? "index, follow" : "noindex", 0)}> ${$$result.title = `<title>${escape(title)}</title>`, ""} <meta rel="canonical"${add_attribute("content", canonical === "" ? $page.url : canonical, 0)}>` : ``}${description !== "" ? `<meta name="description"${add_attribute("content", description, 0)}>` : ``}${keywords !== "" ? `<meta name="keywords"${add_attribute("content", keywords, 0)}>` : ``}${author !== "" ? `<meta name="author"${add_attribute("content", author, 0)}>` : ``}${openGraph ? `${siteName !== "" ? `<meta property="og:site_name"${add_attribute("content", siteName, 0)}>` : ``} ${title !== "" ? `<meta property="og:url"${add_attribute("content", $page.url, 0)}> <meta property="og:type" content="website"> <meta property="og:title"${add_attribute("content", title, 0)}>` : ``} ${description !== "" ? `<meta property="og:description"${add_attribute("content", description, 0)}>` : ``} ${imageURL !== "" ? `<meta property="og:image"${add_attribute("content", imageURL, 0)}>` : ``}` : ``}${twitter ? `${title !== "" ? `<meta name="twitter:card" content="summary_large_image"> <meta property="twitter:domain"${add_attribute("content", $page.url.host, 0)}> <meta property="twitter:url"${add_attribute("content", $page.url, 0)}> <meta name="twitter:title"${add_attribute("content", title, 0)}>` : ``} ${description !== "" ? `<meta name="twitter:description"${add_attribute("content", description, 0)}>` : ``} ${imageURL !== "" ? `<meta name="twitter:image"${add_attribute("content", imageURL, 0)}>` : ``}` : ``}${schemaOrg || socials[0] !== void 0 || logo !== "" || name !== "" ? `<!-- HTML_TAG_START -->${jsonLdScript}<!-- HTML_TAG_END -->` : ``}<!-- HEAD_svelte-xaexrq_END -->`, ""}`;
});
export {
  AnchorButton as A,
  SEO as S
};
