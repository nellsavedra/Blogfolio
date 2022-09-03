import { Context } from "../data/Context";
import "../styles/globals.css";
import { initStore } from "../data/Store";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

function App({ Component, pageProps }) {
	const [store, setStore] = useState(initStore);

	const location = useRouter().asPath.replace("/", "");

	const changeEmoji = useCallback(() => {
		if (location.startsWith("code")) {
			setStore(store => {
				return { ...store, emoji: "👨🏽‍💻" };
			});
		} else if (location.startsWith("blog")) {
			setStore(store => {
				return { ...store, emoji: "📝" };
			});
		} else if (location === "about") {
			setStore(store => {
				return { ...store, emoji: "✨" };
			});
		} else {
			setStore(store => {
				return { ...store, emoji: "🙋🏽‍♂️" };
			});
		}
	}, [location]);

	useEffect(() => {
		changeEmoji();
	}, [changeEmoji]);

	return (
		<Context.Provider value={{ store, setStore, location }}>
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
										Hola, soy <span className="underlined">Andrés</span> {store.emoji}
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
		</Context.Provider>
	);
}

export default App;
