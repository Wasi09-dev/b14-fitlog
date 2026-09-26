

'use client';

import React, { createContext, useState, useEffect } from 'react';

export const PlanContext = createContext({});

const PlanProvider = ({ children }) => {
    const [plan, setPlan] = useState([]);
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        const storedPlan = localStorage.getItem('plan');
        const storedSaved = localStorage.getItem('saved');
        if (storedPlan) setPlan(JSON.parse(storedPlan));
        if (storedSaved) setSaved(JSON.parse(storedSaved));
    }, []);

    useEffect(() => {
        localStorage.setItem('plan', JSON.stringify(plan));
    }, [plan]);

    useEffect(() => {
        localStorage.setItem('saved', JSON.stringify(saved));
    }, [saved]);

    const addToPlan = (id) => {
        setPlan((prev) => (prev.includes(id) ? prev : [...prev, id]));
    };

    const saveForLater = (id) => {
        setSaved((prev) => (prev.includes(id) ? prev : [...prev, id]));
    };
const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((item) => item !== id));
};

const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((item) => item !== id));
};

const [done, setDone] = useState([]);

useEffect(() => {
    const storedDone = localStorage.getItem('done');
    if (storedDone) setDone(JSON.parse(storedDone));
}, []);

useEffect(() => {
    localStorage.setItem('done', JSON.stringify(done));
}, [done]);

const toggleDone = (id) => {
    setDone((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
};

    const sharedData = {
        plan,
        saved,
        done,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        toggleDone
    };

    return (
        <PlanContext.Provider value={sharedData}>
            {children}
        </PlanContext.Provider>
    );
};

export default PlanProvider;