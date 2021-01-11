
import request from '@/utils/request'

/* 文章列表请求 */
export const getArticles = (params) => {
    return request({
        method: 'get',
        url: '/mp/v1_0/articles',
        params
    })
}
/* 文章频道请求 */
export const getChannels = () => {
    return request({
        method: 'get',
        url: '/mp/v1_0/channels'
    })
}
/* 删除文章列表请求  */
export const getDeleteArticle = (articleId) => {
    return request({
        method: 'delete',
        url: `/mp/v1_0/articles/${articleId}`
    })
}
