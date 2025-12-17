import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="ml-64 bg-gradient-to-br from-green-300 to-green-900 min-h-screen">
      <AdminSidebar />

      <main className="p-10">
        {children}
      </main>
    </div>
  );
}
