const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');


const api = require('./api')

const app = new koa();
const router = new Router();

router.use('/api',api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods())

app.listen(4000,() => {
    console.log('Listening to port 4000');
})