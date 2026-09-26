'use client';

import { useContext, useState, useEffect } from 'react';
import { PlanContext } from '@/context/PlanContext';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Flame, Star, Check, X } from 'lucide-react';


const MyPlanPage = () => {
    const { plan, saved, done, removeFromPlan, removeFromSaved, toggleDone } =
        useContext(PlanContext);
    const [allFits, setAllFits] = useState([]);
    const [activeTab, setActiveTab] = useState('plan');

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
            const data = await res.json();
            setAllFits(data);
        };

        fetchData();
    }, []);
     const planItems = allFits.filter((fit) => plan.includes(fit.id));
    const savedItems = allFits.filter((fit) => saved.includes(fit.id));
    const activeItems = activeTab === 'plan' ? planItems : savedItems;

    const totalMinutes = planItems.reduce((sum, fit) => sum + fit.duration, 0);
    const totalCalories = planItems.reduce((sum, fit) => sum + fit.caloriesBurned, 0);

    return (
        <div className="container mx-auto p-8">
            <h1 className="font-['Oswald'] text-3xl font-bold uppercase text-white">
                My Plan
            </h1>
            <p className="mt-1 text-sm text-gray-400">
                Cap of five lifts for today. Finish them, then load more.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-white/10 bg-[#16171b] p-6">
                <div>
                    <p className="text-xs uppercase text-gray-400">Exercises</p>
                    <p className="mt-1 text-2xl font-bold text-lime-400">{planItems.length}</p>
                </div>
                <div>
                    <p className="text-xs uppercase text-gray-400">Minutes</p>
                    <p className="mt-1 text-2xl font-bold text-white">{totalMinutes}</p>
                </div>
                <div>
                    <p className="text-xs uppercase text-gray-400">Calories</p>
                    <p className="mt-1 text-2xl font-bold text-white">{totalCalories}</p>
                </div>
            </div>

            <div className="mt-6 flex gap-2 rounded-lg bg-[#16171b] p-1">
                <button
                    onClick={() => setActiveTab('plan')}
                    className={`rounded-md px-4 py-2 text-xs font-bold uppercase transition ${
                        activeTab === 'plan' ? 'bg-white text-black' : 'text-gray-400'
                    }`}
                >
                    Today&apos;s Plan
                </button>
                <button
                    onClick={() => setActiveTab('saved')}
                    className={`rounded-md px-4 py-2 text-xs font-bold uppercase transition ${
                        activeTab === 'saved' ? 'bg-white text-black' : 'text-gray-400'
                    }`}
                >
                    Saved
                </button>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-[#16171b]">
                {activeItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 p-16 text-center">
                        <p className="text-sm font-bold uppercase text-white">Nothing here yet</p>
                        <p className="max-w-xs text-xs text-gray-400">
                            Browse the library and add a lift to get today moving.
                        </p>
                        <Link
                            href="/"
                            className="rounded-md bg-lime-400 px-5 py-2.5 text-xs font-bold uppercase text-black transition hover:bg-lime-300"
                        >
                            Go to workouts
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-white/10">
                        {activeItems.map((fit) => {
                            const isDone = done.includes(fit.id);
                            return (
                                <div key={fit.id} className="flex items-center gap-4 p-4">
                                    <div className="relative h-14 w-14 overflow-hidden rounded-lg">
                                        <Image
                                            src={fit.image}
                                            alt={fit.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3
                                            className={`text-sm font-bold uppercase ${
                                                isDone ? 'text-gray-500 line-through' : 'text-white'
                                            }`}
                                        >
                                            {fit.name}
                                        </h3>
                                        <p className="text-xs text-gray-400">{fit.equipment}</p>
                                        <div className="mt-1 flex items-center gap-3 text-[11px] text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} /> {fit.duration} min
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Flame size={12} /> {fit.caloriesBurned} kcal
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Star size={12} /> {fit.rating}
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/fits/${fit.id}`}
                                        className="rounded-md border border-white/20 px-4 py-2 text-xs font-bold uppercase text-white transition hover:bg-white/5"
                                    >
                                        View Details
                                    </Link>

                                    {activeTab === 'plan' && (
                                        <button
                                            onClick={() => toggleDone(fit.id)}
                                            className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-xs font-bold uppercase transition ${
                                                isDone
                                                    ? 'bg-white/10 text-gray-400'
                                                    : 'bg-lime-400 text-black hover:bg-lime-300'
                                            }`}
                                        >
                                            <Check size={13} />
                                            {isDone ? 'Done' : 'Mark as Done'}
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            activeTab === 'plan'
                                                ? removeFromPlan(fit.id)
                                                : removeFromSaved(fit.id)
                                        }
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPlanPage;