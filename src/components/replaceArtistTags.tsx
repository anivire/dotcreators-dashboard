import Link from 'next/link';

export default function replaceTagsWithLinks(text: string) {
  const regex = /\s*@(\w+)(?!\S*\.)/g;
  return text.split(regex).map((part, index) => {
    if (index % 2 === 1) {
      const tag = part;
      return (
        <Link
          key={index}
          target="__blank"
          href={`https://x.com/${tag}`}
          passHref={true}
          className="ml-1 text-dot-link-primary"
        >
          @{tag}
        </Link>
      );
    }
    return part;
  });
}
