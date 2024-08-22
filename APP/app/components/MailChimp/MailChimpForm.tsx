'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MailChimpForm() {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault(); 
    console.log('Subscribing', email);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Du er tilmeldt nyhedsbrevet!", { toastId: "success2" });
      } else {
        toast.error("Tilmelding mislykkedes. Prøv venligst igen.", { toastId: "error3" });
      }
    } catch (error) {
      toast.error("Tilmelding mislykkedes. Prøv venligst igen.", { toastId: "error4" });
    }
  };

  return (
    <aside className="mt-10 xl:mt-0">
      <ToastContainer />
          <h2 className="text-sm font-semibold leading-6 ">Tilmeld dig vores nyhedsbrev </h2>
          <p className="mt-2 text-sm leading-6 text-fade_color_light dark:text-fade_color_dark ">De seneste nyheder, artikler og ressourcer, sendt til din indbakke ugentligt.</p>
          <form className="mt-6 sm:flex sm:max-w-md">
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email-address" id="email-address" autoComplete="email" required className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full" placeholder="Skriv din email" />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button onClick={handleSubscribe} type="submit" className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Tilmeld</button>
            </div>
          </form>
        </aside>
  )
}
