import Link from "next/link";
import RiLineChartFill from "~icons/ri/line-chart-fill";
import RiUserAddFill from "~icons/ri/user-add-fill";
import RiBrushFill from "~icons/ri/brush-fill";
import RiArrowDownSLine from "~icons/ri/arrow-down-s-line";
import Image from "next/image";
import { ImageLoader } from "../ImageLoader";
import RiArrowRightSLine from "~icons/ri/arrow-right-s-line";
import RiSettings4Fill from "~icons/ri/settings-4-fill";
import { useRouter } from "next/router";
import classNames from "classnames";
import { DotcreatorsLogoResponsive } from "../DotcreatorsLogoResponsive";

export default function Navigation() {
	const router = useRouter();
	return (
		<section className="flex h-screen max-w-sm flex-col gap-16 border-r border-dot-white/5 bg-dot-body p-8">
			<div className="place-self-center">
				<DotcreatorsLogoResponsive width={30} height={28} color="#FF902B" />
			</div>

			<div className="flex flex-row items-center justify-between gap-3 overflow-hidden rounded-full bg-dot-primary p-3 px-5">
				<div className="relative flex flex-row items-center gap-3">
					<ImageLoader
						src="https://cdn.discordapp.com/avatars/207839349209956352/b68c555ffa7699573252c2dab6b75887.png"
						alt="Avatar for anivire"
						width={35}
						height={35}
						className="rounded-full"
					/>
					<div className="absolute z-10 ">
						<ImageLoader
							src="https://cdn.discordapp.com/avatars/207839349209956352/b68c555ffa7699573252c2dab6b75887.png"
							alt="Avatar for anivire"
							width={35}
							height={35}
							className="rounded-full opacity-50 blur-xl"
						/>
					</div>
					<p>änivire</p>
				</div>
				<button className="text-zinc-400">
					<RiSettings4Fill />
				</button>
			</div>

			<div className="flex w-full flex-col gap-1.5">
				<Link
					href={"/dashboard"}
					className={classNames(
						"flex flex-row items-center justify-between gap-3 rounded-2xl p-3 px-5 transition-colors duration-200 ease-in-out md:hover:bg-dot-primary",
						{
							"bg-dot-primary": router.pathname === "/dashboard",
						},
					)}
				>
					<span className="flex flex-row gap-3">
						<RiLineChartFill className="text-xl text-zinc-400" />
						Dashboard
					</span>
				</Link>
				<Link
					href={"/dashboard/artists"}
					className={classNames(
						"flex flex-row items-center justify-between gap-3 rounded-2xl p-3 px-5 transition-colors duration-200 ease-in-out md:hover:bg-dot-primary",
						{
							"bg-dot-primary": router.pathname.includes("artists"),
						},
					)}
				>
					<span className="flex flex-row gap-3">
						<RiBrushFill className="text-xl text-zinc-400" />
						Artists
					</span>
				</Link>
				<Link
					href={"/dashboard/suggestions"}
					className={classNames(
						"flex flex-row items-center justify-between gap-3 rounded-2xl p-3 px-5 transition-colors duration-200 ease-in-out md:hover:bg-dot-primary",
						{
							"bg-dot-primary": router.pathname.includes("suggestions"),
						},
					)}
				>
					<span className="flex flex-row gap-3">
						<RiUserAddFill className="text-xl text-zinc-400" />
						Suggestions
					</span>
				</Link>
			</div>
		</section>
	);
}
