<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <div> today: {{ getDay }} <br> weather: {{ getTodayWeather }} {{ getTodayWeatherByPassingDay() }} </div>
      <p>天气预报: </p>
      <ul>
        <li v-for="(v, i) in getWeather" :key="i">
          {{ v.day }} - {{ v.weather }}
        </li>
      </ul>
      <p>Sunday this week: </p>
      <ul>
        <li v-for="(d, i) in getSundayDays" :key="i">
          {{ d.day }}
        </li>
      </ul>
      <p>Sunny but not monday:  </p>
      <ul>
        <li v-for="(d, i) in getSundayButNotMonday" :key="i">
          {{ d.day }}
        </li>
      </ul>
      <button @click="thuesdayGetRain">天气变更预警：周四下雨 （注意周四天气）</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      day: 'monday'
    }
  },
  computed: {
    // 通过 store 实例获取getters
    getSundayDays () {
      return this.$store.getters.sunday
    },
    getSundayButNotMonday () {
      return this.$store.getters.sundayButNotMonday
    },
    ...mapState({
      // 等价于 getWeather: 'weahter'
      getWeather: state => state.weather,

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      // test: state => {
      //   console.log(this) // undefined
      //   return 'ahahahah'
      // }
      getDay (state) {
        return this.day // this == current component
      },
      getTodayWeather (state) {
        return state.weather.find(d => d.day === this.day).weather
      }
    })
  },
  methods: {
    // call getters by methods
    // 注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
    getTodayWeatherByPassingDay () {
      return this.$store.getters.getTodayWeather(this.day)
    },
    thuesdayGetRain () {
      // this.$store.commit('itRains', 'thursday')
      // 对象风格的提交，整个对象都作为载荷传给 mutation 函数
      this.$store.commit({
        type: 'itRains',
        day: 'thursday'
      })
    }
  }
}
</script>

<style lang="scss">
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
p {
  font-weight: bold;
}
</style>
