import Link from 'next/link';
import React, { useEffect} from 'react';
import { gsap } from 'gsap';

export default function HomeHeader() {
     // Nom de l'application
  const appName = (<div className='text-white md:text-6xl text-5xl'>Trelloza</div>);

  // Texte à animer
  const welcomeText = (
    <div className='flex justify-center items-center md:flex-row flex-col md:space-x-7 space-y-3 md:space-y-0'>
      <p className="text-2xl md:text-3xl font-light">Welcome to</p>
      {appName}
    </div>
  );


  useEffect(() => {
    // Animation de chaque mot avec GSAP
    const words = document.querySelectorAll('.word');
    words.forEach((word, index) => {
      gsap.to(word, {
        y: -30,
        opacity: 1,
        duration: 0.5,
        delay: index * 0.3, // Délai pour créer l'effet en cascade
        ease: 'bounce.out',
      });
    });

    // Animation du bouton Get Started
    const button = document.querySelector('.get-started-button');
    if (button) {
      gsap.fromTo(button, 
        { scale: 1, opacity: 0 }, 
        { scale: 1.1, opacity: 1, duration: 0.5, ease: "bounce.out", repeat: -1, yoyo: true }
      );
    }
  }, []);
  return (
    <header className="text-white">
       
    <div className="container mx-auto px-4 text-center mt-12">
      <h1 className="md:text-5xl text-4xl font-extrabold">
        {welcomeText}
      </h1>
      <p className="text-xl font-light mt-4">Manage your tasks efficiently and stay organized!</p>
    
    </div>
    {/* Boutons d'inscription et de connexion */}
    <div className="text-center mt-8">
      <Link href="/auth/register">
        <span className=" get-started-button inline-block px-14 py-3 text-lg font-semibold text-white bg-pink-600 rounded-full transition duration-300 hover:bg-pink-700 ml-4 shadow-lg cursor-pointer">
          Get Started
        </span>
      </Link>
    </div>
  </header>
  )
}
