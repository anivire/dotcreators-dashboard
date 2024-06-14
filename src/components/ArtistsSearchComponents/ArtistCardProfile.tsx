import { ImageLoader } from '../ImageLoader';
import { FC, useEffect, useRef, useState } from 'react';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistListCardTrendGraph } from './ArtistListCardTrendGraph';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import { SelectCountry, countryCodes } from '@/utils/CountryCode';
import { searchTagsArray } from '@/utils/Tags';
import { SearchCountries } from './SearchContainer/SearchCountries';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { motion } from 'framer-motion';
import RiLineChartFill from '~icons/ri/line-chart-fill';
import RiEyeFill from '~icons/ri/eye-fill';
import RiPencilFill from '~icons/ri/pencil-fill';
import RiDeleteBin7Line from '~icons/ri/delete-bin-7-line';
import RiCalendarFill from '~icons/ri/calendar-fill';
import RiUploadCloud2Fill from '~icons/ri/upload-cloud-2-fill';
import RiDatabase2Fill from '~icons/ri/database-2-fill';
import RiAtLine from '~icons/ri/at-line';
import RiFontFamily from '~icons/ri/font-family';
import RiFileCopyFill from '~icons/ri/file-copy-fill';
import RiChat4Fill from '~icons/ri/chat-4-fill';
import RiLink from '~icons/ri/link';
import RiSaveFill from '~icons/ri/save-fill';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import useSWR from 'swr';
import replaceTagsWithLinks from '../replaceArtistTags';

interface Props {
  artist: ArtistProfile;
}

