<template>
  <div class="app">
    <div class="nav">
      <router-link :to="{name: item.name}" v-for="item in nav" class="nav-item">
        {{ item.label }}
      </router-link>

    </div>
      <router-view>
    </router-view>
    <div class="footer">
      Shoot me an email at <a href="mailto:jacoby8s@gmail.com">jacoby8s@gmail.com</a>
    </div>
  </div>
</template>

<script>
import {KEYS} from "./utils/keys"
import jake from "./../images/jake.jpg"
import "./app.less"

export default {
  mounted: function() {
    window.addEventListener("keydown", this.onKeydown)
  },
  data () {
    return {
      image: jake,
      nav: [
        {name: "home",         label: "Jake Yates"  },
        {name: "publications", label: "Publications"},
        {name: "cv",           label: "CV"          },
      ]
    }
  },
  methods: {
    onKeydown: function(e) {
      let pressedKey = e.keyCode
    }
  },
  components: {
    // snake,
  },
  destroyed: function() {
    window.removeEventListener("keydown", this.onKeydown)
  }
}
</script>

<style>
</style>
