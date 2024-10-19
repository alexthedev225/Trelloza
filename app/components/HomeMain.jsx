import Link from 'next/link';
import React from 'react';
import { FaTasks, FaCalendarAlt, FaStickyNote, FaCog } from 'react-icons/fa';

export default function HomeMain() {
  return (
    <main className="flex-1 container mx-auto lg:px-40 px-4 py-10 mb-6">
      <section className="">
        <h2 className="text-white text-4xl font-bold mb-6 underline underline-offset-4 decoration-white playfair-display">
          Explore your options quickly
        </h2>
        <p className="text-lg font-light text-gray-200 mb-6">
          Discover the essential tools to help you stay organized and productive.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Link href="/tasks">
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-10  text-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <FaTasks className="text-4xl mb-4 text-white" />
              <span className="text-xl font-semibold">Tasks</span>
            </div>
          </Link>
          <Link href="/calendar">
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-10  text-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <FaCalendarAlt className="text-4xl mb-4 text-white" />
              <span className="text-xl font-semibold">Calendar</span>
            </div>
          </Link>
          <Link href="/notes">
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-10  text-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <FaStickyNote className="text-4xl mb-4 text-white" />
              <span className="text-xl font-semibold">Notes</span>
            </div>
          </Link>
          <Link href="/settings">
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-10  text-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <FaCog className="text-4xl mb-4 text-white" />
              <span className="text-xl font-semibold">Settings</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
