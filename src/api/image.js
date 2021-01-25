import request from '@/utils/request'

/* 获取图片素材 */
export const getImages = (params) => {
    return request({
        method: 'get',
        url: '/mp/v1_0/user/images',
        params
    })
}
/* 收藏图片素材 */
export const collectImage = (imageId,collect) => {
    return request({
        method: 'put',
        url: `/mp/v1_0/user/images/${imageId}`,
        data:{
            collect
        }
    })
}
/* 删除图片素材 */
export const deleteImage = (imageId) => {
    return request({
        method: 'delete',
        url: `/mp/v1_0/user/images/${imageId}`
    })
}