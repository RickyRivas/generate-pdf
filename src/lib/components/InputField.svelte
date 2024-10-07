<script>
  export let value,
    required,
    label,
    name = "",
    type = "text",
    placeholder = ""

  // if seperate is true
  export let seperate = false

  function typeAction(node) {
    node.type = type
  }
</script>

<div class="form-control">
  <label class="label" for="">
    {`${label}`}
    {#if type === "textarea"}
      <!-- textarea -->
      <textarea {name} cols="20" rows="5" class="input" {required} {placeholder} bind:value />
    {:else}
      <!-- regular inputs -->
      <input use:typeAction {name} class="input" {required} {placeholder} bind:value />
    {/if}
  </label>
</div>
