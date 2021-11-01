import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';

export default function FirstPost() {
	return (
		<Layout>
			<Head>
				<title>🥨First Postieee</title>
			</Head>
			<h1>First Postieee</h1>
			<h2>
				<Link href="/">
					<a>Back to liiiiiife</a>
				</Link>
			</h2>
		</Layout>
	);
}

// export default function FirstPost() {
// 	return (
// 		<main>
// 			<h1>First Postieeee</h1>
// 			<a href="/">Go Home</a>
// 		</main>
// 	);
// }
