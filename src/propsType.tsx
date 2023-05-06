import { VNode } from 'vue'
import type { TextComponentProps } from './defaultProps'

// 不用属性拥有不同编辑组件
export interface PropsForm {
  component: string
  value?: string
  // 给组件库传入属性
  extraProps?: { [key: string]: any }
  text: string
  // 是否支持组件包裹
  subComponent?: string
  // 包裹的组件选项
  options?: {
    text: string | VNode
    value: any
  }[]
  // 支持类型转换
  initalTransform?: (v: any) => any
  // 支持自定义属性名称
  valueProp?: string
  // 修改后的事件值
  afterTransform?: (v: any) => any
  // 事件名称
  eventName?: string
}

// 表单列表，右侧编辑列表
export type PropsToForms = {
  [p in keyof TextComponentProps]?: PropsForm
}

// 文字字体的映射表
const fontFamilyArr = [
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiti"' },
  { text: '仿宋', value: '"FangSong","STFangsong"' }
]
const fontFamilyOptions = fontFamilyArr.map((font) => {
  return {
    value: font.value,
    text: (<span style={{ fontFamily: font.text }}>{font.text}</span>) as VNode
  }
})

// 右侧编辑列表的映射表
export const mapPropsToForms: PropsToForms = {
  text: {
    component: 'a-textarea',
    extraProps: {
      rows: 3,
    },
    text: '文本',
    afterTransform: (e: any) => e.target.value
  },
  fontSize: {
    text: '字号',
    component: 'a-input-number',
    initalTransform: (v: string) => parseInt(v),
    afterTransform: (e: any) => (e ? `${e}px` : '')
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1
    },
    initalTransform: (v: string) => parseFloat(v),
    afterTransform: (e: number) => e.toString()
  },
  textAlign: {
    text: '对齐',
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    options: [
      {
        value: 'left',
        text: '左'
      },
      {
        value: 'center',
        text: '中'
      },
      {
        value: 'right',
        text: '右'
      }
    ],
    afterTransform: (e: any) => e.target.value
  },
  fontFamily: {
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '字体',
    options: [
      {
        value: '',
        text: '无'
      },
      ...fontFamilyOptions
    ],
    afterTransform: (e: any) => e
  },
  color: {
    component: 'color-picker',
    text: '字体颜色',
    afterTransform: (e: any) => typeof e === 'object' ? e.target.value : e
  }
}
