<template>
  <div id="page1">
     <div class="tj_gedan">
              <p class="tit">推荐歌单</p>
              <div class="tjbox">
                  <div class="item" v-for="(item,index) in list1" :key="index" @click="tolist(item.id)">
                      <img :src="item.picUrl" alt="">
                      <p>{{item.name}}</p>
                  </div>
              </div>
      </div>
      <div class="new_music">
            <p class="tit">最新音乐</p>
            <ul class="nm_list">
              <li class="new_item" v-for="(item,index) in list2" :key="index" @click="toplay(item.id)">
                <div>
                  <p>{{item.name}}</p>
                  <p>
                    <em v-for="(it,inx) in item.song.artists" :key="inx" v-text="inx>0?'/'+it.name:it.name"></em>
                     - {{item.name}}
                  </p>
                </div>
                <i>&#xe64d;</i>
              </li>
            </ul>
      </div>

  </div>
</template>

<script>

import api from '../until.js'

export default {
  name: 'page1',
  data(){
    return {
      list1: '',
      list2: ''
    }
  },
  created(){
      Promise.all([api('/personalized?limit=6'),api('/personalized/newsong')]).then(res =>{
        this.list1 = res[0].result;
        this.list2 = res[1].result;
      })
      
  },
  methods:{
    toplay(id){
      this.$router.push({
        path:'/mus_play',
        query:{
          idd: id
        }
      })
    },
    tolist(id){
      this.$router.push({
        path: '/list',
        query:{
          id: id
        }
      })
    }
  }
}
</script>

<style>
  .tit{
    padding-left: 10px;
    border-left: 4px solid #d43c33;
    text-align: left;
    font-size: 35px;
    margin: 40px 0;
  }
  .tjbox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .item{
    width: 33%;
    height: 330px;
    font-size: 26px;
    margin-top: 20px;
    text-align: left;
    overflow: hidden;
  }
  .item img{
    width: 100%;
    height: 250px;
  }
  .item p{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 6px 2px 0 6px;
    min-height: 30px;
    line-height: 1.2;
    font-size: 26px;
  }
  .new_item{
    display: flex;
    padding: 0 20px 10px 0;
    margin-left: 20px;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    margin-bottom: 20px;
    border-bottom:0.5px solid rgba(0,0,0, 0.1) ;
  }
  .new_item i{
    font-size: 60px;
    opacity: 0.6;
  }
  .new_item>div>:first-child{
    font-size: 35px;
    margin-bottom: 10px;
  }
  .new_item>div>:last-child{
    font-size: 24px;
    opacity: 0.6;
  }
  .new_music,.tj_gedan{
    overflow: hidden;
  }
</style>