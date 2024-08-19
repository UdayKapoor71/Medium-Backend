import { Avatar } from "./BlogCard";

export const NavBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-3">
      <div>Medium</div>
      <div>
        <Avatar name="Uday" />
      </div>
    </div>
  );
};
