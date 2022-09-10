import DOMPurify from "isomorphic-dompurify";
import { separator, siteName } from "../data/Meta";
import Head from "next/head";
import hljs from "highlight.js/lib/common";
import "highlight.js/styles/atom-one-dark.css";
import { useEffect } from "react";

export function Post({ post }) {

	const getDate = date => {
		let str = date.split("T");
		str = str[0];
		str = new Date(str).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
		return str;
	};

	useEffect(() => {
		hljs.highlightAll();
	}, []);

	return (
		<>
			<Head>
				<title key={"title"}>{`${post.title.rendered} ${separator} ${siteName}`}</title>
			</Head>
			<h2 className="post-title">
				<span className="underlined">{post.title.rendered}</span>
			</h2>
			<p className="post-date contained">{getDate(post.date)}</p>
			<div className="post-content post-body" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.rendered, { FORBID_TAGS: ["figure"], ADD_TAGS: ["iframe"] }) }}></div>
		</>
	);
}
