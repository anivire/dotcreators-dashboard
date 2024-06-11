import { FC, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from '@/components/ArtistsSearchComponents/SearchCountries.module.css';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import RiQuestionMark from '~icons/ri/question-mark';
import { SelectCountry, countryCodes } from '@/utils/CountryCode';
import { useRouter } from 'next/router';

interface Props {
  onCountryChanges: (country: SelectCountry) => void;
  isDashboardComponent?: boolean;
  selectedCountry?: SelectCountry;
  classNames?: string;
}

export const SearchCountries: FC<Props> = props => {
  const [toggleCountries, setToggleCountries] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<SelectCountry>(
    props.selectedCountry ?? {
      title: '',
      value: '',
    }
  );
  const [searchText, setSearchText] = useState<string>('');
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countryCodes.filter(country =>
    country.title.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    const updateCountryFromRouter = () => {
      if (!router.isReady) return;

      const country = router.query.country as string;
      const foundCountry = countryCodes.find(x => x.value === country);
      if (foundCountry) {
        setSelectedCountry(foundCountry);
        props.onCountryChanges(foundCountry);
      }
    };

    updateCountryFromRouter();
  }, [router.isReady, router.query.country, props.onCountryChanges]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggleCountries(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section
      ref={dropdownRef}
      className={classNames('relative rounded-3xl', props.classNames, {})}
    >
      <button
        onClick={() => setToggleCountries(!toggleCountries)}
        className={classNames(
          'h-15 flex w-full flex-row items-center gap-5 bg-dot-primary p-3 px-5 outline-none transition-colors duration-200 ease-in-out',
          {
            'rounded-t-3xl bg-dot-secondary': toggleCountries,
            'rounded-3xl': !toggleCountries,
            'bg-dot-secondary': props.isDashboardComponent,
          }
        )}
      >
        <p>Country</p>
        <div className="flex w-full flex-row items-center justify-end gap-3">
          {selectedCountry.title ? (
            <section
              className={classNames(
                'flex w-fit cursor-pointer flex-row items-center gap-3 rounded-3xl p-1 px-3 text-sm',
                {
                  'bg-dot-tertiary': toggleCountries,
                  'bg-dot-secondary': !toggleCountries,
                }
              )}
            >
              <Image
                alt={selectedCountry.title}
                src={`https://flagcdn.com/${selectedCountry.value.toLowerCase()}.svg`}
                width={24}
                height={20}
                className="h-5 w-7 rounded-md"
              />
              <p className="max-w-20 truncate text-ellipsis">
                {selectedCountry.title}
              </p>
            </section>
          ) : (
            <p
              className={classNames(
                'flex flex-wrap items-center justify-end gap-1 rounded-full p-1 px-3 text-sm text-zinc-400 transition-colors duration-200 ease-in-out',
                {
                  'bg-dot-tertiary': toggleCountries,
                  'bg-dot-secondary': !toggleCountries,
                }
              )}
            >
              Select country...
            </p>
          )}
          <RiArrowDownSLine
            className={classNames(
              'transition-transform duration-200 ease-in-out',
              { 'rotate-180': toggleCountries }
            )}
          />
        </div>
      </button>
      <section
        className={classNames(
          'absolute z-20 flex w-full flex-col gap-2 scroll-smooth rounded-b-3xl border-x border-b border-dot-secondary bg-dot-primary p-3 shadow-xl',
          { hidden: !toggleCountries }
        )}
      >
        <div className="flex flex-row items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Input country..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="w-full rounded-md border-b-2 border-transparent bg-dot-secondary p-2 px-3 text-sm outline-none placeholder:text-zinc-400 focus:outline focus:outline-dot-rose"
          />
        </div>
        <section className="max-h-44 overflow-y-auto overscroll-none">
          {filteredCountries.map(
            (country, index) =>
              country.title !== '' && (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCountry(country);
                    props.onCountryChanges(country);
                    setToggleCountries(false);
                  }}
                  className={classNames(
                    'flex w-fit cursor-pointer flex-row gap-3 rounded-3xl p-2 px-3 text-sm transition-colors duration-200 ease-in-out md:hover:bg-dot-secondary',
                    {
                      'bg-dot-secondary':
                        selectedCountry.value === country.value,
                    }
                  )}
                >
                  <Image
                    alt={country.title}
                    src={`https://flagcdn.com/${country.value.toLowerCase()}.svg`}
                    width={24}
                    height={20}
                    className="h-5 w-7 rounded-md"
                  />
                  <p className="text-left">{country.title}</p>
                </button>
              )
          )}
        </section>
        <button
          onClick={() => {
            setSelectedCountry({ title: '', value: '' });
            props.onCountryChanges({ title: '', value: '' });
          }}
          className="col-span-2 mt-3 w-full rounded-full bg-dot-secondary p-2 px-3 text-sm transition-colors duration-200 ease-in-out md:hover:bg-dot-tertiary"
        >
          Reset country
        </button>
      </section>
    </section>
  );
};
