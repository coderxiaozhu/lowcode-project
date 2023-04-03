<template>
    <component :is="tag" :style="styleProps" class="z-text-component">
        {{ text }}
    </component>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { pick } from 'lodash-es';
const props = defineProps<{
    text: string,
    fontSize: string,
    tag?: string
}>()
const styleProps = computed(() => pick(props, ['fontSize']))
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