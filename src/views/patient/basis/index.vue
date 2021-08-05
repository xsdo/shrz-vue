<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="患者姓名" prop="patientName">
        <el-input
          v-model="queryParams.patientName"
          placeholder="请输入患者姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="患者姓名" align="center" prop="patientName" />
      <el-table-column label="性别" align="center" prop="sex" :formatter="sexFormat" />
      <el-table-column label="年龄" align="center" prop="age" />
      <el-table-column label="民族" align="center" prop="nation" />
      <el-table-column label="病区" align="center" prop="ward" />
      <el-table-column label="住院号" align="center" prop="hospitalNumber" />
      <el-table-column label="分类编码" align="center" prop="classificationCoding"/>
      <el-table-column label="联系方式" align="center" prop="contanctInformation" />
      <el-table-column label="操作/任务状态" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="text"
            icon="el-icon-circle-plus-outline"
            @click=" handleAdd(scope.row)"
            v-if="scope.row.taskStatus==null || scope.row.taskStatus==3"
          >添加测评</el-button>
          <div v-if="scope.row.taskStatus==1">未开始</div>
          <div v-if="scope.row.taskStatus==2" >进行中</div>
          <!--<div v-if="scope.row.taskStatus==3" >已完成</div>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改患者对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="810px" @close="cancel">
      <el-row :gutter="40">
        <el-col :span="10">
          <el-card>
            <div slot="header" class="clearfix">
              <span>类型名称</span>
            </div>
            <el-tree
              ref="tree"
              v-loading="loading"
              :data="typeList"
              :default-expand-all="true"
              :show-checkbox="true"
              style="height: 100%"
              :props="defaultProps"
              @check-change="handleNode"
            >
              <span class="custom-tree-node" slot-scope="{ node }">
                <i class="el-icon-folder-opened icon-right" style="color: #1296db"></i>
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </el-card>
        </el-col>
        <el-col :span="14">
          <el-form label-position="left" ref="form" :model="form" :rules="rules" label-width="80px" >
            <input type="hidden" v-model="form.taskId" prop="taskId">
            <input type="hidden" v-model="form.patientId" prop="patientId">
            <el-form-item label="受测人" prop="patientName">
              <el-input v-model="form.patientName" :readonly="true"/>
            </el-form-item>
            <input type="hidden" v-model="form.userId" prop="userId">
            <el-form-item label="测评人" prop="userName">
              <el-input v-model="form.userName" :readonly="true"/>
            </el-form-item>
            <el-form-item label="测试编码" prop="testCoding">
              <el-input v-model="form.testCoding" :readonly="true"/>
            </el-form-item>
            <el-form-item label="工作站" prop="workstation">
              <el-select v-model="form.workstation" placeholder="请输选择工作站" @change="changeValue">
                <el-option
                  v-for="dict in workstationOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
            <input type="hidden" v-model="form.typeIds" prop="typeIds">
            <el-form-item label="测试任务" prop="typeNames">
              <!-- <el-input type="textarea" :rows="10" v-model="form.typeNames"/> -->
              <div class="renwu">
                <el-tag
                  :key="index"
                  v-for="(tag,index) in tags"
                  :disable-transitions="false"
                  >
                  {{tag}}
                </el-tag>
              </div>
            </el-form-item>
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import { listUser, getUser, delUser, addUser, updateUser, exportUser } from "@/api/patient/user";
  import { listType, getType, delType,addType } from "@/api/patient/type";
  import {listTask, getTask,addTask,delTask,updateTask,exportTask,getTaskByPatientId,updateByPatientId,getWorkstation} from "@/api/patient/basisTask";
  import { getUserProfile } from "@/api/system/user";
  export default {
    data() {
      return {
        defaultProps: {
          children: "children",
          label: "typeName",
        },
        tags:[],
        loading: true,
        ids: [],
        single: true,
        multiple: true,
        total: 0,
        arr: [],
        arrIds: [],
        userList: [],
        sexOptions: [],
        workstationOptions:[],
        user: {},
        maritalStatusOptions: [],
        classificationCodingOptions: [],
        typeList:[],
        title: "",
        open: false,
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          patientName: undefined,
          patientId: undefined,
          sex: undefined,
          age: undefined,
          hospitalNumber: undefined,
          ward: undefined,
          testDate: undefined,
          job: undefined,
          education: undefined,
          nation: undefined,
          maritalStatus: undefined,
          birthday: undefined,
          contanctInformation: undefined,
          source: undefined,
          classificationCoding: undefined,
          typeId: 2,
          taskType: 1,
          taskStatus: undefined,

        },
        form: {
          typeList: [],
          patientName: '',
          patientId: '',
          typeIds: [],
          typeNames: [],
          testCoding: '',
          userName: '',
          userId: '',
          workstation: '',
        },
        rules: {
          patientName: [
            { required: true, message: "患者姓名不能为空", trigger: "blur" }
          ],
          typeNames: [
            { required: true, message: "添加任务不能为空", trigger: "blur" }
          ],
          workstation: [
            { required: true, message: "工作站不能为空", trigger: "blur" }
          ],
        },

      };
    },
    created() {
      this.getList();
      this.getDicts("sys_user_sex").then(response => {
        this.sexOptions = response.data;
      });
      this.getDicts("pati_user_maritalStatus").then(response => {
        this.maritalStatusOptions = response.data;
      });
      this.getDicts("dis_class_code").then(response => {
        this.classificationCodingOptions = response.data;
      });
      this.getDicts("pati_task_workstation").then(response => {
        this.workstationOptions = response.data;
      });
    },
    methods: {
      getList() {
        this.loading = true;
        listUser(this.queryParams).then(response => {
          this.userList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
        getUserProfile().then(response => {
          this.user = response.data;
        });
      },
      cancel() {
        this.open = false;
        this.reset();
        this.tags=[];
      },
      reset() {
        this.form = {
          patientId: undefined,
          patientName: undefined,
          sex: undefined,
          age: undefined,
          hospitalNumber: undefined,
          ward: undefined,
          testDate: undefined,
          job: undefined,
          education: undefined,
          nation: undefined,
          maritalStatus: "0",
          birthday: undefined,
          contanctInformation: undefined,
          source: undefined,
          classificationCoding: undefined,
          delFlag: undefined,
          createBy: undefined,
          createTime: undefined,
          updateBy: undefined,
          updateTime: undefined,
          typeNames: undefined,
          typeIds: undefined,
          testCoding: undefined,
          userName: undefined,

        };
        this.resetForm("form");
      },
      sexFormat(row, column) {
        return this.selectDictLabel(this.sexOptions, row.sex);
      },
      classificationCodingFormat(row, column) {
        return this.selectDictLabel(this.classificationCodingOptions, row.classificationCoding);
      },
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.patientId)
        this.single = selection.length!=1
        this.multiple = !selection.length
      },
      changeValue(){
        getWorkstation(this.form.workstation,this.form.patientId).then(response => {
          let flag=response.data;
          if(flag==true) {
            this.$confirm('工作站已占用', '提示', {
              confirmButtonText: '确定',
              showCancelButton:false,
              showClose:false,
              type: 'warning'
            }).then(()=>{
              this.form.workstation = "";
            })
          }
        });
      },
      getRandomCode(){
        return (100* Math.random()).toFixed(0)
      },

      handleAdd(row) {
        this.reset();
        var str=(1000000* Math.random()).toFixed(0);
        listType(this.queryParams).then(response => {
          this.typeList=response.data;
          this.form.patientId=row.patientId;
          this.form.patientName=row.patientName;
          this.form.userName=this.user.userName;
          this.form.userId=this.user.userId;
          this.form.testCoding=str;
          this.loading = false;
          this.open = true;
          this.title = "添加任务";
        });
      },

      handleUpdate(row) {
        this.reset();
        listType(this.queryParams).then(response => {
          this.typeList=response.data;
        });
        const patientId = row.patientId || this.ids
        getTaskByPatientId(patientId).then(response=>{
          this.form=response.data;
          for(var i=0;i<response.data.arr.length;i++){
            this.tags.push(response.data.arr[i]);
          }
          this.open=true;
          this.title = "修改患者";
        });
      },

      updateTaskType(){
        const patientId = this.form.patientId || this.ids
        this.queryParams.patientId=patientId;
        this.queryParams.taskStatus=2;
        updateByPatientId(this.queryParams).then(response=>{
          if (response.code === 200) {
            this.msgSuccess("启动任务成功");
            this.open = false;
            this.getList();
          } else {
            this.msgError(response.msg);
          }
        });
      },
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$confirm('是否确认开始任务?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '编辑',
              type: 'warning',
              center:true,
            }).then(() => {
              addTask(this.form).then(response => {
                if (response.code === 200) {
                  this.tags = [];
                  this.updateTaskType();
                } else {
                  this.msgError(response.msg);
                }
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '请继续编辑'
              });          
            });
          }
        })
      },
      /*点击树状结构触发，添加到tags数组中*/
      handleNode(e) {
        let arr = this.$refs.tree.getCheckedNodes(true);
        let arr1 = [];
        let arr2 = [];
        arr.forEach((ele)=>{
          arr1.push(ele.typeId);
          arr2.push(ele.typeName)
        })
        this.tags = arr2;
        this.form.typeIds = arr1.join(',');
        this.form.typeNames = arr2.join(',');
      },
      handleDelete(row) {
        const patientIds = row.patientId || this.ids;
        this.$confirm('是否确认删除患者编号为"' + patientIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTask(patientIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有患者数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportUser(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
      },

    }


  };
</script>
<style scoped>
  .el-tree{
    min-height: 455px;
  }
  .renwu {
    width:100%;
    min-height:220px;
    border:1px solid #DCDFE6;
    border-radius: 4px;
    padding:10px;
  }
  .el-tag {
    margin-left: 10px;
  }
</style>
