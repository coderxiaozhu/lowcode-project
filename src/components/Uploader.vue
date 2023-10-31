<template>
  <div class="file-upload">
    <div
      class="upload-area"
      :class="{ 'is-dragover': drag && isDragOver }"
      v-on="events"
    >
      <slot v-if="isUploading" name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot
        v-else-if="lastFileData && lastFileData.loaded"
        name="uploaded"
        :uploaded-data="lastFileData.data"
      >
        <button>点击上传</button>
      </slot>
      <slot v-else name="default">
        <button>点击上传</button>
      </slot>
    </div>
    <!-- 隐藏input控件 -->
    <input
      ref="inputRef"
      type="file"
      :style="{ display: 'none' }"
      @change="handleFileChange"
    />
    <!-- 上传文件列表 -->
    <ul
      v-if="showUploadList"
      :class="`uploaded-list uploaded-list-${listType}`"
    >
      <li
        v-for="item in fileList"
        :key="item.uid"
        :class="`uploaded-file upload-${item.status}`"
      >
        <img
          v-if="item.url && listType === 'picture'"
          :src="item.url"
          class="upload-list-thumbnail"
          :alt="item.name"
        />
        <span v-if="item.status === 'loading'" class="file-icon">
          <LoadingOutlined />
        </span>
        <span v-else class="file-icon">
          <FileOutlined />
        </span>
        <span class="filename">{{ item.name }}</span>
        <button class="delete-icon" @click="removeFile(item.uid)">
          <DeleteOutlined />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, reactive, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { last } from 'lodash-es'
import {
  LoadingOutlined,
  FileOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
// 上传状态
export type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
// 上传文件类型
export type FileListType = 'picture' | 'text'
// 上传文件函数
export type CheckUpload = (file: File) => boolean | Promise<File>
// 上传文件的文件类型
interface propsType {
  action: string;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  drag: boolean;
  autoUpload: boolean;
  listType: string;
  showUploadList: boolean
}
// 传入的参数有些会为空
const props = withDefaults(defineProps<Partial<propsType>>(), {
  action: "",
  drag: false,
  autoUpload: true,
  listType: 'text',
  showUploadList: false
})
export interface UploadFile {
  uid: string
  size: number
  name: string
  status: UploadStatus
  raw: File
  resp?: any
  url?: string
}
// 上传组件实例
const inputRef = ref<null | HTMLInputElement>(null)
// 点击上传函数
const triggleUpload = () => {
  inputRef.value && inputRef.value?.click()
}
// 上传文件数据列表
const fileList = ref<UploadFile[]>([])
// 是否拖拽
const isDragOver = ref(false)
// 判断是否上传
const isUploading = computed(() => {
  return fileList.value.some(file => file.status === 'loading')
})
// 新上传的文件
const lastFileData = computed(() => {
  const lastFile = last(fileList.value)
  if (lastFile) {
    return {
      loaded: lastFile.status === 'success',
      data: lastFile.resp
    }
  }
  return false
})
// 删除文件
const removeFile = (id: string) => {
  fileList.value = fileList.value.filter(item => item.uid !== id)
}
// 调接口上传文件函数
const postFile = (readyFile: UploadFile) => {
  // 新建formData数据结构
  const formData = new FormData()
  // 在formData中添加数据
  formData.append(readyFile.name, readyFile.raw)
  readyFile.status = 'loading'
  axios
    .post(props.action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      readyFile.status = 'success'
      readyFile.resp = res.data
    })
    .catch(() => {
      readyFile.status = 'error'
    })
    .finally(() => {
      if (inputRef.value) {
        inputRef.value.value = ''
      }
    })
}
// 添加到文件列表
const addFileToList = (uploadedFile: File) => {
  const fileObj = reactive<UploadFile>({
    uid: uuidv4(),
    size: uploadedFile.size,
    name: uploadedFile.name,
    status: 'loading',
    raw: uploadedFile
  })
  if (props.listType === 'picture') {
    try {
      fileObj.url = URL.createObjectURL(uploadedFile)
    } catch (error) {
      console.log('upload File error', error)
    }
  }
  fileList.value.push(fileObj)
  if (props.autoUpload) {
    postFile(fileObj)
  }
}
// 上传之前检查文件
const beforeUploadCheck = (file: null | FileList) => {
  if (file) {
    const uploadedFile = file[0]
    if (props.beforeUpload) {
      const result = props.beforeUpload(uploadedFile)
      if (result && result instanceof Promise) {
        result
          .then(processedFile => {
            if (processedFile instanceof File) {
              addFileToList(processedFile)
            } else {
              throw new Error('beforeUpload Promise should return File object')
            }
          })
          .catch(e => {
            console.error(e)
          })
      } else if (result === true) {
        addFileToList(uploadedFile)
      }
    } else {
      addFileToList(uploadedFile)
    }
  }
}
// 上传文件列表
// const uploadFiles = () => {
//   fileList.value
//     .filter(file => file.status === 'ready')
//     .forEach(readyFile => postFile(readyFile))
// }
// 上传文件到服务器
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  beforeUploadCheck(target.files)
}
// 拖拽事件
const handleDrag = (e: DragEvent, over: boolean) => {
  // 取消默认行为
  e.preventDefault()
  isDragOver.value = over
}
// 拖拽结束
const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
  e.dataTransfer && beforeUploadCheck(e.dataTransfer.files)
}
// 事件列表
let events: { [key: string]: (e: any) => void } = {
  click: triggleUpload
}
// 拖拽开始
if (props.drag) {
  events = {
    ...events,
    dragover: (e: DragEvent) => handleDrag(e, true),
    dragleave: (e: DragEvent) => handleDrag(e, false),
    drop: handleDrop
  }
}
</script>

<style lang="scss" scoped>
.upload-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.upload-list li {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  font-size: 14px;
  line-height: 1.8;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 200px;
  position: relative;
  &:first-child {
    margin-top: 10px;
  }
  .upload-list-thumbnail {
    vertical-align: middle;
    display: inline-block;
    width: 70px;
    height: 70px;
    position: relative;
    z-index: 1;
    background-color: #fff;
    object-fit: cover;
  }
  .file-icon {
    svg {
      margin-right: 5px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .filename {
    margin-left: 5px;
    margin-right: 40px;
  }
  &.upload-error {
    color: #f5222d;
    svg {
      color: #f5222d;
    }
  }
  .file-status {
    display: block;
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
  }
  .delete-icon {
    display: none;
    position: absolute;
    right: 7px;
    top: 0;
    line-height: inherit;
    cursor: pointer;
  }
  &:hover {
    background-color: #efefef;
    .file-status {
      display: none;
    }
    .delete-icon {
      display: block;
    }
  }
}
.upload-loading {
  color: yellow;
}
.upload-success {
  color: green;
}
.upload-error {
  color: red;
}
</style>
