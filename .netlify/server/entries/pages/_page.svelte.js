import { c as create_ssr_component, g as escape, e as add_attribute, v as validate_component, f as each } from "../../chunks/ssr.js";
import { S as SEO, A as AnchorButton } from "../../chunks/SEO.js";
import { b as business } from "../../chunks/stores.js";
import "devalue";
import "signature_pad";
const InputField = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value, required, label, name = "", type = "text", placeholder = "" } = $$props;
  let { seperate = false } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.seperate === void 0 && $$bindings.seperate && seperate !== void 0)
    $$bindings.seperate(seperate);
  return `<div class="form-control"><label class="label" for="">${escape(`${label}`)} ${type === "textarea" ? ` <textarea${add_attribute("name", name, 0)} cols="20" rows="5" class="input" ${required ? "required" : ""}${add_attribute("placeholder", placeholder, 0)}>${escape(value || "")}</textarea>` : ` <input${add_attribute("name", name, 0)} class="input" ${required ? "required" : ""}${add_attribute("placeholder", placeholder, 0)}${add_attribute("value", value, 0)}>`}</label></div>`;
});
const SignaturePad_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvas;
  let signaturePad;
  function clear() {
    signaturePad.clear();
  }
  function getSignatureImage() {
    if (signaturePad.isEmpty())
      return null;
    return signaturePad.toDataURL();
  }
  if ($$props.clear === void 0 && $$bindings.clear && clear !== void 0)
    $$bindings.clear(clear);
  if ($$props.getSignatureImage === void 0 && $$bindings.getSignatureImage && getSignatureImage !== void 0)
    $$bindings.getSignatureImage(getSignatureImage);
  return `<canvas${add_attribute("this", canvas, 0)}></canvas> <button data-svelte-h="svelte-1cvdsb0">clear</button>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let signaturePad;
  let downloadButton;
  let form;
  const fields = [
    {
      name: "homeowner-name",
      label: "Homeowner's Name",
      value: "Ricky Rivas",
      type: "text"
    },
    {
      name: "address",
      label: "Address of Property Affected by Proposed Change",
      value: "5924 E. King PL",
      type: "text"
    },
    {
      name: "number",
      label: "Telephone Number",
      value: "9183127266",
      type: "number"
    },
    {
      name: "email",
      label: "Email Address",
      value: "info@rivaswebdesigns",
      type: "email"
    },
    {
      name: "categories",
      label: "Indicate the type of improvement(s) proposed",
      value: "Fence, Siding",
      type: "text"
    },
    {
      name: "description",
      label: "Briefly describe the proposed modification(s)/alteration(s)",
      value: "I want to finally update my home, I want to finally update my home, I want to finally update my home, I want to finally update my home, I want to finally update my home, I want to finally update my home, I want to finally update my home",
      type: "textarea"
    },
    {
      name: "performed-by",
      label: "Work will be performed by",
      value: "Me",
      type: "text"
    },
    {
      name: "start",
      label: "Desired Start Date",
      value: "10-24-2024",
      type: "text"
    },
    {
      name: "end",
      label: "Anticipated Completion Date",
      value: "10-26-2024",
      type: "text"
    }
  ];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(SEO, "SEO").$$render(
      $$result,
      {
        title: business.name + " | " + business.industry + " | " + business.cityAndState,
        description: business.homepage.metaDescription,
        canonical: business.canonical,
        siteName: business.name,
        imageURL: business.ogImage,
        index: true,
        twitter: true,
        openGraph: true,
        schemaOrg: false,
        logo: "",
        author: "",
        name: ""
      },
      {},
      {}
    )} <main><section id="hero"><form action="/" name="genpdf" method="post"${add_attribute("this", form, 0)}>${each(fields, (field) => {
      return `${validate_component(InputField, "InputField").$$render(
        $$result,
        {
          name: field.name,
          label: field.label,
          type: field.type,
          required: true,
          value: field.value
        },
        {},
        {}
      )}`;
    })}  ${validate_component(AnchorButton, "AnchorButton").$$render($$result, { text: "submit", formButton: true }, {}, {})}</form> ${validate_component(SignaturePad_1, "SignaturePad").$$render(
      $$result,
      { this: signaturePad },
      {
        this: ($$value) => {
          signaturePad = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``} <a href="" class="downloadbtn" target="_blank"${add_attribute("this", downloadButton, 0)} data-svelte-h="svelte-191iqs2">download</a></section></main>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
