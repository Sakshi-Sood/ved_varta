import Image from 'next/image';
import Link from 'next/link';

export default function AdminLoginLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {children}
    </div>
  );
}
