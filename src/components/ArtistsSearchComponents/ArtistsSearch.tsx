import { SearchTags } from './SearchContainer/SearchTags';
import { SearchCountries } from './SearchContainer/SearchCountries';
import { SearchSortFilters } from './SearchContainer/SearchSortFilters';
import { FC, useEffect, useState } from 'react';
import { SearchQ } from './SearchContainer/SearchQ';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  onSearchStringChanges: Function;
  searchString: ParsedUrlQuery;
}

export const ArtistsSearch: FC<Props> = props => {
  const router = useRouter();

  const [searchQ, setSearchQ] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<{
    title: string;
    value: string;
  }>({ title: '', value: '' });
  const [selectedSortFilter, setSelectedSortFilter] =
    useState<string>('Followers');
  const [page, setPage] = useState<number>(1);
  const limit = 50;

  useEffect(() => {
    if (!router.isReady) return;

    const query = new URLSearchParams();
    query.append('page', page.toString());
    query.append('limit', limit.toString());
    if (searchQ) query.append('username', searchQ);
    if (selectedTags.length > 0) {
      selectedTags.forEach(tag =>
        query.append('tags', tag.toLowerCase().replace(/ /g, ''))
      );
    }
    if (selectedCountry.value)
      query.append('country', selectedCountry.value.toLowerCase());
    if (selectedSortFilter)
      query.append('sortBy', selectedSortFilter.toLowerCase());

    router.push(`?${query.toString()}`, undefined, { shallow: true });
    props.onSearchStringChanges(query.toString());
  }, [
    searchQ,
    selectedTags,
    selectedCountry,
    selectedSortFilter,
    page,
    limit,
    router.isReady,
  ]);

  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="grid w-full grid-cols-2 gap-3">
          <SearchQ onQChanges={setSearchQ} classNames="h-fit" />
          <SearchSortFilters onSortFilterChanges={setSelectedSortFilter} />
        </div>
        <div className="grid w-full grid-cols-2 gap-3">
          <SearchTags onTagsChanged={setSelectedTags} />
          <SearchCountries onCountryChanges={setSelectedCountry} />
        </div>
      </section>
    </>
  );
};
