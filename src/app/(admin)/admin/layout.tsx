import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center text-slate-100">
      <div className="w-full max-w-[640px] min-h-screen bg-slate-900 flex flex-col relative shadow-2xl pb-24">
        {children}
        <AdminNav />
      </div>
    </div>
  );
}
