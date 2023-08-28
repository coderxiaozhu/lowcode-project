<template>
    <div class="common-layout">
        <a-layout>
            <a-layout-sider width="300px">
                组件列表
                <ComponentsList :list="defaultTemplates" @on-item-click="addItem" />
                <Uploader />
            </a-layout-sider>
            <a-layout-content class="canvas-container">
                <p>画布区域</p>
                <div id="canvas-area" class="preview-list">
                    <editWrapper
v-for="component in components" :id="component.id" :key="component.id"
                        :active="component.id === store.getCurrentElement?.id" @set-active="setActive">
                        <component :is="componentMap[component.name]" v-bind="component.props">
                        </component>
                    </editWrapper>
                </div>
            </a-layout-content>
            <a-layout-sider width="300px">
                组件属性
                <propsTable v-if="store.getCurrentElement" :props="store.getCurrentElement.props" @change="handleChange" />
            </a-layout-sider>
        </a-layout>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue'
import { useEditorStore } from '../store/editor';
import Ztext from '../components/ZText.vue';
import ComponentsList from '../components/ComponentsList.vue';
import editWrapper from '../components/EditWrapper.vue';
import propsTable from '../components/PropsTable.vue';
import Uploader from '../components/Uploader.vue';
import { defaultTemplates } from '../defaultTemplates'
import { PartialTextComponentProps } from '../defaultProps'
// 组件实例映射表类型
export interface ComponentMap {
    [key: string]: Component
}
const store = useEditorStore();
const components = computed(() => store.components)
// 组件实例映射表
const componentMap: ComponentMap = {
    'z-text': Ztext
}
// 组件列表添加组件到画布
const addItem = (props: PartialTextComponentProps) => {
    store.addComponent(props)
}
// 点击触发组件选中状态
const setActive = (id: string) => {
    store.setActive(id)
}
// 组件修改状态的change事件
const handleChange = (e: any) => {
    store.updateComponent(e)
}
</script>

<style lang="scss" scoped>
.common-layout,
.ant-layout {
    width: 100%;
    height: 100%;
}

.ant-layout-sider {
    background-color: #fff;
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