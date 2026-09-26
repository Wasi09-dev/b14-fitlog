import React from 'react';
import Image from 'next/image';
import { Clock, Flame, Star } from 'lucide-react';
import Link from 'next/link';
const getfit = async()=> {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog')
 const data = await res.json()
return data;
}


const workout = async () => {
const fitData = await getfit();
console.log(fitData,"fitdata")
    return (
        <div className="container mx-auto my-[70px] px-4">
            <h2 className="font-['Oswald'] text-3xl font-bold uppercase text-white">
                The Library
            </h2>
            <p className="mt-1 text-sm text-gray-400">
                Twelve lifts covering every major muscle group.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {fitData.map((fit) => (
                    <Link
                        href={`/fits/${fit.id}`}
                        key={fit.id}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-[#16171b]"
                    >
                        {/* Image */}
                        <div className="relative h-44 w-full">
                            <Image
                                src={fit.image}
                                alt={fit.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>

                        <div className="p-4">
                            {/* Muscle group tags */}
                            <div className="flex flex-wrap gap-2">
                                {fit.muscleGroups.map((muscle) => (
                                    <span
                                        key={muscle}
                                        className="rounded-full bg-lime-400 px-2 py-0.5 text-[10px] font-bold uppercase text-black"
                                    >
                                        {muscle}
                                    </span>
                                ))}
                            </div>

                            {/* Name + equipment */}
                            <h3 className="mt-3 font-['Oswald'] text-lg font-bold uppercase text-white">
                                {fit.name}
                            </h3>
                            <p className="text-xs text-gray-400">{fit.equipment}</p>

                            {/* Stats */}
                            <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-3 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                    <Clock size={13} /> {fit.duration} min
                                </span>
                                <span className="flex items-center gap-1">
                                    <Flame size={13} /> {fit.caloriesBurned} kcal
                                </span>
                                <span className="flex items-center gap-1">
                                    <Star size={13} /> {fit.rating}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
};

export default workout;