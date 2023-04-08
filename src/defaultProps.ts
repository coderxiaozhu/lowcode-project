import { mapValues, without } from 'lodash-es'

// 通用的默认属性
export const commonDefaultProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '',
  width: '318px',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  // border style
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: '1',
  // position and x,y
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0'
}

// z-text 组件特有属性
export const textDefaultProps = {
    // 公共属性-字体样式
    text: '正文内容',
    fontSize: '14px',
    fontFamily: '',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    lineHeight: '1',
    textAlign: 'left',
    color: '#000000',
    backgroundColor: '',
    ...commonDefaultProps
}

// 摘除非样式属性
export const textStylePropNames = without(
    Object.keys(textDefaultProps),
    'actionType',
    'url',
    'text'
)

// 转换成组件的prop属性
export const transformToComponentProps = <T extends { [key: string]: any }>(props: T) => {
    return mapValues(props, (item) => {
        return {
            type: item.constructor,
            default: item
        }
    })
}