export default function ArtistSuggestionListCardLoader() {
  return (
    <section className="flex animate-pulse flex-row gap-3">
      <div className="w-[43px] rounded-2xl bg-dot-primary p-3" />
      <div
        className={
          'flex h-[51px] w-full flex-row items-center justify-between gap-3 overflow-hidden rounded-2xl bg-dot-primary p-2 px-4'
        }
      >
        <div
          className={'flex w-full flex-row items-center justify-between gap-3'}
        >
          <div className={'flex h-10 flex-row items-center gap-3'}>
            <div className="h-[35px] w-[35px] rounded-full bg-dot-secondary" />
            <div className={'h-5 w-48 rounded-full bg-dot-secondary'} />
          </div>
          <div className={'h-5 w-28 rounded-full bg-dot-secondary'} />
        </div>
      </div>
    </section>
  );
}
