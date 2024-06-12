import classNames from 'classnames';
import Image from 'next/image';
import { FC, useEffect, useState, useCallback } from 'react';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import RiExternalLinkLine from '~icons/ri/external-link-line';
import Link from 'next/link';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ImageLoader } from '../ImageLoader';
import RiArrowRightSLine from '~icons/ri/arrow-right-s-line';

interface Props {
  artist: ArtistProfile;
  openedProfile: string | null;
  openedProfileData: (profile: ArtistProfile | null) => void;
  onProfileOpened: (profile: string | null) => void;
  className?: string;
}

export const ArtistListCard: FC<Props> = props => {
  const {
    artist,
    openedProfile,
    openedProfileData,
    onProfileOpened,
    className,
  } = props;
  const isSelected = openedProfile === artist.userId;

  const handleCardClick = useCallback(() => {
    if (isSelected) {
      onProfileOpened(null);
      openedProfileData(null);
    } else {
      onProfileOpened(artist.userId);
      openedProfileData(artist);
    }
  }, [isSelected, onProfileOpened, artist.userId]);

  function formatValue(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}.${Math.floor((value % 1000) / 100)}K`;
    } else {
      return value.toString();
    }
  }

  return (
    <section
      key={artist.userId}
      onClick={handleCardClick}
      className={classNames(
        'group/main flex w-full flex-col justify-between gap-5 overflow-hidden rounded-2xl transition-transform duration-200 ease-in-out md:hover:cursor-pointer md:hover:bg-dot-secondary',
        className,
        {
          'bg-dot-secondary': isSelected,
          'bg-dot-primary': !isSelected,
        }
      )}
    >
      <div
        className={classNames(
          'flex w-full flex-row items-center justify-between p-2 px-5'
        )}
      >
        <div className={classNames('flex flex-row items-center gap-4')}>
          <Link
            href={artist.url}
            target="_blank"
            className="group relative min-w-max"
          >
            <div className="relative z-10 overflow-hidden rounded-full">
              <ImageLoader
                alt={'Avatar for ' + artist.username}
                src={artist.images.avatar}
                width={35}
                height={35}
                className={classNames(
                  'transition-opacity duration-200 ease-in-out group-hover:opacity-50 group-hover:blur-sm'
                )}
              />
            </div>
            <RiExternalLinkLine className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform text-sm opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100" />
          </Link>
          <div className={classNames('flex flex-row items-center gap-4')}>
            <h1
              className={classNames(
                'flex max-w-96 flex-row items-center gap-2 truncate text-ellipsis font-hubot-sans font-black'
              )}
            >
              {artist.country && (
                <Image
                  alt={`${artist.country}`}
                  src={`https://flagcdn.com/${artist.country.toLowerCase()}.svg`}
                  width={24}
                  height={20}
                  className={'rounded-sm'}
                />
              )}
              <span className="ellipsis max-w-56 truncate">{artist.name}</span>
            </h1>
            <p
              className={classNames(
                'max-w-48 truncate text-ellipsis text-zinc-400'
              )}
            >
              @{artist.username}
            </p>
          </div>
        </div>
        <div
          className={classNames(
            'flex select-none flex-row items-center justify-end gap-5 transition-transform duration-200 ease-in-out md:group-hover/main:translate-x-0',
            {
              'translate-x-0': isSelected,
              'translate-x-10': !isSelected,
            }
          )}
        >
          <div
            className={classNames(
              'flex min-w-16 flex-row items-center justify-end gap-2'
            )}
          >
            <h1>{formatValue(artist.followersCount)}</h1>
            <p className="text-zinc-400">followers</p>
          </div>
          <div
            className={classNames(
              'flex min-w-16 flex-row items-center justify-end gap-2'
            )}
          >
            <h1>{formatValue(artist.tweetsCount)}</h1>
            <p className="text-zinc-400">posts</p>
          </div>
          <RiArrowRightSLine />
        </div>
      </div>
    </section>
  );
};
