import Link from "next/link";
import { GraduationCap, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-text dark:bg-card-dark text-white/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8 text-secondary" />
              <span className="font-poppins font-bold text-xl text-white">EduPath AI</span>
            </div>
            <p className="font-inter text-sm text-white/60 leading-relaxed">
              AI-powered career guidance and brain assessment for Indian students and professionals.
            </p>
          </div>
          <div>
            <h4 className="font-montserrat font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 font-inter text-sm">
              <li><Link href="/assessment" className="hover:text-secondary transition-colors">Brain Assessment</Link></li>
              <li><Link href="/exams" className="hover:text-secondary transition-colors">Entrance Exams</Link></li>
              <li><Link href="/colleges" className="hover:text-secondary transition-colors">College Finder</Link></li>
              <li><Link href="/careers" className="hover:text-secondary transition-colors">Career Planner</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-montserrat font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 font-inter text-sm">
              <li><Link href="/#faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
              <li><Link href="/dashboard" className="hover:text-secondary transition-colors">My Dashboard</Link></li>
              <li><Link href="/auth/signin" className="hover:text-secondary transition-colors">Sign In</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-montserrat font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 font-inter text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                support@edupathai.in
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                India
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center font-inter text-sm text-white/40">
          © 2026 EduPath AI. Empowering every student&apos;s journey.
        </div>
      </div>
    </footer>
  );
}
