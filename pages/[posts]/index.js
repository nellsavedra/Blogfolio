import Head from "next/head";
import Meta from "../../components/Meta";
import Posts from "../../components/Posts";
import { blogPostsURL, codePostsURL } from "../../data/Endpoints";
import { separator, siteName } from "../../data/Meta";

export default function Blog({ url, title, location, resolvedUrl }) {
	return (
		<>
			<Head>
				<Meta url={`${process.env.HOST}${resolvedUrl}`} title={`${title} ${separator} ${siteName}`} />
			</Head>
			<Posts url={url} title={title} location={location} key={location} />
		</>
	);
}

export async function getServerSideProps({ resolvedUrl }) {
	if (resolvedUrl === "/blog") {
		return {
			props: {
				url: blogPostsURL,
				title: "Blog",
				location: "blog",
				resolvedUrl: resolvedUrl,
			},
		};
	} else if (resolvedUrl === "/code") {
		return {
			props: {
				url: codePostsURL,
				title: "Code",
				location: "code",
				resolvedUrl: resolvedUrl,
			},
		};
	} else {
		return {
			notFound: true,
		};
	}
}
