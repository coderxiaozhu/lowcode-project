<template>
    <component :is="tag" :style="styleProps" class="z-text-component" @click="handleClick">
        {{ text }}
    </component>
</template>

<script setup lang='ts'>
import { textDefaultProps, textStylePropNames, TextComponentProps } from '../defaultProps';
import useComponentComoon from '../hooks/useComponentCommon'
const defaultProps = withDefaults(defineProps<Partial<TextComponentProps>>(), {
  ...textDefaultProps
})
const { styleProps, handleClick } = useComponentComoon(defaultProps, textStylePropNames)
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