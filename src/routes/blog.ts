import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt"; //in node we get it from auth jwt

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  //this will extract the user id
  //pass it down to the route handler
  const authHeader = c.req.header("authorization") || "";
  console.log(authHeader, "authHeader");
  const user = await verify(authHeader, c.env.JWT_SECRET);
  console.log(user, "user is here");
  if (user) {
    c.set("userId", String(user.id));
    //userId doesnot exist in c so we have to explicitly explain this userid
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // if (isNaN(parseInt(authorId))) {
  //   return c.json({ message: "Invalid user ID" }, 400);
  // }
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId, //extraction of author id is from middleware
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    console.log(e, "error1");
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.get("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: body.id,
      },
    });

    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411); // 400 series error must be there
    return c.json({
      message: "Error while fetching blog post",
    });
  }
});

//pagination retuen 10 at first time
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany();
  return c.json({
    blogs,
  });
});
