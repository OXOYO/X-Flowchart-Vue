/**
 * Created by OXOYO on 2019/5/31.
 *
 * 文件处理
 */

export default {
  // Base64转Blob
  base642Blob (code) {
    const parts = code.split(';base64,')
    const contentType = parts[0].split(':')[1]
    const raw = window.atob(parts[1])
    const rawLength = raw.length

    const uInt8Array = new Uint8Array(rawLength)

    for (let i = 0; i < rawLength; i++) {
      uInt8Array[i] = raw.charCodeAt(i)
    }

    return new Blob([uInt8Array], {
      type: contentType
    })
  },
  // 下载文件
  downloadFile (fileName, content) {
    const blob = this.base642Blob(content)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.textContent = 'download image'
    link.href = url
    link.download = fileName
    link.click()
    // no longer need to read the blob so it's revoked
    URL.revokeObjectURL(url)
  }
}
