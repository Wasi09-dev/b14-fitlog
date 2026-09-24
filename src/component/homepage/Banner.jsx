import Image from 'next/image';
import React from 'react';
import bannerImg from '@/assets/banner.png'
const Banner = () => {
    return (
        <>
          <div className="rounded-2xl border border-white/10 bg-[#16171b] p-8 md:p-12 mt-[100px] ml-4 mr-4">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                
                <div>
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-lime-400">
                        Workout Library
                    </p>

                    <h1 className="font-['Oswald'] text-5xl font-bold uppercase leading-[0.95] text-white md:text-6xl">
                        Train with intent. Log <br />
                        every set.
                    </h1>

                    <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-400">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                        into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>

                    <button className="mt-6 rounded-md bg-lime-400 px-5 py-3 text-xs font-bold uppercase text-black transition hover:bg-lime-300">
                        Browse Workouts
                    </button>
                </div>

                
                <div className="flex justify-center md:justify-end">
                    <Image
                        src={bannerImg}
                        alt="banner"
                        className="h-auto w-64 object-contain md:w-80"
                        priority
                    />
                </div>
            </div>
          </div>
        </>
    );
};

export default Banner;