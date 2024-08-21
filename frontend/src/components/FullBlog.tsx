import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import { NavBar } from "./Navbar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <NavBar name={blog.author.name} />
      <div className="flex justify-center ">
        <div className="grid grid-cols-12 px-10 pt-12 max-w-screen-2xl">
          <div className="col-span-8 border-r border-slate-200 p-4">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 4th Sept 2024</div>
            <div className="pt-4 text-justify">{blog.content}</div>
          </div>

          <div className="col-span-4 pl-2">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex">
              <div className="flex justify-center flex-col pr-4">
                <Avatar name={blog.author.name} />
              </div>
              <div>
                <div className="text-xl font-bold">{blog.author.name}</div>
                <div className="pt-1 text-slate-500">
                  A random catch phrase about the author writing patterns and
                  blogs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
