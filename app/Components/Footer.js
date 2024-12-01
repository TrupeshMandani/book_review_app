import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black w-full text-white border-4 border-white shadow-[10px_10px_20px_#000,20px_20px_20px_#4a90e2] font-mono p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        {/* About Me Section */}
        <div className="lg:text-left text-center lg:w-1/2">
          <h2 className="text-2xl font-bold underline mb-4">About Me</h2>
          <p className="text-lg font-bold">
            Hi, I&apos;m Trupesh Mandani! I specialize in building intuitive and
            responsive web applications. My skills include:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Frontend: React, Tailwind CSS, React Router.</li>
            <li>Backend: Node.js, Express, Python (with Flask/Django).</li>
            <li>Databases: MongoDB, PostgreSQL, Oracle (using APEX).</li>
            <li>APIs: Proficient in designing and consuming REST APIs.</li>
            <li>
              Tools: GitHub, Firebase, VS Code, Expo for mobile development.
            </li>
            <li>
              UX Design: Experience with Figma and critique of app designs.
            </li>
          </ul>
        </div>

        {/* Let's Connect Section */}
        <div className="mt-6 lg:mt-0 text-center lg:w-1/2">
          <h2 className="text-2xl font-bold underline mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-lg font-bold">I&apos;d love to hear from you!</p>
          <p className="mt-2">
            Email:{" "}
            <a
              href="mailto:imtrupesh1610@gmail.com"
              className="text-blue-400 hover:underline"
            >
              imtrupesh1610@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+15875791080"
              className="text-blue-400 hover:underline"
            >
              587-579-1080
            </a>
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://github.com/TrupeshMandani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-lg transition-all duration-300 ease-in-out hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/trupeshkumar-mandani-86b2872a3/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-lg transition-all duration-300 ease-in-out hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-sm">
        <p>&copy; 2024 Trupesh Mandani. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
