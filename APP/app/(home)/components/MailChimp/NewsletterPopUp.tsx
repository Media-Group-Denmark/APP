"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/app/(admin)/components/shadcn/ui/button";
import { Input } from "@/app/(admin)/components/shadcn/ui/input";
import { Label } from "@/app/(admin)/components/shadcn/ui/label";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function subUser() {
    localStorage.setItem("subscribedNewsletter", "true");
  }

  useEffect(() => {
    if (localStorage.getItem("subscribedNewsletter") === "true") {
      setIsOpen(false);
    } else {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setIsSubmitted(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 5000);
      } else {
        setIsSubmitted(false);
      }
    } catch (error) {
      console.log("Tilmelding mislykkedes. Prøv venligst igen.", {
        toastId: "error2",
      });
    }
    setIsSubmitted(true);
  };
  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-second_color_light dark:bg-second_color_dark rounded-lg shadow-xl w-full max-w-md p-6 relative animate-in fade-in duration-300">
        <button
          onClick={() => {
            setIsOpen(false), subUser();
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Luk</span>
        </button>
        <h2 className="text-xl font-bold mb-4">
          Vind 2x SuperGavekort <b className="italic">på 400 kr.</b>{" "}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          <img
            className="mb-2"
            width={400}
            height={200}
            alt="GoGift har markedets største sortiment af produkter fra kendte brands, butikskæder og spændende oplevelser - Med SuperGavekortet får du adgang til det hele!"
            src="/img/SuperGavekort.jpg"
          />
          <span className=" text-sm">
            GoGift har markedets største sortiment af produkter fra kendte
            brands, butikskæder og spændende oplevelser - Med SuperGavekortet
            får du adgang til det hele!
          </span>
          <br />
          <br />
          <b>
            Tilmeld dig vores nyhedsbrev og deltag i lodtrækningen om 2x
            SuperGavekort på 400 kr.
          </b>
          <br />
          De 2 vindere bliver fundet og kontaktet i Marts 2025!
        </p>
        {isSubmitted ? (
          <div className="text-green-600 font-semibold">
            Tak for din tilmelding!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="bg-white"
                placeholder="Skriv din email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Tilmeld
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
