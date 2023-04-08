<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="300px">组件列表</el-aside>
            <el-main class="canvas-container">
                <p>画布区域</p>
                <div class="preview-list">
                    <Ztext
                        :is="componentMap[component.name]"
                        v-for="component in components"
                        :key="component.id"
                        v-bind="component.props"
                        :text="component.props.text"
                        :font-size="component.props.fontSize"
                    >
                        {{  componentMap[component.name] }}
                    </Ztext>
                </div>
            </el-main>
            <el-aside width="300px">组件属性</el-aside>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { computed, Component } from 'vue';
import { useEditorStore } from '../store/editor';
import Ztext from '../components/ZText.vue';
// 组件实例映射表类型
export interface ComponentMap {
    [key: string]: Component
}
const store = useEditorStore();
const components = computed(() => store.component)
// 组件实例映射表
const componentMap: ComponentMap = {
    'z-text': Ztext
}

</script>
<style lang="scss" scoped>
.common-layout, .el-container {
    width: 100%;
    height: 100%;
}
.common-layout .canvas-container {
    padding: 24px;
    margin: 0;
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background-color: #f0f2f5;
    .preview-list {
        padding: 0;
        margin: 0;
        background-color: #fff;
        min-width: 375px;
        min-height: 200px;
        border: 1px solid #efefef;
        overflow-x: hidden;
        overflow-y: auto;
        position: fixed;
        margin-top: 50px;
        max-height: 80vh;
    }
}
</style>