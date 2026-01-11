import { Link } from 'react-router-dom'; 
import { Gem, Scale, Star } from 'lucide-react';
import Footer from '../components/Footer';

export default function Home() { 
    return (
        <div>
           

            <div className="min-h-screen bg-gray-50"> 
                <div className="relative">
                    <img 
                        src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=2000&q=80"
                        alt="Jewelry showcase"
                        className="w-full h-[500px] object-cover" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h1 className="text-5xl font-bold mb-4">Luxury jewelry's & Pawn shop</h1>
                            <p className="text-xl mb-8">Your Trusted Partner in Luxury and Financial Solutions</p>
                            <div className="flex justify-center space-x-4">
                                <Link 
                                    to="/jewelry"
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg flex items-center"
                                >
                                    <Gem className="mr-2" /> Jewelry store 
                                </Link>
                                <Link
                                    to="/pawn"
                                    className="bg-white hover:bg-gray-100 text-purple-600 px-8 py-3 rounded-lg flex items-center"
                                >
                                    <Scale className="mr-2" /> Pawn Services 
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto py-16 px-4"> 
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md"> 
                            <Gem className="h-12 w-12 text-purple-600 mb-4" /> 
                            <h3 className="text-xl font-bold mb-2">Exquisite Jewelry</h3> 
                            <p className="text-gray-600"> 
                                Discover our curated collection of fine jewelry, from stunning diamonds to precious gemstones.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md"> 
                            <Scale className="h-12 w-12 text-purple-600 mb-4" /> 
                            <h3 className="text-xl font-bold mb-2">Pawn Services</h3> 
                            <p className="text-gray-600"> 
                                Quick and confidential pawn loans with competitive rates on jewelry, watches, and precious metals.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md"> 
                            <Star className="h-12 w-12 text-purple-600 mb-4" /> 
                            <h3 className="text-xl font-bold mb-2">Expert Appraisals</h3> 
                            <p className="text-gray-600"> 
                                Professional evaluation services by certified gemologists and jewelry experts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
