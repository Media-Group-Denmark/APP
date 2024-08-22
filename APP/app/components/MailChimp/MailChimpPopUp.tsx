"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MailChimpPopUp() {
  const [modalIsOpen, setModalIsOpen] = useState(false); // Start med at have modalen åben
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function subUser() {
    localStorage.setItem("subscribed", "true");
  } 

  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    if (localStorage.getItem("subscribed") === "true") {
      setSubscribed(true);
    } else {
      const timer = setTimeout(() => {
        setModalIsOpen(true);
      }, 20000); // Viser pop-up'en efter 20 sekunder

      return () => clearTimeout(timer); // Rydder timeren, hvis komponenten unmountes
    }
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault(); // Prevent form from submitting traditionally
    console.log("Subscribing", email);
    
    setTimeout(() => { closeModal(); }, 1000);

    try {
        const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      subUser();
      if (res.ok) {
        toast.success("Du er tilmeldt nyhedsbrevet!", { toastId: "success1" });
      } else {
        toast.error("Tilmelding mislykkedes. Prøv venligst igen.", { toastId: "error1" });
      }
    } catch (error) {
      toast.error("Tilmelding mislykkedes. Prøv venligst igen.", { toastId: "error2" });
    }
  };

  return (
    <aside className="relative">
      <ToastContainer />
      {subscribed ? null : (
        <Modal
          isOpen={modalIsOpen}
          contentLabel="Tilmeld dig vores nyhedsbrev" 
          className="fixed inset-0 flex items-center justify-center z-50" // Tailwind CSS for at placere modalen i midten
          overlayClassName="fixed inset-0 bg-black bg-opacity-50" // Tailwind CSS for overlay
        >
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative isolate overflow-clip bg-slate-700 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-24">
              <h1 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {" "}
                Tilmeld dig vores nyhedsbrev.{" "}
              </h1>
              <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
                {" "}
                Modtag de seneste nyheder og opdateringer direkte i din
                indbakke. Vi respekterer dit privatliv og sender kun relevant
                indhold – ingen spam, kun nyttige informationer.{" "}
              </p>
              <form className="mx-auto mt-10 flex max-w-md gap-x-4">
                <label className="sr-only">Email</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                  placeholder="Indtast din email"
                />
                <button
                  type="submit"
                  onClick={handleSubscribe}
                  className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {" "}
                  Tilmeld{" "}
                </button>
              </form>
              <aside className="mx-auto mt-4 flex max-w-md gap-x-4">
                <button
                  type="submit"
                  onClick={() => {
                    subUser();
                    closeModal();
                  }}
                  className="flex-none rounded-md text-slate-300 m-auto  px-3.5 py-2.5 text-sm font-semibold underline-offset-4 underline shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {" "}
                  Tilmeld ikke{" "}
                </button>
              </aside>
              <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
                aria-hidden="true"
              >
                <circle
                  cx="512"
                  cy="512"
                  r="512"
                  fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                  fill-opacity="0.7"
                ></circle>
                <defs>
                  <radialGradient
                    id="759c1415-0410-454c-8f7c-9a820de03641"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(512 512) rotate(90) scale(512)"
                  >
                    <stop stop-color="#00AC82"></stop>
                    <stop
                      offset="1"
                      stop-color="#00AC82"
                      stop-opacity="0"
                    ></stop>
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </Modal>
      )}
    </aside>
  );
}
