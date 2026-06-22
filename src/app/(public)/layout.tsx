import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingActions from "@/components/sections/FloatingActions";


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <FloatingActions />
    </>
  );
}
