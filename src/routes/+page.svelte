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

  // netlify
  let form

  function checkFileSize(input) {
    document.querySelector(`label[for=${input.name}]`)?.classList.remove("success")
    document.querySelector(`label[for=${input.name}]`)?.classList.remove("error")
    const maxSize = 4 * 1024 * 1024 // 8MB in bytes
    const files = input.element.files
    let totalSize = 0

    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size
    }

    if (totalSize > maxSize) {
      document.querySelector(`label[for=${input.name}]`).classList.add("error")
      document.querySelector(`label[for=${input.name}] .custom-file-upload`).textContent =
        "Maximum file size limit of 4mb reached. Try again."
      return
    }

    let combinedFileNames = ""

    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size
      combinedFileNames += files[i].name
      if (i < files.length - 1) {
        combinedFileNames += ", "
      }
    }

    // // manually update file name
    document.querySelector(`label[for=${input.name}]`)?.classList.add("success")
    document.querySelector(`label[for=${input.name}] .custom-file-upload`).textContent =
      combinedFileNames
  }

  let fileUploadInputs = [
    {
      id: "files",
      name: "files",
      label: "Supporting Files",
      type: "file",
      filename: "Please upload your supporting file (4mb max)",
      element: "",
      success: false,
    },
  ]

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

  async function netlify() {
    const formData = new FormData(form)
    const response = await fetch("/form.html", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      message = "We have received your application. Thank you."
      loading = false
      success = true

      console.log("successfully sent to netlify", response)
    }
  }

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

    // submit netlify form with both the PDF & the additional attachment
    await netlify()

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
      <form
        bind:this={form}
        class="custom"
        name="arc"
        action="/"
        method="post"
        enctype="multipart/form-data">
        <div class="form-controls-uploads">
          {#each fileUploadInputs as input}
            <!-- 1st file upload -->
            <div class="form-control">
              <label for={input.name} class={input.success ? "success" : ""}>
                <div class="icon">
                  <svg
                    aria-hidden="true"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    width="76"
                    height="71"
                    fill="none"
                    viewBox="0 0 76 71">
                    <path fill="#1A1918" d="M.149 62.707h75v7.759h-75v-7.759Z" />
                    <path
                      fill="#1A1918"
                      d="M33.77 54.954V14.83L15.748 31.905l-5.338-5.632L37.649.473l27.237 25.8-5.337 5.632-18.021-17.074v40.123h-7.759Z" />
                  </svg>
                </div>
                <span class="custom-file-upload">
                  {input.filename}
                </span>
              </label>
              <input
                class="screenreader"
                name={input.name}
                type="file"
                id={input.id}
                bind:this={input.element}
                on:change={() => {
                  checkFileSize(input)
                }}
                required
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" />
            </div>
          {/each}
        </div>
      </form>

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
