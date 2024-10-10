<script>
  import { onMount, onDestroy } from "svelte"

  // Flatpickr
  import moment from "moment"
  import flatpickr from "flatpickr"
  import "$styles/flatpickr.less"
  export let value = "",
    label = ""
  let inputElement
  let flatpickrInstance
  const options = {
    allowInput: false,
    mode: "single",
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    minDate: "today",
    disable: [],
    monthSelectorType: "static",
    disableMobile: true,
    onChange(selectedDates, dateStr, instance) {
      if (selectedDates.length > 0) {
        value = moment(selectedDates[0]).format("MMMM D, YYYY")
      }
    },
  }

  onMount(() => {
    flatpickrInstance = flatpickr(inputElement, options)
  })

  onDestroy(() => {
    if (flatpickrInstance) {
      flatpickrInstance.destroy()
    }
  })
</script>

<label for="date-input">
  {label}
  <input
    id="date-input"
    type="text"
    bind:this={inputElement}
    placeholder="Please select a day"
    readonly />
</label>
