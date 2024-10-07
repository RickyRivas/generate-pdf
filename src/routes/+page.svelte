<script>
  // components
  import InputField from "$lib/components/InputField.svelte"

  // stores
  import { enhance } from "$app/forms"
  import SignaturePad from "$lib/components/SignaturePad.svelte"
  import Modal from "$lib/components/Modal.svelte"
  import LoadingStatus from "$lib/components/LoadingStatus.svelte"
  import { getTodaysDate, checkFileSize } from "$lib/utils"
  import { goto } from "$app/navigation"

  // gen pdf
  let signaturePad
  let generatedLink = "xxx"

  // netlify form
  let netlifyForm

  // modal / loading states
  let loading = false
  let showModal = false
  let success = false
  let error = false
  let message = ""
  let modalPreventEsc = true

  // form fields
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

  let fileUploadInputs = [
    {
      id: "supporting_file",
      name: "supporting_file",
      label: "Supporting File",
      type: "file",
      filename: "Please upload your supporting file (4mb max)",
      element: "",
      success: false,
    },
    {
      id: "supporting_file_two",
      name: "supporting_file_two",
      label: "Supporting File",
      type: "file",
      filename: "Please upload your supporting file (4mb max)",
      element: "",
      success: false,
    },
  ]

  function clearModal() {
    if (success) {
      goto("/")
    }
    message = ""
    showModal = false
    success = false
    loading = false
    error = false
    modalPreventEsc = true
  }

  async function genPdf() {
    // loading states
    showModal = true
    loading = true

    // check if user signed
    const signatureImage = signaturePad.getSignatureImage()
    if (!signatureImage) {
      message = "Please sign"
      showModal = true
      success = false
      loading = false
      error = true
      modalPreventEsc = false
      return
    }

    // generate & return pdf
    const response = await fetch("/api/gen-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // fields
        fields: fields,
        // signature (as an image)
        signature: signatureImage,
        // todays date: TODO: add a button where the user fills in their own date
        date: getTodaysDate(),
      }),
    })

    // with the newly generated PDF, send that pdf and the other attach. to netlify via static form
    sendToNetlify(response)
  }

  async function sendToNetlify(response) {
    if (response.ok) {
      const blob = await response.blob()
      generatedLink = window.URL.createObjectURL(blob)

      // submit netlify form with both the PDF & the additional attachment
      const nameOfGeneratedPdfFile = "Oxford_Park_ARC_Request.pdf"
      const generatedPdfFile = new File([blob], nameOfGeneratedPdfFile, { type: "application/pdf" })

      // add the PDF file to the formdate before sending
      const netlifyFormData = new FormData(netlifyForm)
      netlifyFormData.append("Request_(PDF)", generatedPdfFile, nameOfGeneratedPdfFile)

      // Send to Netlify
      const netlifyResponse = await fetch("/form.html", {
        method: "POST",
        body: netlifyFormData,
      })

      // checking form submission status
      if (netlifyResponse.ok) {
        // modal
        message =
          "We have received your application. Please click on the link below for your PDF. Thank you."
        loading = false
        success = true
        error = false
        modalPreventEsc = false
      } else {
        message = "Something went wrong. Please try again"
        loading = false
        success = false
        error = true
        modalPreventEsc = false
      }
    } else {
      message = "Please try again"
      success = false
      error = true
      modalPreventEsc = false
    }
  }
</script>

{#if showModal}
  <Modal
    disable={modalPreventEsc}
    on:escape={() => {
      clearModal()
    }}>
    <div class="subscribe-page-modal">
      <LoadingStatus bind:loading bind:success bind:error />
      {#if loading}
        <p>Generating your PDF...</p>
      {/if}

      {#if success}
        <p>{message}</p>
        <a href={generatedLink} class="downloadbtn btn" target="_blank">
          <span class="text">Download PDF</span> <span class="screenreader"></span>
          <span class="arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              aria-hidden="true"
              role="img"
              ><path
                fill="currentcolor"
                d="M11.92 5.62a1 1 0 0 0-.21-.33l-5-5a1.004 1.004 0 0 0-1.42 1.42L8.59 5H1a1 1 0 1 0 0 2h7.59l-3.3 3.29a.999.999 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 .21-.33 1 1 0 0 0 0-.76Z"
              ></path>
            </svg>
          </span>
        </a>
      {:else if error}
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
      <form
        bind:this={netlifyForm}
        class="custom"
        name="arc"
        action="/"
        method="post"
        enctype="multipart/form-data"
        use:enhance={({ cancel }) => {
          genPdf()
          cancel()
        }}>
        <input type="hidden" name="form-name" value="arc" />
        <!-- these form fields will be sent, but wont be included in the email -->
        <!-- & will only be part of the generated PDF -->
        {#each fields as field}
          <InputField
            name={field.name}
            label={field.label}
            type={field.type}
            required={true}
            bind:value={field.value} />
        {/each}
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
        <div class="form-control">
          <label>
            Please draw your signature:
            <input type="hidden" name="signature-verify" value="" required />
          </label>
          <SignaturePad bind:this={signaturePad} />
        </div>
        <button class="btn newbtn">
          <span class="text">Submit ARC Form</span> <span class="screenreader"></span>
          <span class="arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              aria-hidden="true"
              role="img"
              ><path
                fill="currentcolor"
                d="M11.92 5.62a1 1 0 0 0-.21-.33l-5-5a1.004 1.004 0 0 0-1.42 1.42L8.59 5H1a1 1 0 1 0 0 2h7.59l-3.3 3.29a.999.999 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 .21-.33 1 1 0 0 0 0-.76Z"
              ></path>
            </svg>
          </span>
        </button>
      </form>
    </div>
  </section>
</main>
