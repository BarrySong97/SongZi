export interface MetadataProps {
	// 基本信息
	title: string;
	description: string;

	// Open Graph / 社交媒体
	image?: string;
	url?: string;
	type?: "website" | "article" | "profile";

	// Twitter Card
	twitterCard?: "summary" | "summary_large_image" | "app" | "player";
	twitterSite?: string;
	twitterCreator?: string;

	// 文章特定
	publishedTime?: string;
	modifiedTime?: string;
	author?: string;
	tags?: string[];

	// 其他
	keywords?: string[];
	robots?: string;
	canonical?: string;
}

export async function Metadata({
	title,
	description,
	image,
	url,
	type = "website",
	twitterCard = "summary_large_image",
	twitterSite,
	twitterCreator,
	publishedTime,
	modifiedTime,
	author,
	tags,
	keywords,
	robots = "index, follow",
	canonical,
}: MetadataProps) {
	// 默认配置
	const siteName = "4REAL";
	const defaultImage = "/og-image.png"; // 默认 OG 图片
	const defaultUrl = typeof window !== "undefined" ? window.location.href : "";

	const finalImage = image || defaultImage;
	const finalUrl = url || canonical || defaultUrl;

	return (
		<>
			{/* 基本 Meta */}
			<title>{title}</title>
			<meta name="description" content={description} />
			{keywords && keywords.length > 0 && (
				<meta name="keywords" content={keywords.join(", ")} />
			)}
			<meta name="robots" content={robots} />
			{author && <meta name="author" content={author} />}

			{/* Canonical URL */}
			{canonical && <link rel="canonical" href={canonical} />}

			{/* Open Graph */}
			<meta property="og:type" content={type} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:site_name" content={siteName} />
			{finalImage && <meta property="og:image" content={finalImage} />}
			{finalUrl && <meta property="og:url" content={finalUrl} />}

			{/* 文章特定的 OG 标签 */}
			{type === "article" && publishedTime && (
				<meta property="article:published_time" content={publishedTime} />
			)}
			{type === "article" && modifiedTime && (
				<meta property="article:modified_time" content={modifiedTime} />
			)}
			{type === "article" && author && (
				<meta property="article:author" content={author} />
			)}
			{type === "article" &&
				tags &&
				tags.map((tag) => (
					<meta key={tag} property="article:tag" content={tag} />
				))}

			{/* Twitter Card */}
			<meta name="twitter:card" content={twitterCard} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			{finalImage && <meta name="twitter:image" content={finalImage} />}
			{twitterSite && <meta name="twitter:site" content={twitterSite} />}
			{twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
		</>
	);
}
