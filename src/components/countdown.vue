<template>
  <h6 class="countdown">
    {{ timeLeft }}
  </h6>
</template>

<script>
import moment from "moment"
import _ from "lodash"

const durations = [
  {slug: "M", label: "months"},
  {slug: "d", label: "days"},
  {slug: "H", label: "hours"},
  {slug: "m", label: "minutes"},
  {slug: "S", label: "seconds"},
]
const weddingDate = moment("2017-08-26 16", "YYYY-MM-DD HH")
let component = {
  mounted() {
    window.setInterval(() => {
      this.now = moment()
    }, 1000);
  },
  data() {
    return {
      now: moment()
    }
  },
  computed: {
    timeLeft() {
      let now = _.clone(this.now)
      let then = _.cloneDeep(weddingDate)
      let durs = durations.map(dur => {
        let diff = then.diff(now, dur.slug)
        then.add(-diff, dur.slug)
        return diff + " " + dur.label
      })
      return durs.join(" ")
    }
  },
}


export default component
</script>
