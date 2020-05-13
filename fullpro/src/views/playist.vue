<template>
  <div id="playlist">
      <div class="cover">
          <img :src="coverimg" alt="" class="coverback">
          <div class="imgbox">
              <img :src="coverimg" alt="">
          </div>
          <div class="covertit">
              <h2>{{homename}}</h2>
              <div class="user">
                      <img :src="userimg" alt="">
                      <p>{{username}}</p>
              </div>
          </div>
      </div>

      <div :ref="tag" class="ltag">
          <ul>
              <li>标签:</li>
              <li v-for="(item,index) in tag" :key="index">
                  {{item}}
              </li>
          </ul>
          <p :style="{'height': `${hei}`,'-webkit-line-clamp': `${clamp}`}">
                <span>简介:</span>
                {{description}}
          </p>
          <div class="jt"  @click="ichange">
              <i v-show="!flag">&#xe64b;</i>
              <i v-show="flag">&#xe649;</i>
          </div>
      </div>

      <h3 class="tithr">
          歌曲列表
      </h3>
      <ul class="gequlist">
          <li v-for="(item,index) in muslist" :key="index" @click="toplay(item.id)">
            <div>{{changenum(index+1)}}</div>
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
      <h3 class="tithr">
          精彩评论
      </h3>

      <ul class="hot_com">
          <li v-for="(item,index) in comment" :key="index">
              <div class="comimg">
                  <img :src="item.user.avatarUrl" alt="">
              </div>
              <div class="comtext">
                  <p>{{item.user.nickname}}
                      <span>{{item.likedCount}}<i>&#xe601;</i></span>
                  </p>
                  <p>{{item.time | todate}}</p>
                  <p>{{item.content}}</p>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>

import api from '../until.js'

export default {
    name: 'playlist',
    data(){
        return{
            data: '',
            coverimg: '',
            homename: '',
            tag: '',
            description: '',
            userimg: '',
            username: '',
            muslist: '',
            hei: '54px',
            clamp: 3,
            flag: false,
            comment: ''
        }
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
    created(){
        let id = this.$route.query.id;
        Promise.all([api(`/playlist/detail?id=${id}`),api(`/comment/playlist?id=${id}`)]).then(res => {
            
            this.data = res[0].playlist;
            this.coverimg = this.data.coverImgUrl;
            this.homename = this.data.name;
            this.description = this.data.description;
            this.userimg = this.data.creator.avatarUrl;
            this.username = this.data.creator.nickname;
            this.muslist =this.data.tracks;
            this.tag = this.data.tags;

            this.comment = res[1].hotComments
            // console.log(this.data)
        })
    },
    methods:{
        ichange(){
            if(this.flag){
                this.hei = '54px';
                this.clamp = 3;
            }else{
                this.hei = 'auto';
                this.clamp = 99;
            }
            this.flag = (this.flag==true?false:true);
        },
        changenum(index){
            if(index<10){
                return `0${index}`
            }else{
                return index
            }
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

<style lang='scss'>
    .cover{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 395px;
        padding: 60px 20px 60px 30px;
        box-sizing: border-box;
        display: flex;
        color: #fff;
        background-color: rgba($color: #000000, $alpha: 0.2);
        .coverback{
            position: absolute;
            top: -50%;
            left: 0;
            width: 100%;
            height: 700px;
            z-index: -1;
            filter: blur(60px);
        }
        .imgbox{
            width: 264px;
            img{
                width: 264px;
                height: 264px;
            }
        }
        .covertit{
            flex: 1;
            padding-left: 32px;
            h2{
                font-size: 34px;
                text-align: left;
            }
            .user{
                margin-top: 40px;
                display: flex;
                img{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }
                p{
                    line-height: 60px;
                    padding-left: 10px;
                }
            }
        }
    }
    .ltag{
        position: relative;
        overflow: hidden;
        margin: 0 20px 0 30px;
        padding-top: 20px;
        line-height: 38px;
        color: #666;
        ul{
            display: flex;
            margin-bottom: 40px;
            line-height: 40px;
            font-size: 24px;
            li{
                margin-right: 20px;
                padding: 2px 16px;
                border: 1px solid rgba(0,0,0,.1);;
                border-radius: 20px;
            }
            :first-child{
                font-size: 30px;
                border: none;
            }
        }
        p{
            text-align: left;
            padding: 2px 16px;
            margin-bottom: 50px;
            font-size: 28px;
            white-space: pre-wrap;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            span{
                 font-size: 30px;
                 margin-right: 20px;
            }
        }
        .jt{
            position: absolute;
            right: 10px;
            bottom: 0;
            text-align: right;
            font-size: 30px;
        }
    }
    .tithr{
        height: 46px;
        line-height: 46px;
        padding: 0 20px;
        font-size: 24px;
        color: #666;
        background-color: #eeeff0;
        text-align: left;
    }
    .gequlist{
        li{
            height: 120px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0 0 20px;
            box-sizing: border-box;
            :first-child{
                flex: 1;
                font-size: 35px;
                padding-right: 10px;
            }
            .mu{
                overflow: hidden;
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
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;  
                    word-break: normal;
                }
                .hot_p{
                    font-size: 24px;
                    opacity: 0.6;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;  
                    word-break: normal;
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
    .hot_com{
        li{
            display: flex;
            margin: 20px 0 20px 20px;
            .comimg{
                flex: 1;
                margin-right: 20px;
                img{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }
            }
            .comtext{
                flex: 8;
                padding-bottom: 20px;
                border-bottom:0.5px solid rgba(0,0,0, 0.1) ;
                text-align: left;
                :first-child{
                    // padding: 0 10px 0 0;
                    font-size: 28px;
                    color: #666;
                    line-height: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span{
                        line-height: 40px;
                        font-size: 22px;
                        color: #999;
                        i{
                            font-size: 30px;
                            padding-left: 10px;
                        }
                    }
                }
                :nth-child(2){
                    font-size: 18px;
                    color: #999;
                }
                :last-child{
                    color: #333;
                    font-size: 30px;
                    line-height: 44px;
                    padding: 10px 20px 0 0;
                }
            }
        }
    }
</style>