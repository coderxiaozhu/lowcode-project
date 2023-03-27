<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="300px">组件列表</el-aside>
            <el-main>画布区域</el-main>
            <el-aside width="300px">组件属性</el-aside>
        </el-container>
    </div>
</template>

<script setup lang="ts">
// import { reactive } from 'vue';

</script>
<style lang="scss" scoped>
.common-layout, .el-container {
    width: 100%;
    height: 100%;
}
</style>