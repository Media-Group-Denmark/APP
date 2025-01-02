
export const articleHero = {
    mediaSize: {
      Figure: {
        figureDesktopHeight: "md:h-[20em]",
        figureMobileHeight: "h-[12em]",
      },
      Image: {
        imgWidth: 800,
        imgHeight: 400,
        quality: 85,
        lazyLoading: false,
        responsive: "(max-width: 768px) 600px, 900px",
      },
    },
    EmblaCarousel: "flex-[0_0_90%]",
    header: { visible: true, category: true },
    footer: { visible: false, journalist: false, time: false },
    fontStyles:
      "text-xl md:text-[2.3em] md:leading-10 font-extrabold rounded-lg line-clamp-3 overflow-hidden text-ellipsis",
    contentHeight: "md:min-h-[180px]",
  };

  export const articleSixGrid = {
    mediaSize: {
      Figure: {
        figureDesktopHeight: "md:h-[8em]",
        figureMobileHeight: "h-[8em]",
      },
      Image: {
        lazyLoading: true,
        responsive: "(max-width: 768px) 600px, 900px",
      },
    },
    EmblaCarousel: "flex-[0_0_300px]",
    header: { visible: true, time: true, journalist: false, category: true },
    fontStyles: "text-md md:text-lg leading-5 md:leading-6 font-bold",
    gridSystem: "md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ",
  };