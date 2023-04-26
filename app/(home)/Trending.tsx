import Link from "next/link";
import React from "react";

type TrendingCardProps = {
  className?: string;
};

const TrendingCard = ({ className }: TrendingCardProps) => {
  return (
    <Link
      className={`${className} sm:mt-0 sm:h-auto relative mt-7 block w-full h-96 hover:opacity-70 hover:duration-500 hover:transition-opacity `}
      //   href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}
      href="/"
    >
      <div className="z-0 relative w-full h-full bg-wh-500">image</div>
      {/* class for gradient over everything */}
      <div className="absolute z-1 top-0 left-0 w-full h-full bg-gradient-gradual"></div>
      <div className="absolute z-2 bottom-0 left-0 p-3">
        <h4 className="inline-block px-5 py-1 font-semibold bg-accent-orange text-wh-900">
          category
        </h4>
        <div className="text-wh-100 mt-2">post title</div>
      </div>
    </Link>
  );
};

type Props = {};

const Trending = (props: Props) => {
  return (
    <section className="pt-3 pb-10">
      <div className="flex items-center gap-3">
        <div className="bg-wh-900 py-2 px-8 text-wh-10 text-sm font-bold">
          TRENDING
        </div>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, aliquam
          et!
        </p>
      </div>
      {/* flex try */}
      {/* <div className="flex justify-between gap-3 my-3">
        <div className="basis-1/2 bg-wh-500 h-96"></div>
        <div className="flex flex-col basis-1/2 gap-3 h-96">
            <div className="basis-1/2 bg-wh-500"></div>
            <div className="flex basis-1/2 gap-3">
                <div className="basis-1/2 bg-wh-500"></div>
                <div className="basis-1/2 bg-wh-500"></div>
            </div>
        </div>
      </div> */}
      {/* grid try */}
      <div className="sm:grid gap-5 grid-cols-4 grid-rows-2 sm:h-[600px] my-3">
        <TrendingCard className="col-span-2 row-span-2 bg-wh-500" />
        <TrendingCard className="col-span-2 row-span-1 bg-wh-500" />
        <TrendingCard className="col-span-1 row-span-1 bg-wh-500" />
        <TrendingCard className="col-span-1 row-span-1 bg-wh-500" />
      </div>
      <p className="text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic ratione
        eveniet veniam eius ut, ipsa porro blanditiis facilis rerum beatae unde
        nemo. Vitae alias, dicta odit est eos doloremque distinctio!
      </p>
    </section>
  );
};

export default Trending;
