import { ArtistSuggestionProfile } from '@/utils/models/ArtistSuggestionProfile';
import classNames from 'classnames';
import Link from 'next/link';
import { FC, useCallback, useEffect, useState } from 'react';
import { ImageLoader } from '../ImageLoader';
import RiExternalLinkLine from '~icons/ri/external-link-line';
import RiAddLine from '~icons/ri/add-line';
import RiCloseLine from '~icons/ri/close-line';
import RiCheckLine from '~icons/ri/check-line';
import RiCheckDoubleLine from '~icons/ri/check-double-line';
import RiArrowRightSLine from '~icons/ri/arrow-right-s-line';

interface Props {
  suggestion: ArtistSuggestionProfile;
  openedSuggestionId: string | null;
  onOpenedSuggestionData: (suggestion: ArtistSuggestionProfile | null) => void;
  onOpenedSuggestion: (suggestion: string | null) => void;
}

export const ArtistSuggestionCard: FC<Props> = props => {
  const isSelected = props.openedSuggestionId === props.suggestion.requestId;

  const handleCardClick = useCallback(() => {
    if (isSelected) {
      props.onOpenedSuggestion(null);
      props.onOpenedSuggestionData(null);
    } else {
      props.onOpenedSuggestion(props.suggestion.requestId);
      props.onOpenedSuggestionData(props.suggestion);
    }
  }, [isSelected, props.onOpenedSuggestion, props.suggestion.requestId]);

  useEffect(() => {
    if (props.openedSuggestionId === props.suggestion.requestId) {
      props.onOpenedSuggestion(props.suggestion.requestId);
      props.onOpenedSuggestionData(props.suggestion);
    }
  }, [props.suggestion]);

  return (
    <div className="flex w-full flex-row items-center gap-3">
      <div
        className={classNames(
          'flex h-full flex-row items-center justify-center gap-1.5 rounded-xl p-1 px-3',
          {
            'bg-dot-yellow/10 text-dot-yellow':
              props.suggestion.requestStatus === 'suggested',
            'bg-dot-blue/10 text-dot-blue':
              props.suggestion.requestStatus === 'created',
            'bg-dot-green/10 text-dot-green':
              props.suggestion.requestStatus === 'approved',
            'bg-dot-rose/10 text-dot-rose':
              props.suggestion.requestStatus === 'declined',
          }
        )}
      >
        {props.suggestion.requestStatus === 'suggested' ? (
          <RiAddLine />
        ) : props.suggestion.requestStatus === 'created' ? (
          <RiCheckDoubleLine />
        ) : props.suggestion.requestStatus === 'approved' ? (
          <RiCheckLine />
        ) : props.suggestion.requestStatus === 'declined' ? (
          <RiCloseLine />
        ) : (
          <></>
        )}
      </div>
      <section
        key={props.suggestion.requestId}
        onClick={handleCardClick}
        className={classNames(
          'group/main w-full items-center justify-between gap-5 overflow-hidden rounded-2xl p-2 px-4 transition-transform duration-200 ease-in-out md:hover:cursor-pointer md:hover:bg-dot-secondary',
          {
            'bg-dot-secondary': isSelected,
            'bg-dot-primary': !isSelected,
          }
        )}
      >
        <div className={classNames('flex flex-row items-center gap-4')}>
          <Link
            href={`https://x.com/${props.suggestion.username}`}
            target="_blank"
            className="group relative min-w-max"
          >
            <div className="relative z-10 overflow-hidden rounded-full">
              <ImageLoader
                alt={'Avatar for ' + props.suggestion.username}
                src={props.suggestion.avatarUrl}
                width={35}
                height={35}
                className={classNames(
                  'transition-opacity duration-200 ease-in-out group-hover:opacity-50 group-hover:blur-sm'
                )}
              />
            </div>
            <RiExternalLinkLine className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform text-sm opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100" />
          </Link>
          <div
            className={
              'flex w-full flex-row items-center justify-between gap-4 text-zinc-400'
            }
          >
            <p className={'max-w-48 truncate text-ellipsis '}>
              @{props.suggestion.username}
            </p>

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
                <h1 className="text-dot-white">
                  {new Date(props.suggestion.createdAt).toLocaleDateString() +
                    ' ' +
                    new Date(props.suggestion.createdAt).toLocaleTimeString()}
                </h1>
                <p className="text-zinc-400">suggested at</p>
              </div>
              <RiArrowRightSLine />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
