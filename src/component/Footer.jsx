import { Dumbbell } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-[#111214] px-6 py-10">
            <div className="container mx-auto flex flex-col items-center justify-between gap-3 text-xs text-gray-400 sm:flex-row">
                <div className="flex items-center gap-2 ml-10">
                    <Dumbbell size={16} className="text-lime-400" />
                    <span className="font-['Oswald'] font-bold tracking-widest text-white ">
                        FITLOG
                    </span>
                </div>

                <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
            </div>
        </footer>
    );
};

export default Footer;