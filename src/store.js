import Vue from 'vue'
import Vuex from 'vuex'

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weather: [
      { day: 'monday', weather: 'sunday' },
      { day: 'tuesday', weather: 'sunday' },
      { day: 'wednesday', weather: 'rainy' },
      { day: 'thursday', weather: 'fog' }
      // ...
    ]
  },
  // 可以认为是 store 的计算属性
  getters: {
    // Getter 接受 state 作为其第一个参数：
    sunday (state) {
      return state.weather.filter(d => d.weather === 'sunday')
    },
    // Getter 也可以接受其他 getter 作为第二个参数 => 意义不明，测试发现getters指向getters对象
    sundayButNotMonday (state, getters) {
      return getters.sunday.filter(d => d.day !== 'monday')
    },
    // 通过让 getter 返回一个函数，来实现给 getter 传参
    getTodayWeather (state) {
      return (day) => state.weather.find(d => d.day === day).weather
    }
    // getTodayWeather: (state) => (day) => state.weather.find(d => d.day === day).weather
  },
  mutations: {
    // 提交载荷（Payload）
    itRains (state, obj) {
      state.weather.find(w => w.day === obj.day).weather = 'rainy'
      // return 'riany'  测试发现 mutations 无法返回执行结果 => 个人推测只变更状态
      //                                                      之后根据响应式数据动态刷新页面就是其目的
    }
  }
})
