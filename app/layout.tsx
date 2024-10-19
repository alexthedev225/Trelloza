import type { Metadata } from "next";
import "./globals.css";
import BodyContent from "./components/BodyContent";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export const metadata: Metadata = {
  title: "Organizer App",
  description: "Manage your tasks efficiently and stay organized",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
  return (
    <html lang="en">
      <body
        className={` montserrat-regular antialiased bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-gray-800`}
      >
        <Navbar/>
        <BodyContent childreen={children}/>
        <Footer/>
      </body>
    </html>
  );
}
