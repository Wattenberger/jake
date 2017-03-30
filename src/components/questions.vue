<template>
  <div class="questions">
    <div v-for="question in list">
      <h3>{{ question.q }}</h3>
      <p v-html="question.a"></p>
    </div>
  </div>
</template>

<script>
import "./questions.less"
import {questions} from "./questionList"

export default {
  data () {
    return {
      list: questions
    }
  }
}
</script>
