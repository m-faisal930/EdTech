import React from "react";

function Footer() {
  return (
    <footer className="bg-[#f3e8ff] border-t border-gray-300">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <h1 className="text-3xl font-bold">
                <span className="text-[#003060]">Cognit</span>
                <span className="text-yellow-300">ia</span>
              </h1>
            </a>
            <p className="text-gray-700 mt-2 max-w-sm text-sm">
              A modern EdTech platform offering seamless learning for students and efficient teaching tools for tutors—AI-powered, real-time, and interactive.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-[#003060] uppercase">
                Platform
              </h2>
              <ul className="text-gray-700 text-sm font-medium">
                <li className="mb-2">
                  <a href="/" className="hover:underline">Home</a>
                </li>
                <li>
                  <a href="/features" className="hover:underline">Features</a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold text-[#003060] uppercase">
                Connect
              </h2>
              <ul className="text-gray-700 text-sm font-medium">
                <li className="mb-2">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a>
                </li>
                <li className="mb-2">
                  <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:underline">Discord</a>
                </li>
                <li>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold text-[#003060] uppercase">
                Legal
              </h2>
              <ul className="text-gray-700 text-sm font-medium">
                <li className="mb-2">
                  <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className="hover:underline">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-[#003060] sm:text-center">
            © 2025 <a href="/" className="hover:underline font-medium">Cognitia™</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
