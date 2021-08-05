import request from '@/utils/request'

// 用户图片上传
export function uploadImg(data) {
    return request({
      url: '/common/upload',
      method: 'post',
      data: data
    })
}

