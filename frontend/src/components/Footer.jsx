import { Link } from 'react-router-dom';
import { FaHome, FaUserEdit, FaPenNib, FaBookmark, FaEnvelope, FaPhone, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-10 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-bold text-lg mb-3">About NoteNest</h3>
          <p className="text-gray-400">
            NoteNest is a simple and elegant platform where you can read, write,
            and share your thoughts, insights, and experiences with the world.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/home" className="hover:underline text-gray-300 hover:text-white" onClick={() => window.scrollTo(0, 0)}>
                <FaHome className="inline mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link to="/my-blogs" className="hover:underline text-gray-300 hover:text-white" onClick={() => window.scrollTo(0, 0)}>
                <FaUserEdit className="inline mr-2" /> Your Posts
              </Link>
            </li>
            <li>
              <Link to="/create" className="hover:underline text-gray-300 hover:text-white" onClick={() => window.scrollTo(0, 0)}>
                <FaPenNib className="inline mr-2" /> New Post
              </Link>
            </li>
            <li>
              <Link to="/saved" className="hover:underline text-gray-300 hover:text-white" onClick={() => window.scrollTo(0, 0)}>
                <FaBookmark className="inline mr-2" /> Saved Posts
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Contact Us</h3>
          <p className="text-gray-400"><FaEnvelope className="inline mr-2" /> Email: abhure441801@gmail.com</p>
          <p className="text-gray-400"><FaPhone className="inline mr-2" /> Phone: +91 9182736450</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-3">
            <a href="https://www.instagram.com/alpha.dude0/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/aditya-bhure-729882258/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              <FaLinkedin size={24} />
            </a>
            <a href="https://x.com/home" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.youtube.com/@your_username" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t pt-4">
        © {new Date().getFullYear()} NoteNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
