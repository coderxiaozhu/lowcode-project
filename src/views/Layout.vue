<template>
<div class="common-layout">
    <a-layout>
      <a-layout-header>
        <div class="title">
            <router-link to="/">xz-lowcode</router-link>
        </div>
        <UserProfile :user="user" />
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
import { computed } from 'vue';
import UserProfile from '../components/UserProfile.vue';
import { useUserStore } from '../store/user'
const store = useUserStore()
const user = computed(() => store.user)
</script>

<style lang="scss" scoped>
.ant-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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