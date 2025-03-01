import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <>
      {" "}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary-950 to-secondary-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About ProTrainer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We&apos;re on a mission to transform the fitness industry by
            connecting trainers and clients through innovative technology.
          </p>
        </div>
      </section>
      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                ProTrainer was founded in 2020 by a team of fitness enthusiasts
                and technology experts who recognized a gap in the market for a
                comprehensive platform that connects trainers and clients.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our founders experienced firsthand the challenges of maintaining
                consistent communication between workout sessions, tracking
                progress effectively, and creating personalized workout plans
                that adapt to changing needs.
              </p>
              <p className="text-lg text-gray-600">
                What started as a simple idea has grown into a powerful platform
                used by thousands of trainers and clients worldwide. Our mission
                is to make personalized fitness guidance accessible to everyone,
                regardless of location or schedule.
              </p>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=600&width=600&text=Our+Team"
                  alt="ProTrainer Team"
                  width={600}
                  height={600}
                  className="w-full"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-1/4 -left-5 w-20 h-20 bg-primary-500/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-1/3 -right-5 w-32 h-32 bg-primary-600/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 mb-8">
              To empower individuals on their fitness journey by providing the
              tools, guidance, and support they need to achieve their goals.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {/* Value 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Trust</h3>
                <p className="text-gray-600 text-center">
                  We build trust through transparency, security, and delivering
                  on our promises.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">
                  Innovation
                </h3>
                <p className="text-gray-600 text-center">
                  We continuously innovate to provide the best tools and
                  experiences for our users.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">
                  Community
                </h3>
                <p className="text-gray-600 text-center">
                  We foster a supportive community where everyone can learn,
                  grow, and succeed together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              The passionate individuals behind ProTrainer who are dedicated to
              transforming the fitness industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=256&width=256&text=John+Smith"
                  alt="John Smith"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">John Smith</h3>
                <p className="text-primary-600 mb-3">Co-Founder & CEO</p>
                <p className="text-gray-600 mb-4">
                  Former personal trainer with 10+ years of experience and a
                  passion for technology.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-1.41 7.08c.84-.58 1.87-.93 2.98-.93 1.11 0 2.14.35 2.98.93a4.007 4.007 0 011.76 2.92h-9.48c.25-1.16.89-2.16 1.76-2.92zm6.93 6.84c-.53.63-1.2 1.13-1.95 1.45-.75.32-1.57.48-2.4.48-.83 0-1.65-.16-2.4-.48-.75-.32-1.42-.82-1.95-1.45a4.902 4.902 0 01-1.04-1.92h10.78c-.21.71-.57 1.35-1.04 1.92zm-9.51-4.84c0-.83.17-1.64.47-2.43.3-.79.74-1.5 1.28-2.1.55-.6 1.2-1.07 1.9-1.39.71-.32 1.46-.48 2.23-.48.77 0 1.52.16 2.23.48.7.32 1.35.79 1.9 1.39.54.6.98 1.31 1.28 2.1.3.79.47 1.6.47 2.43 0 .83-.17 1.65-.47 2.43-.3.78-.74 1.5-1.28 2.1-.55.6-1.2 1.07-1.9 1.39-.71.32-1.46.48-2.23.48-.77 0-1.52-.16-2.23-.48-.7-.32-1.35-.79-1.9-1.39-.54-.6-.98-1.32-1.28-2.1-.3-.78-.47-1.6-.47-2.43z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=256&width=256&text=Sarah+Johnson"
                  alt="Sarah Johnson"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                <p className="text-primary-600 mb-3">Co-Founder & CTO</p>
                <p className="text-gray-600 mb-4">
                  Software engineer with a background in health tech and a
                  passion for fitness.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-1.41 7.08c.84-.58 1.87-.93 2.98-.93 1.11 0 2.14.35 2.98.93a4.007 4.007 0 011.76 2.92h-9.48c.25-1.16.89-2.16 1.76-2.92zm6.93 6.84c-.53.63-1.2 1.13-1.95 1.45-.75.32-1.57.48-2.4.48-.83 0-1.65-.16-2.4-.48-.75-.32-1.42-.82-1.95-1.45a4.902 4.902 0 01-1.04-1.92h10.78c-.21.71-.57 1.35-1.04 1.92zm-9.51-4.84c0-.83.17-1.64.47-2.43.3-.79.74-1.5 1.28-2.1.55-.6 1.2-1.07 1.9-1.39.71-.32 1.46-.48 2.23-.48.77 0 1.52.16 2.23.48.7.32 1.35.79 1.9 1.39.54.6.98 1.31 1.28 2.1.3.79.47 1.6.47 2.43 0 .83-.17 1.65-.47 2.43-.3.78-.74 1.5-1.28 2.1-.55.6-1.2 1.07-1.9 1.39-.71.32-1.46.48-2.23.48-.77 0-1.52-.16-2.23-.48-.7-.32-1.35-.79-1.9-1.39-.54-.6-.98-1.32-1.28-2.1-.3-.78-.47-1.6-.47-2.43z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=256&width=256&text=Michael+Lee"
                  alt="Michael Lee"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Michael Lee</h3>
                <p className="text-primary-600 mb-3">Head of Product</p>
                <p className="text-gray-600 mb-4">
                  Product designer with experience in fitness apps and a focus
                  on user experience.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-1.41 7.08c.84-.58 1.87-.93 2.98-.93 1.11 0 2.14.35 2.98.93a4.007 4.007 0 011.76 2.92h-9.48c.25-1.16.89-2.16 1.76-2.92zm6.93 6.84c-.53.63-1.2 1.13-1.95 1.45-.75.32-1.57.48-2.4.48-.83 0-1.65-.16-2.4-.48-.75-.32-1.42-.82-1.95-1.45a4.902 4.902 0 01-1.04-1.92h10.78c-.21.71-.57 1.35-1.04 1.92zm-9.51-4.84c0-.83.17-1.64.47-2.43.3-.79.74-1.5 1.28-2.1.55-.6 1.2-1.07 1.9-1.39.71-.32 1.46-.48 2.23-.48.77 0 1.52.16 2.23.48.7.32 1.35.79 1.9 1.39.54.6.98 1.31 1.28 2.1.3.79.47 1.6.47 2.43 0 .83-.17 1.65-.47 2.43-.3.78-.74 1.5-1.28 2.1-.55.6-1.2 1.07-1.9 1.39-.71.32-1.46.48-2.23.48-.77 0-1.52-.16-2.23-.48-.7-.32-1.35-.79-1.9-1.39-.54-.6-.98-1.32-1.28-2.1-.3-.78-.47-1.6-.47-2.43z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=256&width=256&text=Emily+Chen"
                  alt="Emily Chen"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Emily Chen</h3>
                <p className="text-primary-600 mb-3">Head of Fitness</p>
                <p className="text-gray-600 mb-4">
                  Certified fitness coach with expertise in exercise science and
                  nutrition.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-1.41 7.08c.84-.58 1.87-.93 2.98-.93 1.11 0 2.14.35 2.98.93a4.007 4.007 0 011.76 2.92h-9.48c.25-1.16.89-2.16 1.76-2.92zm6.93 6.84c-.53.63-1.2 1.13-1.95 1.45-.75.32-1.57.48-2.4.48-.83 0-1.65-.16-2.4-.48-.75-.32-1.42-.82-1.95-1.45a4.902 4.902 0 01-1.04-1.92h10.78c-.21.71-.57 1.35-1.04 1.92zm-9.51-4.84c0-.83.17-1.64.47-2.43.3-.79.74-1.5 1.28-2.1.55-.6 1.2-1.07 1.9-1.39.71-.32 1.46-.48 2.23-.48.77 0 1.52.16 2.23.48.7.32 1.35.79 1.9 1.39.54.6.98 1.31 1.28 2.1.3.79.47 1.6.47 2.43 0 .83-.17 1.65-.47 2.43-.3.78-.74 1.5-1.28 2.1-.55.6-1.2 1.07-1.9 1.39-.71.32-1.46.48-2.23.48-.77 0-1.52-.16-2.23-.48-.7-.32-1.35-.79-1.9-1.39-.54-.6-.98-1.32-1.28-2.1-.3-.78-.47-1.6-.47-2.43z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                10,000+
              </div>
              <p className="text-lg text-gray-600">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                500+
              </div>
              <p className="text-lg text-gray-600">Certified Trainers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                100+
              </div>
              <p className="text-lg text-gray-600">Exercise Library</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                15+
              </div>
              <p className="text-lg text-gray-600">Countries Served</p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-600 mb-6">
                Have questions about ProTrainer? We&apos;d love to hear from
                you. Reach out to our team and we&apos;ll get back to you as
                soon as possible.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-3 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-600">support@protrainer.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-3 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-3 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="font-bold">Address</h3>
                    <p className="text-gray-600">
                      123 Fitness Street, Gym City, 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <form>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the ProTrainer Community Today
            </h2>
            <p className="text-xl mb-8">
              Start your fitness journey with ProTrainer and experience the
              difference personalized training can make.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-full transition-all hover:shadow-lg transform hover:-translate-y-0.5 text-center"
              >
                Get Started Free
              </Link>
              <Link
                href="/pricing"
                className="bg-primary-700 hover:bg-primary-800 text-white font-medium py-3 px-8 rounded-full border border-primary-500 transition-all hover:shadow-lg text-center"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
