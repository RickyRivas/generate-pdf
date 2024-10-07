<script>
  // components
  import SEO from "./../lib/components/SEO.svelte"
  import InputField from "$lib/components/InputField.svelte"
  // stores
  import { business } from "$lib/config"
  import AnchorButton from "$lib/components/AnchorButton.svelte"
  import { enhance } from "$app/forms"
  import SignaturePad from "$lib/components/SignaturePad.svelte"

  // gen pdf
  let formData = {
    name: "Ricky",
    email: "info@rivaswebdesigns.com",
    message: "lets make some money!",
  }

  let signaturePad
  let successfulCall = false
  let downloadButton
  let loading = false
  let form

  const fields = [
    { name: "homeowner-name", label: "Homeowner's Name", value: "Ricky Rivas", type: "text" },
    { name: "address", label: "Address", value: "5924 E. King PL", type: "text" },
    { name: "number", label: "Telephone Number", value: "9183127266", type: "number" },
    { name: "email", label: "Email", value: "info@rivaswebdesigns", type: "email" },
    { name: "categories", label: "Project Categories", value: "Fence, Siding", type: "text" },
    {
      name: "description",
      label: "Briefly describe the proposed modification(s)",
      value: "I want to finally update my home",
      type: "text",
    },
    { name: "performed-by", label: "Work will be performed by", value: "Me", type: "text" },
    { name: "start", label: "Desired Start Date", value: "10-24-2024", type: "text" },
    { name: "end", label: "Anticipated Completion Date", value: "10-26-2024", type: "text" },
  ]
</script>

<SEO
  title="{business.name} | {business.industry} | {business.cityAndState}"
  description={business.homepage.metaDescription}
  canonical={business.canonical}
  siteName={business.name}
  imageURL={business.ogImage}
  index={true}
  twitter={true}
  openGraph={true}
  schemaOrg={false}
  logo=""
  author=""
  name="" />

<main>
  <section id="hero">
    <form
      action="/"
      name="genpdf"
      method="post"
      bind:this={form}
      use:enhance={async ({ cancel }) => {
        loading = true

        const signatureImage = signaturePad.getSignatureImage()
        if (!signatureImage) {
          console.log("no sig :(")
          cancel()
          loading = false
          return
        }

        const response = await fetch("/api/gen-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: fields,
            signature: signatureImage,
            // TODO, auto gen date
            date: "today",
          }),
        })

        // will return a blob

        if (response.ok) {
          console.log("res", response)
          const blob = await response.blob()
          const url = window.URL.createObjectURL(blob)
          downloadButton.href = url
          successfulCall = true
        }

        loading = false
        cancel()
      }}>
      {#each fields as field}
        <InputField
          name={field.name}
          label={field.label}
          type={field.type}
          required={true}
          value={field.value} />
      {/each}

      <!-- <div class="form-control">
        <label for="genpdf">
          Name
          <input type="text" name="name" id="" bind:value={formData.name} />
        </label>
      </div>
      <div class="form-control">
        <label for="genpdf">
          Email
          <input type="text" name="name" id="" bind:value={formData.email} />
        </label>
      </div>
      <div class="form-control">
        <label for="genpdf">
          Message
          <input type="text" name="name" id="" bind:value={formData.message} />
        </label>
      </div> -->
      <AnchorButton text="submit" formButton={true} />
    </form>
    <SignaturePad bind:this={signaturePad} />
    {#if loading}
      <p>loading..</p>
    {/if}
    <a href="" class="downloadbtn" target="_blank" bind:this={downloadButton}>download</a>
  </section>
</main>
