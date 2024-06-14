import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { SearchSuggestionsQ } from './SearchSuggestionsContainer/SearchSuggestionsQ';
import { SearchSuggestionsSortFilters } from './SearchSuggestionsContainer/SearchSuggestionsSortFilters';

interface Props {
  onSearchStringChanges: Function;
  searchString: ParsedUrlQuery;
}

export const ArtistSuggestionsSearch: FC<Props> = props => {
  const router = useRouter();

  const [searchQ, setSearchQ] = useState<string>('');
  const [selectedSortFilter, setSelectedSortFilter] = useState<string>('All');
  const [page, setPage] = useState<number>(1);
  const limit = 50;

  useEffect(() => {
    if (!router.isReady) return;

    const query = new URLSearchParams();
    query.append('page', page.toString());
    query.append('limit', limit.toString());
    if (searchQ) query.append('username', searchQ);
    if (selectedSortFilter)
      query.append('requestStatus', selectedSortFilter.toLowerCase());

    router.push(`?${query.toString()}`, undefined, { shallow: true });
    props.onSearchStringChanges(query.toString());
  }, [searchQ, selectedSortFilter, page, limit, router.isReady]);

  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="grid w-full grid-cols-2 gap-3">
          <SearchSuggestionsQ onQChanges={setSearchQ} classNames="h-fit" />
          <SearchSuggestionsSortFilters
            onSortFilterChanges={setSelectedSortFilter}
          />
        </div>
      </section>
    </>
  );
};
