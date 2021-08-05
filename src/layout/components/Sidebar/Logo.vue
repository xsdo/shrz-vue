<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
      <div class="sidebar-title">
        智能化身心调节系统
      </div>
      <div class="sidebar-info">
        <el-row :gutter="15">
          <el-col :span="8">
            <div class="sidebar-logo">
              <img :src="avatar">
            </div>
          </el-col>
          <el-col :span="16">
            <div class="sidebar-cont">
              <div class="sidebar-wel">Welcome</div>
              <div class="sidebar-name">Dr.{{title}}</div>
              <div class="sidebar-icon">
                <el-tooltip content="个人中心" effect="light" placement="bottom" :visible-arrow="false">
                  <div @click="jump">
                    <svg-icon slot="prefix" icon-class="user" />
                  </div>
                </el-tooltip>
                <el-tooltip content="退出登录" effect="light" placement="bottom" :visible-arrow="false">
                  <div @click="logout">
                    <svg-icon slot="prefix" icon-class="退出" />
                  </div>
                </el-tooltip>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="sidebar-data">
        <div class="sidebar-txt">Time</div>
        <el-row :gutter="5">
          <el-col :span="8">
            <div class="sidebar-cont">
              <div class="sidebar-num">{{year}}</div>
              <div class="sidebar-font">Year</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="sidebar-cont">
              <div class="sidebar-num">{{month}}</div>
              <div class="sidebar-font">Month</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="sidebar-cont">
              <div class="sidebar-num">{{day}}</div>
              <div class="sidebar-font">Day</div>
            </div>
          </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logoImg from '@/assets/logo/logo.png'
import { getUserProfile } from "@/api/system/user";
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
      user: {},
    }
  },
  computed:{
    ...mapGetters([
      'avatar',
    ]),
  },
  data() {
    return {
      title: undefined,
      logo: logoImg,
      year:undefined,
      month:undefined,
      day:undefined,
    }
  },
  created() {
    this.getUser();

  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data;
        this.title=this.user.userName;
        this.Time();
      });
    },
    getDate(){
      let date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
    },
    Time(){
      setInterval(this.getDate(),1000)
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      })
    },
    jump(){
      this.$router.push({path:'/user/profile'})
    }
  },
  beforeDestroy() {
    if (this.getDate) {
      clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
    }
  }
}

</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 250px;
  background: #55c7d2;
  overflow: hidden;
  & .sidebar-title {
    margin-left: 20px;
    line-height: 50px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 18px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
  & .sidebar-info{
    margin:0 0 0 15px;
    & .sidebar-logo {
      height:90px;
      display: flex;
      align-items:center;
      & img{
        width: 72px;
        height: 72px;
        border-radius: 50%;
      }
    }
    & .sidebar-cont{
      color: #fff;
      line-height: 30px;
      & .sidebar-wel{
        font-size: 14px;
      }
      & .sidebar-name{
        font-size: 18px;
        font-weight: 600;
      }
      & .sidebar-icon{
        font-size: 14px;
        & .svg-icon:hover{
          cursor: pointer;
        }
        div{
          display: inline-block;
        }
      }
    }
  }
  & .sidebar-data{
    color: #fff;
    padding: 15px;
    & .sidebar-txt{
      font-size: 12px;
      margin-bottom:10px;
    }
    & .sidebar-cont{
      width: 100%;
      height: 50px;
      background: #fff;
      border-radius: 5px;
      color: #777;
      text-align: center;
      padding-top:5px;
      & .sidebar-num{
        font-size: 18px;
      }
      & .sidebar-font{
        font-size:12px;
        margin-top:8px;
      }
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
