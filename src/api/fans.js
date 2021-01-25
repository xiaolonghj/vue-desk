import request from '@/utils/request'

/* 获取粉丝列表 */
export const getFansList = (params) => {
    return request({
        method: 'get',
        url: '/mp/v1_0/followers',
        params
    })
}