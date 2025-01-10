import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { motion } from "framer-motion";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-background via-background/90 to-primary/10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="pb-2 text-8xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
              Codex Express
            </h1>
            <p className="mt-4 text-lg text-paragraph max-w-2xl mx-auto glass-effect p-4 rounded-lg">
              Transform your ideas into powerful software solutions. We
              specialize in custom software development, mobile apps, web
              applications, and enterprise solutions. Let our expert team bring
              your vision to life.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="font-extrabold mt-12 bg-gradient-to-r from-primary to-secondary text-headline px-10 py-4 rounded-md shadow-xl hover:scale-110 transition-all duration-300 animate-bounce"
            >
              Start Your Project
            </button>
          </motion.div>

          {/* Animated background elements */}
          <div className="absolute -z-10 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </section>

        <div className="bg-gradient-to-b from-background to-background/95">
          {/* Wrap sections in motion.section for animations */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto py-16 px-4"
          >
            {/* KEY FEATURES - Updated for software development */}
            <section className="max-w-6xl mx-auto mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-sm font-bold text-primary text-center mb-2"
              >
                OUR EXPERTISE
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-extrabold text-headline text-center mb-6"
              >
                End-to-End Software Development
              </motion.h3>

              <p className="max-w-2xl mx-auto text-paragraph text-center mb-12">
                From startups to enterprises, we deliver scalable software
                solutions that drive business growth and digital transformation.
              </p>

              {/* Updated Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Custom Software Development",
                    description:
                      "Tailored solutions built with cutting-edge technology to meet your specific business needs.",
                    image: "custom-software.jpg",
                  },
                  {
                    title: "Cloud & DevOps",
                    description:
                      "Scalable cloud infrastructure and automated deployment pipelines for optimal performance.",
                    image: "cloud-devops.jpg",
                  },
                  {
                    title: "Mobile App Development",
                    description:
                      "Native and cross-platform mobile applications that deliver exceptional user experiences.",
                    image: "mobile-dev.jpg",
                  },
                  {
                    title: "Enterprise Solutions",
                    description:
                      "Robust enterprise software to streamline operations and boost productivity.",
                    image: "enterprise.jpg",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <h4 className="text-xl font-bold text-headline mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-paragraph text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* WHY US - Updated for software company */}
            <section className="max-w-6xl mx-auto mb-16">
              <div
                className="bg-white/5 backdrop-blur-sm p-10 rounded-lg shadow-xl mx-auto animate-slideIn delay-200 hover:scale-[1.02] transition-transform duration-300"
                style={{ maxWidth: "52rem" }}
              >
                <h2 className="text-4xl font-extrabold text-headline mb-4">
                  Why Choose Us?
                </h2>
                <p className="text-paragraph leading-relaxed">
                  With over a decade of experience in software development, we
                  combine technical expertise with business acumen to deliver
                  solutions that drive results. Our agile development process
                  ensures transparent communication, rapid iteration, and
                  exceptional quality in every project.
                </p>
              </div>
            </section>

            {/* Updated Benefits Section */}
            <section className="max-w-6xl mx-auto mb-16">
              <h2 className="text-4xl font-extrabold text-headline text-center mb-12 animate-slideIn delay-300">
                Our Advantages
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn delay-400">
                {[
                  {
                    title: "Expert Team",
                    description:
                      "Skilled developers, designers, and project managers with proven expertise.",
                  },
                  {
                    title: "Agile Development",
                    description:
                      "Flexible, iterative approach ensuring quick adaptation to changes.",
                  },
                  {
                    title: "Quality Assurance",
                    description:
                      "Rigorous testing and quality control throughout development.",
                  },
                  {
                    title: "Ongoing Support",
                    description:
                      "Dedicated maintenance and support after deployment.",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                  >
                    <h3 className="text-2xl font-bold text-headline mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-paragraph">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Updated FAQ Section */}
            <section className="max-w-6xl mx-auto mb-16">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl font-extrabold text-headline text-center mb-4"
              >
                Common Questions
              </motion.h2>

              {/* Subtext & Documentation Link */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center max-w-2xl mx-auto mb-8"
              >
                <p className="text-paragraph">
                  Quick answers to questions you may have. Can’t find what
                  you’re looking for?
                </p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-primary hover:text-secondary transition-colors"
                >
                  Check out our full documentation
                </a>
              </motion.div>

              {/* Two-column FAQ Cards */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {[
                  {
                    icon: "💻",
                    question: "What types of software do you develop?",
                    answer:
                      "We develop web applications, mobile apps, enterprise software, and custom solutions across all industries.",
                  },
                  {
                    icon: "⏱️",
                    question: "How long does development take?",
                    answer:
                      "Project timelines vary based on complexity, typically ranging from 2-6 months for full applications.",
                  },
                  {
                    icon: "💰",
                    question: "How do you handle project pricing?",
                    answer:
                      "We provide detailed quotes based on project scope, features, and complexity.",
                  },
                  {
                    icon: "🤝",
                    question: "Do you provide post-launch support?",
                    answer:
                      "Yes, we offer ongoing maintenance, updates, and technical support packages.",
                  },
                  {
                    icon: "🚀",
                    question: "Do you provide tutorials?",
                    answer:
                      "Not yet, but we’re working on it! In the meantime, we have a robust documentation page.",
                  },
                  {
                    icon: "👥",
                    question: "Can I collaborate with others?",
                    answer:
                      "Yes! Invite team members or friends to collaborate on any snippet in real time.",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-white/5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    {/* Icon */}
                    <div className="text-3xl mr-4 text-primary/80">
                      {faq.icon}
                    </div>
                    {/* Question & Answer */}
                    <div>
                      <h3 className="text-xl font-bold text-headline mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-paragraph text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Optional "Load More" or "View More FAQs" Button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex justify-center mt-6"
              >
                <button className="px-6 py-3 bg-primary text-headline font-bold rounded-md shadow hover:bg-secondary hover:scale-105 transition-transform">
                  Load More
                </button>
              </motion.div>
            </section>
          </motion.section>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
