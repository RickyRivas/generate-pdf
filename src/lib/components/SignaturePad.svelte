<script>
  import { onMount } from "svelte"
  import SignaturePad from "signature_pad"

  let canvas
  let signaturePad

  onMount(() => {
    signaturePad = new SignaturePad(canvas, {
      backgroundColor: "rgb(255,255,255)",
      penColor: "rgb(0,0,0)",
    })
  })

  export function clear() {
    signaturePad.clear()
  }

  export function getSignatureImage() {
    if (signaturePad.isEmpty()) return null
    return signaturePad.toDataURL() // Returns a data URL containing a representation of the signature
  }
</script>

<canvas bind:this={canvas}></canvas>
<button on:click={clear}>clear</button>
