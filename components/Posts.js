import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { separator, siteName } from "../data/Meta";
import { Context } from "../data/Context";
import Head from "next/head";
import Link from "next/link";

export default function Posts({ url, title, location }) {
	const { store, setStore } = useContext(Context);
	const [onDemand, setOnDemand] = useState(null);
	
	const callAPI = useCallback(() => {
		if (!store.rendered[location]) {
			axios.get(url + store.page[location]).then(({ data }) => {
				setStore(store => {
					return { ...store, posts: { ...store.posts, [location]: [...data] } };
				});
				setStore(store => {
					return { ...store, rendered: { ...store.rendered, [location]: true } };
				});
			});
		} else if (onDemand) {
			axios
				.get(url + store.page[location])
				.then(({ data }) => {
					setStore(store => {
						return { ...store, posts: { ...store.posts, [location]: [...store.posts[location], ...data] } };
					});
				})
				.then(() => {
					axios.get(url + (store.page[location] + 1)).catch(() => {
						setStore(store => {
							return { ...store, nextpage: { ...store.nextpage, [location]: false } };
						});
					});
					setOnDemand(false);
				});
		}
	}, [store.page]);

	useEffect(() => {
		callAPI();
	}, [callAPI]);

	return (
		<>
			<Head>
				<title key={"title"}>{`${title} ${separator} ${siteName}`}</title>
			</Head>
			<h2 className="page-title contained">
				<b>
					<span className="underlined">{title}</span>
				</b>
			</h2>
			<div className="page-posts">
				{store.posts[location].map(post => {
					return (
						<article key={post.id}>
							<h3>
								<Link href={location + "/" + post.slug}>
									<a>{post.title.rendered}</a>
								</Link>
							</h3>
						</article>
					);
				})}
				{!store.nextpage[location] && <p className="h2 posts-completed">✋🏽 No hay más posts.</p>}
				{store.posts[location].length >= 10 && store.nextpage[location] && (
					<button
						className="load-more-button"
						onClick={() => {
							setOnDemand(true);
							setStore(store => ({ ...store, page: { ...store.page, [location]: store.page[location] + 1 } }));
						}}
					>
						Ver más…
					</button>
				)}
			</div>
		</>
	);
}
