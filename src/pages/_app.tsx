import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/NavComponents/Layout";
import "./globals.css";
import "overlayscrollbars/overlayscrollbars.css";
import AuthLayout from "@/components/NavComponents/AuthLayout";
import { DefaultSeo } from "next-seo";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);
	const router = useRouter();

	return getLayout(
		<>
			<DefaultSeo
				titleTemplate="%s › Dotcreators Dashboard"
				canonical="https://dashboard.dotcreators.xyz/"
				openGraph={{
					title: "dotcreators Dashboard",
					type: "website",
					locale: "en_IE",
					url: "https://dashboard.dotcreators.xyz/",
					siteName: "dotcreators dashboard",
					images: [
						{
							url: "/summary_large_image.png",
							width: 1280,
							height: 720,
						},
					],
				}}
				twitter={{
					handle: "@handle",
					site: "@site",
					cardType: "summary_large_image",
				}}
			/>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				/>
				<link rel="apple-touch-icon" sizes="57x57" href="/favicon-57x57.png" />
				<link rel="apple-touch-icon" sizes="60x60" href="/favicon-60x60.png" />
				<link rel="apple-touch-icon" sizes="72x72" href="/favicon-72x72.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="/favicon-76x76.png" />
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="/favicon-114x114.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/favicon-120x120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href="/favicon-144x144.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/favicon-152x152.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon-180x180.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/favicon-96x96.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/favicon-192x192.png"
				/>
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="msapplication-TileImage" content="/favicon-144x144.png" />
				<meta name="msapplication-config" content="/browserconfig.xml" />
			</Head>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				/>
			</Head>
			{router.pathname !== "/auth" ? (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			) : (
				<AuthLayout>
					<Component {...pageProps} />
				</AuthLayout>
			)}
		</>,
	);
}
