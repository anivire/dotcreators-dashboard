export default function ArtistListCardLoader() {
  return (
    <>
      <section
        className={
          'flex h-[51px] w-full animate-pulse flex-row items-center justify-between gap-3 overflow-hidden rounded-2xl bg-dot-primary p-2 px-5'
        }
      >
        <div className={'flex flex-row items-center gap-3'}>
          <div className="bg-dot-secondary h-[35px] w-[35px] rounded-full" />
          <div className={'flex h-10 flex-row items-center gap-3'}>
            <div className={'bg-dot-secondary h-5 w-48 rounded-full'} />
            <div className={'bg-dot-secondary h-5 w-28 rounded-full'} />
          </div>
        </div>
      </section>
    </>
  );
}
