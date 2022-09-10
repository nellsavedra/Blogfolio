import "../styles/globals.css";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { Provider, useDispatch, useSelector } from "react-redux";
import { actions, rxStore } from "../data/store/store";

function Emoji() {
	const location = useRouter().asPath.replace("/", "");
	const dispatch = useDispatch();
	const store = useSelector(state => state);

	const changeEmoji = useCallback(() => {
		if (location.startsWith("code")) {
			dispatch(actions.setEmoji("👨🏽‍💻"));
		} else if (location.startsWith("blog")) {
			dispatch(actions.setEmoji("📝"));
		} else if (location === "about") {
			dispatch(actions.setEmoji("✨"));
		} else {
			dispatch(actions.setEmoji("🙋🏽‍♂️"));
		}
	}, [location]);

	useEffect(() => {
		changeEmoji();
	}, [changeEmoji]);

	return store.emoji;
}

function App({ Component, pageProps }) {
	const location = useRouter().asPath.replace("/", "");

	return (
		<Provider store={rxStore}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<main>
				<header className="topbar">
					<div className="logo">
						<h1>
							<Link href="/">
								<a>
									<b>
										Hola, soy <span className="underlined">Andrés</span> <Emoji />
									</b>
								</a>
							</Link>
						</h1>
					</div>
					<nav>
						<Link href="/code">
							<a className={location.startsWith("code") ? "active" : ""}>Code</a>
						</Link>
						<Link href="/blog">
							<a className={location.startsWith("blog") ? "active" : ""}>Blog</a>
						</Link>
						<Link href="/about">
							<a className={location.startsWith("about") ? "active" : ""}>About</a>
						</Link>
					</nav>
				</header>
				<section className="content">
					<Component {...pageProps} />
				</section>
			</main>
		</Provider>
	);
}

export default App;
