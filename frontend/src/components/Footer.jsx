import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-1 p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-bold mb-2">About Blogify</h3>
          <p>
            Blogify is a simple & elegant platform to read and Share your thoughts,
            insights, and experiences with the world.
          </p>
        </div>
        <div className="flex flex-col ">
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul>
            <li>
              <Link
                to="/home"
                className="text-white font-normal hover:underline hover:text-white" onClick={() => window.scrollTo(0, 0)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/my-blogs"
                className="text-white font-normal hover:underline hover:text-white" onClick={() => window.scrollTo(0, 0)}
              >
                Your Posts
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="text-white font-normal hover:underline hover:text-white" onClick={() => window.scrollTo(0, 0)}
              >
                New Post
              </Link>
            </li>
            <li>
              <Link
                to="/saved"
                className="text-white font-normal hover:underline hover:text-white" onClick={() => window.scrollTo(0, 0)}
              >
                Saved Posts
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Contact Us</h3>
          <p>Email: blogify@example.com</p>
          <p>Mobile: +91 9182736450</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-bold mb-2">Social Media</h3>
          <div className="flex gap-3 mt-2">
            <Link to="#" className="text-blue-500 hover:text-blue-500">
              <i className="fa-brands fa-facebook fa-2x"></i>
            </Link>
            <Link to="#" className="text-pink-500 hover:text-pink-500">
              <i className="fa-brands fa-instagram fa-2x"></i>
            </Link>
            <Link to="#" className="text-black hover:text-black">
              <i className="fa-brands fa-x-twitter fa-2x"></i>
            </Link>
            <Link to="#" className="text-red-500 hover:text-red-500">
              <i className="fa-brands fa-youtube fa-2x"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-400 mt-6">
        © {new Date().getFullYear()} Blogify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
