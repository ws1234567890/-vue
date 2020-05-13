<template>
  <div id="app">
    <load v-show="isload"></load>
    <router-view/>
  </div>
</template>

<script>

import load from './components/loading'
import {mapState} from 'vuex';

  export default {
    name:'app',
    computed:{
      ...mapState(['isload'])
    },
    components:{
      load
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
  list-style-type: none;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
@font-face {
  font-family: 'iconfont';  /* project id 1569361 */
  src: url('http://at.alicdn.com/t/font_1569361_l4q22rk4qtj.eot');
  src: url('http://at.alicdn.com/t/font_1569361_l4q22rk4qtj.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_1569361_l4q22rk4qtj.woff2') format('woff2'),
  url('http://at.alicdn.com/t/font_1569361_l4q22rk4qtj.woff') format('woff'),
  url('http://at.alicdn.com/t/font_1569361_l4q22rk4qtj.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_1569361_l4q22rk4qtj.svg#iconfont') format('svg');
}
i{
  font-family: 'iconfont';
  font-style: normal;
}
em{
  font-style: normal;
}
</style>
