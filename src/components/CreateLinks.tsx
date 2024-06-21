import { useMemo } from 'react';
import Link from 'next/link';

export default function CreateLinks({ text }: { text: string }) {
  const regexTags = /(^|\s)(@\w+)/g;
  const regexLinks = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
  const regexEmail = /[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+/g;

  const parts = useMemo(() => {
    return text.split(
      /(https?:\/\/[^\s/$.?#].[^\s]*|@\w+|[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+)/g
    );
  }, [text]);

  return (
    <>
      {parts.map((part, index) => {
        if (regexEmail.test(part)) {
          return part;
        } else if (regexTags.test(part)) {
          const username = part.trim().slice(1);
          return (
            <Link
              key={`tag-${index}`}
              target="__blank"
              href={`https://x.com/${username}`}
              passHref={true}
              className="text-dot-link-primary"
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
              className="text-dot-link-primary"
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
