import classNames from 'classnames';
import { ImageLoader } from '../ImageLoader';
import { FC, useEffect, useState } from 'react';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import Link from 'next/link';
import { ArtistListCardTrendGraph } from './ArtistListCardTrendGraph';
import RiLineChartFill from '~icons/ri/line-chart-fill';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import Image from 'next/image';
import { countryCodes } from '@/utils/CountryCode';
import { searchTagsArray } from '@/utils/Tags';
import useSWR from 'swr';
import { ArtistTrend } from '@/utils/models/ArtistTrend';

interface Props {
  artist: ArtistProfile;
}

export const ArtistCardProfile: FC<Props> = props => {
  const [trendsLoading, setTrendsLoading] = useState(true);
  const [artistTrends, setArtistTrends] = useState<ArtistTrend[] | undefined>(
    undefined
  );

  const { data, error } = useSWR<{
    status: string;
    response: ArtistTrend[];
  }>(
    `${process.env.API_URL}trends/${props.artist.userId}?range=7`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  const replaceTagsWithLinks = (text: string) => {
    const regex = / @(\w+)/g;
    return text.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        const tag = part;
        return (
          <Link
            key={index}
            target="__blank"
            href={`https://x.com/${tag}`}
            className="ml-1 text-dot-link-primary"
          >
            @{tag}
          </Link>
        );
      }
      return part;
    });
  };

  useEffect(() => {
    if (data) {
      setArtistTrends(data.response);
      setTrendsLoading(false);
    }
    if (error) console.error('Error fetching artist trends:', error);
  }, [data, error]);

  return (
    <>
      <div className="mb-5 flex w-full flex-row items-center gap-3 text-zinc-400">
        <p className="rounded-md bg-dot-primary p-3 px-5 text-sm">
          Twitter account created{' '}
          {new Date(props.artist.joinedAt).toLocaleDateString()}
        </p>
        <p className="rounded-md bg-dot-primary p-3 px-5 text-sm">
          First profile parsed{' '}
          {new Date(props.artist.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div
        className={classNames(
          'relative flex h-fit w-full flex-col overflow-hidden rounded-md bg-dot-primary',
          {
            'justify-items-end gap-3': !props.artist.images.banner,
            'gap-5': props.artist.images.banner,
          }
        )}
      >
        {props.artist.images.banner && (
          <>
            <div className="absolute w-full">
              <ImageLoader
                src={props.artist.images.banner + '/mobile	'}
                alt={'Profile Banner for ' + props.artist.username}
                width={600}
                height={200}
                unoptimized={true}
                hideLoader={true}
                className="z-10 h-44 w-full object-cover opacity-50 blur-3xl"
              />
            </div>
            <div className="relative cursor-pointer">
              <ImageLoader
                src={props.artist.images.banner + '/1500x500	'}
                alt={'Profile Banner for ' + props.artist.username}
                width={600}
                height={200}
                unoptimized={true}
                className="h-40 w-full object-cover"
              />
            </div>
          </>
        )}
        <div className={classNames('flex w-full flex-col gap-5 px-5 pb-5')}>
          <div className="z-20 flex flex-row items-center justify-between gap-3">
            <div className="z-20 flex w-full flex-row items-center justify-between gap-3">
              <div className="flex flex-row items-center gap-3">
                <ImageLoader
                  alt={'Avatar for ' + props.artist.username}
                  src={props.artist.images.avatar}
                  width={75}
                  height={75}
                  className={'absolute rounded-xl'}
                />
                <div className="w-fit ">
                  <p className="flex w-fit flex-row items-center gap-2 rounded-md font-hubot-sans text-xl">
                    {props.artist.name}
                  </p>
                  <div className="flex flex-row gap-1 text-zinc-400">
                    <Link
                      href={props.artist.url}
                      target="__blank"
                      className="transition-colors duration-150 ease-in-out md:hover:text-dot-link-primary"
                    >
                      @{props.artist.username}
                    </Link>
                    {props.artist.website && (
                      <>
                        <p>•</p>
                        <Link
                          href={props.artist.website}
                          target="__blank"
                          className="transition-colors duration-150 ease-in-out md:hover:text-dot-link-primary"
                        >
                          {props.artist.website.replace(
                            /^(https?:\/\/)?(www\.)?/,
                            ''
                          )}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-5 rounded-xl">
                <div>
                  <h1 className="font-hubot-sans text-2xl font-black leading-tight">
                    {props.artist.followersCount}
                  </h1>
                  <p className="text-zinc-400">followers</p>
                </div>
                <div>
                  <h1 className="font-hubot-sans text-2xl font-black">
                    {props.artist.tweetsCount}
                  </h1>
                  <p className="text-zinc-400">tweets</p>
                </div>
              </div>
            </div>
          </div>

          {props.artist.bio && (
            <p className="whitespace-pre-line">
              {replaceTagsWithLinks(props.artist.bio)}
            </p>
          )}

          {trendsLoading ? (
            <div className="flex w-full flex-row">
              <div className="h-[104px] w-full animate-pulse rounded-2xl bg-dot-tertiary/50" />
            </div>
          ) : artistTrends && artistTrends.length !== 0 ? (
            <div className="z-20 flex w-full flex-col justify-between gap-5 text-xs">
              <ArtistListCardTrendGraph
                key={'followersGraph'}
                artistInfo={props.artist}
                trendBy="followers"
                trendData={artistTrends}
              />
              <ArtistListCardTrendGraph
                key={'tweetsGraph'}
                artistInfo={props.artist}
                trendBy="tweets"
                trendData={artistTrends}
              />
            </div>
          ) : (
            <div className="flex w-full flex-row items-center justify-center gap-3 rounded-2xl bg-dot-tertiary/50 p-10 text-zinc-400">
              <RiLineChartFill className="text-xl" />
              <p>
                Sorry, but there is currently no trend data recorded for this
                artist.
              </p>
            </div>
          )}
          <div className="flex flex-row flex-wrap gap-2">
            {props.artist.country && props.artist.country !== undefined && (
              <div className="flex flex-row items-center gap-2 rounded-md bg-dot-tertiary p-2 px-4 text-sm">
                <Image
                  alt={`${props.artist.country}`}
                  src={`https://flagcdn.com/${props.artist.country.toLowerCase()}.svg`}
                  width={24}
                  height={20}
                  className={'h-4 w-6 rounded-sm '}
                />
                <p className=" ">
                  {countryCodes.map((country, index) => {
                    if (
                      props.artist.country === country.value.toLocaleLowerCase()
                    ) {
                      return country.title;
                    }
                  })}
                </p>
              </div>
            )}

            {props.artist.tags !== undefined &&
              props.artist.tags.length !== 0 && (
                <>
                  {props.artist.tags.map((tag, index) => (
                    <p
                      key={index}
                      className="rounded-md bg-dot-tertiary p-2 px-4 text-sm transition-colors duration-200 ease-in-out "
                    >
                      {searchTagsArray.map(_tag => {
                        if (
                          tag === _tag.toLocaleLowerCase().replace(/ /g, '')
                        ) {
                          return _tag;
                        }
                      })}
                    </p>
                  ))}
                </>
              )}
            {props.artist && (
              <div className="flex flex-row items-center gap-2 rounded-md bg-dot-tertiary p-2 px-4 text-sm">
                <p className="text-zinc-400">
                  Profile updated{' '}
                  {new Date(props.artist.lastUpdatedAt).toLocaleDateString() +
                    ' ' +
                    new Date(props.artist.lastUpdatedAt).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
