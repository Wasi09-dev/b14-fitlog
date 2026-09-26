'use client';

import { useContext } from 'react';
import { PlanContext } from '@/context/PlanContext';

const AddToPlanButton = ({ id }) => {
    const { plan, addToPlan } = useContext(PlanContext);

    const alreadyAdded = plan.includes(id);

    return (
        <button
            onClick={() => addToPlan(id)}
            disabled={alreadyAdded}
            className="flex items-center gap-2 rounded-md bg-lime-400 px-5 py-3 text-xs font-bold uppercase text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {alreadyAdded ? 'Added to Plan' : 'Add to today\'s plan'}
        </button>
    );
};

export default AddToPlanButton;