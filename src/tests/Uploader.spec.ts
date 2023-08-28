import type { VueWrapper } from '@vue/test-utils'
import { mount, shallowMount } from '@vue/test-utils'
// import Uploader from '../components/Uploader.vue';
import Uploader from '../components/Uploader.vue'
import axios from 'axios'
import flushPromises from 'flush-promises'

// 模拟axios
vi.mock('axios')
// 定义wrapper;
let wrapper: VueWrapper<any>
// 定义测试文件
const testFile = new File(['xyz'], 'test.png', { type: 'image' })
// 测试mock组件
const mockComponent = {
  template: '<div><slot></slot></div>'
}
const mockComponents = {
  DeleteOutlined: mockComponent,
  FileOutlined: mockComponent,
  LoadingOutlined: mockComponent
}
// 设置上传组件的值
const setInputValue = (input: HTMLInputElement, file = testFile) => {
  const files = [file] as any
  Object.defineProperty(input, 'files', {
    value: files,
    writable: false
  })
}
// 测试Uploader组件
describe('Uploader.vue', () => {
  beforeAll(() => {
    wrapper = shallowMount(Uploader, {
      props: {
        action: 'test.url'
      },
      global: {
        stubs: mockComponents
      }
    })
  })
  // 初始界面渲染
  it('basic layout before uploading', () => {
    // 存在上传按钮
    expect(wrapper.find('button').exists()).toBeTruthy()
    // 按钮文字是否点击上传
    expect(wrapper.find('button').text()).toBe('点击上传')
    // input是否隐藏
    expect(wrapper.find('input').isVisible()).toBeFalsy()
  })
  // 测试上传成功
  it('upload process should works fine', async () => {
    // mock 成功的请求
    vi.mocked(axios.post).mockResolvedValueOnce({ status: 'success' })
    // 模拟input的 e.target.files
    const fileInput = wrapper.get('input').element as HTMLInputElement
    setInputValue(fileInput)
    // 触发change事件
    await wrapper.get('input').trigger('change')
    // post请求再调用一次
    expect(vi.mocked(axios.post)).toHaveBeenCalledTimes(1)
    // 按钮文字为正在上传
    expect(wrapper.get('button').text()).toBe('正在上传')
    // 按钮状态为禁用
    expect(wrapper.get('button').attributes()).toHaveProperty('disabled')
    // 列表长度修改，并且有正确的class
    expect(wrapper.findAll('li').length).toBe(1)
    // 获取列表第一个元素
    const fileItem = wrapper.get('li:first-child')
    // 元素的类名包含 uploading
    expect(fileItem.classes()).toContain('upload-loading')
    // 清除promise
    await flushPromises()
    // 按钮文字为点击上传
    expect(wrapper.get('button').text()).toBe('点击上传')
    // 元素的类名包含 upload-success
    expect(fileItem.classes()).toContain('upload-success')
    // 元素的内容正确
    expect(fileItem.get('.filename').text()).toBe(testFile.name)
  })
  // 测试上传失败
  it('should return error text when post is rejected', async () => {
    // mock请求
    vi.mocked(axios.post).mockRejectedValueOnce({ status: 'error' })
    // 触发change事件
    await wrapper.get('input').trigger('change')
    // post请求调用两次
    expect(vi.mocked(axios.post)).toHaveBeenCalledTimes(1)
    // 按钮文字为正在上传
    expect(wrapper.get('button').text()).toBe('正在上传')
    // 清除promise
    await flushPromises()
    // 按钮文字为正在上传
    expect(wrapper.get('button').text()).toBe('点击上传')
    // 列表长度增加
    expect(wrapper.findAll('li').length).toBe(2)
    // 获取最后一个元素
    const lastItem = wrapper.get('li:last-child')
    // 元素的类名包含upload-error
    expect(lastItem.classes()).toContain('upload-error')
    // 点击删除图标，进行删除这一项
    await lastItem.get('.delete-icon').trigger('click')
    // 列表长度减少1
    expect(wrapper.findAll('li').length).toBe(1)
  })
  // 测试自定义模板
  it('should show the correct interface when using custom slot', async () => {
    // mocked的请求
    vi.mocked(axios.post).mockResolvedValueOnce({ data: { url: 'aa.url' } })
    vi.mocked(axios.post).mockResolvedValueOnce({ data: { url: 'xyz.url' } })
    // 获取wrapper
    const wrapper = mount(Uploader, {
      props: {
        action: 'test.url'
      },
      slots: {
        default: '<button>Custom Button</button>',
        loading: '<div class="loading">custom loading</div>',
        uploaded: `
                    <template #uploaded="{ uploadedData }">
                        <div class="custom-loaded">{{ uploadedData.url }}</div>
                    </template>
                `
      },
      global: {
        stubs: mockComponents
      }
    })
    // 自定义上传按钮
    expect(wrapper.get('button').text()).toBe('Custom Button')
    // 模拟input的e.target.files
    const fileInput = wrapper.get('input').element as HTMLInputElement
    setInputValue(fileInput)
    // 触发change事件
    await wrapper.get('input').trigger('change')
    // 自定义loading
    expect(wrapper.get('.loading').text()).toBe('custom loading')
    // 清除promise
    await flushPromises()
    // 自定义文件夹名称
    expect(wrapper.get('.custom-loaded').text()).toBe('aa.url')
    // 触发change事件
    await wrapper.get('input').trigger('change')
    // 自定义loading
    expect(wrapper.get('.loading').text()).toBe('custom loading')
    // 清除promise
    await flushPromises()
    // 自定义文件夹名称
    expect(wrapper.get('.custom-loaded').text()).toBe('xyz.url')
  })
  afterEach(() => {
    // 重置axios请求
    vi.mocked(axios.post).mockReset()
  })
})
