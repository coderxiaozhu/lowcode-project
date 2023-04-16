import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { PartialTextComponentProps } from '../defaultProps'
import type { TextComponentProps } from '../defaultProps'
// 组件数据结构
export interface ComponentData {
  // 元素属性
  props: { [key: string]: string }
  // id 通过uuid进行生成
  id: string
  // 业务组件组件库名称，渲染的组件名称比如L-Text等
  name: string
}

// 编辑器数据结构
export interface EditorProps {
  // 中间编辑器渲染的数据
  components: ComponentData[]
  // 当前编辑的元素 uuid
  currentElement: string
}

// 测试数据
const testComponentData: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'z-text',
    props: {
      text: 'hello',
      fontSize: '20px',
      tag: 'div',
      lineHeight: '1',
      color: '#ff3344',
      textAlign: 'left',
      fontFamily: '',
    }
  },
  {
    id: uuidv4(),
    name: 'z-text',
    props: {
      text: 'hello2',
      fontSize: '14px',
      tag: 'div',
      color: '#3399',
      lineHeight: '2',
    }
  },
  {
    id: uuidv4(),
    name: 'z-text',
    props: {
      text: 'hello3',
      fontSize: '18px',
      tag: 'div',
      fontWeight: '800',
      actionType: 'url',
      url: 'https://www.baidu.com/'
    }
  }
]

export const useEditorStore = defineStore('editor', {
  state: () => {
    return {
      // 组件列表
      components: testComponentData,
      // 当前操作的组件
      currentElement: ''
    }
  },
  actions: {
    // 添加画布组件
    addComponent(props: PartialTextComponentProps) {
      const newComponentData: ComponentData = {
        id: uuidv4(),
        name: 'z-text',
        props
      }
      this.components.push(newComponentData)
    },
    // 激活组件
    setActive(currentId: string) {
      this.currentElement = currentId
    },
    // 更新组件数据
    updateComponent(e: any) {
      const { key, value } = e;
      const updateComponent = this.components.find(c => c.id === this.currentElement);
      if (updateComponent) {
        updateComponent.props[key as keyof TextComponentProps] = value
      }
    }
  },
  getters: {
    // 获取当前激活组件
    getCurrentElement(state) {
      return state.components.find((c) => c.id === state.currentElement)
    }
  }
})
