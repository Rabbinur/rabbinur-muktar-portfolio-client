import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingActions from "@/components/sections/FloatingActions";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full overflow-x-hidden flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
