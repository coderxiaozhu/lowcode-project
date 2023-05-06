import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import ColorPicker from '../components/ColorPicker.vue'
import rgbHex from 'rgb-hex'

const defaultColors = [
  '#ffffff',
  '#f5222d',
  '#fa541c',
  '#fadb14',
  '#52c41a',
  '#1890ff',
  '#722ed1',
  '#8c8c8c',
  '#000000',
  ''
]

// 定义 wrapper
let wrapper: VueWrapper<any>

// 测试colorPick组件
describe('test', () => {
    beforeAll(() => {
        // 获取组件
        wrapper = mount(ColorPicker, {
            props: {
                value: "#ffffff"
            }
        })
    })
    // 测试页面是否出现正确的结构
    it('should render the current interface', async () => {
        // 判断布局左边是否出现了input，类型和值是否正确
        expect(wrapper.find("input").exists()).toBeTruthy();
        const input = wrapper.get("input").element;
        expect(input.type).toBe('color');
        expect(input.value).toBe('#ffffff');
        // 测试右侧是否有颜色列表
        expect(wrapper.findAll('.picked-color-list li').length).toBe(defaultColors.length);
        // 元素的background属性是否等于对应颜色
        const firstItem = wrapper.get('li:first-child div').element as HTMLElement;
        expect('#' + rgbHex(firstItem.style.backgroundColor)).toBe(defaultColors[0]);
        // 测试最后一个元素是否有特殊的类名
        const lastItem = wrapper.get('li:last-child div').element as HTMLElement;
        expect(lastItem.classList.contains('transparnet-back')).toBeTruthy()
    })
    // 测试 input 修改以后,是否发送对应的事件和对应和值
    it('should render username  when login is true', async () => {
        const blackHex = '#000000';
        // 获取input
        const input = wrapper.get('input');
        // 修改input的值
        await input.setValue(blackHex);
        // 是否发射了事件
        expect(wrapper.emitted()).toHaveProperty('change');
        const events = wrapper.emitted('change');
        // 发射事件的参数是否正确
        expect(events && events[0]).toEqual([blackHex])
    })
    // 测试点击颜色
    it('should call logout and show message,call router.push after timeout',  async () => {
        const firstItem = wrapper.get('li:first-child div');
        // 触发点击事件
        firstItem.trigger('click');
        // 是否发射了事件
        expect(wrapper.emitted()).toHaveProperty('change');
        const events = wrapper.emitted('change');
        expect(events && events[1]).toEqual([defaultColors[0]])
    })
})