export const ArtistCardProfile: FC<Props> = props => {
  const [viewMode, setViewMode] = useState<'edit' | 'view' | 'trends'>('view');
  const [trendsLoading, setTrendsLoading] = useState(true);
  const [artistTrends, setArtistTrends] = useState<ArtistTrend[] | undefined>(
    undefined
  );
  const [editUsername, setEditUsername] = useState<string>(
    props.artist.username
  );
  const [editName, setEditName] = useState<string>(props.artist.name ?? '');
  const [editWebsite, setEditWebsite] = useState<string>(
    props.artist.website ?? ''
  );
  const [editBio, setEditBio] = useState<string>(props.artist.bio ?? '');
  const [editCountry, setEditCountry] = useState<SelectCountry>();
  const [editTags, setEditTags] = useState<string[]>(
    props.artist.tags ? [...props.artist.tags] : []
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

  function selectedTagsHandler(_tag: string) {
    let tag = _tag.replace(/ /g, '').toLocaleLowerCase();
    if (!editTags.includes(tag)) {
      let newGenresArray: string[] = [...editTags];
      newGenresArray.push(tag);
      setEditTags(newGenresArray);
    } else {
      let newGenresArray: string[] = editTags.filter(item => item !== tag);
      setEditTags(newGenresArray);
    }
  }

  useEffect(() => {
    if (data) {
      setArtistTrends(data.response);
      setTrendsLoading(false);
    }
    if (error) console.error('Error fetching artist trends:', error);
  }, [data, error]);

  useEffect(() => {
    countryCodes.map(country => {
      if (props.artist.country === country.value.toLocaleLowerCase()) {
        setEditCountry(country);
      }
    });
  }, []);

  const slideVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className="mb-5 flex h-10 w-full flex-row items-center gap-5 bg-dot-body text-zinc-400">
        <div className="grid h-full grid-cols-3 divide-x divide-dot-secondary overflow-hidden rounded-md bg-dot-primary text-sm">
          <button
            onClick={() => setViewMode('view')}
            className={classNames(
              'flex w-full flex-row items-center justify-center px-4 transition-colors duration-200 ease-in-out',
              {
                'bg-dot-secondary text-dot-white': viewMode === 'view',
                'md:hover:bg-dot-secondary': viewMode !== 'view',
              }
            )}
          >
            <RiEyeFill />
          </button>
          <button
            onClick={() => setViewMode('edit')}
            className={classNames(
              'flex w-full flex-row items-center justify-center transition-colors duration-200 ease-in-out ',
              {
                'bg-dot-secondary text-dot-white': viewMode === 'edit',
                'md:hover:bg-dot-secondary': viewMode !== 'edit',
              }
            )}
          >
            <RiPencilFill />
          </button>
          <button
            onClick={() => setViewMode('trends')}
            className={classNames(
              'flex w-full flex-row items-center justify-center transition-colors duration-200 ease-in-out ',
              {
                'bg-dot-secondary text-dot-white': viewMode === 'trends',
                'md:hover:bg-dot-secondary': viewMode !== 'trends',
              }
            )}
          >
            <RiLineChartFill />
          </button>
        </div>
        <div className="grid h-full grow grid-cols-2 gap-3">
          <div className="flex h-full flex-row items-center justify-center gap-2 rounded-md bg-dot-primary px-5 ">
            <RiDatabase2Fill />
            <p className=" text-sm ">
              {new Date(props.artist.createdAt).toLocaleDateString() +
                ' ' +
                new Date(props.artist.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex h-full flex-row items-center justify-center gap-2 rounded-md bg-dot-primary px-5 ">
            <RiUploadCloud2Fill />
            <p className=" text-sm ">
              {new Date(props.artist.lastUpdatedAt).toLocaleDateString() +
                ' ' +
                new Date(props.artist.lastUpdatedAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <button className="flex h-full w-12 flex-row items-center justify-center rounded-md bg-dot-primary transition-colors duration-200 ease-in-out md:hover:bg-dot-rose md:hover:text-dot-white">
          <RiDeleteBin7Line />
        </button>
      </div>
      <OverlayScrollbarsComponent
        element="div"
        options={{ scrollbars: { autoHide: 'scroll' } }}
        className="max-h-full"
        defer
      >
        <div className="h-full w-full ">
          {viewMode === 'view' ? (
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              key={viewMode + props.artist.userId}
              className={classNames(
                'relative flex w-full flex-col overflow-hidden rounded-2xl bg-dot-primary ',
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
              <div
                className={classNames('flex w-full flex-col gap-5 px-5 pb-5')}
              >
                <div className="z-20 flex flex-row items-center justify-between gap-3">
                  <div className="z-20 flex w-full flex-row items-center justify-between gap-3">
                    <div className="flex flex-row items-center gap-3">
                      <ImageLoader
                        alt={'Avatar for ' + props.artist.username}
                        src={props.artist.images.avatar}
                        width={75}
                        height={75}
                        className={'absolute w-16 min-w-16 rounded-xl'}
                      />
                      <div className="w-fit">
                        <p className="max-w-80 flex-row items-center gap-2 truncate text-ellipsis rounded-md font-hubot-sans text-xl">
                          {props.artist.name}
                        </p>
                        <div className="flex flex-row gap-1 text-zinc-400">
                          <Link
                            href={props.artist.url}
                            target="__blank"
                            className="max-w-48 truncate text-ellipsis transition-colors duration-150 ease-in-out md:hover:text-dot-link-primary"
                          >
                            @{props.artist.username}
                          </Link>
                          {props.artist.website && (
                            <>
                              <p>•</p>
                              <Link
                                href={props.artist.website}
                                target="__blank"
                                className="max-w-48 truncate text-ellipsis transition-colors duration-150 ease-in-out md:hover:text-dot-link-primary"
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

                <div className="flex flex-row flex-wrap gap-2">
                  {props.artist.country &&
                    props.artist.country !== undefined && (
                      <div className="flex flex-row items-center gap-2 rounded-md bg-dot-secondary p-2 px-4 text-sm">
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
                              props.artist.country ===
                              country.value.toLocaleLowerCase()
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
                            className="rounded-md bg-dot-secondary p-2 px-4 text-sm transition-colors duration-200 ease-in-out "
                          >
                            {searchTagsArray.map(_tag => {
                              if (
                                tag ===
                                _tag.toLocaleLowerCase().replace(/ /g, '')
                              ) {
                                return _tag;
                              }
                            })}
                          </p>
                        ))}
                      </>
                    )}
                  <p className="rounded-md bg-dot-secondary p-2 px-4 text-sm text-zinc-400 transition-colors duration-200 ease-in-out">
                    Twitter account created{' '}
                    {new Date(props.artist.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : viewMode === 'edit' ? (
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              key={viewMode + props.artist.userId}
              className="flex h-max w-full flex-col gap-5 overflow-hidden rounded-2xl bg-dot-primary p-5"
            >
              <div className="grid grid-cols-2 items-center gap-3">
                <div className="flex flex-col gap-2">
                  <p className="mx-3 text-sm text-zinc-400">Database ID</p>
                  <div className="h-15 flex flex-row items-center gap-3 rounded-3xl bg-dot-secondary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
                    <RiDatabase2Fill className="w-6" />
                    <div className="flex h-full w-full flex-row items-center ">
                      <input
                        value={props.artist.id}
                        disabled={true}
                        className="h-full w-full truncate text-ellipsis bg-transparent text-zinc-400 outline-none placeholder:text-zinc-400"
                      />
                    </div>
                    <button>
                      <RiFileCopyFill />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="mx-3 text-sm text-zinc-400">User ID</p>
                  <div className="h-15 flex flex-row items-center gap-3 rounded-3xl bg-dot-secondary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
                    <RiDatabase2Fill className="w-6" />
                    <div className="flex h-full w-full flex-row items-center">
                      <input
                        value={props.artist.userId}
                        disabled={true}
                        className="h-full w-full truncate text-ellipsis bg-transparent text-zinc-400 outline-none placeholder:text-zinc-400"
                      />
                    </div>
                    <button>
                      <RiFileCopyFill />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 items-center gap-3">
                <div className="flex flex-col gap-2">
                  <p className="mx-3 text-sm text-zinc-400">Username</p>
                  <div className="h-15 flex flex-row items-center gap-3 rounded-3xl bg-dot-secondary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
                    <RiAtLine className="w-6" />
                    <div className="flex h-full w-full flex-row items-center ">
                      <p className="text-zinc-400">twitter.com/</p>
                      <input
                        onChange={e => setEditUsername(e.target.value)}
                        type="text"
                        placeholder={props.artist.username}
                        value={editUsername}
                        className="h-full w-full bg-transparent outline-none placeholder:text-zinc-400"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="mx-3 text-sm text-zinc-400">Name</p>
                  <div className="h-15 flex flex-row items-center gap-3 rounded-3xl bg-dot-secondary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
                    <RiFontFamily className="w-6" />
                    <div className="flex h-full w-full flex-row items-center">
                      <input
                        onChange={e => setEditName(e.target.value)}
                        type="text"
                        placeholder={props.artist.name ?? 'Input name'}
                        value={editName}
                        className="h-full w-full bg-transparent outline-none placeholder:text-zinc-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 items-center gap-3">
                <div className="flex flex-col gap-2">
                  <p className="mx-3 text-sm text-zinc-400">Country</p>
                  <SearchCountries
                    onCountryChanges={setEditCountry}
                    selectedCountry={editCountry}
                    isDashboardComponent={true}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="mx-3 text-sm text-zinc-400">Website</p>
                  <div className="h-15 flex flex-row items-center gap-3 rounded-3xl bg-dot-secondary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
                    <RiLink className="w-6" />
                    <div className="flex h-full w-full flex-row items-center">
                      <input
                        onChange={e => setEditWebsite(e.target.value)}
                        type="text"
                        placeholder={
                          props.artist.website ?? 'Input website url'
                        }
                        value={editWebsite}
                        className="h-full w-full bg-transparent outline-none placeholder:text-zinc-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="mx-3 text-sm text-zinc-400">Tags</p>
                <div className="grid w-full grid-cols-3 place-items-center overflow-hidden rounded-2xl bg-dot-secondary">
                  {searchTagsArray.map((tag, index) => {
                    const row = Math.floor(index / 3);
                    const col = index % 3;
                    const borderClass = [
                      row !== 0 ? 'border-t' : '',
                      row !== 2 ? 'border-b' : '',
                      col !== 0 ? 'border-l' : '',
                      col !== 2 ? 'border-r' : '',
                    ].join(' ');

                    return (
                      <button
                        key={tag}
                        onClick={() => selectedTagsHandler(tag)}
                        className={classNames(
                          'w-full border-dot-primary px-2 py-4 transition-colors duration-200 ease-in-out md:hover:bg-dot-tertiary',
                          borderClass,
                          {
                            'col-span-2 border-r-0':
                              index + 1 === searchTagsArray.length,
                            'bg-dot-tertiary md:hover:bg-dot-quaternary':
                              editTags.includes(
                                tag.replace(/ /g, '').toLocaleLowerCase()
                              ),
                            'md:hover:bg-dot-tertiary': !editTags.includes(
                              tag.replace(/ /g, '').toLocaleLowerCase()
                            ),
                          }
                        )}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="mx-3 text-sm text-zinc-400">Bio</p>
                <div className="flex flex-row items-center gap-3 rounded-3xl bg-dot-secondary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
                  <RiChat4Fill className="w-6" />
                  <div className="flex w-full flex-row items-center">
                    <textarea
                      onChange={e => setEditBio(e.target.value)}
                      placeholder={props.artist.bio ?? 'Input artist bio'}
                      value={editBio}
                      className="h-full max-h-24 w-full bg-transparent outline-none placeholder:text-zinc-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button className="flex w-full flex-row items-center gap-3 rounded-2xl bg-dot-green p-3 px-5 font-semibold text-dot-body">
                  <RiSaveFill />
                  Save changes
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              key={viewMode + props.artist.userId}
              className="flex h-max w-full flex-col gap-5 overflow-hidden rounded-2xl bg-dot-primary p-5"
            >
              {trendsLoading ? (
                <div className="flex w-full flex-row">
                  <div className="h-[340px] w-full animate-pulse rounded-2xl bg-dot-tertiary/50" />
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
                    Sorry, but there is currently no trend data recorded for
                    this artist.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </OverlayScrollbarsComponent>
    </>
  );
};
