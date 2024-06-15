import { ArtistSuggestionCard } from '@/components/ArtistSuggestionsComponents/ArtistSuggestionCard';
import ArtistSuggestionListCardLoader from '@/components/ArtistSuggestionsComponents/ArtistSuggestionListCardLoader';
import { ArtistSuggestionRequest } from '@/components/ArtistSuggestionsComponents/ArtistSuggestionRequest';
import { ArtistSuggestionsSearch } from '@/components/ArtistSuggestionsComponents/ArtistSuggestionsSearch';
import { useSuggestions } from '@/utils/hooks/useSuggestions';
import { ArtistSuggestionProfile } from '@/utils/models/ArtistSuggestionProfile';
import { useRouter } from 'next/router';
import { useState } from 'react';
import RiForbidLine from '~icons/ri/forbid-line';

export default function Suggestions() {
  const router = useRouter();
  const [searchString, setSearchString] = useState<string>('');
  const [openedSuggestionId, setOpenedSuggestionId] = useState<string | null>(
    null
  );
  const [openedSuggestionData, setOpenedSuggestionData] =
    useState<ArtistSuggestionProfile | null>(null);

  const { suggestions, isLoading, isError, updateStatus } =
    useSuggestions(searchString);

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
            {suggestions
              ? suggestions.response.data.map(suggestion => (
                  <ArtistSuggestionCard
                    key={suggestion.requestId}
                    suggestion={suggestion}
                    openedSuggestionId={openedSuggestionId}
                    onOpenedSuggestion={setOpenedSuggestionId}
                    onOpenedSuggestionData={setOpenedSuggestionData}
                  />
                ))
              : [...Array(25)].map((_, index) => (
                  <ArtistSuggestionListCardLoader key={index} />
                ))}
          </div>
        </div>
        <div className="h-full w-full">
          <div className="sticky top-8 h-fit w-full">
            {!openedSuggestionId && !openedSuggestionData ? (
              <div className="flex h-[52px] flex-row items-center gap-3 rounded-xl bg-dot-rose/10 p-3 px-5">
                <RiForbidLine className="text-xl text-dot-rose" />
                Suggestion request not selected.
              </div>
            ) : (
              <ArtistSuggestionRequest
                key={openedSuggestionId!}
                suggestion={openedSuggestionData!}
                onStatusUpdate={updateStatus}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
