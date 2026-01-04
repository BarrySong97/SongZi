import type { MetadataProps } from "./metadata";

// 默认的站点元数据配置
export const DEFAULT_METADATA: Partial<MetadataProps> = {
	title: "4REAL - 个人博客",
	description:
		"4REAL 是一个分享技术、思考和生活的个人博客。在这里记录我的学习历程、项目经验和随笔。",
	type: "website",
	twitterCard: "summary_large_image",
	robots: "index, follow",
	keywords: ["博客", "技术", "前端", "全栈", "React", "TypeScript"],
};

// 合并默认配置和页面配置的辅助函数
export function mergeMetadata(
	pageMetadata: Partial<MetadataProps>,
): MetadataProps {
	return {
		...DEFAULT_METADATA,
		...pageMetadata,
		title: pageMetadata.title || DEFAULT_METADATA.title!,
		description: pageMetadata.description || DEFAULT_METADATA.description!,
	} as MetadataProps;
}
