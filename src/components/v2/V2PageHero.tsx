/** V2PageHero — label, Montserrat headline, one-line intro. Used on inner pages. */
export function V2PageHero({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <section className="px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-20 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <p className="t-eyebrow text-gray-500">{label}</p>
        <h1 className="mt-5 max-w-4xl text-balance t-display text-white">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl t-lead text-gray-400">{intro}</p>}
      </div>
    </section>
  );
}
