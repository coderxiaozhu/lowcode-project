<template>
    <div class="edit-wrapper" :class="{ active: active }" @click="onItemClick">
        <!-- 显示组件 -->
        <slot></slot>
    </div>
</template>

<script setup lang='ts'>
interface privateProps {
    id: string;
    active: boolean
}
// 接受父级数据
const props = withDefaults(defineProps<privateProps>(), {
    // 选中组件时触发
    active: false
})
// 定义子组件事件
const emit = defineEmits<{
    (e: 'set-active', id: string): void
}>()
const onItemClick = () => {
    emit('set-active', props.id)
}
</script>

<style lang="scss" scoped>
.edit-wrapper {
    padding: 0;
    cursor: pointer;
    border: 1px solid transparent;
    user-select: none;
}
.edit-wrapper:hover {
    border: 1px dashed #ccc;
}
.edit-wrapper.active {
    border: 1px solid #409eff;
    user-select: none;
    z-index: 1000;
}
</style>