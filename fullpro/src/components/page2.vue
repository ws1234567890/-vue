<template>
  <div class="page2">
    <div class="hotbox" :style="{'background-image': `url(${image1})`}">
      <div class="hot-img"></div>
      <p class="uptime">更新日期:{{time | todate}}</p>
    </div>
    <ul class="hotmusic">
      <li v-for="(item,index) in hotlist" :key="index" v-show="index<=19?true:flag" @click="toplay(item.id)">
          <div :class="index+1<=3?'red':''">{{changenum(index+1)}}</div>
          <div class="mu">
                  <p>{{item.name}}</p>
                  <p class="hot_p">
                    <em v-for="(it,inx) in item.ar" :key="inx" v-text="inx>0?'/'+it.name:it.name"></em>
                     - {{item.name}}
                  </p>
          </div>
          <i>&#xe64d;</i>
      </li>
    </ul>
    <div class="hot_all" @click="show_all()" v-show="!flag">查看完整榜单<i>&#xe600;</i></div>
  </div>
</template>

<script>
let image1 = require("@/assets/hotbackground.jpg");
import api from '../until.js'

export default {
  name: "page2",
  data() {
    return {
      image1: image1,
      time: '',
      hotlist:'',
      flag: false
    };
  },
  filters:{
    // 更新时间过滤器
    todate(val){
      let now = new Date(val),
          m = now.getMonth()+1,
          d = now.getDate();
      if(m<10){
        m = `0${m}`
      }
      if(d<10){
        d = `0${d}`
      }
      return `${m}月${d}日`;
    }
  },
  methods:{
    changenum(index){
      if(index<10){
        return `0${index}`
      }else{
        return index
      }
    },
    // hot榜单全部显示
    show_all(){
      this.flag = true;
    },
    toplay(id){
      this.$router.push({
        path:'/mus_play',
        query:{
          idd: id
        }
      })
    }
  },
  created(){
    api('/top/list?idx=1').then(res=>{
      
      this.time = res.playlist.updateTime;
      this.hotlist = res.playlist.tracks;
      
    })
  }
};
</script>

<style lang='scss'>
.hotbox {
  height: 280px;
  padding: 20px 0 0 20px;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  .hot-img {
    height: 210px;
    background: url(../assets/index_icon_2x.png) no-repeat;
    background-size: contain;
    background-position: -30px -50px;
  }
  .uptime{
    font-size: 24px;
    color: #fff;
    text-align: left;
    margin: -20px 0 0 20px;
  }
}
.hotmusic{
  // height: 2400px;
  overflow: hidden;
  li{
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 20px;
    box-sizing: border-box;
    .red{
      color: #df3436;
    }
    :first-child{
      flex: 1;
      font-size: 35px;
      padding-right: 10px;
    }
    .mu{
      height: 100%;
      flex: 8;
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 15px 0;
       box-sizing: border-box;
       border-bottom:0.5px solid rgba(0,0,0, 0.1) ;
      :first-child{
        font-size: 35px;
      }
      .hot_p{
        font-size: 24px;
        opacity: 0.6;
        em{
          font-size: 24px;
          opacity: 1.6;
        }
      }
    }
    i{
      height: 100%;
      line-height: 120px;
      flex: 1;
       font-size: 60px;
       opacity: 0.6;
       padding-right: 20px;
       border-bottom:0.5px solid rgba(0,0,0, 0.1) ;
    }
  }
}
.hot_all{
  height: 110px;
  line-height: 110px;
  opacity: 0.6;
  i{
    font-size: 26px;
    margin-left: 8px;
  }
}
</style>