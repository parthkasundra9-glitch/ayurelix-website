import React from "react";
import { motion } from "framer-motion";

export default function Certifications() {
  const certs = [
    {
      title: "100% Organic",
      subtitle: "USDA Certified",
      icon: (
        <svg className="w-10 h-10 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.3 5.3l13.4 13.4M5.3 18.7L18.7 5.3" opacity="0.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L10 14.17l5.59-5.59L17 10l-7 7z" />
        </svg>
      )
    },
    {
      title: "Cruelty Free",
      subtitle: "PETA Approved",
      icon: (
        <svg className="w-10 h-10 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 12 22z" opacity="0.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-1.5 0-3 1.5-3 3.5 0 2.5 3 5.5 3 5.5s3-3 3-5.5C15 7.5 13.5 6 12 6zm-3.5 3c-.8 0-1.5.7-1.5 1.5s1.5 3.5 1.5 3.5m7-5c.8 0 1.5.7 1.5 1.5s-1.5 3.5-1.5 3.5" />
        </svg>
      )
    },
    {
      title: "Heavy Metal Free",
      subtitle: "Lab Tested",
      icon: (
        <svg className="w-10 h-10 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.228a2 2 0 01-1.022-.547l-2.387-2.387a2 2 0 010-2.828l9-9a2 2 0 012.828 0l9 9a2 2 0 010 2.828l-2.387 2.387z" opacity="0.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M4 9h2m12 0h2M4 15h2m12 0h2M9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: "100% Vegan",
      subtitle: "Plant Powered",
      icon: (
        <svg className="w-10 h-10 text-[#B89355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5c0 .83-.67 1.5-1.5 1.5S10 18.33 10 17.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm1.5-9.3c0 .8-.3 1.5-.8 2l-3.2 3.2c-.2.2-.5.3-.8.3h-.4c-.6 0-1-.4-1-1v-.3c0-.3.1-.6.3-.8l3.2-3.2c.4-.4.7-1 .7-1.7 0-1.4-1.1-2.5-2.5-2.5S7.5 6.1 7.5 7.5c0 .6-.4 1-1 1s-1-.4-1-1C5.5 4.5 8 2 11 2s5.5 2.5 5.5 5.5c0 .3-.1.5-.2.7z" opacity="0.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 0 0-10 10c0 5.5 4.5 10 10 10s10-4.5 10-10S17.5 2 12 2zm-1 5a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0V7zm1 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.2 9.5c.5 1.5 2.5 3 6.8 3.5m6.8-3.5c-.5 1.5-2.5 3-6.8 3.5" />
        </svg>
      )
    }
  ];
  return (
    <section id="certifications-section" className="bg-[#fbf9f4] py-12 border-y border-[#B89355]/10 relative overflow-hidden">
      {/* Dynamic line glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B89355]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-[#3C5A44]/5 transition-all duration-300 group-hover:border-[#B89355]/30 group-hover:bg-white group-hover:shadow-[0_8px_30px_rgba(14,26,48,0.06)] group-hover:scale-105 shadow-sm">
                {cert.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#3C5A44] tracking-wide group-hover:text-[#B89355] transition-colors duration-200">
                  {cert.title}
                </h4>
                <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider">
                  {cert.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
