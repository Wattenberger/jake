<template>
  <div class="snake">
    <div class="snake__overlay"
         v-if="!playing"
         :style="{height: `${height}px`, width: `${width}px`}">

      <div v-if="record">
        <div class="snake__name">
          <h6>Your Name:</h6>
          <input ref="name" type="text" v-model="name" autoselect>
        </div>

        <h6>Last game: {{ score }}</h6>
        <h6>Record: {{ record }}</h6>
      </div>
      <h6 v-if="!record">Play snake</h6>

      <button v-on:click="startNewGame">New Game (Enter)</button>
    </div>

    <div class="snake__record-board" :class="{fade: playing && hasPlayed}">
      <h6>Record Board</h6>
      <div class="snake__record-board__record"
           v-for="record in records">
        <div class="snake__record-board__record__name">{{ record.name }}</div>
        <div class="snake__record-board__record__score">{{ record.score }}</div>
       </div>
    </div>

    <canvas ref="canvas" :height="height" :width="width" />
  </div>
</template>

<script>
  import _ from "lodash"
  import moment from "moment"
  import {canvasUtils} from "./utils/canvasUtils"
  import {KEYS} from "./utils/keys"
  import "./snake.less"
  import jakeImg from "images/jake2.png"
  import millyImg from "images/milly2.png"
  import heartImg from "images/hearts.png"

  import fetch from "./utils/fetch"
  const API_ROOT = "https://api.airtable.com/v0/appSzDbt6xNdQcRfd"
  const airtableDateTimeFormat = "YYYY-MM-DD HH:mm:SS"
  import {AIRTABLE_API_KEY} from "config/config"

  const params = {
    api_key: AIRTABLE_API_KEY,
    pageSize: 20,
    sortField: "Score",
    sortDirection: "desc",
  }
  const expandParams = params => Object.keys(params).map(key => key + "=" + encodeURIComponent(params[key])).join("&")

  let animationRequestId
  const RECORD_FILE = "records"
  const INTERVAL_LENGTH = 30
  const SNAKE_STARTING_LENGTH = 6
  const CANVAS_RGB = "240, 240, 244"
  const SNAKE_RGB = "153, 199, 137"
  const TARGET_RGB = "211, 125, 78"
  const RAINBOW_COLORS = ["184,53,100", "255,106,90", "255,179,80", "131,184,170", "39,45,77"]
  const MAX_NAME_LENGTH = 12

  let component = {
    mounted: function() {
      let {HEIGHT_PXS, TILE_PX, height, width} = this
      window.addEventListener("keydown", this.onKeydown)
      window.addEventListener("resize", this.onResize)

      let canvas = this.$refs.canvas.getContext("2d")
      _.extend(this, {canvas})

      this.drawBottomBorder()
      canvasUtils.fadeCanvas(1, canvas, CANVAS_RGB, {
        width, height: HEIGHT_PXS * TILE_PX + 0.5
      })
      this.draw()
      this.fetchRecords()
    },
    data() {
      return {
        height: window.innerHeight,
        width: window.innerWidth,
        keypresses: {
          [KEYS.LEFT]: this.changeDir.bind(this, {x: -1, y: 0}),
          [KEYS.RIGHT]: this.changeDir.bind(this, {x: 1, y: 0}),
          [KEYS.UP]: this.changeDir.bind(this, {x: 0, y: -1}),
          [KEYS.DOWN]: this.changeDir.bind(this, {x: 0, y: 1}),
          [KEYS.ENTER]: this.startNewGame,
        },
        canvas: null,
        snake: null,
        target: null,
        hasDrawnAfterDirChange: false,
        history: [],
        playing: true,
        score: null,
        record: null,
        records: null,
        dirBuffer: null,
        hasPlayed: false,
        name: "Name",
        recordId: null,
      }
    },
    computed: {
        WIDTH_PXS: function() {
          return Math.floor(this.width / 20)
        },
        TILE_PX: function() {
          return this.width / this.WIDTH_PXS
        },
        HEIGHT_PXS: function() {
          return Math.floor(this.height / this.TILE_PX)
        },
        BOARD_CENTER: function() {
          return {
            x: Math.floor(this.WIDTH_PXS / 2),
            y: Math.floor(this.HEIGHT_PXS / 2),
          }
        },
    },
    methods: {
      onResize: function() {
        let newVars = {
          height: window.innerHeight,
          width: window.innerWidth,
        }

        _.extend(this, newVars)
        window.setTimeout(this.drawBottomBorder, 100)
      },

      drawBottomBorder: function() {
        let {HEIGHT_PXS, TILE_PX, canvas, height, width} = this

        let yStart = HEIGHT_PXS * TILE_PX + 0.5
        canvas.fillStyle = "#0e4e47"
        canvas.fillRect(0, yStart, width, height - yStart)
      },

      startNewGame: function() {
        let {playing} = this
        if (playing) return
        
        _.extend(this, {
          snake: null,
          target: null,
          history: [],
          playing: true,
        })
        setTimeout(() => {
          this.draw()
        })
      },

      endGame: function() {
        let {snake, record} = this

        let score = snake.length - SNAKE_STARTING_LENGTH
        record = Math.max(score, record)
        _.extend(this, {
          score,
          record,
          playing: false
        })
        this.recordId = null
        this.saveRecord()

        let ctrl = this
        window.setTimeout(() => {
          ctrl.$refs.name && ctrl.$refs.name.focus()
        }, 100)
      },

      changeDir: function(dir, e) {
        if (e) e.preventDefault()

        let {hasDrawnAfterDirChange, playing, snake, hasPlayed} = this
        if (!playing || !snake) return
        hasPlayed = true

        const checkAxis = (axis) => Math.abs(dir[axis] - snake.dir[axis]) > 1
        if (checkAxis("x") || checkAxis("y")) return

        if (!hasDrawnAfterDirChange) {
          this.dirBuffer = dir
        } else {
          snake.dir = dir
          hasDrawnAfterDirChange = false
          _.extend(this, {snake, hasDrawnAfterDirChange, hasPlayed})
        }
      },

      onKeydown: function(e) {
        let pressedKey = e.keyCode
        let method = this.keypresses[pressedKey]
        if (method) method(e)
      },

      draw: function() {
        let {HEIGHT_PXS, TILE_PX, width, height, canvas, playing, dirBuffer} = this
        if (!playing) return

        _.extend(this, {hasDrawnAfterDirChange: true})
        if (dirBuffer) {
          this.changeDir(dirBuffer)
        }
        if (canvas) {
          canvasUtils.fadeCanvas(1, canvas, CANVAS_RGB, {
            width, height: HEIGHT_PXS * TILE_PX + 0.5
          })
          this.drawTarget()
          this.drawSnake()
        }

        animationRequestId = setTimeout(() => {window.requestAnimationFrame(this.draw)}, INTERVAL_LENGTH)
      },

      createSnake: function() {
        return {
          length: SNAKE_STARTING_LENGTH,
          dir: {x: 1, y: 0},
          pos: this.BOARD_CENTER,
        }
      },

      interpPos: function (p1, p2) {
        let {width, height} = this
        let interpPlane = (dimension, bound) => {
          let newPoint = (p1[dimension] + p2[dimension]) % bound
          if (newPoint < 0) newPoint = bound + newPoint
          return newPoint
        }
        return {
          x: interpPlane("x", Math.floor(width / this.TILE_PX)),
          y: interpPlane("y", Math.floor(height / this.TILE_PX)),
        }
      },

      drawSnake: function () {
        let {TILE_PX, width, height, canvas, snake, history, target, points, justAte} = this
        if (!snake) snake = this.createSnake()

        let newPos = this.interpPos(snake.pos, snake.dir)
        _.extend(snake.pos, newPos)

        // Eat?
        if (newPos.x == target.x && newPos.y == target.y) {
          target = this.createTarget()
          snake.length++
          justAte = 20
        }

        // Die?
        if (_.find(history, historyPoint => historyPoint.x == newPos.x && historyPoint.y == newPos.y)) {
          this.endGame()
        }

        history.unshift(newPos)
        history = history.splice(0, snake.length)
        _.map(history, (historyPoint, idx) => {
          if (idx) this.drawRainbowPx(historyPoint, snake.dir, history[idx - 1])
        })
        if (justAte) {
          let scale = (10 - Math.abs(10 - justAte)) * 10
          let offset = TILE_PX / 2 - scale / 2
          this.drawImg(newPos, heartImg, {x: offset, y: offset}, {height: scale, width: scale})
          justAte--
        }
        this.drawImg(newPos, jakeImg)

        _.extend(this, {snake, history, target, points, justAte})
      },

      drawPx: function(pos, rgb, style="fill") {
        let {canvas} = this

        canvas[`${style}Style`] = `rgb(${rgb})`
        canvas[`${style}Rect`](
          pos.x * this.TILE_PX - 1,
          pos.y * this.TILE_PX - 1,
          this.TILE_PX + 1,
          this.TILE_PX + 1,
        )
      },

      drawImg: function(pos, imgUrl, offset={x:0, y:0}, config) {
        let {TILE_PX, canvas} = this

        let img = new Image()
        img.src = imgUrl
        let args = [img, pos.x * TILE_PX + offset.x, pos.y * TILE_PX + offset.y]
        if (config) args = [...args, config.height, config.width]
        canvas.drawImage(...args)
      },

      drawRainbowPx: function(pos, currentDir, lastPos) {
        let {canvas, snake} = this
        let dir = lastPos ?
                    lastPos.x != pos.x ?
                      "x" : "y" :
                    currentDir.x != 0 ?
                      "x" : "y"

        let imgOffset = 5
        let colorHeight = (this.TILE_PX + 1) / RAINBOW_COLORS.length
        let x = pos.x * this.TILE_PX
        let y = pos.y * this.TILE_PX
        _.each(RAINBOW_COLORS, (color, idx) => {
          canvas.fillStyle = `rgb(${color})`
          if (dir == "x") {
            canvas.fillRect(
              x - 0.5 + imgOffset,
              y + colorHeight * idx + imgOffset,
              this.TILE_PX + 1,
              colorHeight,
            )
          } else {
            canvas.fillRect(
              x + colorHeight * idx + imgOffset,
              y - 0.5 + imgOffset,
              colorHeight,
              this.TILE_PX + 1,
            )
          }
        })
      },

      drawCircle: function(pos, rgb, style="fill") {
        let {canvas} = this

        canvas.lineWidth = 2.5
        let halfTile = this.TILE_PX / 2
        canvasUtils.drawDot({
          x: pos.x * this.TILE_PX + halfTile,
          y: pos.y * this.TILE_PX + halfTile,
          r: this.TILE_PX * 0.35,
        }, canvas, `rgb(${rgb})`, style)
      },

      createTarget: function() {
        return {
          x: _.random(this.WIDTH_PXS - 1),
          y: _.random(this.HEIGHT_PXS - 1),
        }
      },

      drawTarget: function() {
        let {canvas, target} = this
        if (!target) target = this.createTarget()

        // this.drawPx(target, TARGET_RGB, "stroke")
        // this.drawCircle(target, TARGET_RGB, "stroke")
        this.drawImg(target, millyImg)
        _.extend(this, {target})
      },

      getGameOverlayStyle: function() {
        return {
          width: `${BOARD_WIDTH}px`,
          height: `${BOARD_WIDTH}px`,
        }
      },

      fetchRecords: function() {
        let ctrl = this

        fetch(`${API_ROOT}/Scores?${expandParams(params)}`, {
          method: "GET",
        }).then(res => {
          ctrl.records = res.records.map(record => ({
            date: moment(record.fields.Date, airtableDateTimeFormat),
            score: record.fields.Score,
            name: record.fields.Name,
          }))
        })
      },

      saveRecord: function() {
        let {name, score, recordId} = this
        let ctrl = this
        if (!score) return

        let fields = {
          Date: moment().format(airtableDateTimeFormat),
          Name: name,
          Score: score,
        }
        let url = recordId ? `${API_ROOT}/Scores/${recordId}?${expandParams(params)}` :
                             `${API_ROOT}/Scores?${expandParams(params)}`
        fetch(url, {
          method: recordId ? "PATCH" : "POST",
          body: JSON.stringify({fields}),
        }).then(res => {
          ctrl.fetchRecords()
          this.recordId = res.id
        })
      },
    },
    watch: {
      name: function(newVal) {
        this.name = newVal.slice(0, MAX_NAME_LENGTH)
        this.saveRecord()
      },
    },
    destroyed: function() {
      window.removeEventListener("keydown", this.onKeydown)
      window.removeEventListener("resize", this.onResize)
      window.cancelAnimationFrame(animationRequestId)
    }
  }

  export default component
</script>
