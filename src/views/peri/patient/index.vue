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
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['peri:patient:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['peri:patient:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['peri:patient:remove']"
        >删除</el-button>
      </el-col>
      <!--<el-col :span="1.5">-->
        <!--<el-button-->
          <!--type="warning"-->
          <!--icon="el-icon-download"-->
          <!--size="mini"-->
          <!--@click="handleExport"-->
          <!--v-hasPermi="['ipa:patient:export']"-->
        <!--&gt;导出</el-button>-->
      <!--</el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="deleteAll"
        >删除所有未完成任务</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="patientList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!--<el-table-column label="患者ID" align="center" prop="patientId" />-->
      <el-table-column label="姓名" align="center" prop="patientName" />
      <el-table-column label="性别" align="center" prop="sex" :formatter="sexFormat" />
      <el-table-column label="年龄" align="center" prop="age" />
      <el-table-column label="住院号" align="center" prop="hospitalNumber" />
      <el-table-column label="病区" align="center" prop="ward" />
      <!--<el-table-column label="检测日期" align="center" prop="testDate" width="180">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ parseTime(scope.row.testDate) }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="职业" align="center" prop="job" />
      <el-table-column label="学历" align="center" prop="education" />
      <el-table-column label="民族" align="center" prop="nation" />
      <el-table-column label="婚姻状况" align="center" prop="maritalStatus" :formatter="maritalStatusFormat" />
      <el-table-column label="出生日期" align="center" prop="birthday" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.birthday,'{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" label="联系方式" align="center" prop="contanctInformation" />
      <el-table-column label="患者来源" align="center" prop="source" />
      <el-table-column :show-overflow-tooltip="true" label="分类编码" align="center" prop="classificationCoding" />
      <el-table-column label="诊断" align="center" prop="diagnosis" />
      <el-table-column width="120" label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['peri:patient:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['peri:patient:remove']"
          >删除</el-button>
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

    <!-- 添加或修改心身调节系统患者对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="患者姓名" prop="patientName">
              <el-input v-model="form.patientName" placeholder="请输入患者姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex" placeholder="请选择性别" >
                <el-option
                  v-for="dict in sexOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker clearable size="small" style="width: 200px" prefix-icon="none"
                              v-model="form.birthday"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择出生日期"
                              @change="getAge"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" readonly placeholder="只读" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="住院号" prop="hospitalNumber">
              <el-input v-model="form.hospitalNumber" placeholder="请输入住院号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="病区" prop="ward">
              <el-input v-model="form.ward" placeholder="请输入病区" />
            </el-form-item>
          </el-col>

          <!-- <el-col :span="12">
             <el-form-item label="检测日期" prop="testDate">
               <el-date-picker clearable size="small" style="width: 200px"
                               v-model="form.testDate"
                               type="date"
                               value-format="yyyy-MM-dd"
                               placeholder="选择检测日期">
               </el-date-picker>
             </el-form-item>
           </el-col>-->
          <el-col :span="12">
            <el-form-item label="诊断" prop="diagnosis">
              <el-select v-model="form.diagnosis" placeholder="请输入诊断数据" @change="fn">
                <el-option
                  v-for="dict in diagnosisOptions"
                  :key="dict.dictLabel"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职业" prop="job">
              <el-select v-model="form.job" placeholder="请输入职业" >
                <el-option
                  v-for="dict in jobOptions"
                  :key="dict.dictLabel"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历" prop="education">
              <el-select v-model="form.education" placeholder="请输入学历">
                <el-option
                  v-for="dict in eduOptions"
                  :key="dict.dictLabel"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="民族" prop="nation">
              <el-select v-model="form.nation" placeholder="请选择民族" >
                <el-option
                  v-for="dict in nationOptions"
                  :key="dict.dictLabel"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="患者来源" prop="source">
              <el-select v-model="form.source" placeholder="请输入患者来源" >
                <el-option
                  v-for="dict in sourceOptions"
                  :key="dict.dictLabel"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类编码" prop="classificationCoding">
              <el-select v-model="form.classificationCoding" placeholder="请输入分类编码" >
                <el-option
                  v-for="dict in classificationCodingOptions"
                  :key="dict.dictLabel"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-radio-group v-model="form.maritalStatus">
                <el-radio
                  v-for="dict in maritalStatusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="contanctInformation">
              <el-input v-model="form.contanctInformation" placeholder="请输入联系方式" maxlength="11" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listPatient, getPatient, delPatient, addPatient, updatePatient, exportPatient,delAllTask } from "@/api/peri/patient";
