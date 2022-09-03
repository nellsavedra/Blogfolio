import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import Head from "next/head";
import { singlePageURL } from "../data/Endpoints";
import { Social } from "../components/Social";
import { separator, siteName } from "../data/Meta";

export default function Welcome({ data }) {
	return (
		<>
			<Head>
				<title key={"title"}>{`${siteName} ${separator} Developer`}</title>
				<link  href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" />
			</Head>

			<div className="welcome-content">
				<div className="page-head__blog-desc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content.rendered, { FORBID_TAGS: ["figure"], ADD_TAGS: ["iframe"] }) }}></div>
				<Social />
			</div>
		</>
	);
}

export const getStaticProps = async () => {
	let data = {};
	await axios.get(singlePageURL + "portada").then(results => (data = results.data[0]));
	return {
		props: {
			data: data,
		},
	};
};
