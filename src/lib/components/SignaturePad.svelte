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

<div class="signature-container">
  <canvas bind:this={canvas}></canvas>
  <button on:click={clear} type="button">clear</button>
</div>

<style lang="less">
  .signature-container {
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
  canvas {
    display: block;
    border: 1px solid var(--primary);
    box-shadow: var(--box-shadow);
  }
  button {
    display: block;
    border: 0;
    font-size: 14px;
    background-color: var(--primary);
    color: #fff;
    line-height: 44px;
    padding: 0 1em;
    text-transform: capitalize;
    transition: background-color 0.33s ease;
    position: absolute;
    top: 0;
    right: 0;
    &:hover {
      background-color: var(--secondary);
    }
  }
</style>
