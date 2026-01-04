import {
  BlogListItem,
  type BlogPost,
} from "../../components/blogs/blog-list-item";
import { Metadata } from "../../components/seo/metadata";

// EDIT HERE: 添加/编辑你的博客文章
const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "我的第一篇博客文章",
    date: "2024-01-15",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
  },
  {
    id: "2",
    title: "关于 React Server Components 的思考",
    date: "2024-01-10",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    id: "3",
    title: "如何构建一个现代化的博客系统",
    date: "2024-01-05",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: "4",
    title: "TypeScript 最佳实践",
    date: "2023-12-28",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
  },
];

export default async function BlogsPage() {
  return (
    <>
      <Metadata
        title="博客 - 4REAL"
        description="分享技术文章、项目经验和学习笔记。涵盖前端开发、全栈技术、TypeScript、React 等主题。"
        keywords={[
          "博客",
          "技术文章",
          "前端开发",
          "全栈",
          "React",
          "TypeScript",
        ]}
      />
      <div className="mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6 lg:px-8 border border-t-0 border-b-0 min-h-[calc(100vh-128px)] ">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold sm:text-3xl">博客</h1>
          <p className="text-sm text-muted-foreground">
            共 {BLOG_POSTS.length} 篇文章
          </p>
        </div>

        <div className="divide-y divide-border">
          {BLOG_POSTS.map((post) => (
            <BlogListItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
