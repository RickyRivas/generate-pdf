import { c as create_ssr_component, b as subscribe, d as add_classes, e as add_attribute, v as validate_component, f as each, g as escape } from "../../chunks/ssr.js";
import { p as page, b as business } from "../../chunks/stores.js";
import "devalue";
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg role="img" xmlns="http://www.w3.org/2000/svg" width="200" height="73" fill="none" viewBox="0 0 200 73"><title>Rivas Web Designs Logo</title><path fill="currentcolor" fill-rule="evenodd" d="M166.778 43.616a15.222 15.222 0 0 0 6.507 5.082 23.406 23.406 0 0 0 9.282 1.778c3.244.08 6.461-.61 9.387-2.015a14.479 14.479 0 0 0 6.001-5.399A13.951 13.951 0 0 0 200 35.758c-.004-3.064-.733-5.535-2.185-7.414a14.064 14.064 0 0 0-5.223-4.26 56.943 56.943 0 0 0-7.834-2.825c-2.357-.706-4.183-1.33-5.477-1.875a9.828 9.828 0 0 1-3.245-2.112 4.458 4.458 0 0 1-1.309-3.28c.005-1.88.581-3.316 1.729-4.31a6.885 6.885 0 0 1 4.626-1.48 8.123 8.123 0 0 1 5.326 1.656 5.67 5.67 0 0 1 2.155 4.2h10.865c-.329-4.427-2.082-7.876-5.259-10.347-3.178-2.471-7.304-3.707-12.381-3.707a22.345 22.345 0 0 0-9.033 1.723 13.93 13.93 0 0 0-6.141 4.972 13.298 13.298 0 0 0-2.161 7.603c-.004 3.1.713 5.581 2.149 7.444a13.726 13.726 0 0 0 5.149 4.163 60.583 60.583 0 0 0 7.803 2.788 57.012 57.012 0 0 1 5.54 1.826 9.326 9.326 0 0 1 3.347 2.228 5.005 5.005 0 0 1 1.345 3.597 5.406 5.406 0 0 1-1.978 4.34c-1.314 1.108-3.153 1.656-5.435 1.656-2.283 0-4.03-.585-5.327-1.766a6.874 6.874 0 0 1-1.555-2.183 6.873 6.873 0 0 1-.599-2.613h-10.585a13.393 13.393 0 0 0 2.471 7.834ZM55.116 49.964V.71h-9.879v49.254h9.879Zm-40.63 12.68-2.86 10.237H9.19l-1.923-7.304-2.009 7.304H2.855L.115 62.643h2.198l1.826 7.95 2.082-7.95h2.3l1.96 7.913 1.826-7.913h2.18ZM28 66.866V64.3h3.878v-1.67h-5.941v10.262h5.947V71.22H28v-2.726h3.445v-1.626H28Zm23.088 1.626c.367.456.565 1.026.56 1.613a2.586 2.586 0 0 1-.408 1.448 2.71 2.71 0 0 1-1.163.974 4.321 4.321 0 0 1-1.826.353h-4.395V62.643h4.23a4.353 4.353 0 0 1 1.827.341 2.49 2.49 0 0 1 1.108.931c.262.406.397.88.39 1.364a2.313 2.313 0 0 1-.476 1.491c-.327.407-.77.705-1.272.852a2.314 2.314 0 0 1 1.425.87Zm-5.174-1.626h1.874a1.74 1.74 0 0 0 1.133-.328 1.169 1.169 0 0 0 .395-.95 1.216 1.216 0 0 0-.395-.95 1.71 1.71 0 0 0-1.133-.34h-1.874v2.568Zm3.232 3.987a1.217 1.217 0 0 0 .42-.998 1.274 1.274 0 0 0-.444-1.029 1.771 1.771 0 0 0-1.218-.377h-1.99v2.77h2.063a1.76 1.76 0 0 0 1.169-.366Zm36.173-5.721a4.49 4.49 0 0 0-1.892-1.826 6.086 6.086 0 0 0-2.837-.664h-3.58v10.275h3.579c.98.028 1.954-.18 2.837-.609a4.54 4.54 0 0 0 1.892-1.783c.46-.821.692-1.75.67-2.69a5.354 5.354 0 0 0-.67-2.703Zm-1.616 4a3.37 3.37 0 0 1-.69 1.15v-.031a3.368 3.368 0 0 1-2.496.913h-1.449v-6.763h1.449a3.332 3.332 0 0 1 2.496.907 3.412 3.412 0 0 1 .876 2.496c.029.45-.034.902-.186 1.328Zm15.994-4.834v2.568h3.451v1.626h-3.451v2.727h3.889v1.673h-5.941V62.631h5.941v1.668h-3.889Zm16.118 7.261c.346.47.816.835 1.357 1.053.624.26 1.296.386 1.972.372a4.256 4.256 0 0 0 1.947-.42 3.036 3.036 0 0 0 1.218-1.12c.28-.46.427-.99.426-1.528a2.43 2.43 0 0 0-.456-1.54 2.93 2.93 0 0 0-1.084-.877 11.984 11.984 0 0 0-1.631-.608c-.386-.11-.765-.24-1.138-.39a1.951 1.951 0 0 1-.67-.438.92.92 0 0 1-.273-.682 1.113 1.113 0 0 1 .358-.895c.273-.215.615-.323.962-.304.398-.022.791.1 1.108.341a1.168 1.168 0 0 1 .408.87h2.258a2.87 2.87 0 0 0-1.09-2.154 4.081 4.081 0 0 0-2.574-.767 4.662 4.662 0 0 0-1.875.359 2.886 2.886 0 0 0-1.279 1.035 2.769 2.769 0 0 0-.456 1.582 2.433 2.433 0 0 0 .451 1.546 2.75 2.75 0 0 0 1.071.864 12.4 12.4 0 0 0 1.619.61c.39.103.774.227 1.151.37.264.102.502.26.7.463.185.204.284.473.273.749a1.109 1.109 0 0 1-.408.9 1.696 1.696 0 0 1-1.132.348 1.603 1.603 0 0 1-1.108-.372 1.425 1.425 0 0 1-.444-.992h-2.173a2.744 2.744 0 0 0 .512 1.625Zm20.853-8.917V72.88h-2.057V62.643h2.057Zm18.297 2.118c.413.223.75.564.967.98l2.356.049a4.256 4.256 0 0 0-1.759-2.368 5.734 5.734 0 0 0-5.666-.176 4.799 4.799 0 0 0-1.876 1.862 5.702 5.702 0 0 0 0 5.405 4.821 4.821 0 0 0 1.876 1.826 5.39 5.39 0 0 0 2.677.664 5.108 5.108 0 0 0 2.38-.548 4.96 4.96 0 0 0 1.741-1.46 4.83 4.83 0 0 0 .877-1.979v-1.79h-5.545v1.57h3.524a2.977 2.977 0 0 1-.986 1.736 2.873 2.873 0 0 1-1.917.608 3.316 3.316 0 0 1-1.675-.414 2.827 2.827 0 0 1-1.12-1.174 4.097 4.097 0 0 1 0-3.549 2.83 2.83 0 0 1 1.096-1.169 3.148 3.148 0 0 1 1.613-.413c.5-.011.995.106 1.437.34Zm23.988 8.12h-2.051l-4.645-7.024v7.024h-2.069V62.63h2.069l4.65 7.036V62.63h2.046v10.25Zm12.38-1.32c.346.47.817.834 1.358 1.052a4.855 4.855 0 0 0 1.923.365 4.26 4.26 0 0 0 1.954-.42 3.04 3.04 0 0 0 1.248-1.12c.279-.46.427-.989.426-1.527a2.437 2.437 0 0 0-.457-1.54 2.926 2.926 0 0 0-1.083-.877 12.02 12.02 0 0 0-1.631-.608 11.84 11.84 0 0 1-1.139-.39 1.937 1.937 0 0 1-.669-.438.932.932 0 0 1-.274-.682 1.13 1.13 0 0 1 .359-.895c.273-.215.615-.323.962-.304.397-.02.79.1 1.108.34a1.172 1.172 0 0 1 .444.877h2.258a2.87 2.87 0 0 0-1.089-2.154 4.086 4.086 0 0 0-2.575-.767 4.641 4.641 0 0 0-1.875.359 2.878 2.878 0 0 0-1.278 1.035 2.761 2.761 0 0 0-.456 1.582c-.03.552.128 1.097.45 1.546a2.75 2.75 0 0 0 1.071.864 12.4 12.4 0 0 0 1.619.61c.39.103.774.227 1.151.37.263.1.5.259.693.463a1.017 1.017 0 0 1 .28.749 1.109 1.109 0 0 1-.408.9 1.694 1.694 0 0 1-1.132.348 1.598 1.598 0 0 1-1.108-.372 1.422 1.422 0 0 1-.444-.992h-2.197a2.75 2.75 0 0 0 .511 1.625ZM83.912 36.414 71.557.71H60.971l18.066 49.254 4.876-13.549Zm1.194 3.464L98.588.71H109.1L91.034 49.964h-9.41l3.482-10.091v.006Zm-60.053-9.885c3.713-.986 6.521-2.786 8.424-5.4a14.663 14.663 0 0 0 2.794-8.764 14.845 14.845 0 0 0-2.008-7.658 14.116 14.116 0 0 0-6.032-5.435A21.627 21.627 0 0 0 18.49.728H0v20.294h9.879V8.897h8.26c2.678 0 4.676.623 5.995 1.868 1.315 1.248 1.978 3.001 1.978 5.26 0 2.258-.663 4.102-1.978 5.398-1.315 1.297-3.317 1.936-5.995 1.936H0v26.605h9.879V30.773h4.656l10.871 19.191h11.431l-11.784-19.97ZM129.71.637h11.498l17.712 49.327h-10.438l-3.251-9.386h-19.617l-3.245 9.386h-10.372l6.202-17.286h24.354l-7.128-20.604-6.178 17.859h-10.061L129.71.637Z" clip-rule="evenodd"></path></svg>`;
});
const Navigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let isActive = false;
  let theme = $page.data.theme;
  let activeTopLevelWithSubpages;
  let y, mainnav;
  {
    if ($page.url.pathname) {
      const currentPath = $page.url.pathname;
      const isTopLevel = business.interiorPages.some((page2) => page2.path === currentPath);
      if (isTopLevel) {
        activeTopLevelWithSubpages = null;
      } else {
        activeTopLevelWithSubpages = business.interiorPages.find((group) => group.subPages?.some((subpage) => subpage.path === currentPath))?.name.toLowerCase() ?? null;
      }
    }
  }
  {
    if ($page.url.pathname === "/" && y < 25)
      mainnav.classList.add("ready");
    else if ($page.url.pathname === "/" && y > 25)
      mainnav.classList.remove("ready");
  }
  $$unsubscribe_page();
  return ` <nav id="mainnav"${add_classes((" " + ($page.url.pathname === "/" ? "ready" : "")).trim())}${add_attribute("this", mainnav, 0)}><div class="container"> <a id="logo" href="/">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</a> <div class="nav-links-cta"> <ul class="${["nav-links", ""].join(" ").trim()}"><li class="${["nav-link home", $page.url.pathname === "/" ? "active" : ""].join(" ").trim()}"><a id="home" href="/" data-svelte-h="svelte-rc4knm">home</a></li> ${each(business.interiorPages, ({ name, path, subPages }) => {
    return `  <li class="${[
      "nav-link " + escape(name.toLowerCase().replace(" ", "-").replace("-& ", "-"), true) + " " + escape(subPages ? "dropdown" : "", true),
      $page.url.pathname.startsWith(path) || name.toLowerCase().replace(" ", "-").replace("-& ", "-") === activeTopLevelWithSubpages ? "active" : ""
    ].join(" ").trim()}"> ${subPages ? `<a${add_attribute("href", subPages[0].path, 0)}${add_attribute("id", name.toLowerCase(), 0)}>${escape(name)}</a> <ul class="sub-links">${each(subPages, (subPage) => {
      return `<li class="${"sub-link " + escape(
        $page.url.pathname.startsWith(subPage.path) ? "active" : "",
        true
      )}"><a${add_attribute("href", subPage.path, 0)}${add_attribute("target", subPage.external ? "_blank" : "", 0)}>${escape(subPage.title)}</a> </li>`;
    })} </ul>` : `<a${add_attribute("id", name.toLowerCase(), 0)}${add_attribute("href", path, 0)}>${escape(name)} </a>`} </li>`;
  })}</ul> <form class="theme-toggle custom" method="POST" action="/?/switchTheme"><button${add_attribute("class", theme === "light" ? "light" : "dark", 0)} aria-label="Click to change theme"><svg class="theme" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 25 25"><path class="moon" fill="currentcolor" d="M14.472 0C7.58 0 2 5.597 2 12.5S7.58 25 14.472 25c3.382 0 6.445-1.35 8.694-3.538a.892.892 0 0 0-.775-1.518 9.79 9.79 0 0 1-1.68.145c-5.407 0-9.794-4.397-9.794-9.821a9.819 9.819 0 0 1 4.984-8.555.892.892 0 0 0-.369-1.663 13.36 13.36 0 0 0-1.06-.044V0Z"></path><path class="sun" fill="currentcolor" d="M17.65.06a.79.79 0 0 1 .47.581l.97 5.268 5.269.967a.79.79 0 0 1 .58.468.776.776 0 0 1-.078.743L21.82 12.5l3.041 4.409c.152.22.181.498.079.742a.79.79 0 0 1-.581.468l-5.268.972-.972 5.268a.79.79 0 0 1-.468.58.776.776 0 0 1-.742-.078L12.5 21.82l-4.409 3.04a.776.776 0 0 1-.742.079.79.79 0 0 1-.468-.581l-.972-5.268-5.268-.972a.79.79 0 0 1-.58-.468.776.776 0 0 1 .078-.742L3.18 12.5.14 8.091a.776.776 0 0 1-.08-.741.79.79 0 0 1 .581-.468l5.268-.972.972-5.268a.79.79 0 0 1 .468-.58.776.776 0 0 1 .742.078L12.5 3.18 16.909.14a.776.776 0 0 1 .741-.08ZM7.814 12.5a4.687 4.687 0 1 1 9.374 0 4.687 4.687 0 0 1-9.374 0Zm10.936 0a6.25 6.25 0 1 0-12.498 0 6.25 6.25 0 0 0 12.498 0Z"></path></svg></button></form>  <button id="nav-toggle" aria-label="Toggle"${add_attribute("aria-expanded", isActive, 0)}${add_classes("".trim())}><span></span> <span></span> <span></span></button></div></div></nav>`;
});
const GoogleIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><title>review us on google</title><path fill="#fff" d="M0 10C0 4.486 4.486 0 10 0c2.227 0 4.335.716 6.096 2.072l-2.324 3.019A6.13 6.13 0 0 0 10 3.81 6.198 6.198 0 0 0 3.81 10 6.198 6.198 0 0 0 10 16.19a6.201 6.201 0 0 0 5.89-4.285H10v-3.81h10V10c0 5.514-4.486 10-10 10S0 15.514 0 10Z"></path></svg>`;
});
const FacebookIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><title>follow us on facebook</title><path fill="#fff" d="M11.491 20v-9.122h2.947l.443-3.556h-3.39v-2.27c0-1.03.274-1.731 1.697-1.731L15 3.32V.14A23.664 23.664 0 0 0 12.36 0C9.745 0 7.956 1.657 7.956 4.7v2.622H5v3.556h2.956V20h3.535Z"></path></svg>`;
});
const InstagramIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><title>follow us on instagram</title><path fill="#fff" fill-rule="evenodd" d="M19.95 5.881c-.048-1.063-.22-1.793-.466-2.427a4.881 4.881 0 0 0-1.157-1.774 4.923 4.923 0 0 0-1.77-1.152C15.92.28 15.193.109 14.131.063 13.06.012 12.72 0 10.004 0 7.288 0 6.948.012 5.88.059 4.818.105 4.088.278 3.455.524A4.88 4.88 0 0 0 1.68 1.68 4.925 4.925 0 0 0 .528 3.45C.28 4.089.109 4.815.063 5.878.012 6.948 0 7.288 0 10.004s.012 3.056.059 4.123c.046 1.063.219 1.793.465 2.426a4.932 4.932 0 0 0 1.156 1.774c.5.508 1.106.903 1.77 1.153.638.247 1.364.418 2.427.465 1.067.047 1.407.059 4.123.059s3.056-.012 4.123-.059c1.063-.047 1.793-.218 2.426-.465a5.116 5.116 0 0 0 2.927-2.927c.247-.637.419-1.364.465-2.426.047-1.067.059-1.407.059-4.123s-.004-3.056-.05-4.123Zm-1.802 8.167c-.043.977-.207 1.505-.344 1.857a3.319 3.319 0 0 1-1.9 1.899c-.351.137-.882.3-1.856.344-1.055.047-1.371.058-4.04.058-2.67 0-2.99-.011-4.04-.058-.978-.043-1.505-.207-1.857-.344a3.078 3.078 0 0 1-1.149-.747 3.11 3.11 0 0 1-.746-1.148c-.137-.352-.301-.884-.344-1.857-.047-1.055-.059-1.371-.059-4.04 0-2.67.012-2.99.059-4.04.043-.978.207-1.505.344-1.857a3.04 3.04 0 0 1 .75-1.15 3.105 3.105 0 0 1 1.149-.745c.352-.137.883-.301 1.856-.344 1.055-.047 1.372-.059 4.04-.059 2.674 0 2.99.012 4.041.059.977.043 1.505.207 1.857.344.433.16.828.414 1.148.746.333.324.587.715.747 1.149.137.352.3.883.344 1.856.047 1.055.058 1.372.058 4.04 0 2.67-.011 2.982-.058 4.037Zm-8.144-9.183a5.14 5.14 0 0 0-5.139 5.139 5.14 5.14 0 1 0 5.139-5.139Zm0 8.472a3.334 3.334 0 1 1 .001-6.668 3.334 3.334 0 0 1-.001 6.668Zm5.342-7.475a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" clip-rule="evenodd"></path></svg>`;
});
const YoutubeIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><title>subscribe to our youtube channel</title><path fill="#fff" d="M16.216 3H3.784A3.783 3.783 0 0 0 0 6.784v6.727a3.783 3.783 0 0 0 3.784 3.784h12.432A3.783 3.783 0 0 0 20 13.51V6.784A3.783 3.783 0 0 0 16.216 3Zm-8.85 10.213V7.081l5.268 3.072-5.269 3.06Z"></path></svg>`;
});
const XIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><title>follow us on ex</title><path fill="#fff" d="M15.751 1h3.067l-6.7 7.658L20 19.078h-6.172l-4.833-6.32-5.531 6.32H.394l7.167-8.19L0 1h6.328l4.37 5.777L15.75 1Zm-1.076 16.242h1.7L5.404 2.74H3.58l11.094 14.503Z"></path></svg>`;
});
const SocialMedia = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="socialmedia">${`<a class="facebook" aria-label="follow us on facebook"${add_attribute("href", business.socials.facebook, 0)}>${validate_component(FacebookIcon, "FacebookIcon").$$render($$result, {}, {}, {})}</a>`} ${`<a class="google" aria-label="review us on google"${add_attribute("href", business.socials.google, 0)}>${validate_component(GoogleIcon, "GoogleIcon").$$render($$result, {}, {}, {})}</a>`} ${`<a class="youtube" aria-label="subscribe to our youtube channel"${add_attribute("href", business.socials.youtube, 0)}>${validate_component(YoutubeIcon, "YoutubeIcon").$$render($$result, {}, {}, {})}</a>`} ${`<a class="x-twitter" aria-label="follow us on ex"${add_attribute("href", business.socials.xTwitter, 0)}>${validate_component(XIcon, "XIcon").$$render($$result, {}, {}, {})}</a>`} ${`<a class="instagram" aria-label="follow us on instagram"${add_attribute("href", business.socials.instagram, 0)}>${validate_component(InstagramIcon, "InstagramIcon").$$render($$result, {}, {}, {})}</a>`}</div>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let activeTopLevelWithSubpages;
  {
    if ($page.url.pathname) {
      const currentPath = $page.url.pathname;
      const isTopLevel = business.interiorPages.some((page2) => page2.path === currentPath);
      if (isTopLevel) {
        activeTopLevelWithSubpages = null;
      } else {
        activeTopLevelWithSubpages = business.interiorPages.find((group) => group.subPages?.some((subpage) => subpage.path === currentPath))?.name.toLowerCase() ?? null;
      }
    }
  }
  $$unsubscribe_page();
  return `<footer><div class="container"><a href="/" class="logo">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</a> <div class="mod"> <div class="item"><h2 class="title" data-svelte-h="svelte-1jx8gdq">Sitemap</h2> <ul class="ft-sitemap"> <li class="link"><a href="/"${add_classes(($page.url.pathname === "/" ? "active" : "").trim())} data-svelte-h="svelte-1rs0ll5">Home</a></li> ${each(business.interiorPages, ({ name, path, subPages }) => {
    return `<li class="${[
      "link",
      $page.url.pathname.startsWith(path) || name.toLowerCase().replace(" ", "-").replace("-& ", "-") === activeTopLevelWithSubpages ? "active" : ""
    ].join(" ").trim()}">${subPages ? `<a${add_attribute("href", subPages[0].path, 0)}>${escape(name)} </a>` : `<a${add_attribute("href", path, 0)}>${escape(name)}</a>`} </li>`;
  })}</ul></div>  <div class="item"><h2 class="title" data-svelte-h="svelte-1qv3h6r">Contact Info</h2> <ul>${validate_component(SocialMedia, "SocialMedia").$$render($$result, {}, {}, {})}</ul></div></div></div> <div class="credit"><span><span data-svelte-h="svelte-zje4yq">Custom Coded &amp; Designed by
        <a href="https://www.rivaswebdesigns.com/" target="_blank">Rivas Web Designs</a></span> <span class="divider" data-svelte-h="svelte-1dytxz4">|</span> <span>${escape(business.name)} © ${escape((/* @__PURE__ */ new Date()).getFullYear())}</span></span></div></footer>`;
});
const ToTop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` <div id="btt"${add_attribute("class", "hide", 0)}><button data-svelte-h="svelte-14134p3"><div class="screenreader">click to go to top of page</div> <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" viewBox="0 0 50 50"><path fill="currentcolor" d="M25.5 17 13 29.5l2.948 2.948 9.552-9.552 9.552 9.552L38 29.5 25.5 17Z"></path></svg></button></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navigation, "Navigation").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``} ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(ToTop, "ToTop").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
