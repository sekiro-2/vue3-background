import { ElMessage } from 'element-plus'

export const messageInfo = (message, type) => {
  ElMessage({
    message,
    type,
  })
}
