import RiDiscordFill from "~icons/ri/discord-fill";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextSeo } from "next-seo";
import { DotcreatorsLogoResponsive } from "@/components/DotcreatorsLogoResponsive";

export default function Auth() {
	const router = useRouter();

	async function loginWithDiscord() {
		try {
			const response = await fetch(`${process.env.API_URL}auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			});

			if (response.ok) {
				const responseData = await response.json();
				window.location.href = responseData.url;
			} else {
				console.error(
					`Failed to login with Discord. Status: ${response.status}`,
				);
			}
		} catch (error) {
			console.error("An error occurred while logging in with Discord:", error);
		}
	}

	async function authorizeUser(
		accessToken: string,
		refreshToken: string,
		expiresIn: string,
	) {
		try {
			const response = await fetch("/api/callback", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					accessToken,
					refreshToken,
					expiresIn,
				}),
			});

			if (response.ok) {
				const responseData = await response.json();
				if (responseData) router.push("/dashboard");
			} else {
				const errorData = await response.json();
				console.error(
					`Failed to login with Discord. Status: ${response.status}, Message: ${errorData.message}`,
				);
			}
		} catch (error) {
			console.error("An error occurred while logging in with Discord:", error);
		}
	}

	useEffect(() => {
		const hash = window.location.hash.substring(1);
		const params = new URLSearchParams(hash);
		const accessToken = params.get("access_token");
		const refreshToken = params.get("refresh_token");
		const expiresIn = params.get("expires_in");

		console.log(accessToken);
		console.log(refreshToken);
		console.log(expiresIn);

		if (accessToken && refreshToken && expiresIn) {
			authorizeUser(accessToken, refreshToken, expiresIn);
		} else {
			console.error("Access token not found");
		}
	}, [router]);

	return (
		<>
			<NextSeo
				title="Log-in"
				description="Get access to dotcreators dashboard!"
				noindex={true}
				nofollow={true}
			/>
			<section className="grid h-screen w-full grid-cols-3 items-center justify-end">
				<div className="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-5 bg-dot-body">
					<DotcreatorsLogoResponsive width={30} height={28} color="#FF902B" />
					<p className="max-w-72 text-center text-zinc-400">
						Welcome to dotcreators dashboard! Please log-in to continue
					</p>
					<button
						onClick={() => loginWithDiscord()}
						className="flex flex-row items-center gap-3 rounded-2xl bg-dot-secondary p-3 px-5 transition-colors duration-200 ease-in-out md:hover:bg-[#5865F2]/70"
					>
						<RiDiscordFill />
						Continue with Discord
					</button>
					<p className="max-w-72 text-center text-xs text-zinc-400">
						This website uses cookies.
					</p>
				</div>
				<Image
					src="/meshGradient.png"
					alt="Background"
					width={1000}
					height={500}
					quality={100}
					className="-z-10 col-span-2 h-screen w-full opacity-50"
				/>
			</section>
		</>
	);
}
