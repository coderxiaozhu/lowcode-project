import { defineStore } from "pinia";

export interface UserDataProps {
    username: string
}

export interface UserProps {
    isLogin: boolean;
    token?: string;
    data: Partial<UserDataProps>
}

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: {
                isLogin: false,
                token: localStorage.getItem("token") || "",
                username: "xiaozhu"
            }
        }
    },
    actions: {
        // 登录事件
        login() {
            this.user.isLogin = true
        },
        // 登出事件
        loginOut() {
            this.user.isLogin = false
        }
    }
})