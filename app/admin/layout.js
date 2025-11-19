export const metadata = {
  title: 'Admin Dashboard - Ved Varta',
  description: 'Manage blog posts and content',
};

export default function AdminLayout({ children }) {
  return (
    <main className="bg-gradient-to-br from-yellow-200/80 via-yellow-100/80 to-amber-200/80 min-h-screen">
      {children}
    </main>
  );
}
