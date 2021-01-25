import request from '@/utils/request'

/* 修改评论状态 */
export const getCommentStatus = (articleId, allow_comment) => {
    return request({
        method: 'put',
        url: '/mp/v1_0/comments/status',
        params: {
            article_id: articleId
        },
        data: {
            allow_comment: allow_comment
        }
    })
}