import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export const get = async () => {
	const posts = await getCollection("blog", ({ data }) => {
		return !data.draft && data.publishDate < new Date();
	});

	// Sort content entries by publication date
	posts.sort(
		(a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
	);

	return rss({
		title: `TenguCTI`,
		description: "TenguCTI is a decentralized platform for sharing Cyber Threat Intelligence (CTI), leveraging blockchain technology to ensure data integrity, traceability, and trust. Designed for security analysts, researchers, and organizations, it enables the publication, querying, and validation of indicators of compromise (IoCs), adversary tactics, and other threat data without relying on a central authority.",
		site: import.meta.env.SITE,

		items: posts.map((post) => ({
			link: post.slug,
			title: post.data.title,
			description: post.data.snippet,
			pubDate: post.data.publishDate,
		})),
	});
};
