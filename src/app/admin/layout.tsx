import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-900 text-white">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 p-6 space-y-6 border-r border-slate-700">

        <h1 className="text-2xl font-bold text-center">
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-3 text-sm">

          <Link
            href="/admin"
            className="hover:bg-slate-700 p-3 rounded-lg transition"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/users"
            className="hover:bg-slate-700 p-3 rounded-lg transition"
          >
            Users
          </Link>

          <Link
            href="/admin/products"
            className="hover:bg-slate-700 p-3 rounded-lg transition"
          >
            Products
          </Link>
          <Link
            href="/admin/products/Add"
            className="hover:bg-slate-700 p-3 rounded-lg transition"
          >
            AddProducts
          </Link>
          <Link
            href="/admin/orders"
            className="hover:bg-slate-700 p-3 rounded-lg transition"
          >
            Orders
          </Link>

          <Link
            href="/admin/reviews"
            className="hover:bg-slate-700 p-3 rounded-lg transition"
          >
            Reviews
          </Link>
          
          <Link
            href="/admin/messages"
            className="hover:bg-slate-700 p-3 rounded-lg transition"
          >
            Messages
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}