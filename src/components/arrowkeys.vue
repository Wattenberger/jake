<template>
  <div class="arrowkeys">
    <div class="keys">
      <div class="key key-up">▲</div>
      <div class="bottom-row">
        <div class="key key-left">▲</div>
        <div class="key key-down">▲</div>
        <div class="key key-right">▲</div>
      </div>
    </div>
    <h6 class="keys-note">to play</h6>
  </div>
</template>

<script>
import moment from "moment"
import _ from "lodash"
import "./arrowkeys.less"

const durations = [
  {slug: "M", label: "months"},
  {slug: "d", label: "days"},
  {slug: "H", label: "hours"},
  {slug: "m", label: "minutes"},
  {slug: "S", label: "seconds"},
]
let component = {
  mounted() {
  },
}


export default component
</script>
