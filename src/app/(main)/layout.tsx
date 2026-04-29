import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AmbientBackdrop } from '@/components/AmbientBackdrop';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AmbientBackdrop />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
