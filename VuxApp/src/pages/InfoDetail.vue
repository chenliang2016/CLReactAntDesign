<template>
  <x-header>信息详情</x-header>
  <div>
    {{{info.content.html}}}
  </div>
  <loading :show="loading" text="数据加载中..."></loading>
</template>
<style>

</style>
<script>
  import XHeader from 'vux/src/components/x-header'
  import Loading from 'vux/src/components/loading'

    export default{
        data(){
            return{
              loading:true,
              info:{},
            }
        },
        components:{
          Loading,
          XHeader,
        },
        ready(){
          this.initLoading();
        },
      methods:{
        initLoading(){
            var self =this;
            var url = '/api/m/info/detail?infoId=1';
            this.$http.get(url).then((response) => {
              console.log(response);
              if (response.body.ret==200){
                self.info = response.body.data;
                self.loading = false;
              }
            });
        }
      }
    }
</script>
