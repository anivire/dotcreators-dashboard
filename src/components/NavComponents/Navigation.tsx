import Link from 'next/link';
import { ImageLoader } from '../ImageLoader';
import { DotcreatorsLogoResponsive } from '../DotcreatorsLogoResponsive';
import RiLineChartFill from '~icons/ri/line-chart-fill';
import RiUserAddFill from '~icons/ri/user-add-fill';
import RiBrushFill from '~icons/ri/brush-fill';
import RiSettings4Fill from '~icons/ri/settings-4-fill';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import useSWR from 'swr';

export default function Navigation() {
  const router = useRouter();

  // const data = await fetch(`${process.env.API_URL}auth/user`).then(
  //   async response => {
  //     if (response.ok) {
  //       const data: {
  //         status: string;
  //         response: {
  //           id: string;
  //           githubId: string;
  //           username: string;
  //           avatarUrl: string;
  //         };
  //       } = await response.json();

  //       return data.response;
  //     } else {
  //       throw new Error('Failed to fetch artist profiles');
  //     }
  //   }
  // );

  const { data: user, error } = useSWR<{
    status: string;
    response: {
      id: string;
      githubId: string;
      username: string;
      avatarUrl: string;
    };
  }>(
    `${process.env.API_URL}auth/user`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, { ...init, credentials: 'include' });
      return res.json();
    },
    {}
  );

  return (
    <section className="flex h-screen max-w-sm flex-col gap-16 border-r border-dot-white/5 bg-dot-body p-8">
      <div className="place-self-center">
        <DotcreatorsLogoResponsive width={30} height={28} color="#FF902B" />
      </div>

      {user && (
        <div className="flex flex-row items-center justify-between gap-3 overflow-hidden rounded-full bg-dot-primary p-3 px-5">
          <div className="relative flex flex-row items-center gap-3">
            <ImageLoader
              src={user.response.avatarUrl}
              alt="Avatar for anivire"
              width={35}
              height={35}
              className="rounded-full"
            />
            <div className="absolute z-10 ">
              <ImageLoader
                src={user.response.avatarUrl}
                alt="Avatar for anivire"
                width={35}
                height={35}
                className="rounded-full opacity-50 blur-xl"
              />
            </div>
            <p>{user.response.username}</p>
          </div>
          <button className="text-zinc-400">
            <RiSettings4Fill />
          </button>
        </div>
      )}

      <div className="flex w-full flex-col gap-1.5">
        <Link
          href={'/dashboard'}
          className={classNames(
            'flex flex-row items-center justify-between gap-3 rounded-2xl p-3 px-5 transition-colors duration-200 ease-in-out md:hover:bg-dot-primary',
            {
              'bg-dot-primary': router.pathname === '/dashboard',
            }
          )}
        >
          <span className="flex flex-row gap-3">
            <RiLineChartFill className="text-xl text-zinc-400" />
            Dashboard
          </span>
        </Link>
        <Link
          href={'/dashboard/artists'}
          className={classNames(
            'flex flex-row items-center justify-between gap-3 rounded-2xl p-3 px-5 transition-colors duration-200 ease-in-out md:hover:bg-dot-primary',
            {
              'bg-dot-primary': router.pathname.includes('artists'),
            }
          )}
        >
          <span className="flex flex-row gap-3">
            <RiBrushFill className="text-xl text-zinc-400" />
            Artists
          </span>
        </Link>
        <Link
          href={'/dashboard/suggestions'}
          className={classNames(
            'flex flex-row items-center justify-between gap-3 rounded-2xl p-3 px-5 transition-colors duration-200 ease-in-out md:hover:bg-dot-primary',
            {
              'bg-dot-primary': router.pathname.includes('suggestions'),
            }
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
