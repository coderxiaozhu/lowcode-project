<template>
<div class="common-layout">
    <el-container>
      <el-header>
        <div class="title">
            <router-link to="/">xz-lowcode</router-link>
        </div>
      </el-header>
      <el-main>
        <el-row>
          <router-view></router-view>
        </el-row>
      </el-main>
      <el-footer> coderxiaozhu-project </el-footer>
    </el-container>
</div>
</template>

<script setup lang='ts'>
</script>

<style lang="scss" scoped>
.el-header {
    a {
      color: #fff;
      text-decoration: none;
      &:hover {
        color: #409eff;
      }
    }
}
.el-header,
.el-footer {
  background: #000;
  box-sizing: border-box;
  padding-top: 20px;
}
.el-footer {
  text-align: center;
  font-weight: 700;
}
</style>