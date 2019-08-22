/**
 * Created by OXOYO on 2019/5/31.
 *
 *
 */

export default {
  base642Blob (code) {
    let parts = code.split(';base64,')
    let contentType = parts[0].split(':')[1]
    let raw = window.atob(parts[1])
    let rawLength = raw.length

    let uInt8Array = new Uint8Array(rawLength)

    for (let i = 0; i < rawLength; i++) {
      uInt8Array[i] = raw.charCodeAt(i)
    }

    return new Blob([uInt8Array], {
      type: contentType
    })
  },
  downloadFile (fileName, content) {
    let blob = this.base642Blob(content)
    let url = URL.createObjectURL(blob)
    let link = document.createElement('a')
    link.textContent = 'download image'
    link.href = url
    link.download = fileName
    link.click()
    // no longer need to read the blob so it's revoked
    URL.revokeObjectURL(url)
  }
}
