const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 shadow-md mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-4">
          &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </p>
        <nav>
          <ul className="flex justify-center space-x-6">
            <li>
              <a href="/" className="hover:text-gray-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-gray-400 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-gray-400 transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
