<template>
    <div class="templateListDetailBox">
        <div class="templateLogo">
            <img src="../assets/img/screenshot-889755.png" />
        </div>
        <div class="templateMsg">
            <h2>1024 程序员日</h2>
            <p>1024 程序员日</p>
            <div class="author">
                <span class="avaterImg">
                    <!-- <el-icon><User /></el-icon> -->
                </span>
                <span class="avaterDes">
                    该模板由
                    <b></b>
                    创作
                </span>
            </div>
            <div class="bar-code-area">
                <span>扫一扫,手机预览</span>
                <canvas id="barcode-container"></canvas>
            </div>
            <div class="user-button">
                <a-button type="primary" size="large">使用模板</a-button>
                <a-button size="large">下载图片海报</a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { reactive } from 'vue';

</script>

<style lang="scss" scoped>
.templateListDetailBox {
    margin-top: 50px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .templateLogo {
        width: 384px;
        margin-right: 20px;
        img {
            width: 100%;
        }
    }
    .templateMsg {
        h2 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            font-weight: 500;
            font-size: 18px;
        }
        p {
            font-size: 14px;
            color: rgba(0,0,0,.65);
        }
        .author {
            font-size: 14px;
            color: rgba(0,0,0,.65);
            margin-right: 10px;
            .avaterImg {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: #ccc;
                display: inline-block;
                color: #fff;
                font-size: 18px;
                text-align: center;
                line-height: 32px;
                margin-right: 10px;
            }
        }
        .bar-code-area {
            font-size: 14px;
            color: rgba(0,0,0,.65);
            margin: 20px 0;
            #barcode-container {
                width: 100%;
                height: 120px;
            }
        }
    }
}
</style>