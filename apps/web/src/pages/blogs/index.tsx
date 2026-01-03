import type { FC } from "react";
export interface BlogsPageProps {
  height: number;
}
const BlogsPage: FC<BlogsPageProps> = () => {
  return <div>Hello BlogsPage</div>;
};

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
export default BlogsPage;
