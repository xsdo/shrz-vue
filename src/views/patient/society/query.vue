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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['patient:task:remove']"
        >删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="taskList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="患者姓名" align="center" prop="patientName" />
      <el-table-column label="工作站" align="center" prop="workstation" :formatter="workstationFormat"/>
      <el-table-column :show-overflow-tooltip="true" label="测评任务" align="center" prop="typeNames" />
      <el-table-column label="任务状态" align="center" prop="taskStatus" :formatter="taskStatusFormat" />
      <el-table-column label="测试编码" align="center" prop="testCoding" />
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-dropdown v-if="scope.row.taskStatus==3">
            <el-button type="warning" size="small">
              下载报告
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in scope.row.typeNames.split(',')" :key="index" @click.native="handleExport(scope.row,index)">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            type="primary"
            icon="el-icon-download"
            size="small"
            @click="downAll(scope.row)"
            v-if="scope.row.taskStatus==3"
          >批量下载</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-remove"
            v-if="scope.row.taskStatus!=3"
          >不可操作</el-button>
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
  </div>
</template>

<script>
import { listTask, getTask, delTask, addTask, updateTask,downloadScale} from "@/api/patient/societyTask";

export default {
  data() {
    return {
      loading: true,
      ids: [],
      single: true,
      multiple: true,
      total: 0,
      taskList: [],
      taskStatusOptions: [],
      workstationOptions: [],
      title: "",
      open: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        clinicNumber: undefined,
        workstation: undefined,
        typeIds: undefined,
        typeNames: undefined,
        patientSource: undefined,
        taskStatus: undefined,
        testCoding: undefined,
        patientId: undefined,
        patientName: undefined,
        taskId: undefined,
      },
      form: {},
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("pati_task_status").then(response => {
      this.taskStatusOptions = response.data;
    });
    this.getDicts("pati_task_workstation").then(response => {
      this.workstationOptions = response.data;
    });
  },
  methods: {
    getList() {
      this.loading = true;
      listTask(this.queryParams).then(response => {
        this.taskList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    cancel() {
      this.open = false;
      this.reset();
    },
    reset() {
      this.form = {
        taskId: undefined,
        clinicNumber: undefined,
        workstation: undefined,
        typeIds: undefined,
        typeNames: undefined,
        patientSource: undefined,
        taskStatus: undefined,
        delFlag: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        testCoding: undefined,
        patientId: undefined
      };
      this.resetForm("form");
    },

    taskStatusFormat(row, column) {
      return this.selectDictLabel(this.taskStatusOptions, row.taskStatus);
    },
    workstationFormat(row, column) {
      return this.selectDictLabel(this.workstationOptions, row.workstation);
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
      this.ids = selection.map(item => item.taskId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },

    handleDelete(row) {
      const taskIds = row.taskId || this.ids;
      this.$confirm('是否确认删除患者测评任务编号为"' + taskIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTask(taskIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    downloadFile(url){
      const baseURL = process.env.VUE_APP_BASE_API
      const iframe = document.createElement("iframe");
      iframe.style.display = "none"; // 防止影响页面
      iframe.style.height = 0; // 防止影响页面
      iframe.src = baseURL + "/common/download?fileName=" + encodeURI(url) + "&delete=" + true;;
      document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
      // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
      setTimeout(()=>{
        iframe.remove();
      }, 5 * 60 * 1000);
    },
    handleExport(row,index) {
      this.queryParams.taskId=row.taskId;
      this.queryParams.typeIds=row.typeIds;
      this.queryParams.patientId=row.patientId;
      this.queryParams.patientName=row.patientName;
      this.queryParams.testCoding=row.testCoding;
      this.queryParams.createTime=row.createTime;
      downloadScale(this.queryParams).then((res)=>{
        let data = res.data;
        for(var key in data){
          if(key == row.typeIds.split(',')[index]){
            this.downloadFile(data[key])
          }
        }
      })
    },
    downAll(row){
      this.queryParams.taskId=row.taskId;
      this.queryParams.typeIds=row.typeIds;
      this.queryParams.patientId=row.patientId;
      this.queryParams.patientName=row.patientName;
      this.queryParams.testCoding=row.testCoding;
      this.queryParams.createTime=row.createTime;
      downloadScale(this.queryParams).then((res)=>{
        let data = res.data;
        for(var key in data){
          this.downloadFile(data[key])
        }
      })
    }
  }
};
</script>
