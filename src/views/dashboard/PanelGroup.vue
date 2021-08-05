<!--
<template>
  <el-row :gutter="8" class="panel-group">
    <el-col v-for="item in stsList" :xs="8" :sm="8" :lg="3" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <img :src="item.picImg" icon-class="peoples" class-name="card-panel-icon">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
             {{item.categoryName}}
          </div>
           <div class="count-to-bottom">
            <count-to :start-val="0" :end-val="item.count" :duration="3000" class="card-panel-num" /><span style="font-size:8px;color:#E6A23C;">个数</span><br/>
            <count-to :start-val="0" :end-val="item.money" :duration="3000" class="card-panel-num" decimals="1" /><span style="font-size:8px;color:#E6A23C;">价值(元)</span><br/>
           </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="8" :sm="8" :lg="3" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总计
          </div>
          <div class="count-to-bottom">
            <count-to :start-val="0" :end-val="zj.zgs" :duration="3000" class="card-panel-num" /><span style="font-size:8px;color:#E6A23C;">总个数</span><br/>
            <count-to :start-val="0" :end-val="zj.zjz" :duration="3000" class="card-panel-num" decimals="1"/><span style="font-size:8px;color:#E6A23C;">总价值(元)</span><br/>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import CountTo from 'vue-count-to'
import { listTjProduct } from "@/api/equip/product";
export default {
  components: {
    CountTo
  },
  data() {
    return {
      stsList: [],
      zj:{zjz:0,zgs:0}
    }
  },
  created() {
      this.getList();
  },
  methods: {
    getList() {
      listTjProduct().then(res => {
        this.stsList = res.data;
        let zj={zgs:0,zjz:0};
        this.stsList.forEach(function(item,index){
            zj.zgs=zj.zgs+item.count;
            zj.zjz=zj.zjz+item.money;
        });
        this.zj=zj;
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.panel-group {
  margin-top: 0px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      //margin: 14px 0 0 0px;
      padding: 35px 0 0 8px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      width: 42%;
      height: 100%;
    }

    .card-panel-icon {
      float: left;
      font-size: 41px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      //margin: -60px 20px 0px 24px;
      width:50%;
      height:88px;

      .card-panel-text {
        line-height: 15px;
        color: rgb(230, 162, 60);
        font-size: 13px;
        position: absolute;
        top: 22px;
        right: 36px;
        left: 58px;
        width: 86px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.panel-group .card-panel .card-panel-description .card-panel-num[data-v-0333a520] {
    font-size: 15px;
}
.count-to-bottom{
 position: absolute;
 bottom: 5px;
 left:60px;
}
</style>
-->
