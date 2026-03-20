import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  onBack: () => void;
}

export function PageHeader({ title, onBack }: PageHeaderProps) {
  return (
    <div className="bg-background px-4 py-6 flex items-center relative">
      <button
        onClick={onBack}
        className="absolute left-4 w-10 h-10 flex items-center justify-center hover:bg-destructive/10 rounded-full transition-colors"
      >
        <ChevronLeft className="w-7 h-7 text-destructive" strokeWidth={3} />
      </button>
      <h1 className="flex-1 text-center text-destructive font-bold text-2xl">
        {title}
      </h1>
    </div>
  );
}
