import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Footer() {
  const handleEmailClick = () => {
    window.location.href = "mailto:contact@codex.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+15551234567";
  };

  const handleLocationClick = () => {
    window.open(
      "https://maps.google.com/?q=123+Tech+Street,+San+Francisco,+CA+94105",
      "_blank"
    );
  };

  const socialLinks = {
    Twitter: "https://twitter.com/codex",
    GitHub: "https://github.com/codex",
    LinkedIn: "https://linkedin.com/company/codex",
    Instagram: "https://instagram.com/codex",
  };

  return (
    <footer className="bg-[#17171c] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="w-10 h-10" />
              <span className="text-xl font-bold text-[#fffffe]">CodeEx</span>
            </Link>
            <p className="text-[#a7a9be] text-sm">
              Empowering businesses through innovative software solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#ff8906] font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Projects", path: "/projects" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-[#a7a9be] hover:text-[#ff8906] transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Modified to link to registration */}
          <div>
            <h3 className="text-[#ff8906] font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Web Development",
                "Mobile Apps",
                "Cloud Solutions",
                "UI/UX Design",
                "Consulting",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/register"
                    className="text-[#a7a9be] hover:text-[#ff8906] transition-colors text-sm flex items-center group"
                  >
                    <span>{service}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#ff8906] font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-[#a7a9be] text-sm">
              <li>
                <button
                  onClick={handleEmailClick}
                  className="hover:text-[#ff8906] transition-colors"
                >
                  contact@codex.com
                </button>
              </li>
              <li>
                <button
                  onClick={handlePhoneClick}
                  className="hover:text-[#ff8906] transition-colors"
                >
                  +1 (555) 123-4567
                </button>
              </li>
              <li>
                <button
                  onClick={handleLocationClick}
                  className="hover:text-[#ff8906] transition-colors text-left"
                >
                  123 Tech Street, Suite 100
                  <br />
                  San Francisco, CA 94105
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[#2e2e36]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#a7a9be] text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} CodeEx. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex space-x-6">
              {[
                { name: "Twitter", icon: "𝕏" },
                { name: "GitHub", icon: "⌨" },
                { name: "LinkedIn", icon: "💼" },
                { name: "Instagram", icon: "📸" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={socialLinks[social.name]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a7a9be] hover:text-[#ff8906] transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
