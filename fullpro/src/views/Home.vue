<template>
  <div class="home">
      <div class="top">
        <div class="logo">
            <div>
              <i>&#xe603;</i>
              <span>网易云音乐</span>
            </div>
            <div>
              下载APP
            </div>
        </div>
        <ul class="banner">
            <li v-for="(item,index) of tabs" :key="index">
              <span :class="count==index?'active':''" @click="count=index">{{item.title}}</span>
            </li>
        </ul>
      </div>
      <div class="container">
           <keep-alive>
              <component :is='tabs[count].choose'></component>
           </keep-alive>
      </div>
  </div>
</template>

<script>

import page1 from '../components/page1'
import page2 from '../components/page2'
import page3 from '../components/page3'

export default {
  name: 'home',
  data(){
    return {
      count: 0,
      tabs:[
        {title: '推荐歌单',choose: 'page1'},
        {title: '热歌榜',choose: 'page2'},
        {title: '搜索',choose: 'page3'}
      ]
    }
  },
  components: {
    page1,
    page2,
    page3
  }
}
</script>

<style>
  .top{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
  }
  .logo{
      height: 168px;
      background-color: #d43c33;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
  }
  .logo div{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo i{
    font-size: 80px;
    color: #fff;
  }
  .logo span{
    font-size: 40px;
    font-weight: 500px;
    color: #fff;
  }
  .logo>:last-child{
    background-color: #fff;
    border-radius: 37.5%/100%;
    width: 200px;
    height: 72px;
    color: #d43c33;
  }
  .banner{
    width: 100%;
    height: 80px;
    display: flex;
    background-color: #fff;
  }
  .banner li{
    flex: 1;
  }
  .banner li span{
    display: inline-block;
    padding: 0 10px;
    line-height: 80px;
  }
  .active{
    color: #d43c33;
    border-bottom: 4px solid #d43c33;
  }
  .home{
    margin-top: 240px;
  }
</style>
