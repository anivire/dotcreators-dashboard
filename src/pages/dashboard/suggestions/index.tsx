import { ArtistSuggestionCard } from '@/components/ArtistSuggestionsComponents/ArtistSuggestionCard';
import { ArtistSuggestionRequest } from '@/components/ArtistSuggestionsComponents/ArtistSuggestionRequest';
import { ArtistSuggestionsSearch } from '@/components/ArtistSuggestionsComponents/ArtistSuggestionsSearch';
import ArtistListCardLoader from '@/components/ArtistsSearchComponents/ArtistListCardLoader';
import { ArtistSuggestionProfile } from '@/utils/models/ArtistSuggestionProfile';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import RiForbidLine from '~icons/ri/forbid-line';

export default function Suggestions() {
  const router = useRouter();
  const [searchString, setSearchString] = useState<string>('');
  const [openedSuggestionId, setOpenedSuggestionId] = useState<string | null>(
    null
  );
  const [openedSuggestionData, setOpenedSuggestionData] =
    useState<ArtistSuggestionProfile | null>(null);

  const { data: suggestionsData, error } = useSWR<{
    status: string;
    response: { data: ArtistSuggestionProfile[]; has_next: boolean };
  }>(
    `${process.env.API_URL}suggestions?${searchString}`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  return (
    <>
      <div className="grid h-fit grid-cols-2 gap-8">
        <div className="flex w-full flex-col gap-8">
          <div className="">
            <ArtistSuggestionsSearch
              searchString={router.query}
              onSearchStringChanges={setSearchString}
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            {suggestionsData
              ? suggestionsData.response.data.map((suggestion, index) => (
                  <ArtistSuggestionCard
                    key={suggestion.requestId}
                    suggestion={suggestion}
                    openedSuggestionId={openedSuggestionId}
                    onOpenedSuggestion={setOpenedSuggestionId}
                    onOpenedSuggestionData={setOpenedSuggestionData}
                  />
                ))
              : [...Array(25)].map((_, index) => (
                  <ArtistListCardLoader key={index} />
                ))}
          </div>
        </div>
        <div className="h-full w-full">
          <div className="sticky top-8 h-fit w-full overflow-hidden">
            {!openedSuggestionId && !openedSuggestionData ? (
              <div className="flex flex-row items-center gap-3 rounded-xl bg-dot-rose/10 p-3 px-5 text-sm ">
                <RiForbidLine className="text-dot-rose" />
                Suggestion request not selected.
              </div>
            ) : (
              <ArtistSuggestionRequest
                key={openedSuggestionId!}
                suggestion={openedSuggestionData!}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
