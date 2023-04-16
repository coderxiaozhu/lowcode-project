<template>
  <div class="props-table">
    <div v-for="(item, index) in propsMapList" :key="index" class="props-item">
      <span class="label">{{ item?.text }}:</span>
      <div class="prop-component">
        <component
v-bind="item?.extraProps" :is="item?.component" v-if="item.valueProp" :[item.valueProp]="item?.value"
          v-on="item.events">
          <template v-if="item.options">
            <component
:is="item.subComponent"
                       v-for="(option, key) in item.options"
                       :key="key"
                       :value="option.value">
              <renderVnode :v-node="option.text"></renderVnode>
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, VNode } from 'vue';
import { reduce } from 'lodash-es';
import renderVnode from '../components/RenderVnode'
import { mapPropsToForms } from '../propsType';
import type { PartialTextComponentProps } from '../defaultProps';
export interface privateProps {
  props: PartialTextComponentProps
}
export interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: {
    text: string | VNode;
    value: any
  }[];
  initalTransform?: (v: any) => any;
  valueProp: string;
  eventName: string;
  events: { [key: string]: (e: any) => void };
}
const props = defineProps<privateProps>();
const emit = defineEmits<{
  (e: 'change', data: any): void
}>()

// 获取属性映射列表
const propsMapList = computed(() => {
  return reduce(props.props, (result, value, key) => {
    const newKey = key as keyof PartialTextComponentProps;
    const item = mapPropsToForms[newKey]
    if (item) {
      const { valueProp = 'value', eventName = 'change', initalTransform, afterTransform } = item
      const newItem: FormProps = {
        ...item,
        value: initalTransform ? initalTransform(value) : value,
        valueProp,
        eventName,
        events: {
          [eventName]: (e: any) => {
            console.log(e);
            emit('change', { key, value: afterTransform ? afterTransform(e) : e })
          }
        }
      }
      result[newKey] = newItem
    }
    return result
  }, {} as { [key: string]: FormProps })
})
</script>

<style scoped>
.props-item {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 70%;
}
</style>