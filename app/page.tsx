"use client";

import backgroundImage from "@/app/public/images/bg.jpg";
import HomeHeader from "@/app/components/HomeHeader"
import HomeMain from "@/app/components/HomeMain"

const HomePage: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center "
    >
     <HomeHeader/>
     <HomeMain/>
    </div>
  );
};

export default HomePage;
