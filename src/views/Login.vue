<template>
  <div class="loginWapper">
    <div class="box">
      <div class="title">欢迎回来</div>
      <el-form
        ref="ruleFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
      </el-form>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '手机号码', trigger: 'blur' },
  ]
})

const loginForm = reactive({})

</script>

<style lang="scss" scoped>
.loginWapper {
  width: 100%;
  height: 100vh;
  background-color: #2b4b6b;

  .box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    padding: 0 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .title {
      font-weight: 700;
      width: 100%;
      text-align: center;
      font-size: 20px;
      margin: 20px 0;
    }
  }
}
</style>