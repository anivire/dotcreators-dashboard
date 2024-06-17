import { ImageLoader } from '../ImageLoader';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { SelectCountry, countryCodes } from '@/utils/CountryCode';
import { searchTagsArray } from '@/utils/Tags';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { motion } from 'framer-motion';
import RiCloseLine from '~icons/ri/close-line';
import RiCheckLine from '~icons/ri/check-line';
import RiUploadCloud2Fill from '~icons/ri/upload-cloud-2-fill';
import RiDatabase2Fill from '~icons/ri/database-2-fill';
import RiCheckDoubleLine from '~icons/ri/check-double-line';
import RiAtLine from '~icons/ri/at-line';
import RiFileCopyFill from '~icons/ri/file-copy-fill';
import classNames from 'classnames';
import { ArtistSuggestionProfile } from '@/utils/models/ArtistSuggestionProfile';
import { SearchCountries } from '../ArtistsSearchComponents/SearchContainer/SearchCountries';
import RiLoader5Line from '~icons/ri/loader-5-line';
import RiRefreshLine from '~icons/ri/refresh-line';

interface Props {
  suggestion: ArtistSuggestionProfile;
  onStatusUpdate: (
    requestId: string,
    status: 'approved' | 'declined',
    country: string,
    tags: string[]
  ) => Promise<void>;
}

export const ArtistSuggestionRequest: FC<Props> = props => {
  const [isReviewLoading, setIsReviewLoading] = useState<boolean>(false);
  const [editCountry, setEditCountry] = useState<SelectCountry>();
  const [editTags, setEditTags] = useState<string[]>(
    props.suggestion.tags ? [...props.suggestion.tags] : []
  );

  useMemo(() => {
    countryCodes.map(country => {
      if (props.suggestion.country === country.value.toLocaleLowerCase()) {
        setEditCountry(country);
      }
    });
  }, []);

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

  const slideVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const handleStatusUpdate = async (status: 'approved' | 'declined') => {
    setIsReviewLoading(true);
    try {
      await props.onStatusUpdate(
        props.suggestion.requestId,
        status,
        editCountry ? editCountry.value.toLocaleLowerCase() : '',
        editTags ?? null
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsReviewLoading(false);
    }
  };

  return (
    <>
      <div className="mb-5 flex h-[52px] w-full flex-row items-center gap-5 bg-dot-body text-zinc-400">
        <div className="flex h-full w-full flex-row items-center justify-center gap-2 rounded-xl bg-dot-primary px-5 ">
          <RiUploadCloud2Fill />
          <p className="text-sm">
            {new Date(props.suggestion.createdAt).toLocaleDateString() +
              ' ' +
              new Date(props.suggestion.createdAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate="visible"
        key={props.suggestion.requestId}
      >
        <OverlayScrollbarsComponent
          element="div"
          options={{ scrollbars: { autoHide: 'scroll' } }}
          className="max-h-full"
          defer
        >
          <div className="flex h-max w-full flex-col gap-5 rounded-2xl bg-dot-primary p-5">
            {/* {isReviewLoading && (
              <div className="z-20 grid h-full w-full grid-cols-1 place-items-center items-center rounded-2xl bg-dot-primary">
                <p className="flex w-full flex-row items-center justify-center gap-3 rounded-xl bg-dot-secondary px-8 py-3 text-zinc-400">
                  <RiLoader5Line className="animate-spin" /> Loading
                </p>
              </div>
            )} */}
            <div className="grid grid-cols-2 items-center gap-3">
              <div className="flex flex-col gap-2">
                <p className="mx-3 text-sm text-zinc-400">Request ID</p>
                <div className="h-15 flex flex-row items-center gap-3 rounded-3xl bg-dot-secondary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
                  <RiDatabase2Fill className="w-6 min-w-max" />
                  <div className="flex h-full w-full flex-row items-center">
                    <p className="w-60 truncate text-ellipsis bg-transparent text-zinc-400 outline-none placeholder:text-zinc-400">
                      {props.suggestion.requestId}
                    </p>
                  </div>
                  <button>
                    <RiFileCopyFill className="min-w-max" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="mx-3 text-sm text-zinc-400">Username</p>
                <div className="h-15 flex flex-row items-center gap-3 rounded-3xl bg-dot-secondary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
                  <RiAtLine className="w-6 min-w-max" />
                  <div className="flex h-full w-full flex-row items-center">
                    <p className="h-full w-60 truncate text-ellipsis bg-transparent text-zinc-400 outline-none placeholder:text-zinc-400">
                      {props.suggestion.username}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-3">
              <div className="flex flex-col gap-2">
                <p className="mx-3 text-sm text-zinc-400">Country</p>
                <SearchCountries
                  onCountryChanges={setEditCountry}
                  selectedCountry={editCountry}
                  isDashboardComponent={true}
                />
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

            {props.suggestion.requestStatus !== 'approved' &&
            props.suggestion.requestStatus !== 'created' ? (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    handleStatusUpdate('approved');
                  }}
                  className="flex w-full flex-row items-center gap-3 rounded-2xl bg-dot-green p-3 px-5 font-bold text-dot-body"
                >
                  <RiCheckLine className="text-xl" />
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleStatusUpdate('declined');
                  }}
                  className="flex w-full flex-row items-center gap-3 rounded-2xl bg-dot-rose p-3 px-5 font-bold text-dot-body"
                >
                  <RiCloseLine className="text-xl" />
                  Decline
                </button>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-3">
                <div className="col-span-2 flex w-full flex-row items-center gap-3 rounded-2xl bg-dot-blue p-3 px-5 font-bold text-dot-body">
                  <RiCheckDoubleLine className="text-xl" />
                  Reviewed
                </div>
                {/* <button
                  onClick={() => {
                    handleStatusUpdate('approved');
                  }}
                  className="flex w-full flex-row items-center gap-3 rounded-2xl bg-dot-yellow p-3 px-5 font-bold text-dot-body"
                >
                  <RiRefreshLine className="text-xl" />
                  Force info update
                </button> */}
              </div>
            )}
          </div>
        </OverlayScrollbarsComponent>
      </motion.div>
    </>
  );
};
