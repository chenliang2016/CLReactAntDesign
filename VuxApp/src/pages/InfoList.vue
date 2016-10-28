<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <x-header :left-options="{showBack: false}">信息列表</x-header>
  <div id="scroller" >
    <scroll
      v-if="!loading"
      :bottom-height="btnHeight"
      :use-pulldown="true"
      @pulldown:loading="downLoading"
      :use-pullup="true"
      @pullup:loading="upLoading"
      @pullup:complete="upDone">
      <ul >
        <li v-for="item in items">
          <div class="item-frame" v-on:click="gotoDetail($index)">
            <img src={{item.headImage}} class="item-img">
            <div class="text-frame">
              <div class="item-name">{{item.topic}}</div>
              <div class="item-time">{{item.createDate}}</div>
              <div class="item-desc">{{item.infoDes}}</div>
            </div>
          </div>
          <div class="divider"></div>
        </li>
      </ul>
    </scroll>
    <div v-else></div>
  </div>
  <loading :show="loading" text="数据加载中..."></loading>
</template>

<script>

import Loading from 'vux/src/components/loading'
import Flexbox from 'vux/src/components/flexbox/flexbox'
import FlexboxItem from 'vux/src/components/flexbox/flexbox-item'
import XHeader from 'vux/src/components/x-header'
import scroll from '../components/scroll/scroll.vue'

export default {

  components: {
    Loading,
    Flexbox,
    FlexboxItem,
    XHeader,
    scroll
  },
  data () {
    return {
      btnHeight: '0',
      loading: true,
      page:1,
      items: []
    }
  },
  ready(){
    this.initLoading();
  },
  created () {

  },
  methods: {
    getData() {
      var self = this;
      var url = '/api/m/info/list?page='+this.page+'&size=10';
      this.$http.get(url).then((response) => {
        // success callback
        if (response.body.ret==200){
          var tempDatas = response.body.data;
          for(var i = 0 ; i < tempDatas.length; i ++){
              var tempData = tempDatas[i];
              self.items.push(tempData);
          }

          self.loading = false;
        }
      }, (response) => {
        // error callback
      });
    },
    gotoDetail(index){
        const info = this.items[index];
        console.log(info.infoId);

    },
    initLoading () {
        this.page = 1;
        this.getData();
        if (this.items.length<10){
          this.$broadcast('pullup:done','container')
        }else{
          this.$broadcast('pullup:reset','container')
        }
    },
    onScrollEnd(){
      console.log('end');
    },
    downLoading(uuid){
      this.items.splice(0,this.items.length);
      this.page = 1;
      this.getData();
      this.$broadcast('pulldown:reset',uuid)
    },
    upLoading(uuid){
      this.page ++;
      this.getData();
      if (this.items.length<10){
        this.$broadcast('pullup:done',uuid)
      }else{
        this.$broadcast('pullup:reset',uuid)
      }
    },
    upDone(uuid){
      console.log('end');
    }
  },

}
</script>

<style scoped>
  .news-view {
    color: #42b983;
  }

  .headImage{
      width: 100%;
      height: 80px;
  }
  .root{
    margin-top: -48px;
    margin-bottom: -48px;
  }
  li{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
  }
  .item-frame{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    /*align-items: center;*/
    /*-webkit-align-items: center;*/
    position: relative;
    width: 94%;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .item-img{
    width: 40%;
    height: 40%;
  }
  .text-frame{
    width: 60%;
    height: 100%;
    padding-left: 8px;
    box-sizing: border-box;
  }
  .item-name{
    font-size: 16px;
    color: #333;
    font-weight: 700;
  }
  .item-desc{
    padding-top: 4px;
    font-family: '微软雅黑', sans-serif;
    font-size: 14px;
    color: #333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    word-break:break-all
  }
  .item-time{
    padding-top: 4px;
    font-size: 14px;
    color: #777;
  }
  .divider{
    width: 94%;
    height: 1px;
    margin-left: 8px;
    margin-right: 8px;
    background: #ddd;
  }
  #scroller{
    /*margin-top: 46px;*/
  }
  #scroller>div{
    top: 46px;
  }
</style>
