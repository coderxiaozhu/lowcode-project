import { computed } from "vue";
import { pick } from "lodash-es";

// 使用loadsh的pick方法挑选样式属性，并返回一个点击事件处理函数
const useComponentComoon = <T extends { [key: string]: any }>(props: T, picks: string[]) => {
    const styleProps = computed(() => pick(props, picks));
    const handleClick = () => {
        if (props.actionType === "url" && props.url) {
            window.location.href = props.url
        }
    }
    return {
        styleProps,
        handleClick
    }
}

export default useComponentComoon
