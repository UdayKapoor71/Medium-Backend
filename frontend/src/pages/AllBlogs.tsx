import { BlogCard } from "../components/BlogCard";
import { NavBar } from "../components/Navbar";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <NavBar />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd Feb 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
