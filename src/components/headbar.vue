<template>
  <header class="headbar">
    <article class="vendors-wrap">
      <span class="label">第三方依赖:</span>
      <el-select
        v-model="currentCaseInfo.vendors"
        multiple
        allow-create
        default-first-option
        placeholder="请选择第三方依赖"
        @change="changeVendors"
      >
        <el-option
          v-for="item in vendorsList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </article>
    <span class="name">{{currentCaseInfo.caseName}}</span>
    <div class="btn-wrap">
      <button class="btn run" @click="showDialog('new')">新建</button>
      <button class="btn save" @click="showDialog('save')">保存</button>
      <el-select
        filterable
        :clearable="true"
        v-model="currentCaseInfo.caseId"
        placeholder="请选择保存的方案"
        popper-class="case-list"
        @clear="clearSeletedCase"
        @change="switchCase"
      >
        <el-option
          v-for="(item, index) in caseList"
          :key="index"
          :label="item.caseName"
          :value="item.caseId"
        ></el-option>
      </el-select>
    </div>
    <!-- 弹框内容 -->
    <el-dialog
      title="添加/更新方案信息"
      :visible.sync="dialogTableVisible"
      width="600px"
      custom-class="info-dialog"
    >
      <el-form :model="tempCaseInfo" label-width="100px">
        <el-form-item label="方案名称">
          <el-input v-model="tempCaseInfo.caseName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属项目名称">
          <el-input v-model="tempCaseInfo.projectName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="方案类型">
          <el-select v-model="tempCaseInfo.type" placeholder="请选择类型" filterable :clearable="true">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="tempCaseInfo.remarks" rows="3" resize="none"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </header>
</template>

