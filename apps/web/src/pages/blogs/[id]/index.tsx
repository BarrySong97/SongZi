import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Metadata } from "../../../components/seo/metadata";

// EDIT HERE: 这里是博客文章的示例数据，实际使用时可以从 API 获取
const SAMPLE_ARTICLE = {
  id: "1",
  title: "Garlic bread with cheese: What the science tells us",
  date: "2024-01-15",
  content: `
但最近一项研究发现，这道备受推崇的开胃小吃，竟然与全国范围内出现的一系列狂犬病例存在关联。

## 科学原理解析

据研究，蒜香面包的美味源于蒜素与奶酪中的蛋白质反应，但是否真的有传说中的“免疫力提升”效果，科学家还在进一步探究。

### 研究要点

- 发现一：蒜香面包相关的最新科研进展
- 发现二：关于健康影响的深度观察
- 发现三：研究得出的初步结论

出于谨慎，建议大家适量享用美食，均衡饮食才是健康之源。

> “在食品安全领域，理性看待流行美食，拥抱健康生活方式。”——行业专家语

除了科学，享受美食的同时也别忘了愉悦心情。
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
      <div className="mx-auto min-h-[calc(100vh-128px)] max-w-5xl px-4 py-12 sm:px-6 lg:px-8 border border-t-0 border-b-0">
        {/* 文章头部 */}
        <header className="mb-12 space-y-4">
          <h1 className="text-3xl font-bold sm:text-4xl">{article.title}</h1>
          <time className="block text-sm text-muted-foreground">
            {article.date}
          </time>
        </header>

        {/* 文章内容 - 使用 prose 样式渲染 Markdown */}
        <article className="prose max-w-none prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:italic prose-code:text-primary prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-pre:bg-muted">
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
