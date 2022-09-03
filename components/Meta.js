export default function Meta({ title = "", url = "", excerpt = "", imgUrl = "", type = "website" }) {
	return (
		<>
			{/* <!-- HTML Meta Tags --> */}
			<meta name="description" content={excerpt} key={"description"} />

			{/* <!-- Facebook Meta Tags --> */}
			<meta property="og:url" content={url} key={"og:url"} />
			<meta property="og:type" content={type} key={"og:type"} />
			<meta property="og:title" content={title} key={"og:title"} />
			<meta property="og:description" content={excerpt} key={"og:description"} />
			<meta property="og:image" content={imgUrl} key={"og:image"} />

			{/* <!-- Twitter Meta Tags --> */}
			<meta name="twitter:card" content="summary_large_image" key={"twitter:card"} />
			<meta property="twitter:domain" content="nellsavedra.com" key={"twitter:domain"} />
			<meta property="twitter:url" content={url} key={"twitter:url"} />
			<meta name="twitter:title" content={title} key={"twitter:title"} />
			<meta name="twitter:description" content={excerpt} key={"twitter:description"} />
			<meta name="twitter:image" content={imgUrl} key={"twitter:image"} />
		</>
	);
}

// Usage <Meta title={} url={} excerpt={} imgUrl= {} type ={} />
