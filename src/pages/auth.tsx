import DotcreatorsLogo from '@/components/DotcreatorsLogo';
import RiDiscordFill from '~icons/ri/discord-fill';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Auth() {
  const router = useRouter();

  async function loginWithDiscord() {
    const response = await fetch(`${process.env.API_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      let responseData = await response.json();
      // router.push(responseData);
      window.location.href = responseData.url;
    } else {
      console.error(`Failed to login with Discord. Status: ${response.status}`);
    }
  }

  return (
    <>
      <section className="grid h-screen w-full grid-cols-3 items-center justify-end">
        <div className="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-5 bg-dot-body">
          <DotcreatorsLogo />
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
