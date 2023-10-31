import { mapValues, without } from 'lodash-es'

// 通用默认属性类型
export interface CommonComponentProps {
  // actions
  actionType: string
  url: string
  // size
  height: string
  width: string
  paddingLeft: string
  paddingRight: string
  paddingTop: string
  paddingBottom: string
  // border style
  borderStyle: string
  borderColor: string
  borderWidth: string
  borderRadius: string
  // shadow and opacity
  boxShadow: string
  opacity: string
  // position and x,y
  position: string
  top: string
  left: string
  right: string
  bottom: string
}

// 通用的默认属性
export const commonDefaultProps: CommonComponentProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '',
  width: '300px',
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

// z-text组件特有属性的类型
export interface TextComponentProps extends CommonComponentProps {
  // 公共属性-字体样式
  text: string
  fontSize: string
  fontFamily: string
  fontWeight: string
  fontStyle: string
  textDecoration: string
  lineHeight: string
  textAlign: string
  color: string
  backgroundColor: string
  tag: string
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
  tag: 'div',
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
export const transformToComponentProps = <T extends { [key: string]: any }>(
  props: T
) => {
  console.log(props);
  return mapValues(props, item => {
    return {
      type: item.constructor,
      default: item
    }
  })
}

//  z-text组件可选类型，因为不是所有属性都会被传入
export type PartialTextComponentProps = Partial<TextComponentProps>
