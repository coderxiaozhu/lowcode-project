import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
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
      tag: 'div'
    }
  },
  {
    id: uuidv4(),
    name: 'z-text',
    props: {
      text: 'hello2',
      fontSize: '14px',
      tag: 'div',
      color: 'red'
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
      component: testComponentData,
      // 当前操作的组件
      currentElement: ''
    }
  }
})
