<template>
    <component :is="tag" :style="styleProps" class="z-text-component" @click="handleClick">
        {{ text }}
    </component>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { textDefaultProps, textStylePropNames, transformToComponentProps } from '../defaultProps';
import useComponentComoon from '../hooks/useComponentCommon'
const defaultProps = transformToComponentProps(textDefaultProps)
export default defineComponent({
  props: {
    tag: {
      type: String,
      default: "div"
    },
    ...defaultProps
  },
  setup(props) {
    // 获取样式属性
    const { styleProps, handleClick } = useComponentComoon(props, textStylePropNames)
    return {
      styleProps,
      handleClick
    }
  }
})
</script>

<style scoped>
h2.z-text-component, p.z-text-component {
  margin-bottom: 0;
}
button.z-text-component {
  padding: 5px 10px;
  cursor: pointer;
}
.z-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>