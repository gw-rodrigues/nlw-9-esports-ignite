interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}
export function GameBanner({ bannerUrl, title, adsCount }: GameBannerProps) {
  return (
    <a
      href=""
      className="relative rounded-lg overflow-hidden keen-slider__slide animate-show hover:border border-violet-500 hover:saturate-200"
    >
      <img src={bannerUrl} alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-sm text-zinc-300 block">
          {adsCount} anúncios(s)
        </span>
      </div>
    </a>
  );
}
