import request from '@/utils/request'

/* 用户登录 */
export const login = (data) => {
    return request({
        method: 'post',
        url: '/mp/v1_0/authorizations',
        data
    })
}

/* 获取用户资料 */
export const getUserProfile = () => {
    return request({
        method: 'get',
        url: '/mp/v1_0/user/profile'
    })
}


