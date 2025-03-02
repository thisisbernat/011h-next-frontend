import type { AppProps } from "next/app";
import { NuqsAdapter } from "nuqs/adapters/next/pages";

import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NuqsAdapter>
			<Component {...pageProps} />
		</NuqsAdapter>
	);
}