<script>
import Bus from "../utils/bus.js";
import { typeList } from "../utils/typeList.js";
import { setTimeout } from "timers";
import html2canvas from "html2canvas";
export default {
  name: "headbar",
  data() {
    return {
      vendorsList: [
        {
          label: "JQuery",
          value: "//cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"
        },
        {
          label: "Echarts",
          value: "//cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.min.js"
        },
        {
          label: "D3",
          value: "//cdnjs.cloudflare.com/ajax/libs/d3/5.9.2/d3.min.js"
        }
      ],
      typeList: [],
      // 当前方案信息
      currentCaseInfo: {
        caseId: "", // 方案ID
        caseName: "", // 方案名称
        vendors: [], // 方案依赖的第三方库
        type: "", // 方案所属类型（例如：柱状图、饼图等） --预留字段
        img: "", // 方案缩略图 --预留字段
        author: "", // 方案提供者 --预留字段
        projectName: "", // 方案所属项目名称 --预留字段
        remarks: "" // 方案备注 --预留字段
      },
      // 弹框中方案临时信息
      tempCaseInfo: {
        caseId: "", // 方案ID
        caseName: "", // 方案名称
        vendors: [], // 方案依赖的第三方库
        type: "", // 方案所属类型（例如：柱状图、饼图等） --预留字段
        img: "", // 方案缩略图 --预留字段
        author: "", // 方案提供者 --预留字段
        projectName: "", // 方案所属项目名称 --预留字段
        remarks: "" // 方案备注 --预留字段
      },
      caseList: [],
      dialogTableVisible: false,
      operateFlag: ""
    };
  },
  computed: {
    currentCaseCode() {
      return this.$store.state.caseInfo.code;
    },
    currentCaseName() {
      return this.$store.state.caseInfo.caseName;
    }
  },
  methods: {
    /**
     * 显示对话框
     * @param {String} flag  'new'/'save' 新建/保存触发的弹框
     */
    showDialog(flag) {
      if (flag === "new") {
        this.tempCaseInfo = {
          caseId: "",
          caseName: "",
          vendors: [],
          type: "",
          img: "",
          author: "",
          projectName: "",
          remarks: ""
        };
      } else if (flag === "save") {
        this.tempCaseInfo = { ...this.tempCaseInfo, ...this.currentCaseInfo };
      }

      this.dialogTableVisible = true;
      this.operateFlag = flag;
    },
    /**
     * 点击弹框确定按钮
     */
    async confirm() {
      this.dialogTableVisible = false;
      this.currentCaseInfo = { ...this.currentCaseInfo, ...this.tempCaseInfo };
      if (this.operateFlag === "new") {
        this.newCase();
      } else if (this.operateFlag === "save") {
        setTimeout(() => {
          this.saveImage().then(canvas => {
            let imgURL = canvas.toDataURL();
            this.currentCaseInfo.img = imgURL;
            this.saveCase();
          });
        }, 1000);
      } else {
        return;
      }
    },
    /**
     * 新建方案
     */
    newCase() {
      this.$store.commit("newCase", this.currentCaseInfo);
      Bus.$emit("update-code");
    },
    /**
     * 保存方案
     */
    saveCase() {
      this.$store.commit("updateCaseInfo", this.currentCaseInfo);
      if (this.currentCaseInfo.caseId) {
        this.updateCase(this.currentCaseInfo.caseId);
      } else {
        this.currentCaseInfo.caseId =
          100 * Math.round(Math.random()) + new Date().getTime() + "";
        let currentInfo = {
          ...this.currentCaseInfo,
          code: { ...this.currentCaseCode }
        };
        this.caseList.push(currentInfo);
        localStorage.setItem("caseList", JSON.stringify(this.caseList));
      }
    },
    /**
     * 更新方案
     * @param {String} caseID 需要更新的方案id
     */
    updateCase(caseID) {
      let self = this;
      let newInfo = {
        ...self.currentCaseInfo,
        code: { ...self.currentCaseCode }
      };
      for (let [index, item] of self.caseList.entries()) {
        if (caseID === item.caseId) {
          self.caseList[index] = { ...item, ...newInfo };
          break;
        }
      }
      localStorage.setItem("caseList", JSON.stringify(self.caseList));
    },
    /**
     * 删除方案
     */
    delCase(caseID) {},
    /**
     * 清空下拉选项
     */
    clearSeletedCase() {
      this.tempCaseInfo = {
        caseId: "",
        caseName: "",
        vendors: [],
        type: "",
        img: "",
        author: "",
        projectName: "",
        remarks: ""
      };
      this.currentCaseInfo = { ...this.currentCaseInfo, ...this.tempCaseInfo };
      this.$store.commit("newCase", this.currentCaseInfo);
      Bus.$emit("update-code");
    },
    /**
     * 切换方案
     * @param {String} caseID 方案id
     */
    switchCase(caseID) {
      let self = this;
      for (let item of self.caseList) {
        if (caseID === item.caseId) {
          self.currentCaseInfo = { ...self.currentCaseInfo, ...item };
          delete self.currentCaseInfo.code;
          self.$store.commit("updateCaseInfo", item);
          break;
        }
      }
      Bus.$emit("update-code");
    },
    /**
     * 修改方案的第三方依赖
     */
    changeVendors() {
      this.$store.commit("updateCaseInfo", this.currentCaseInfo);
    },
    /**
     * 获取已经保存的方案列表
     */
    getCaseList() {
      let temp = localStorage.getItem("caseList");
      this.caseList = temp ? JSON.parse(temp) : [];
    },
    /**
     * 保存方案截图
     */
    saveImage() {
      const node = document.querySelector(".output-wrap");
      let scale = 1;
      return html2canvas(node, {
        logging: false // 不输出日志
      });
    }
  },
  mounted() {
    this.getCaseList();
    this.typeList = typeList;
  }
};
</script>

<style lang="stylus">
.headbar
  flex none
  height 40px
  padding 0 30px
  display flex
  justify-content space-between
  align-items center
  background #272822
  border-bottom 1px solid #000
.head-label
  cursor pointer
  color #fff
.btn
  display inline-block
  width 50px
  height 26px
  line-height 24px
  align-items center
  background transparent
  color #fff
  border 1px solid #dcdfe6
  border-radius 3px
  margin-right 10px
  transition all 0.3s
  &:hover
    border-color #66b1ff
    color #66b1ff
.vendors-wrap .label
  margin-right 10px
.vendors-wrap .el-select
  width 270px
.vendors-wrap .el-select .el-tag
  background transparent
  color #fff
  border-color #fff
.vendors-wrap .el-input__inner
  border none
.vendors-wrap .el-select .el-tag__close.el-icon-close
  background transparent
  &:hover
    background #909399
.vendors-wrap .el-input--suffix .el-input__inner, .btn-wrap .el-input--suffix .el-input__inner
  color #fff
  height 26px
  line-height 24px
  background transparent
.vendors-wrap .el-input__icon, .btn-wrap .el-input__icon
  line-height 26px
.name
  color #fff
  font-size 20px
.info-dialog
  border-radius 5px
</style>
