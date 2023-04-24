const http = require("http");
const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const koaBody = require("koa-body");

const app = new Koa();

app.use(cors());
app.use(koaBody({ json: true }));

let posts = [];

const router = new Router();

router.get("/posts", async (ctx, next) => {
  ctx.response.body = posts;
});

router.post("/posts", async (ctx, next) => {
  posts.push({ ...ctx.request.body, created: Date.now() });
  ctx.response.status = 204;
});

router.put("/posts", (ctx, next) => {
  const postId = ctx.request.body.id;
  posts = posts.map((o) => {
    if (o.id === postId) {
      return {
        ...o,
        ...ctx.request.body,
        id: o.id,
      };
    }
    return o;
  });
  ctx.response.status = 204;
});

router.delete("/posts/:id", async (ctx, next) => {
  const postId = ctx.params.id;
  const index = posts.findIndex((o) => o.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => {
  console.log(`server started http://localhost:${port}`);
});
