'use client';

import { useContext } from 'react';
import { Bookmark } from 'lucide-react';
import { PlanContext } from '@/context/PlanContext';

const SaveForLaterButton = ({ id }) => {
    const { saved, saveForLater } = useContext(PlanContext);
    const alreadySaved = saved.includes(id);

    return (
        <button
            onClick={() => saveForLater(id)}
            disabled={alreadySaved}
            className="flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-xs font-bold uppercase text-white transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <Bookmark size={14} />
            {alreadySaved ? 'Saved' : 'Save for later'}
        </button>
    );
};

export default SaveForLaterButton;