import { listNation,listPatientCategories,listSysHometown} from "@/api/patient/user";

export default {
  data() {
    return {
      loading: true,
      ids: [],
      single: true,
      multiple: true,
      total: 0,
      patientList: [],
      sexOptions: [],
      maritalStatusOptions: [],
      nationOptions: [],
      hometownOptions: [],
      jobOptions: [],
      eduOptions: [],
      sourceOptions: [],
      diagnosisOptions: [],
      classificationCodingOptions:[],
      title: "",
      open: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        patientName: undefined,
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
        diagnosis: undefined,
      },
      form: {},
      rules: {

        patientName: [
          { required: true, message: "患者姓名不能为空", trigger: "blur" }
        ],
        sex:[
          { required: true, message: "患者性别不能为空", trigger: "blur" }
        ],
        diagnosis:[
          { required: true, message: "患者年龄不能为空", trigger: "blur" }
        ],
        job:[
          { required: true, message: "患者职业不能为空", trigger: "blur" }
        ],
        education:[
          { required: true, message: "患者学历不能为空", trigger: "blur" }
        ],
        nation:[
          { required: true, message: "患者民族不能为空", trigger: "blur" }
        ],
        source: [
          { required: true, message: "患者来源不能为空", trigger: "blur" }
        ],
        birthday:[
          { required: true, message: "患者出生日期不能为空", trigger: "blur" }
        ],
        maritalStatus:[
          { required: true, message: "患者婚姻状况不能为空", trigger: "blur" }
        ],
      }
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
    this.getDicts("pati_job_type").then(response => {
      this.jobOptions = response.data;
    });
    this.getDicts("pati_edu_type").then(response => {
      this.eduOptions = response.data;
    });
    this.getDicts("pati_source").then(response => {
      this.sourceOptions = response.data;
    });
    this.getDicts("pati_diagnosis_type").then(response => {
      this.diagnosisOptions = response.data;
    });
  },
  methods: {
    fn(){
      if(this.form.diagnosis == '其他'){
        this.$prompt('请备注类型', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.form.diagnosis = '其他:' + value
        })
      }
    },
    getList() {
      this.loading = true;
      listPatient(this.queryParams).then(response => {
        this.patientList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      listNation().then(response => {
        this.nationOptions=response.data;
      });
      listPatientCategories().then(response => {
        this.classificationCodingOptions=response.data;
      });
      listSysHometown().then(response => {
        this.hometownOptions=response.data;
      });
    },
    getAge(){
      let birthdays = new Date(this.form.birthday.replace(/-/g, "/"));
      let d = new Date();
      let age =
        d.getFullYear() -
        birthdays.getFullYear() -
        (d.getMonth() < birthdays.getMonth() ||
        (d.getMonth() == birthdays.getMonth() &&
          d.getDate() < birthdays.getDate())
          ? 1
          : 0);
      this.form.age = age;
    },
    cancel() {
      this.open = false;
      this.reset();
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
        diagnosis: undefined,
        delFlag: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      };
      this.resetForm("form");
    },
    sexFormat(row, column) {
      return this.selectDictLabel(this.sexOptions, row.sex);
    },

    maritalStatusFormat(row, column) {
      return this.selectDictLabel(this.maritalStatusOptions, row.maritalStatus);
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
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加围手术期系统患者";
    },
    handleUpdate(row) {
      this.reset();
      const patientId = row.patientId || this.ids
      getPatient(patientId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改围手术期系统患者";
      });
    },
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.patientId != undefined) {
            updatePatient(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addPatient(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    deleteAll(row){
      const patientId = row.patientId || this.ids;
      this.$confirm('是否确认删除患者编号为"' + patientId + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delAllTask(patientId);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function() {});
    },
    handleDelete(row) {
      const patientIds = row.patientId || this.ids;
      this.$confirm('是否确认删除围手术期系统患者编号为"' + patientIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPatient(patientIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有围手术期系统患者数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPatient(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
