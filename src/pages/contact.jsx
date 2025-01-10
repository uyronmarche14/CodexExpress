import PageTransition from "../components/PageTransition";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  const socialLinks = {
    LinkedIn: "https://linkedin.com/company/codex",
    Twitter: "https://twitter.com/codex",
    Facebook: "https://facebook.com/codex",
    Instagram: "https://instagram.com/codex",
    GitHub: "https://github.com/codex",
  };

  const handleStartProject = () => {
    navigate("/register");
  };

  return (
    <PageTransition>
      <div className="bg-[#0f0e17] text-white font-roboto min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12 text-[#ff8906]">
            Get in Touch
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Social Media Section */}
            <div className="bg-gradient-to-br from-[#17171c] to-[#1a1a20] p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#ff8906]/10">
              <h2 className="text-2xl font-bold mb-8 text-[#ff8906] border-b border-[#ff8906]/20 pb-4">
                Connect With Us
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a7a9be] hover:text-[#ff8906] transition-all duration-300 transform hover:translate-x-1 flex items-center space-x-2"
                  >
                    <span>{platform}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-gradient-to-br from-[#17171c] to-[#1a1a20] p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#ff8906]/10">
              <h2 className="text-2xl font-bold mb-8 text-[#ff8906] border-b border-[#ff8906]/20 pb-4">
                Visit Us
              </h2>
              <a
                href="https://maps.google.com/?q=123+Tech+Street,+San+Francisco,+CA+94105"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086509486927!2d144.9630579153169!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f9f1f1f1f1!2sYour%20Business%20Location!5e0!3m2!1sen!2sau!4v1611811234567!5m2!1sen!2sau"
                  className="w-full h-[300px] rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </a>
            </div>

            {/* Quick Links Section */}
            <div className="bg-gradient-to-br from-[#17171c] to-[#1a1a20] p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#ff8906]/10">
              <h2 className="text-2xl font-bold mb-8 text-[#ff8906] border-b border-[#ff8906]/20 pb-4">
                Quick Links
              </h2>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { name: "Pricing", path: "/pricing" },
                  { name: "Portfolio", path: "/portfolio" },
                  { name: "Services", path: "/services" },
                  { name: "About", path: "/about" },
                ].map((link) => (
                  <a
                    key={link.name}
                    onClick={() => navigate(link.path)}
                    className="text-[#a7a9be] hover:text-[#ff8906] transition-all duration-300 transform hover:translate-x-1 cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <button
                onClick={handleStartProject}
                className="w-full bg-[#ff8906] text-white px-6 py-4 rounded-xl hover:bg-[#f25f4c] transition-all duration-300 transform hover:scale-[1.02] font-bold shadow-lg"
              >
                Start Your Project
              </button>
            </div>

            {/* Support Section */}
            <div className="bg-gradient-to-br from-[#17171c] to-[#1a1a20] p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#ff8906]/10">
              <h2 className="text-2xl font-bold mb-8 text-[#ff8906] border-b border-[#ff8906]/20 pb-4">
                Support & Privacy
              </h2>
              <div className="space-y-6">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-[#ff8906]">
                    Instant Support
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a7a9be] hover:text-[#ff8906] transition-all duration-300 transform hover:translate-x-1"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="https://m.me/codex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a7a9be] hover:text-[#ff8906] transition-all duration-300 transform hover:translate-x-1"
                    >
                      Messenger
                    </a>
                  </div>
                  <div className="mt-4">
                    <a
                      href="mailto:support@codex.com"
                      className="text-[#a7a9be] hover:text-[#ff8906] transition-all duration-300 transform hover:translate-x-1 block"
                    >
                      support@codex.com
                    </a>
                    <a
                      href="tel:+15551234567"
                      className="text-[#a7a9be] hover:text-[#ff8906] transition-all duration-300 transform hover:translate-x-1 block mt-2"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                <p className="text-[#a7a9be] leading-relaxed text-sm">
                  Your privacy matters to us. We ensure your information is
                  protected and only used to enhance your experience with us.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
