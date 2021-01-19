
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

/* 发布文章请求  */
export const publishArticle = (data, draft = false) => {
    return request({
        method: 'post',
        url: '/mp/v1_0/articles',
        params: {
            draft
        },
        data
    })
}
/* 获取指定文章请求 */
export const getTargetArticle = (articleId) => {
    return request({
        method: 'get',
        url: `/mp/v1_0/articles/${articleId}`
    })
}
/* 编辑修改文章请求 */
export const getEditArticle = (articleId,data,draft = false) => {
    return request({
        method: 'put',
        url: `/mp/v1_0/articles/${articleId}`,
        params: {
            draft
        },
        data
    })
}
