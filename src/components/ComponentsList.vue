<!-- 组件列表组件 -->
<template>
  <div class="create-component-list">
    <div
        v-for="(item, index) in list"
        :key="index"
        class="component-list"
        @click="onItemClick(item)"
    >
        <ZText v-bind="item" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import ZText from './ZText.vue';
import { PartialTextComponentProps } from  '../defaultProps';
interface privateProps {
    list: Array<PartialTextComponentProps>
}
// template数据
const props = withDefaults(defineProps<privateProps>(), {
    list: () => []
})
// 向父组件发射事件类型
const emit = defineEmits<{
    (e: 'on-item-click', data: PartialTextComponentProps): void
}>()
// 点击发射事件
const onItemClick = (data: PartialTextComponentProps) => {
    emit('on-item-click', data)
}
</script>

<style scoped>
</style>