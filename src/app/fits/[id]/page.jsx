import { Bookmark, Send } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import AddToPlanButton from '@/component/homepage/AddToPlanButton';


const getfit = async()=> {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog')
 const data = await res.json()
return data;
};
const FitDetailsPage = async ({params}) => {
   const {id} = await params;
   const fitData = await getfit();
   const fit = fitData.find((fit) => fit.id == id);
   console.log(fit,"fit")

    if (!fit) {
        return <div className="p-8 text-white">Workout not found.</div>;
    }

    return (
        <div className="container mx-auto grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
            {/* Left: image */}
            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl">
                <Image
                    src={fit.image}
                    alt={fit.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {/* Right: details */}
            <div>
                <h1 className="font-['Oswald'] text-3xl font-bold uppercase text-white">
                    {fit.name}
                </h1>
                <p className="mt-2 text-sm text-gray-400">{fit.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {fit.muscleGroups.map((muscle) => (
                        <span
                            key={muscle}
                            className="rounded-full bg-lime-400 px-2 py-0.5 text-[10px] font-bold uppercase text-black"
                        >
                            {muscle}
                        </span>
                    ))}
                </div>

                {/* Stats table */}
                <div className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10 bg-[#16171b]">
                    {[
                        ['Equipment', fit.equipment],
                        ['Difficulty', fit.difficulty],
                        ['Sets', fit.sets],
                        ['Reps', fit.reps],
                        ['Duration', `${fit.duration} min`],
                        ['Calories', `${fit.caloriesBurned} kcal`],
                        ['Rating', fit.rating],
                    ].map(([label, value]) => (
                        <div
                            key={label}
                            className="flex items-center justify-between px-4 py-2.5 text-xs"
                        >
                            <span className="uppercase tracking-wide text-gray-400">
                                {label}
                            </span>
                            <span className="font-semibold text-white">{value}</span>
                        </div>
                    ))}
                </div>

                {/* Instructions */}
                <div className="mt-6">
                    <h2 className="font-['Oswald'] text-lg font-bold uppercase text-white">
                        Instructions
                    </h2>
                    <ol className="mt-3 space-y-2 text-sm text-gray-400">
                        {fit.instructions.map((step, i) => (
                            <li key={i} className="flex gap-2">
                                <span className="text-gray-500">{i + 1}.</span>
                                {step}
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Buttons */}
              <div className="mt-6 flex gap-3">
    <AddToPlanButton id={fit.id} />
    <button className="flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-xs font-bold uppercase text-white transition hover:bg-white/5">
        <Bookmark size={14} /> Save for later
    </button>
</div>
            </div>
        </div>
    );
};

export default FitDetailsPage;