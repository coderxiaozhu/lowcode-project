<template>
    <el-row :gutter="20">
        <el-col :span="6" class="template-item">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="imgWapper">
                    <img src="../assets/img/screenshot-889755.png" class="image" />
                    <div class="hoverItem">
                        <el-button type="primary">使用改模板创建</el-button>
                    </div>
                </div>
                <div style="padding: 14px">
                    <span>Yummy hamburger</span>
                    <div class="bottom">
                        <time class="time">545645</time>
                        <el-button text class="button">Operating</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6" class="template-item">
            <el-card :body-style="{ padding: '0px' }">
                <img
src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image" />
                <div style="padding: 14px">
                    <span>Yummy hamburger</span>
                    <div class="bottom">
                        <time class="time">545645</time>
                        <el-button text class="button">Operating</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6" class="template-item">
            <el-card :body-style="{ padding: '0px' }">
                <img
src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image" />
                <div style="padding: 14px">
                    <span>Yummy hamburger</span>
                    <div class="bottom">
                        <time class="time">545645</time>
                        <el-button text class="button">Operating</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6" class="template-item">
            <el-card :body-style="{ padding: '0px' }">
                <img
src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image" />
                <div style="padding: 14px">
                    <span>Yummy hamburger</span>
                    <div class="bottom">
                        <time class="time">545645</time>
                        <el-button text class="button">Operating</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.el-card {
    width: 350px;
    border-radius: 12px;
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 10%);
}

.imgWapper {
    width: 350px;
    height: 400px;
    position: relative;
    overflow: hidden;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    box-sizing: border-box;

    .image {
        width: 100%;
        display: block;
        transition: all .2s ease-in;
        cursor: pointer;
    }
    
    .hoverItem {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.8);
        position: absolute;
        left: 0;
        top: 0;
        justify-content: center;
        align-items: center;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        display: none;
    }
}

.imgWapper:hover .image {
    transform: scale(1.25);
}

.imgWapper:hover .hoverItem {
    display: flex;
}

.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}
</style>