import RiGithubFill from '~icons/ri/github-fill';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { DotcreatorsLogoResponsive } from '@/components/DotcreatorsLogoResponsive';

export default function Auth() {
  const router = useRouter();

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
          <DotcreatorsLogoResponsive width={40} height={38} color="#FF902B" />
          <p className="max-w-72 text-center text-zinc-400">
            Welcome to dotcreators dashboard! Please log-in to continue
          </p>
          <button
            onClick={() =>
              router.push('http://localhost:8989/api/v1/auth/github/')
            }
            className="flex flex-row items-center gap-3 rounded-2xl bg-dot-secondary p-3 px-5 transition-colors duration-200 ease-in-out md:hover:bg-zinc-700"
          >
            <RiGithubFill />
            Continue with Github
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
