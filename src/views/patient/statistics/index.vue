<template>
  <div class="stat">
    <div class="data">
      <el-row :gutter="50">
        <!-- 左侧区域 -->
        <el-col :span="16">
          <!-- 左侧上部区域 -->
          <el-row :gutter="20">
            <!--人数统计  -->
            <el-col :span="10">
              <!-- 注册人数 -->
              <div class="data-reg">
                <div class="data-reg-img">
                  <img src="../../../assets/statistics/have.png" alt="">
                </div>
                <div class="data-reg-text">
                  <div>现有注册治疗人数</div>
                  <div>{{statisticsTable1List.registeredCount}}位</div>
                </div>
              </div>
              <!-- 完成人数 -->
              <div class="data-finish">
                <div class="data-reg-img">
                  <img src="../../../assets/statistics/accomplish.png" alt="">
                </div>
                <div class="data-reg-text">
                  <div>已完成治疗人数</div>
                  <div>{{statisticsTable1List.completeCount}}位</div>
                </div>
              </div>
            </el-col>
            <!-- 病种比例 -->
            <el-col :span="14">
              <div class="data-entity">
                <div id="mychart" class="chart"></div>
              </div>
            </el-col>
          </el-row>
          <!-- 左侧下部区域 -->
          <!-- 患者统计  -->
          <el-row>
            <div class="data-patient">
              <div id="myaaa" class="cj"></div>
            </div>
          </el-row>
        </el-col>
        <!-- 右侧区域 -->
        <el-col :span="8">
          <!-- 数据详情下载 -->
          <div class="data-down">
            <div class="data-down-left">
              <div @click="handleExportLog()">
                <img src="../../../assets/statistics/jiantou.png" alt="">
              </div>
              <div >
                <el-dropdown>
                  <el-button type="warning" >
                    数据详情下载
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="down('dld')">多伦多述情障碍量表数据</el-dropdown-item>
                    <el-dropdown-item @click.native="down('eis')">情绪智力量表(EIS)数据</el-dropdown-item>
                    <el-dropdown-item @click.native="down('tlric')">人际反应指针(IRI-C)问卷数据</el-dropdown-item>
                    <el-dropdown-item @click.native="down('mett')">METT微表情识别范式数据</el-dropdown-item>
                    <el-dropdown-item @click.native="down('fzyq')">复杂眼区识别范式数据</el-dropdown-item>
                    <el-dropdown-item @click.native="down('shtl')">社会情境排列数据</el-dropdown-item>
                    <el-dropdown-item @click.native="down('sysb')">失言任务范式数据</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="data-down-right">
              <div class="select">
                <div class="selImg">
                  <img src="../../../assets/statistics/data.png" alt="">
                </div>
                <div >
                  <el-date-picker
                    v-model="selected"
                    type="year"
                    placeholder="选择日期"
                    format=" yyyy 年"
                    prefix-icon="none"
                    :clearable="false"
                    @change="getListByYear()">
                  </el-date-picker>
                </div>
              </div>
            </div>
          </div>
          <!-- 男女比例 -->
          <div class="data-man">
            <div id="mybbb" class="bbb"></div>
          </div>
          <!-- 年龄段 -->
          <div class="data-age">
            <div id="myccc" class="ccc"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { listStatisticsTable1, getStatisticsTable1, delStatisticsTable1, addStatisticsTable1, updateStatisticsTable1, exportDldLog, exportEisLog, exportIricLog, exportMettLog, exportFzyqLog, exportShtlLog, exportSysbLog} from "@/api/patient/statisticsTable1";
  import { listStatisticsTable2, getStatisticsTable2, delStatisticsTable2, addStatisticsTable2, updateStatisticsTable2, exportStatisticsTable2 } from "@/api/patient/statisticsTable2";
  import { listStatisticsTable3, getStatisticsTable3, delStatisticsTable3, addStatisticsTable3, updateStatisticsTable3, exportStatisticsTable3 } from "@/api/patient/statisticsTable3";
  export default {
    data () {
      return {
        statisticsTable1List: [],
        statisticsTable2List: [],
        statisticsTable3List: [],
        registeredCount: "",
        queryParams1: {
          pageNum: 1,
          pageSize: 10,
          year: new Date().getFullYear(),
          registeredCount: undefined,
          completeCount: undefined,
          manCount: undefined,
          womanCount: undefined,
          less18Count: undefined,
          to1825Count: undefined,
          to2635Count: undefined,
          to3645Count: undefined,
          to4655Count: undefined,
          to5665Count: undefined,
          more65Count: undefined,
          status: undefined,
        },
        queryParams2:{
          pageNum: 1,
          pageSize: 10,
          year: new Date().getFullYear(),
          januaryCount: undefined,
          februaryCount: undefined,
          march: undefined,
          april: undefined,
          may: undefined,
          june: undefined,
          july: undefined,
          august: undefined,
          september: undefined,
          october: undefined,
          november: undefined,
          december: undefined,
          status: undefined,
        },
        queryParams3: {
          pageNum: 1,
          pageSize: 10,
          year: new Date().getFullYear(),
          jlzCount: undefined,
          yyzCount: undefined,
          qpzCount: undefined,
          jsflzCount: undefined,
          smzaCount: undefined,
          sxqgzaCount: undefined,
          qtCount: undefined,
          status: undefined,
        },
        selected: '',
      }
    },
    mounted(){
      this.getList();
    },
    methods: {
      getList() {
        listStatisticsTable1(this.queryParams1).then(response => {
          this.statisticsTable1List = response.data;
          this.total = response.total;
          this.loading = false;
          this.nnbl();
          this.nlfb();
        });
        listStatisticsTable2(this.queryParams2).then(response => {
          this.statisticsTable2List = response.rows;
          this.total = response.total;
          this.loading = false;
          this.zlsl();
        });
        listStatisticsTable3(this.queryParams3).then(response => {
          console.log(response)
          this.statisticsTable3List = response.data;
          this.total = response.total;
          this.loading = false;
          this.zdfb();
        });
      },
      getListByYear(){
        let data = new Date(this.selected);
        let year = data.getFullYear();
        this.queryParams1.year=year;
        this.queryParams2.year=year;
        this.queryParams3.year=year;
        this.getList();
      },
      down(ele){
        if(ele == "dld"){
          exportDldLog().then((res)=>{
            console.log(res)
            this.download(res.msg);
          })
        }else if(ele == "eis"){
          exportEisLog().then((res)=>{
            console.log(res)
            this.download(res.msg);
          })
        }else if(ele == "tlric"){
          exportIricLog().then((res)=>{
            console.log(res)
            this.download(res.msg);
          })
        }else if(ele == "mett"){
          exportMettLog().then((res)=>{
            console.log(res)
            this.download(res.msg);
          })
        }else if(ele == "fzyq"){
          exportFzyqLog().then((res)=>{
            console.log(res)
            this.download(res.msg);
          })
        }else if(ele == "shtl"){
          exportShtlLog().then((res)=>{
            console.log(res)
            this.download(res.msg);
          })
        }else if(ele == "sysb"){
          exportSysbLog().then((res)=>{
            console.log(res)
            this.download(res.msg);
          })
        }
      },
      zdfb() {
        // 基于准备好的dom，初始化echarts实例
        let mychart = this.echarts.init(document.getElementById('mychart'))
        // 绘制图表
        mychart.setOption(
          {
            title: {
              text: '诊断分布图',
              //subtext: '纯属虚构',
              left: 10,
              top:10
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              right: 10,
              top: 80,
              data: ['焦虑症', '抑郁症', '强迫症', '精神分裂症', '失眠障碍','双向情感障碍','其他']
            },
            color:['#e72d29','#f5a53e','#92ceaa','#3c6aab','#f4a894','#761c79','#6bc6d6'],
            series: [
              {
                name: '诊断分布',
                type: 'pie',
                radius: '55%',
                center: ['40%', '55%'],
                label : {
                normal : {
                    //饼形图显示格式
                    formatter : '{b|{b}}',
                    rich : {
                        b : {
                            color : '#3e3e5b',
                            fontSize : 14,
                            lineHeight : 33
                        },
                      }
                    }
                },
                /* itemStyle: {
                  shadowBlur: 20,
                },*/
                data: [
                  {value: this.statisticsTable3List.jlzCount || 0, name: '焦虑症'},
                  {value: this.statisticsTable3List.yyzCount || 0, name: '抑郁症'},
                  {value: this.statisticsTable3List.qpzCount || 0, name: '强迫症'},
                  {value: this.statisticsTable3List.jsflzCount || 0, name: '精神分裂症'},
                  {value: this.statisticsTable3List.smzaCount || 0, name: '失眠障碍'},
                  {value: this.statisticsTable3List.sxqgzaCount || 0, name: '双向情感障碍'},
                  {value: this.statisticsTable3List.qtCount || 0, name: '其他'},
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
      });
      },
      zlsl(){
        let myaaa = this.echarts.init(document.getElementById('myaaa'))
          myaaa.setOption({
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#00f2fe' // 0% 处的颜色
            }, {
              offset: 1, color: '#4facfe' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
          title: {
            text: '治疗数量折线图',
            left: 50,
            top:10
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          xAxis: {
            type: 'category',
            axisTick: {
              inside: true
            },
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
          },
          yAxis: {
            type: 'value',
            axisTick: {
              inside: true
            },
          },
          series: [{
            data: [this.statisticsTable2List[0].januaryCount,this.statisticsTable2List[0].februaryCount, this.statisticsTable2List[0].march, this.statisticsTable2List[0].april, this.statisticsTable2List[0].may, this.statisticsTable2List[0].june, this.statisticsTable2List[0].july,this.statisticsTable2List[0].august,this.statisticsTable2List[0].september,this.statisticsTable2List[0].october,this.statisticsTable2List[0].november,this.statisticsTable2List[0].december],
            type: 'line',
            itemStyle: {
                normal: {
                    lineStyle: {
                      width:5
                    },
                    label: {
                      show: true,		//开启显示
                      position: 'top',	//在上方显示
                      textStyle: {	    //数值样式
                          color: 'black',
                          fontSize: 16
                      }
                    },
                }
            },
          }]
        });
      },
      nnbl(){
        let mybbb = this.echarts.init(document.getElementById('mybbb'));
        mybbb.setOption({
          title: {
            text: '男女比例图',
            left: 10,
            top:10
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            right: 10,
            top:30,
            data: ['男', '女']
          },
          color:['#3a6bab','#ff4449'],
          series: [
            {
              name: '男女比例',
              type: 'pie',
              radius: ['30%', '55%'],
              label: {
                formatter: '{c|{c}人}\n{hr|}\n  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  c:{
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  per: {
                    color: '#999',
                    lineHeight: 22,
                    // backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              },
              data: [
                {value: this.statisticsTable1List.manCount, name: '男'},
                {value: this.statisticsTable1List.womanCount, name: '女'},
              ]
            }
          ]
        });
      },
      nlfb(){
        let myccc = this.echarts.init(document.getElementById('myccc'));
        myccc.setOption({
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#c2e9fd' // 0% 处的颜色
            }, {
              offset: 1, color: '#aec4fd' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
          title: {
            text: '年龄分布图',
            left: 10,
            top:10
            //subtext: '数据来自网络'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['2020年'],
            right: 10,
            top:10
          },
          grid: {
            left: '3%',
            right: '12%',
            bottom: '3%',
            top:'18%',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            name: '人数',
            splitLine:{
              show:false
            },
            axisTick: {
              inside: true
            },
            boundaryGap: [0, 0.01]
          },
          xAxis: {
            type: 'category',
            name: '年龄',
            nameLocation:'end',
            axisTick: {
              inside: true
            },
            data: ['<18', '18-25', '26-35', '36-45', '46-55', '56-65','>65']
          },
          series: [
            {
              // name: '2020年',
              type: 'bar',
              barWidth: 35,
              // showBackground: true,
              // backgroundStyle: {
              //     color: '#e6e6e7'
              // },
              itemStyle: {
                //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                normal: {
                  //柱形图圆角，初始化效果

                  label: {
                    show: true,		//开启显示
                    position: 'top',	//在上方显示
                    textStyle: {	    //数值样式
                        color: 'black',
                        fontSize: 16
                    }
                  },
                  color:function(data){
                      let colorList=["#f29b76","#89c997","#7ecef4","#3a6bab","#c490bf","#84ccc9","#8f82bc"];
                      return colorList[data.dataIndex];
                  }
                }
              },
              data: [this.statisticsTable1List.less18Count, this.statisticsTable1List.to1825Count,this.statisticsTable1List.to2635Count ,this.statisticsTable1List.to3645Count, this.statisticsTable1List.to4655Count, this.statisticsTable1List.to5665Count,this.statisticsTable1List.more65Count]
            }
          ]
        });
      },
    }
  }
</script>
<style>
  .el-date-editor.el-input{
    width:60px;
  }
  .el-input--prefix .el-input__inner{
    padding-left: 0;
  }
  .el-input--suffix .el-input__inner{
    padding-right: 0;
  }
  .stat{
    background-color: #f4f4f4;
    padding: 30px;
  }
  .data{
    width:1321px;
    margin: 0 auto;
    color: #3e3e5b;
  }
  /* 注册完成人数 */
  .data-reg,.data-finish{
    width:330px;
    height:142px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ddd;
  }
  .data-reg{
    margin-bottom: 27px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .data-finish{
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .data-reg-text div:first-child{
    margin-bottom: 20px;
  }
  .data-reg-text div:last-child{
    font-size: 25px;
    font-weight: 700;
    float: right;
  }
  /* 病种比例 */
  .data-entity{
    width:500px;
    height:314px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ddd;
  }
  /* 患者统计 */
  .data-patient{
    width:865px;
    height:500px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ddd;
  }
  /* 数据下载 */
  .data-down{
    margin-bottom: 30px;
  }
  .data-down:after{
    display:block;
    content:'';
    clear:both;
  }
  .data-down-left{
    width:250px;
    height: 106px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ddd;
    float: left;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .data-down-left div{
    margin: 0 5px;
  }
  .data-down-right{
    width:140px;
    height: 106px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ddd;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .data-down-right div{
    text-align: center;
  }
  .select {
    width: 100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .selImg{
    margin-right: 15px;
  }
  .selImg img{
    vertical-align: bottom;
  }
  /* 男女比例 */
  .data-man{
    width:406px;
    height: 283px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ddd;
    margin-bottom: 30px;
  }
  /* 年龄段 */
  .data-age{
    width:406px;
    height: 393px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ddd;
  }
  .cj{
    width: 865px;
    height: 500px;
  }
  .chart{
    width: 500px;
    height: 314px;
  }
  .bbb{
    width: 406px;
    height: 283px;
  }
  .ccc{
    width: 406px;
    height: 393px;
  }
</style>
