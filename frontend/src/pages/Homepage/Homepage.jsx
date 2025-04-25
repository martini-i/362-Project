import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white text-center py-24 px-6 flex-1">
        <h1 className="text-5xl font-extrabold mb-4">Pursuit Athletics</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Elevate your performance with elite-level athletic wear built for winners.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Gear</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border shadow-sm hover:shadow-xl transition rounded-xl overflow-hidden"
            >
              <div className="h-60 bg-gray-200 flex items-center justify-center text-gray-500">
                Product Image
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Product Name</h3>
                <p className="text-gray-600">$XX.XX</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Train Hard. Recover Stronger.</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          From warmups to post-workout chill, Pursuit gear keeps up with your grind.
        </p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
        >
          Browse Collection
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
