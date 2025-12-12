import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

// exportData: 要导出的数组，fileName: 导出文件名
export function exportExcel(exportData, fileName = '表格数据') {
  // 1. 将 JSON 数据转换为工作表
  const worksheet = XLSX.utils.json_to_sheet(exportData)

  // 2. 创建工作簿
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  // 3. 生成二进制数据
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

  // 4. 保存为文件
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(data, `${fileName}.xlsx`)
}
