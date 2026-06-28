import React from "react";
import { Link } from "react-router-dom";

export default function PolicySidebar({ active }) {
  const links = [
    { id: "shipping", label: "Shipping & Delivery", path: "/shipping-delivery" },
    { id: "refund", label: "Refund Policy", path: "/refund-policy" },
    { id: "terms", label: "Terms of Service", path: "/terms-of-service" },
    { id: "privacy", label: "Privacy Policy", path: "/privacy-policy" }
  ];

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-8 shrink-0">
      {/* Policy Navigation */}
      <div className="bg-[#fbf9f4]/80 border border-[#1A2B49]/10 rounded-3xl p-6 backdrop-blur-md shadow-sm">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#B89355] font-bold mb-4 px-2">Legal Documents</h3>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                active === link.id
                  ? "bg-[#1A2B49] text-white shadow-md shadow-[#1A2B49]/20"
                  : "text-slate-600 hover:bg-[#1A2B49]/5 hover:text-[#1A2B49]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Compliance & Trust Card */}
      <div className="bg-[#fbf9f4]/80 border border-[#1A2B49]/10 rounded-3xl p-6 backdrop-blur-md shadow-sm space-y-4">
        <h4 className="text-xs uppercase tracking-[0.2em] text-[#B89355] font-bold">Compliance & Licensing</h4>
        
        <div className="space-y-3.5 text-xs font-semibold text-slate-600">
          <div className="flex flex-col gap-1 border-b border-[#1A2B49]/5 pb-2">
            <span className="text-[#1A2B49] uppercase text-[10px] tracking-wider font-bold">Registered Entity</span>
            <span>Ayurelix Private Limited</span>
          </div>
          <div className="flex flex-col gap-1 border-b border-[#1A2B49]/5 pb-2">
            <span className="text-[#1A2B49] uppercase text-[10px] tracking-wider font-bold">AYUSH Manufacturing Lic.</span>
            <span className="font-mono text-slate-700">AYU-MFG/KA-48201</span>
          </div>
          <div className="flex flex-col gap-1 border-b border-[#1A2B49]/5 pb-2">
            <span className="text-[#1A2B49] uppercase text-[10px] tracking-wider font-bold">FSSAI License No.</span>
            <span className="font-mono text-slate-700">11226000000492</span>
          </div>
          <div className="flex flex-col gap-1 pb-1">
            <span className="text-[#1A2B49] uppercase text-[10px] tracking-wider font-bold">GSTIN Registration</span>
            <span className="font-mono text-slate-700">29AAICA8829G1ZN</span>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer Card */}
      <div className="bg-[#B89355]/5 border border-[#B89355]/20 rounded-3xl p-6 shadow-sm">
        <h4 className="text-xs uppercase tracking-[0.2em] text-[#B89355] font-bold mb-2">FDA & AYUSH Disclaimer</h4>
        <p className="text-[11px] leading-relaxed text-slate-600 font-medium italic">
          "The formulations and statements on this site have not been evaluated by the FDA or AYUSH. Our products are natural wellness supplements and are not intended to diagnose, treat, cure, or prevent any illness or health condition. Consult your doctor before starting any regimen."
        </p>
      </div>
    </aside>
  );
}
