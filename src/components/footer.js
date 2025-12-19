import { Globe, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const footerData = {
    brand: {
      name: "NexServ",
      description:
        "We build secure, scalable and modern digital solutions for growing businesses.",
    },
    services: [
      "Web Development",
      "UI / UX Design",
      "Cybersecurity",
      "SEO Optimization",
    ],
    company: [
      { label: "Home", href: "/nexserv" },
      { label: "Blogs", href: "/blogs" },
      { label: "Services", href: "/nexserv#services" },
      { label: "Contact", href: "/nexserv#contact" },
    ],

    contact: [
      { icon: Mail, label: "support@nexserv.com" },
      { icon: Phone, label: "+92 300 1234567" },
      { icon: MapPin, label: "Pakistan" },
    ],
    socials: [
      { icon: Globe, href: "#" },
      { icon: Twitter, href: "#" },
      { icon: Linkedin, href: "#" },
    ],
  };

  return (
    <>
      <footer className="bg-gradient-to-b from-slate-950 to-slate-900 text-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-extrabold text-blue-500 tracking-wide">
                {footerData.brand.name.slice(0, 3)}
                <span className="text-pink-500">
                  {footerData.brand.name.slice(3)}
                </span>
              </h3>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                {footerData.brand.description}
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Services
              </h4>
              <ul className="space-y-2 text-sm">
                {footerData.services.map((service, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer text-slate-400 hover:text-white transition"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                {footerData.company.map((item, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer text-slate-400 hover:text-white transition"
                  >
                    {/* {item} */}
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                {footerData.contact.map(({ icon: Icon, label }, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Icon size={16} className="text-indigo-400" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 h-px w-full bg-slate-800" />

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} NexServ. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {footerData.socials.map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="rounded-full bg-slate-800 p-2 text-slate-300 hover:bg-indigo-500 hover:text-white transition"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
