import Image from "next/image";

const HomeBunner = () => {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text0center">
          <h1 className="text-4xl md:text-6x1 font-bold text-white mb-4">
            Summer Sale!
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Enjoy discounts on selected items
          </p>
          <p className="text-2xl md:text-5xl text-yellow-400 fold-bold">
            GET 50% OFF
          </p>
        </div>
        {/* image banner */}
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/banner-image.png"
            alt="image banner"
            className="object-contain"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBunner;
