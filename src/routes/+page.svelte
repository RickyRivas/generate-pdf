<script>
  // components
  import SEO from "./../lib/components/SEO.svelte"
  import InputField from "$lib/components/InputField.svelte"
  // stores
  import { business } from "$lib/config"
  import AnchorButton from "$lib/components/AnchorButton.svelte"
  import { enhance } from "$app/forms"
  import SignaturePad from "$lib/components/SignaturePad.svelte"
  import Modal from "$lib/components/Modal.svelte"
  import LoadingStatus from "$lib/components/LoadingStatus.svelte"

  // gen pdf
  let signaturePad
  let successfulCall = false
  let downloadButton
  let loading = false
  let generatedLink
  let showModal = false
  let success = false
  let error = false
  let message = ""
  let disableModalClose = true

  function clearModal() {
    if (success) clearFields()

    message = ""
    showModal = false
    success = false
    loading = false
    error = false
  }

  function getTodaysDate() {
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    const year = today.getFullYear()

    return `${month}-${day}-${year}`
  }

  const fields = [
    { name: "homeowner-name", label: "Homeowner's Name", value: "Ricky Rivas", type: "text" },
    {
      name: "address",
      label: "Address of Property Affected by Proposed Change",
      value: "5924 e king pl",
      type: "text",
    },
    { name: "number", label: "Telephone Number", value: "9183127266", type: "number" },
    { name: "email", label: "Email Address", value: "me@gmail.com", type: "email" },
    {
      name: "categories",
      label: "Indicate the type of improvement(s) proposed",
      value: "fencing, siding",
      type: "text",
    },
    {
      name: "description",
      label: "Briefly describe the proposed modification(s)/alteration(s)",
      value: "I want to build a mansion in our neighborhood",
      type: "textarea",
    },
    { name: "performed-by", label: "Work will be performed by", value: "contractor", type: "text" },
    { name: "start", label: "Desired Start Date", value: "10-24-24", type: "text" },
    { name: "end", label: "Anticipated Completion Date", value: "10-30-24", type: "text" },
  ]

  async function genPdf() {
    showModal = true
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
        date: getTodaysDate(),
      }),
    })

    // will return a blob

    if (response.ok) {
      console.log("res", response)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      generatedLink = url
      successfulCall = true

      // modal
      success = true
      successfulCall = true
      message = "Success! Please click on the link below for your PDF"
    } else {
      message = "Please try again"
      success = false
      error = true
      disableModalClose = false
    }

    loading = false
  }

  // $: console.log(fields)
  // $: console.log("generatedLink", generatedLink)
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

{#if showModal}
  <Modal
    disable={disableModalClose}
    on:escape={() => {
      clearModal()
    }}>
    <div class="subscribe-page-modal">
      <LoadingStatus bind:loading bind:success bind:error />
      {#if loading}
        <p>Generating your PDF...</p>
      {/if}
      {#if success}
        <!-- successfully added to db -->
        <p>{message}</p>
        <a href={generatedLink} class="downloadbtn btn" target="_blank" bind:this={downloadButton}
          >download</a>
      {:else if error}
        <!-- failed to be added to db -->
        <p>{message}</p>
      {/if}
    </div>
  </Modal>
{/if}

<main>
  <section id="hero">
    <div class="form-container">
      <h2>ARC Form</h2>
      <p>please fill out the below fields and draw your signature.</p>
      {#each fields as field}
        <InputField
          name={field.name}
          label={field.label}
          type={field.type}
          required={true}
          bind:value={field.value} />
      {/each}
      <p>Please draw your signature:</p>
      <SignaturePad bind:this={signaturePad} />
      <button class="btn newbtn" on:click={genPdf}
        ><span class="text">submit</span> <span class="screenreader"></span>
        <span class="arrow"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            aria-hidden="true"
            role="img"
            ><path
              fill="currentcolor"
              d="M11.92 5.62a1 1 0 0 0-.21-.33l-5-5a1.004 1.004 0 0 0-1.42 1.42L8.59 5H1a1 1 0 1 0 0 2h7.59l-3.3 3.29a.999.999 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 .21-.33 1 1 0 0 0 0-.76Z"
            ></path
            ></svg
          ></span
        ></button>
    </div>
  </section>
</main>
