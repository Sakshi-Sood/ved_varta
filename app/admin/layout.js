export const metadata = {
  title: 'Admin Dashboard - Ved Varta',
  description: 'Manage blog posts and content',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
