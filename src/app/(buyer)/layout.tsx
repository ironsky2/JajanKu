import { Header } from "@/components/buyer/Header";
import { BottomNav } from "@/components/buyer/BottomNav";

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      {/* Centered Mobile Wrapper (up to 640px) */}
      <div className="w-full max-w-[640px] min-h-screen bg-surface flex flex-col relative shadow-xl shadow-slate-200/50">
        <Header />
        <main className="flex-1 pt-16 pb-24 w-full">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
