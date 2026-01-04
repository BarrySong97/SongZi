# SEO Metadata 组件使用指南

## 组件说明

`Metadata` 组件用于在 Waku 应用中添加 SEO 元数据，支持：
- 基本 meta 标签（title, description, keywords）
- Open Graph 标签（社交媒体分享）
- Twitter Card 标签
- 文章特定标签（发布时间、作者等）

## 基本使用

### 1. 普通页面（网站类型）

```tsx
import { Metadata } from "../components/seo/metadata";

export default async function MyPage() {
  return (
    <>
      <Metadata
        title="页面标题"
        description="页面描述，建议 120-160 个字符"
        keywords={["关键词1", "关键词2", "关键词3"]}
      />
      <div>{/* 页面内容 */}</div>
    </>
  );
}
```

### 2. 博客文章页面

```tsx
import { Metadata } from "../components/seo/metadata";

export default async function BlogPost() {
  const article = await getArticle();

  return (
    <>
      <Metadata
        title={`${article.title} - 网站名称`}
        description={article.excerpt}
        type="article"
        publishedTime={article.publishedAt}
        modifiedTime={article.updatedAt}
        author={article.author}
        tags={article.tags}
        image={article.coverImage}
        keywords={article.keywords}
      />
      <div>{/* 文章内容 */}</div>
    </>
  );
}
```

### 3. 使用默认配置

```tsx
import { Metadata } from "../components/seo/metadata";
import { mergeMetadata } from "../components/seo/default-metadata";

export default async function MyPage() {
  const metadata = mergeMetadata({
    title: "自定义标题", // 只覆盖需要的字段
  });

  return (
    <>
      <Metadata {...metadata} />
      <div>{/* 页面内容 */}</div>
    </>
  );
}
```

## 完整参数说明

```typescript
interface MetadataProps {
  // 必填
  title: string;                    // 页面标题
  description: string;              // 页面描述

  // 可选 - Open Graph
  image?: string;                   // OG 图片 URL
  url?: string;                     // 页面 URL
  type?: "website" | "article" | "profile"; // 页面类型

  // 可选 - Twitter Card
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterSite?: string;             // @username
  twitterCreator?: string;          // @username

  // 可选 - 文章特定
  publishedTime?: string;           // ISO 8601 格式
  modifiedTime?: string;            // ISO 8601 格式
  author?: string;                  // 作者名
  tags?: string[];                  // 文章标签

  // 可选 - 其他
  keywords?: string[];              // SEO 关键词
  robots?: string;                  // 默认 "index, follow"
  canonical?: string;               // 规范链接
}
```

## 实际应用示例

### 首页
```tsx
<Metadata
  title="4REAL - 个人主页"
  description="Barryson4real 的个人主页，全栈工程师，分享技术、思考和生活。"
  keywords={["个人主页", "全栈工程师", "前端", "React", "TypeScript"]}
/>
```

### 博客列表页
```tsx
<Metadata
  title="博客 - 4REAL"
  description="分享技术文章、项目经验和学习笔记。"
  keywords={["博客", "技术文章", "前端开发"]}
/>
```

### 博客详情页
```tsx
<Metadata
  title={`${article.title} - 4REAL`}
  description={article.excerpt}
  type="article"
  publishedTime={article.date}
  image={article.coverImage}
  keywords={article.tags}
/>
```

## 最佳实践

1. **Title**
   - 长度：50-60 个字符
   - 格式：`页面标题 - 网站名称`
   - 包含关键词，放在前面

2. **Description**
   - 长度：120-160 个字符
   - 准确描述页面内容
   - 包含关键词，自然流畅

3. **Keywords**
   - 3-10 个相关关键词
   - 优先级从高到低排列
   - 避免关键词堆砌

4. **Image**
   - 推荐尺寸：1200x630 px
   - 格式：JPG 或 PNG
   - 文件大小：< 5MB

5. **URL**
   - 使用规范的完整 URL
   - 包含协议（https://）
   - 避免重复内容

## 配置默认值

在 `default-metadata.ts` 中配置全站默认值：

```typescript
export const DEFAULT_METADATA: Partial<MetadataProps> = {
  title: "4REAL - 个人博客",
  description: "分享技术、思考和生活。",
  type: "website",
  twitterCard: "summary_large_image",
  robots: "index, follow",
  keywords: ["博客", "技术", "前端"],
};
```

## 验证 SEO

使用以下工具验证 SEO 效果：
- Google Search Console
- Facebook Sharing Debugger
- Twitter Card Validator
- LinkedIn Post Inspector

## 注意事项

- Waku 会自动提升 `<title>`, `<meta>`, `<link>` 标签到 `<head>`
- 每个页面只应该有一个 `<Metadata>` 组件
- 动态内容需要在服务端生成（使用 `async` 组件）
