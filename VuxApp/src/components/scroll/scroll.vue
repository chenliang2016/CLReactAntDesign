<template>
  <div class="wrapper" :style="{bottom: bottomHeight}" >
    <div class="scroller">
      <slot></slot>
      <slot name="pulldown"></slot>
      <slot name="pullup"></slot>
    </div>
  </div>
</template>
<script>
  var iScroll = require('iscroll/build/iscroll-probe');
  import { Pulldown,Pullup, addClass,removeClass,containClass } from './pull.js'
  import Spinner from 'vux/dist/components/spinner';
  var pullThreshold = 5;
  const pulldownDefaultConfig = () => ({
    content: '下拉刷新',
    height: 60,
    autoRefresh: false,
    upContent: '下拉刷新',
    downContent: '释放刷新',
    loadingContent: '<div><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50; vertical-align: middle" xml:space="preserve"> <path fill="#bbb" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg></div>',
    clsPrefix: 'vue-iscroll-pulldown-'
  });
  const pullupDefaultConfig = () => ({
    content: '上拉刷新',
    pullUpHeight: 60,
    height: 40,
    autoRefresh: true,
    upContent: '释放刷新',
    downContent: '上拉刷新',
    loadingContent: '<span class="vux-spinner vux-spinner-dots"><svg viewBox="0 0 64 64"><g><circle cx="16" cy="32" stroke-width="0" r="4.71468"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="5.71468"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="5.28532"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg></span>',
    clsPrefix: 'vue-iscroll-pullup-'
  });
  export default{
    components: {
      Spinner
    },
    name: "vue-iscroller",
    props:{
      bottomHeight: {
        type: String,
        default: '0'
      },
      usePulldown: {
        type: Boolean,
        default: false
      },
      usePullup: {
        type: Boolean,
        default: false
      },
      pulldownConfig: {
        type: Object,
        default: ()=>{}
      },
      pullupConfig: {
        type: Object,
        default: ()=>{}
      }
    },
    compiled(){
      this.uuid = Math.random().toString(36).substring(3, 8);
    },
    ready(){
      this.$el.setAttribute('id', `scroller-${this.uuid}`);
      let content = null;
      const slotChildren = this.$el.querySelector('.scroller').childNodes;
      for (let i = 0; i < slotChildren.length; i++) {
        if (slotChildren[i].nodeType === 1) {
          content = slotChildren[i];
          break;
        }
      }
      if (!content) {
        throw new Error('no content is found');
      }
      this._scroller = new iScroll('.wrapper',{
        probeType:2,
        bounceTime: 250,
        bounceEasing: 'quadratic',
        mouseWheel:true,
        scrollbars:true,
        fadeScrollbars:true,
        interactiveScrollbars:false
      });
      if (this.usePulldown) {
        // if use slot=pulldown
        let config = Object.assign(pulldownDefaultConfig(), this.pulldownConfig);
        config.container = this.$el.querySelector('.scroller');
        if(!config.container){
          throw new Error('pulldown has no container')
        }
        //构建pulldown的HTML
        var pulldown = this.pulldown = new Pulldown(config);
        pulldown.on('loading',()=>{
          this.$dispatch('pulldown:loading', this.uuid)
        })
        var pulldownOffset = pulldown.element.offsetHeight;
      }
      if(this.usePullup){
        let config = Object.assign(pullupDefaultConfig(), this.pullupConfig);
        config.container = this.$el.querySelector('.scroller');

        if(!config.container){
          throw new Error('pullup has no container')
        }
        //构建pullup的HTML
        var pullup = this.pullup = new Pullup(config);
        pullup.on('loading',()=>{
          this.$dispatch('pullup:loading',this.uuid)
        })
        pullup.on('complete',()=>{
          this.$dispatch('pullup:complete',this.uuid)
        })
        var pullupOffset = pullup.element.offsetHeight;
      }
      let startPos = null;
      this._scroller.on('scrollStart',function(){
        startPos = this.y;
      })
      var that = this;//保存this

      that._scroller.on('scroll',function(){
        if(that.usePulldown||that.usePullup){
          /*
           'scroll' called, but scroller is not moving!
           Probably because the content inside wrapper is small and fits the screen, so drag/scroll is disabled by iScroll.
           Fix this by a hack: Setting "myScroll.hasVerticalScroll=true" tricks iScroll to believe
           that there is a vertical scrollbar, and iScroll will enable dragging/scrolling again...
           */
          this.hasVerticalScroll=true;
          startPos = -1000;
        } else if ( startPos===-1000 && ((!that.usePullup && (this.y<0)) || ((!that.usePulldown) && (this.y>0))) ){
          /*
           Scroller was not moving at first (and the trick above was applied), but now it's moving in the wrong direction.
           I.e. the user is either scrolling up while having no "pull-up-bar",
           or scrolling down while having no "pull-down-bar" => Disable the trick again and reset values...
           */
          this.hasVerticalScroll=false;
          startPos=0;
          this.scrollBy(0,-this.y, 0);//Adjust scrolling position to undo this "invalid" movement
        }
        if (that.usePulldown) {
          if (this.y > pulldownOffset+pullThreshold && !containClass(pulldown.element,'vue-iscroll-pulldown-down')) {
            pulldown.release();
//            console.log('call release')
            this.scrollBy(0,-pulldownOffset, 0);// Adjust scrolling position to match the change in pullDownEl's margin-top
          } else if (this.y < 0 && containClass(pulldown.element,'vue-iscroll-pulldown-down')) { // User changes his mind...
            pulldown.pull();
            this.scrollBy(0,pulldownOffset, 0);	// Adjust scrolling position to match the change in pullDownEl's margin-top
          }
        }
        if (that.usePullup) {

          if (this.y < (this.maxScrollY - pullupOffset + pullThreshold) && !containClass(pullup.element,'vue-iscroll-pullup-up')) {
            pullup.release();
          } else if (this.y > (this.maxScrollY -pullupOffset + pullThreshold) && containClass(pullup.element,'vue-iscroll-pullup-up')){
            pullup.push();
          }
        }
      })
      that._scroller.on('scrollEnd',function() {
        if ( pulldown && containClass(pulldown.element,'vue-iscroll-pulldown-down')) {
//          console.log('scroll end')
          pulldown.loading();
        }
        if ( pullup && containClass(pullup.element,'vue-iscroll-pullup-up')) {
//          console.log('scroll end');console.log(this)
          //this.scrollBy(0,-pullupOffset, 0);
          pullup.loading();

        }

        if (startPos===-1000) {
          // If scrollStartPos=-1000: Recalculate the true value of "hasVerticalScroll" as it may have been
          // altered in 'scroll' to enable pull-to-refresh/load when the content fits the screen...
          this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
        }
      });
    },
    methods: {
      reset(timeout=0){
//        console.log('reset');console.log(this._scroller);
        this._scroller&&setTimeout(()=>{
//          console.log('refresh')
          this._scroller.refresh();
        },timeout);
      },
      complete(){
        this.pullup = null;
        delete this.pullup;
        this.usePullup = false;
      }
    },
    events:{
      'scroll-reset': function(uuid){
//        console.log('reset event')
        this.reset();
      },
      //下拉刷新，重置iscroll
      'pulldown:reset': function (uuid) {
        if (uuid === this.uuid) {
          this.pulldown.reset(() => {
            //repaint,timeout需要设置长一点
            this.reset(1000);
          })
        }
      },
      //上拉加载，重置iscroll
      'pullup:reset': function (uuid) {
        if (uuid === this.uuid) {
          this.pullup.reset(() => {
            //repaint,timeout需要设置长一点
            this.reset(1000);
          })
        }
      },
      //上拉加载，数据加载完毕
      'pullup:done': function () {
        if (true) {
          this.pullup.complete(()=>{
            this.reset(1000);
          });
          this.complete();

        }
      }
    },
    beforeDestroy(){
      this._scroller.destroy();
    }

  }
</script>
<style>
  .wrapper{
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
  //bottom: 48px;
    width: 100%;
    overflow: hidden;
  }
  .scroller{
    position: absolute;
    width: 100%;
  }
  .vue-iscroll-pulldown-container,.vue-iscroll-pullup-container{
    margin-top: 0;
    background: #fff;
    transition: all linear 250ms;
  }
  .vue-iscroll-pulldown-up{
    margin-top: -60px;
  }
  .vue-iscroll-pulldown-down{
    transition: none;
  }
  .vue-iscroll-pulldown-loading{
    transition: none;
  }
  /* pullup */
  .vue-iscroll-pullup-loading{

  }
  .vue-iscroll-pullup-down{
  }
  .vue-iscroll-pullup-up{
  }
</style>
