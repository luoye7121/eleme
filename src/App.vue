<template>
  <div>
  <v-header :seller="seller"></v-header>
   <div class="tab border-1px">
     <div class="tab-item">
       <a href="#" v-link="{path:'/goods'}" >商品</a>
     </div>
      <div class="tab-item">
       <a href="#" v-link="{path:'/ratings'}">评价</a>
     </div>
      <div class="tab-item">
       <a href="#" v-link="{path:'/seller'}">商家</a>
     </div>
   </div>
   <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>


<script type="ecmascript-6">
import header from './components/header/header'
import {urlParse} from 'common/js/util'
const ERR_OK = 0;
export default {
  data() {
    return {
      seller:{
        id:(() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      },
    };
  },
created() {
         this.$http.get('/api/seller/?id=' +this.seller.id).then((response) => {
                // success callback
                response = response.body;
                //console.log(response)
                if(response.errno === ERR_OK){
                    // this.seller = response.data;
                    // console.log(this.seller.id);输出为undefined 因为是自定属性，则在请求数据的时候自定义属性会被丢弃，所以使用ES6中的Object.assign(target,...,resourse);最终结果是target，所以this.seller=Object.assign({},this.seller,response.data);
                    this.seller = Object.assign({},this.seller,response.data);
                     // console.log(this.seller.id)
                }
                },reponse => {
                // error callback
                });
       
    },
components:{
    'v-header':header
  }
}
</script>

<style  lang='stylus' type='stylesheet/stylus'>
@import 'common/stylus/minxin.styl'
  .tab
    display:flex
    height:40px
    line-height:40px
    border-1px(rgba(7,17,27,.1))
    .tab-item
      flex:1
      text-align:center
      & > a
        display:block
        color:rgb(77,85,93)
        font-size:14px
        &.active
         color:rgb(240,20,20)
</style>
