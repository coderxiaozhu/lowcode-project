<template>
<div class="common-layout">
    <a-layout>
      <a-layout-header>
        <div class="title">
            <router-link to="/">xz-lowcode</router-link>
        </div>
      </a-layout-header>
      <a-layout-content>
        <a-row>
          <router-view></router-view>
        </a-row>
      </a-layout-content>
      <a-layout-footer> coderxiaozhu-project </a-layout-footer>
    </a-layout>
</div>
</template>

<script setup lang='ts'>
</script>

<style lang="scss" scoped>
.ant-layout-header {
    a {
      color: #fff;
      text-decoration: none;
      &:hover {
        color: #409eff;
      }
    }
}
.a-layout-footer {
  background: #000;
  box-sizing: border-box;
  padding-top: 20px;
}
.a-layout-footer {
  text-align: center;
  font-weight: 700;
}
</style>