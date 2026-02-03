export default function Footer() {
  return (
    <div className="py-16">  
    <footer className="bg-black text-gray-400 px-6 md:px-16 lg:px-24 py-14">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Food <span className="text-indigo-500">Express</span>
          </h2>
          <p className="mt-3 text-sm max-w-xs">
            Fast, fresh & delicious food delivered right to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-white font-semibold mb-3">Quick Links</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-indigo-500">Home</a></li>
            <li><a href="/" className="hover:text-indigo-500">Menu</a></li>
            <li><a href="/" className="hover:text-indigo-500">Offers</a></li>
            <li><a href="/" className="hover:text-indigo-500">Order Now</a></li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <p className="text-white font-semibold mb-3">Opening Hours</p>
          <ul className="space-y-2 text-sm">
            <li>Mon – Fri: 10:00 AM – 11:00 PM</li>
            <li>Saturday: 10:00 AM – 12:00 AM</li>
            <li>Sunday: 11:00 AM – 11:00 PM</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-semibold mb-3">Contact Us</p>
          <ul className="space-y-2 text-sm">
            <li>📍 Delhi, India</li>
            <li>📞 +91 98765 43210</li>
            <li>📧 support@foodexpress.com</li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a className="hover:text-indigo-500" href="#">🐦</a>
            <a className="hover:text-indigo-500" href="#">📸</a>
            <a className="hover:text-indigo-500" href="#">📘</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
        © 2025 <span className="text-white">Food Express</span>. All rights reserved.
      </div>
    </footer>
    </div>
  );
}
