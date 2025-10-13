import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, GraduationCap, BookOpen } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-900/90 backdrop-blur-md border-t border-slate-700/50 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-blue-400">
                                <GraduationCap className="w-6 h-6" />
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold text-white">LearnHub</span>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Empowering learners worldwide with personalized course recommendations and skill assessments.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/courses" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                    Browse Courses
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-slate-400 text-sm">
                                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>support@learnhub.com</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-400 text-sm">
                                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-400 text-sm">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>123 Learning Street, Education City, EC 12345</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-slate-700/50">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400 text-sm">
                            © {new Date().getFullYear()} LearnHub. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                Cookie Policy
                            </a>
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                Accessibility
                            </a>
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;