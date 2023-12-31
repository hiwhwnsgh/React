import Joi from "joi";
import Post from "../../models/post";
import mongoose from "mongoose";

const { ObjectId} = mongoose.Types;

export const checkObjectId = ( ctx, next ) => {
    const {id} = ctx.params;
    if(!ObjectId.isValid(id)){
        ctx.status = 400;
        return;
    }
    return next();
}

/*
    POST /api/posts
    {
        title : '제목',
        body: '내용',
        tags: ['태그1', '태그2']
    }
*/
export const write = async ctx => {
    const schema = Joi.object().keys({
        // 객체가 다음 필드를 가지고 있음을 검증
        title : Joi.string().required(), // required()가 있으면 필수 항목
        body : Joi.string().required(),
        tags : Joi.array()
        .items(Joi.string())
        .required(),    //문자열로 이루어진 배열
    })

    //검증하고 나서 검증 실패인 경우 에러처리
    const result = schema.validate(ctx.request.body);
    if(result.err){
        ctx.status = 400; // Bad request
        ctx.body = result.err;
        return;
    }
    const { title, body, tags } = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags
    });
    try{
        await post.save()
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};
/*
    GET /api/posts
*/
export const list = async ctx => {
    const page = parseInt(ctx.query.page || '1',10);
    if(page < 1){
        ctx.status = 400;
        return;
    }
    try{
        const posts = await Post.find()
        .sort({_id: -1})
        .limit(10)
        .skip((page-1) * 10)
        .exec();
        const postCount = await Post.countDocuments().exec();
        ctx.set('Last-Page',Math.ceil(postCount / 10));
        ctx.body = posts
            .map(post=>post.toJSON())
            .map(post=>({
                ...post,
                body:
                    post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`
            }));
    } catch(e){
        ctx.throw(500, e);
    }
};

/*
    GET /api/posts/:id
*/
export const read =async ctx => {
    const {id} = ctx.params;
    try{
        const post = await Post.findById(id).exec();
        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e){
        ctx.throw(500,e);
    }
};

/*
    DELETE /api/posts/:id
*/
export const remove = async ctx => {
    const { id } = ctx.params;
    try{
        await Post.findByIdAndUpdate(id).exec();
        ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
    } catch (e) {
        ctx.throw(500, e);
    }
};

/*
    PATCH   /api/posts/:id
    {
        title: '수정',
        body: '수정 내용',
        tags: ['수정', '태그']
    }
*/
export const update = async ctx => {
    const { id } = ctx.params;
    const schema = Joi.object().keys({
        // 객체가 다음 필드를 가지고 있음을 검증
        title : Joi.string().required(), // required()가 있으면 필수 항목
        body : Joi.string().required(),
        tags : Joi.array()
        .items(Joi.string())
    })

    //검증하고 나서 검증 실패인 경우 에러처리
    const result = schema.validate(ctx.request.body);
    if(result.err){
        ctx.status = 400; // Bad request
        ctx.body = result.err;
        return;
    }
    try{
        const post = await Post.findByIdAndUpdate(id,ctx.request.body,{
            new: true, // 이 값을 설정하면 업데이트 된 데이터를 반환합니다.
            // false일 때는 업데이트 되기 전의 데이틀 반환합니다
        }).exec();
        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e){
        ctx.throw(500, e)
    }
};