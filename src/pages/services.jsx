import { services } from "../data/services.json";
import logo from "../assets/images/logo.png";
import PageTransition from "../components/PageTransition";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom"; // Add this import

// Color theme matching your app
const backgroundColors = [
  "bg-[#1a1a25]",
  "bg-[#17171d]",
  "bg-[#14141b]",
  "bg-[#101017]",
  "bg-[#1c1c27]",
];

export default function Services() {
  const navigate = useNavigate(); // Add this hook

  const handleViewClick = () => {
    navigate("/register"); // Navigate to registration page
  };

  return (
    <PageTransition>
      <div className="flex justify-center items-center py-16 animate-fadeIn relative font-roboto">
        {/* Page-wide background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ff8906] rounded-full blur-[150px] opacity-10" />

        <div className="max-w-7xl w-full px-4 md:px-8 lg:px-12 relative">
          {/* Enhanced Header Section */}
          <div className="mb-20 relative">
            {/* Logo and Title */}
            <div className="flex flex-col items-center justify-center relative">
              <img
                src={logo}
                alt="CodeEx Logo"
                className="w-24 h-24 mb-6 animate-bounce-slow hover:scale-110 transition-transform duration-300"
              />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#ffffff] text-center mb-6 animate-slideIn delay-100">
                Codex Express Services
              </h1>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-20 h-[3px] bg-[#ff8906]" />
                <span className="text-[#a7a9be] text-xl font-medium">
                  Professional Solutions
                </span>
                <span className="w-20 h-[3px] bg-[#ff8906]" />
              </div>
              <p className="text-[#a7a9be] text-center max-w-3xl text-lg md:text-xl mb-12 animate-fadeIn delay-100">
                Discover our comprehensive range of development services
                designed to transform your ideas into reality. Our expert team
                delivers cutting-edge solutions tailored to your needs.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-12 text-center">
                <div className="animate-fadeIn delay-200">
                  <div className="text-[#ff8906] text-4xl font-bold mb-2">
                    24/7
                  </div>
                  <div className="text-[#a7a9be] text-lg">Support</div>
                </div>
                <div className="animate-fadeIn delay-300">
                  <div className="text-[#ff8906] text-4xl font-bold mb-2">
                    100+
                  </div>
                  <div className="text-[#a7a9be] text-lg">Projects</div>
                </div>
                <div className="animate-fadeIn delay-400">
                  <div className="text-[#ff8906] text-4xl font-bold mb-2">
                    50+
                  </div>
                  <div className="text-[#a7a9be] text-lg">Experts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-fadeIn delay-200">
            {services.map((service, index) => {
              const bgColor = backgroundColors[index % backgroundColors.length];

              return (
                <div
                  key={index}
                  className={`flex flex-col justify-between rounded-xl shadow-lg p-6 ${bgColor} 
                  transition-all duration-300 ease-in-out
                  hover:shadow-2xl hover:shadow-[#ff8906]/20
                  hover:-translate-y-2 hover:scale-[1.02]
                  cursor-pointer`}
                >
                  {/* Service Icon and Title */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-[#ff8906] text-2xl">
                        {/* You can add specific icons for each service */}
                        {service.icon || "🚀"}
                      </span>
                      <h2 className="text-xl font-semibold text-[#ffffff]">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#a7a9be] mb-6">
                    {service.description}
                  </p>

                  {/* Technologies Used */}
                  <div className="mb-6 flex-grow">
                    <h3 className="text-[#ff8906] text-sm font-semibold mb-3">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies?.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full bg-[#ff8906]/10 text-[#ff8906]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button with Timeline */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-[#a7a9be]">
                      Est. Timeline: {service.timeline || "2-4 weeks"}
                    </span>
                    <button
                      onClick={handleViewClick}
                      className="text-sm font-medium text-white bg-[#ff8906] rounded-full px-6 py-2.5 
                      transition-all duration-300 ease-in-out
                      hover:bg-[#f25f4c] hover:shadow-lg hover:shadow-[#ff8906]/50 
                      hover:-translate-y-1 hover:scale-105
                      active:scale-95"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
