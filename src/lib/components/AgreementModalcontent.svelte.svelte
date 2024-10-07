<script>
  import { onMount } from "svelte"
  export let acceptedAgreement
  import { register } from "swiper/element/bundle"

  // register swiper web components
  register()
  let agreementScrollContainer
  onMount(() => {
    // when user selects a date, this component will be mounted
    agreementScrollContainer.initialize()
  })
</script>

<div class="agreementScrollContainer">
  <swiper-container
    bind:this={agreementScrollContainer}
    scrollbar="true"
    direction="vertical"
    slides-per-view="auto"
    free-mode="true"
    init="false"
    mousewheel-control="true">
    <swiper-slide>
      <h3>ARC Submission Terms</h3>
      <p>
        I understand that the Architectural Control Committee has up to thirty (30) days to review
        my request for alteration and or modification to my property. I further understand that any
        work performed or cost(s) incurred by me prior to receiving written approval from the Board
        will be done so at my own risk as disapproval of my request may result in my requirement to
        restore my property to its original condition. I hereby indemnify the Oxford Park
        Homeowner's Association, its members, Board of Directors, employees and their heirs and
        successors from any and all costs past, present or future associated with this request
        and/or the modifications indicated therein. I certify by my signature that I have read and
        familiarized myself with the Magnolia Gardens Declaration of Covenants, Conditions and
        Restrictions and will insure that any and all modifications to my property will not violate
        those Covenants without express written waiver from the Board.
      </p>
    </swiper-slide>
  </swiper-container>
</div>

<div class="agreement-input">
  <input
    type="checkbox"
    name=""
    id="agreementbox"
    checked={acceptedAgreement}
    on:change={(e) => {
      if (e.target.checked) acceptedAgreement = true
      else acceptedAgreement = false
    }} />
  <label for="agreementbox">
    <div class="animate">
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path d="M2 12.5L8.5625 20L23 5" stroke="currentcolor"></path>
      </svg>
    </div>
    I accept the Terms and Conditions.
  </label>
</div>

<style lang="less">
  .agreementScrollContainer {
    border: 2px solid var(--form-bordercolor);
    border-radius: var(--form-borderradius);
    height: (250/20em);
    max-height: (250/20em);
    overflow: hidden;
    text-align: left;
    margin-bottom: 0.5em;
  }
  swiper-container {
    width: 100%;
    height: 100%;
    --swiper-scrollbar-drag-bg-color: var(--primary);
  }

  swiper-slide {
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1em;

    p {
      margin: 0 0 1.58em;
    }
  }

  .agreement-input {
    display: flex;
    align-items: flex-start;

    label {
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1em;

      span {
        display: inline-block;
        vertical-align: middle;
      }

      .animate {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        width: 1.5em;
        height: 1.5em;
        pointer-events: none;
        transition: background-color 0.33s ease;
        background-color: var(--primary-light);
        border: 1px solid var(--primary);

        svg {
          display: block;
          transition: color 0.33s ease;

          path {
            color: #fff;
            stroke-dashoffset: 31;
            stroke-dasharray: 31;
            transition: stroke-dashoffset 0.33s ease;
          }
        }
      }

      &:hover {
        .animate {
          background-color: var(--primary);
        }
      }
    }

    input[type="checkbox"] {
      display: none;

      &:checked {
        & ~ label .animate {
          background-color: var(--primary);

          svg path {
            stroke-dashoffset: 0;
          }
        }
      }
    }
  }
</style>
