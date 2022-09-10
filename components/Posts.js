import axios from "axios";
import { separator, siteName } from "../data/Meta";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../data/store/store";

export default function Posts({ url, title, location }) {
	const store = useSelector(state => state);
	const dispatch = useDispatch();
	
	const getPosts = () => {
		axios.get(url + (store[location].page + 1)).then(({ data }) => {
			dispatch(actions.setNewPosts([data, location]));
			dispatch(actions.setPage([store[location].page + 1, location]));
		});
	};

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
				{store[location].posts.map(post => {
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
				{store[location].rendered && store[location].page >= store[location].pages ? (
					<p className="h2 posts-completed">✋🏽 No hay más posts.</p>
				) : store[location].page < store[location].pages ? (
					<button className="load-more-button" onClick={() => getPosts()}>
						Ver más…
					</button>
				) : null}
			</div>
		</>
	);
}
