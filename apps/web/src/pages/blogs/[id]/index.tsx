import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Metadata } from "../../../components/seo/metadata";

// EDIT HERE: 这里是博客文章的示例数据，实际使用时可以从 API 获取
const SAMPLE_ARTICLE = {
  id: "1",
  title: "Garlic bread with cheese: What the science tells us",
  date: "2024-01-15",
  content: `
For years parents have espoused the health benefits of eating garlic bread with cheese to their children, with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy loaf for Halloween.

But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up around the country.

## The Science Behind It

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Key Findings

- Finding one: Important discovery about garlic bread
- Finding two: Another crucial observation
- Finding three: Final conclusion from the research

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

> "This is a quote from an expert in the field, providing valuable insights into the matter at hand."

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

\`\`\`javascript
// Code example
function example() {
  console.log("This is a code block");
}
\`\`\`

**Bold text** and *italic text* are also supported.
`,
};

interface BlogDetailPageProps {
  id: string;
}

export default async function BlogDetailPage({ id }: BlogDetailPageProps) {
  // 实际使用时，这里可以根据 id 从 API 或数据库获取文章
  const article = SAMPLE_ARTICLE;

  // 从文章内容提取摘要（取前 160 个字符）
  const excerpt = article.content
    .replace(/[#*>\-`]/g, "")
    .trim()
    .slice(0, 160);

  return (
    <>
      <Metadata
        title={`${article.title} - 4REAL`}
        description={excerpt}
        type="article"
        publishedTime={article.date}
        keywords={["博客文章", "技术分享"]}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 文章头部 */}
        <header className="mb-12 space-y-4">
          <h1 className="text-3xl font-bold sm:text-4xl">{article.title}</h1>
          <time className="block text-sm text-muted-foreground">
            {article.date}
          </time>
        </header>

        {/* 文章内容 - 使用 prose 样式渲染 Markdown */}
        <article className="prose prose-slate max-w-none lg:prose-lg prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:italic prose-code:text-primary prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-pre:bg-muted">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </article>

        {/* 返回按钮 */}
        <div className="mt-12 pt-8">
          <a
            href="/blogs"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← 返回博客列表
          </a>
        </div>
      </div>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
