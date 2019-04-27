import Http from '@/lib/HttpRequest.js'
import { delUploadImageUrl } from '@/env.js'


const axios = new Http();

// 删除已上传的预览图片
export const delUploadImage = (path) => {
    return axios.request({
        url:delUploadImageUrl,
        method:'post',
        data:{path}
    });
}