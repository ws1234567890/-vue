<template>
  <div class="page3">
    <div class="inputbox">
      <i>&#xe677;</i>
      <input type="text" class="sousuo" placeholder="搜索歌曲、歌手、专辑" v-model="in_value"  @compositionstart='start' @compositionend='end'  @input="getsuggest" @keypress='getdata'>
    </div>

    <hr class="line">

    <div class="hot_sousuo" v-show="!in_value">
      <p>热门搜索</p>
      <ul class="hot_s">
        <li v-for="(item,index) in hotlist" :key="index" @click="putinval(item.first)">
            {{item.first}}
        </li>
      </ul>
    </div>

    <div class="closetag" v-show="in_value&&suggestshow">
      <h3 @click="getdata">搜索"{{in_value}}"</h3>
      <ul class="tag">
        <li v-for="(item,index) in suggestlist" :key="index" @click="putinval(item.keyword)">
          <i>&#xe677;</i>
          <p>{{item.keyword}}</p>
        </li>
      </ul>
    </div>

    <div class="ssdata_box" v-show="in_value&&dataflag">
      <ul>
          <li class="new_item" v-for="(item,index) in ssdatalist" :key="index" @click="toplay(item.id)">
                <div>
                  <p>{{item.name}}</p>
                  <p>
                    <em v-for="(it,inx) in item.artists" :key="inx" v-text="inx>0?'/'+it.name:it.name"></em>
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
    name: 'page3',
    data(){
      return{
        hotlist:'',
        in_value: '', // input双向绑定
        flag: true,
        suggestlist: '',
        suggestshow: true,
        ssdatalist: '',
        dataflag: false
      }
    },
    created(){
      // 热门搜索tag
      api('/search/hot').then(res =>{
        this.hotlist = res.result.hots;
      })
    },
    methods:{
      // 请求搜索建议tag
      getsuggest(){
        this.suggestshow = true;
        this.dataflag = false;
        if(this.flag&&this.in_value!==''){
          api(`/search/suggest?keywords=${this.in_value}&type=mobile`).then(res => {
            this.suggestlist = res.result.allMatch;
          })
        }else{
          return 
        }
      },
      start(){
        this.flag = false;
      },
      end(){
        this.flag = true;
      },
      // 请求搜索结果
      getdata(){
        this.suggestshow = false;
        this.dataflag = true;
        if(this.in_value!==''){
            api(`/search?keywords=${this.in_value}`).then(res =>{
              // console.log(res)
              this.ssdatalist = res.result.songs;
            })
        }else{
          return 
        }
      },
      // tag标签导入value(请求搜索数据)
      putinval(text){
        this.in_value = text;
        this.getdata();
      },
      toplay(id){
      this.$router.push({
        path:'/mus_play',
        query:{
          idd: id
        }
      })
    }
    }
}
</script>

<style lang="scss">
  .page3{
    overflow: hidden;
    .inputbox{
      opacity: 0.8;
      height: 64px;
      margin: 30px 20px;
      background: #ebecec;
      border-radius: 30px;
      display: flex;
      i{
        line-height: 64px;
        width: 10%;
      }
      .sousuo{
        width: 80%;
        border: none;
        outline: none;
        line-height: 36px;
        background: rgba(0,0,0,0);
        font-size: 30px;
        color: #333;
      }
    }
    .line{
      border: none;
      border-bottom: 0.5px solid rgba($color: #000000, $alpha: 0.1);
    }
    .hot_sousuo{
      padding: 30px 20px 0;
        p{
          text-align: left;
          font-size: 24px;
          line-height: 24px;
          color: #666;
        }
        .hot_s{
          margin: 20px 0 14px;
          display: flex;
          flex-wrap: wrap;
          li{
            display: inline-block;
            height: 64px;
            margin-right: 16px;
            margin-bottom: 16px;
            padding: 0 28px;
            font-size: 28px;
            line-height: 64px;
            color: #333;
            border-radius: 64px;
            border: 1px solid #ccc;
          }
        }
    }
    .closetag{
      text-align: left;
      h3{
        height: 100px;
        margin-left: 20px;
        padding-right: 20px;
        font-size: 30px;
        line-height: 100px;
        color: #507daf;
      }
      .tag{
        li{
          display: flex;
          align-items: center;
          height: 90px;
          padding-left: 20px;
          p{
            padding-left: 20px;
          }
        }
      }
    }
  }
</style>