import axios from "axios";
import { singlePostURL } from "../../data/Endpoints";
import { Post } from "../../components/Post";
import Head from "next/head";

export default function Slug({ post, resolvedUrl }) {
	return (
		<>
			<Head>
				{/* <!-- HTML Meta Tags --> */}
				<meta name="description" content={post.excerpt.rendered || ""} key={"description"} />

				{/* <!-- Facebook Meta Tags --> */}
				<meta property="og:url" content={`${process.env.HOST || "https://nellsavedra.com"}${resolvedUrl}`} key={"og:url"} />
				<meta property="og:type" content={"article"} key={"og:type"} />
				<meta property="article:published_time" content={new Date(post.date).toISOString()|| ""} key={"article:published_time"} />
				<meta property="article:author" content={"Andrés Valle"} key={"article:author"} />
				<meta property="og:title" content={`${post.title.rendered}`} key={"og:title"} />
				<meta property="og:description" content={post.excerpt.rendered || ""} key={"og:description"} />
				<meta property="og:image" content={post.jetpack_featured_media_url+"?v="+(new Date().getTime()) || ""} key={"og:image"} />

				{/* <!-- Twitter Meta Tags --> */}
				<meta name="twitter:card" content="summary_large_image" key={"twitter:card"} />
				<meta property="twitter:domain" content="nellsavedra.com" key={"twitter:domain"} />
				<meta property="twitter:url" content={`${process.env.HOST || "https://nellsavedra.com"}${resolvedUrl}`} key={"twitter:url"} />
				<meta name="twitter:title" content={`${post.title.rendered}`} key={"twitter:title"} />
				<meta name="twitter:description" content={post.excerpt.rendered || ""} key={"twitter:description"} />
				<meta name="twitter:image" content={post.jetpack_featured_media_url+"?v="+(new Date().getTime()) || ""} key={"twitter:image"} />
			</Head>
			<Post post={post} />
		</>
	);
}

export async function getServerSideProps({ params, resolvedUrl }) {
	const { slug } = params;
	const post = await axios.get(singlePostURL + slug).then(({ data }) => data[0]);

	if (post) {
		return {
			props: {
				post: { ...post },
				resolvedUrl: resolvedUrl,
			},
		};
	} else {
		return {
			notFound: true,
		};
	}
}
