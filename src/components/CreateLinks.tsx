import { useMemo } from 'react';
import Link from 'next/link';

export default function CreateLinks({ text }: { text: string }) {
  const regexTags = /@(\w+)(?!\S*\.)/g;
  const regexLinks =
    /https?:\/\/(?:www\.|(?!www))[^\s.]+(?:\.[^\s.]+)+(?:\w\/?)*/gi;

  const parts = useMemo(() => {
    return text.split(
      /(@\w+|https?:\/\/(?:www\.|(?!www))[^\s.]+(?:\.[^\s.]+)+(?:\w\/?)*)/g
    );
  }, [text]);

  return (
    <>
      {parts.map((part, index) => {
        if (regexTags.test(part)) {
          const username = part.slice(1);
          return (
            <Link
              key={`tag-${index}`}
              target="__blank"
              href={`https://x.com/${username}`}
              passHref={true}
              className=" text-dot-link-primary"
            >
              @{username}
            </Link>
          );
        } else if (regexLinks.test(part)) {
          return (
            <Link
              key={`link-${index}`}
              target="__blank"
              href={part}
              passHref={true}
              className=" text-dot-link-primary"
            >
              {part.replace(/^(https?:\/\/)?(www\.)?/, '')}
            </Link>
          );
        }
        return part;
      })}
    </>
  );
}
