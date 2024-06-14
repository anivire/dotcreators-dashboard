import { ImageLoader } from '../ImageLoader';
import { FC, useEffect, useRef, useState } from 'react';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import { SelectCountry, countryCodes } from '@/utils/CountryCode';
import { searchTagsArray } from '@/utils/Tags';
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
import { ArtistSuggestionProfile } from '@/utils/models/ArtistSuggestionProfile';
import { SearchCountries } from '../ArtistsSearchComponents/SearchContainer/SearchCountries';
import { SearchSuggestionsSortFilters } from './SearchSuggestionsContainer/SearchSuggestionsSortFilters';

interface Props {
  suggestion: ArtistSuggestionProfile;
}

export const ArtistSuggestionRequest: FC<Props> = props => {
  const [viewMode, setViewMode] = useState<'edit' | 'view' | 'trends'>('view');
  const [editCountry, setEditCountry] = useState<SelectCountry>();
  const [editTags, setEditTags] = useState<string[]>(
    props.suggestion.tags ? [...props.suggestion.tags] : []
  );

  useEffect(() => {
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

  return (
    <>
      <div className="mb-5 flex h-10 w-full flex-row items-center gap-5 bg-dot-body text-zinc-400">
        <div className="flex h-full w-full flex-row items-center justify-center gap-2 rounded-md bg-dot-primary px-5 ">
          <RiUploadCloud2Fill />
          <p className="text-sm">
            {new Date(props.suggestion.createdAt).toLocaleDateString() +
              ' ' +
              new Date(props.suggestion.createdAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
      <OverlayScrollbarsComponent
        element="div"
        options={{ scrollbars: { autoHide: 'scroll' } }}
        className="max-h-full"
        defer
      >
        <motion.div
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          key={viewMode + props.suggestion.requestId}
          className="flex h-max w-full flex-col gap-5 rounded-2xl bg-dot-primary p-5"
        >
          <div className="grid grid-cols-2 items-center gap-3">
            <div className="flex flex-col gap-2">
              <p className="mx-3 text-sm text-zinc-400">Request ID</p>
              <div className="h-15 flex flex-row items-center gap-3 rounded-3xl bg-dot-secondary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
                <RiDatabase2Fill className="w-6" />
                <div className="flex h-full w-full flex-row items-center">
                  <input
                    value={props.suggestion.requestId}
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
              <p className="mx-3 text-sm text-zinc-400">Username</p>
              <div className="h-15 flex flex-row items-center gap-3 rounded-3xl bg-dot-secondary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
                <RiAtLine className="w-6" />
                <div className="flex h-full w-full flex-row items-center">
                  <input
                    value={props.suggestion.username}
                    disabled={true}
                    className="h-full w-full truncate text-ellipsis bg-transparent text-zinc-400 outline-none placeholder:text-zinc-400"
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
              <p className="mx-3 text-sm text-zinc-400">Request status</p>
              <SearchSuggestionsSortFilters
                onSortFilterChanges={() => {}}
                classNames="bg-dot-secondary"
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

          <div>
            <button className="flex w-full flex-row items-center gap-3 rounded-2xl bg-dot-green p-3 px-5 font-semibold text-dot-body">
              <RiSaveFill />
              Save changes
            </button>
          </div>
        </motion.div>
      </OverlayScrollbarsComponent>
    </>
  );
};
