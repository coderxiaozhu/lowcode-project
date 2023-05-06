<template>
    <a-button v-if="!user.isLogin" type="primary" class="user-profile-component" @click="login">
        登录
    </a-button>
    <div v-else>
        <a-dropdown-button class="user-profile-component">
            <!-- 显示用户名 -->
            <router-link to="/setting">{{ user.username }}</router-link>
            <template #overlay>
                <a-menu class="user-profile-dropdown">
                    <a-menu-item key="0" @click="loginOut">登出</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown-button>
    </div>
</template>

<script setup lang='ts'>
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';
const router = useRouter()
const store = useUserStore()
interface Props {
    user: {
        isLogin: boolean;
        username: string
    }
}
const props = defineProps<Props>()
const login = () => {
    store.login()
    message.success("登录成功", 2)
}
const loginOut = () => {
    store.loginOut()
    message.success("退出登录成功,2秒后跳转到首页", 2)
    setTimeout(() => {
        router.push("/")
    }, 2000)
}
</script>

<style scoped></style>