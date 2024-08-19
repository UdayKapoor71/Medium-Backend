import { Blog } from "../hooks";
import { NavBar } from "./Navbar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center ">
        <div className="grid grid-cols-12 px-10 pt-5 max-w-screen-2xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div>Posted on 4th Sept 2024</div>
            <div>{blog.content}</div>
          </div>
          <div className="col-span-4 pl-2">{blog.author.name}</div>
        </div>
      </div>
    </div>
  );
};
