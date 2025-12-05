import Link from "next/link";
import { Building2, Twitter, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#050507] border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="bg-primary p-1.5 rounded-lg">
                                <Building2 className="w-5 h-5 text-white fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">RPS TAX ASSOCIATES</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Expert tax consultants in Chennai providing seamless GST, Income Tax, and Company Formation services.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                <span>support@rpstax.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>Anna Nagar, Chennai</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-6">Services</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">GST Registration</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Income Tax Filing</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Company Formation</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Trademark</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Our Team</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-6">Legal</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} RPS Tax Associates. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">
                            Designed by Antigravity
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
