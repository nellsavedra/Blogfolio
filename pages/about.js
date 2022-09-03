import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import Head from "next/head";
import { singlePageURL } from "../data/Endpoints";
import { separator, siteName } from "../data/Meta";

export default function Page({ post }) {
	return (
		<>
			<Head>
				<title key={"title"}>{`${post.title.rendered} ${separator} ${siteName}`}</title>
			</Head>
			<h2 className="page-title contained">
				<span className="underlined">{post.title.rendered}</span>
			</h2>
			<div className="page-content post-body" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.rendered, { FORBID_TAGS: ["figure"] }) }}></div>
		</>
	);
}

export async function getStaticProps() {
	let post = {};
	await axios.get(singlePageURL + "about").then(({ data }) => {
		post = { ...data[0] };
	});
	return { props: { post: { ...post } } };
}
