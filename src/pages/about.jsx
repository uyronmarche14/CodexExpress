import PageTransition from "../components/PageTransition";
import logo from "../assets/images/logo.png";
import { teamMembers } from "../data/team"; // Updated import
import Footer from "../components/footer";

export default function About() {
  return (
    <PageTransition>
      <div className="bg-[#0f0e17] text-white font-roboto min-h-screen">
        {/* Hero Section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ff8906] rounded-full blur-[150px] opacity-10" />

        <section className="text-center py-16 px-4 max-w-6xl mx-auto">
          {/* Logo and Title */}
          <div className="flex flex-col items-center justify-center mb-12">
            <img
              src={logo}
              alt="CodeEx Logo"
              className="w-24 h-24 mb-6 animate-bounce-slow hover:scale-110 transition-transform duration-300"
            />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#ffffff] text-center mb-6 animate-slideIn delay-100">
              About Codex Express
            </h1>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-20 h-[3px] bg-[#ff8906]" />
              <span className="text-[#a7a9be] text-xl font-medium">
                Our Story & Expertise
              </span>
              <span className="w-20 h-[3px] bg-[#ff8906]" />
            </div>
            <p className="text-[#a7a9be] text-lg max-w-3xl mx-auto leading-relaxed mb-12">
              Get support 24/7, with our award-winning support network of growth
              experts.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Technical Consulting",
                description:
                  "Expert guidance on technology solutions and architecture",
                icon: "💡",
              },
              {
                title: "24/7 Support",
                description:
                  "Round-the-clock assistance for all your technical needs",
                icon: "🔧",
              },
              {
                title: "Custom Solutions",
                description:
                  "Tailored development services for your unique requirements",
                icon: "⚡",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-[#17171c] p-8 rounded-lg text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-[#ff8906]">
                  {service.title}
                </h3>
                <p className="text-[#a7a9be] text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button className="bg-[#ff8906] px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#f25f4c] transition-colors duration-300">
              Book a call
            </button>
            <button className="bg-[#ff8906] px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#f25f4c] transition-colors duration-300">
              Book a demo
            </button>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          {/* Team Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#fffffe] mb-4">
              Meet The Team
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="w-20 h-[3px] bg-[#ff8906]" />
              <span className="text-[#a7a9be] text-xl font-medium">
                Our Experts
              </span>
              <span className="w-20 h-[3px] bg-[#ff8906]" />
            </div>
          </div>

          {/* Fixed Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-[#17171c] rounded-lg overflow-hidden shadow-lg 
                  transition-all duration-300 group hover:bg-[#1c1c27]"
              >
                {/* Updated image container with fixed aspect ratio */}
                <div className="relative w-full pt-[100%]">
                  {" "}
                  {/* Creates a perfect square */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 
                    group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-[#fffffe] group-hover:text-[#ff8906]">
                    {member.name}
                  </h3>
                  <p className="text-[#ff8906] font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-[#a7a9be] text-sm mb-2">
                    {member.expertise}
                  </p>
                  <div className="pt-4 border-t border-[#2e2e36]">
                    <p className="text-[#a7a9be] text-sm mb-1">
                      {member.email}
                    </p>
                    <p className="text-[#a7a9be] text-sm">{member.contact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Minimalist Page Analysis Section */}
        <section className="py-12 px-4 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#ff8906] text-sm font-medium">ANALYSIS</span>
          </div>

          {/* Minimal Score Display */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Design", score: "8.5" },
              { label: "Content", score: "9.0" },
              { label: "UX", score: "8.0" },
            ].map((item, index) => (
              <div
                key={index}
                className="border border-[#2e2e36] rounded-lg p-4 text-center hover:border-[#ff8906] transition-colors"
              >
                <p className="text-[#a7a9be] text-sm mb-2">{item.label}</p>
                <p className="text-2xl font-bold text-[#fffffe]">
                  {item.score}
                </p>
              </div>
            ))}
          </div>

          {/* Minimal Improvements List */}
          <div className="grid grid-cols-2 gap-4">
            {[
              "Data Visualization",
              "Smooth Animations",
              "User Testimonials",
              "Micro-interactions",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center p-2 hover:text-[#ff8906] transition-colors"
              >
                <span className="text-[#ff8906] mr-2">+</span>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section - Redesigned */}
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#17171c] to-[#1c1c27] rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#ff8906]/10 text-[#ff8906] px-4 py-2 rounded-full text-sm font-medium mb-4">
                Get in Touch
              </span>
              <h2 className="text-3xl font-bold text-[#fffffe]">
                Let&apos;s Start a Conversation
              </h2>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-[#a7a9be] block">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#0f0e17] border border-[#2e2e36] rounded-lg p-3 focus:outline-none focus:border-[#ff8906] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#a7a9be] block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#0f0e17] border border-[#2e2e36] rounded-lg p-3 focus:outline-none focus:border-[#ff8906] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#a7a9be] block">Email</label>
                <input
                  type="email"
                  className="w-full bg-[#0f0e17] border border-[#2e2e36] rounded-lg p-3 focus:outline-none focus:border-[#ff8906] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#a7a9be] block">Message</label>
                <textarea
                  rows="4"
                  className="w-full bg-[#0f0e17] border border-[#2e2e36] rounded-lg p-3 focus:outline-none focus:border-[#ff8906] transition-colors"
                ></textarea>
              </div>

              <button className="w-full bg-gradient-to-r from-[#ff8906] to-[#f25f4c] text-white py-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
