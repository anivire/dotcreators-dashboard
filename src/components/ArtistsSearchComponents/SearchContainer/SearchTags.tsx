import classNames from 'classnames';
import { FC, useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import RiVipDiamondFill from '~icons/ri/vip-diamond-fill';
import RiHeartFill from '~icons/ri/heart-fill';
import RiCodeFill from '~icons/ri/code-fill';
import RiInputMethodFill from '~icons/ri/input-method-fill';
import RiSquareFill from '~icons/ri/square-fill';
import RiShape2Fill from '~icons/ri/shape-2-fill';
import RiBox3Fill from '~icons/ri/box-3-fill';
import RiFilmLine from '~icons/ri/film-line';
import { searchTagsArray } from '@/utils/Tags';

interface Props {
  onTagsChanged: (tags: string[]) => void;
  classNames?: string;
}

const tagIcons: Record<string, JSX.Element> = {
  Commissions: <RiVipDiamondFill className="text-zinc-400" />,
  'Work offers': <RiVipDiamondFill className="text-zinc-400" />,
  NSFW: <RiHeartFill className="text-zinc-400" />,
  Pixelart: <RiSquareFill className="text-zinc-400" />,
  Textmode: <RiInputMethodFill className="text-zinc-400" />,
  Lowpoly: <RiShape2Fill className="text-zinc-400" />,
  Voxel: <RiBox3Fill className="text-zinc-400" />,
  Gamedev: <RiCodeFill className="text-zinc-400" />,
  Animation: <RiFilmLine className="text-zinc-400" />,
};

export const SearchTags: FC<Props> = props => {
  const [toggleTag, setToggleTag] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!router.isReady) return;

    let tags = router.query.tags;
    if (typeof tags === 'string') {
      tags = [tags];
    }

    if (tags && tags.length > 0) {
      const formattedTags = tags.map(tag =>
        tag === 'workoffers'
          ? 'Work offers'
          : tag.charAt(0).toUpperCase() + tag.slice(1)
      );
      setSelectedTags(formattedTags);
      props.onTagsChanged(formattedTags);
    }
  }, [router.isReady, router.query.tags, props.onTagsChanged]);

  const handleTagSelection = useCallback(
    (tag: string) => {
      const updatedTags = selectedTags.includes(tag)
        ? selectedTags.filter(item => item !== tag)
        : [...selectedTags, tag];
      setSelectedTags(updatedTags);
      props.onTagsChanged(updatedTags);
    },
    [selectedTags, props.onTagsChanged]
  );

  const resetTags = () => {
    setSelectedTags([]);
    props.onTagsChanged([]);
    setToggleTag(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggleTag(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section ref={dropdownRef} className="relative">
      <button
        onClick={() => setToggleTag(!toggleTag)}
        className={classNames(
          'grid w-full grid-cols-1 items-center justify-between gap-3 p-3 px-5 outline-none',
          props.classNames,
          {
            'rounded-t-3xl bg-dot-secondary': toggleTag,
            'rounded-3xl bg-dot-primary': !toggleTag,
            'p-5': selectedTags.length !== 0,
          }
        )}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <p>Tags</p>
          <div className="flex flex-row items-center gap-3">
            <p
              className={classNames(
                'flex flex-wrap items-center justify-end gap-1 rounded-full p-1 px-3 text-sm text-zinc-400 transition-colors duration-200 ease-in-out',
                {
                  'bg-dot-secondary': !toggleTag,
                  'bg-dot-tertiary': toggleTag,
                  hidden: selectedTags.length !== 0,
                }
              )}
            >
              {selectedTags.length === 0 && 'Select tags...'}
            </p>
            <RiArrowDownSLine
              className={classNames(
                'transition-transform duration-200 ease-in-out',
                { 'rotate-180': toggleTag }
              )}
            />
          </div>
        </div>
        <div
          className={classNames(
            'flex w-full flex-wrap items-start justify-start gap-2',
            { hidden: selectedTags.length === 0 }
          )}
        >
          {selectedTags.map((tag, index) => (
            <span
              key={index}
              className={classNames(
                'flex flex-row items-center justify-center gap-1.5 rounded-full p-1 px-3 text-sm transition-colors duration-200 ease-in-out',
                {
                  'bg-dot-secondary text-[#fdfdfd]': selectedTags.length > 0,
                  'bg-dot-tertiary': toggleTag,
                  'bg-dot-secondary': !toggleTag,
                }
              )}
            >
              {tagIcons[tag]}
              {tag}
            </span>
          ))}
        </div>
      </button>
      <section
        className={classNames(
          'absolute z-20 grid w-full grid-cols-2 flex-wrap place-items-start gap-1 rounded-b-3xl border-x border-b border-dot-secondary bg-dot-primary p-3 text-sm shadow-xl',
          { hidden: !toggleTag }
        )}
      >
        {searchTagsArray.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagSelection(tag)}
            className={classNames(
              'flex w-full flex-row items-center justify-start gap-1.5 rounded-full bg-dot-primary p-2 px-3 transition-colors duration-200 ease-in-out md:hover:bg-dot-secondary',
              { 'bg-dot-secondary': selectedTags.includes(tag) }
            )}
          >
            {tagIcons[tag]}
            {tag}
          </button>
        ))}
        <button
          onClick={resetTags}
          className="col-span-2 mt-3 w-full rounded-full bg-dot-secondary p-2 px-3 text-sm transition-colors duration-200 ease-in-out md:hover:bg-dot-tertiary"
        >
          Reset tags
        </button>
      </section>
    </section>
  );
};
