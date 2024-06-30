import RiGithubFill from '~icons/ri/github-fill';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { DotcreatorsLogoResponsive } from '@/components/DotcreatorsLogoResponsive';
import useSWR from 'swr';

export default function Auth() {
  const router = useRouter();

  // const { data, error } = useSWR(
  //   `${process.env.API_URL}auth/github`,
  //   async (input: RequestInfo, init: RequestInit) => {
  //     const res = await fetch(input, init);
  //     const data = await res.json();
  //     console.log(res);
  //     window.location.href = data.url;
  //   },
  //   {}
  // );

  // async function loginWithDiscord() {
  //   try {
  //     const response = await fetch(`${process.env.API_URL}auth/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({}),
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       window.location.href = responseData.url;
  //     } else {
  //       console.error(
  //         `Failed to login with Discord. Status: ${response.status}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while logging in with Discord:', error);
  //   }
  // }

  // async function authorizeUser(
  //   accessToken: string,
  //   refreshToken: string,
  //   expiresIn: string
  // ) {
  //   try {
  //     const response = await fetch('/api/callback', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         accessToken,
  //         refreshToken,
  //         expiresIn,
  //       }),
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       if (responseData) router.push('/dashboard');
  //     } else {
  //       const errorData = await response.json();
  //       console.error(
  //         `Failed to login with Discord. Status: ${response.status}, Message: ${errorData.message}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while logging in with Discord:', error);
  //   }
  // }

  async function loginWithGithub() {
    window.location.href = `${process.env.API_URL}auth/github`;
  }

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
            onClick={() => loginWithGithub()}
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
