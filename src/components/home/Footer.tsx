
import { Link, useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    // Scroll to the top of the page after navigation
    window.scrollTo(0, 0);
  };
  
  return <footer className="bg-white text-gray-700 pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-8">
            <div 
              onClick={() => handleNavigation('/')}
              className="flex items-center mb-4 cursor-pointer"
            >
              <img 
                src="https://coompass.lovable.app/lovable-uploads/ed0df35e-439d-4191-8e03-881490d2a245.png" 
                alt="Coompass Logo" 
                className="h-8"
              />
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Connecting companies, nonprofits, and people in an all-in-one platform to create meaningful change through AI-powered sustainability initiatives, seamless volunteer engagement, and real-time impact reporting.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/coompassio" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">
                <img src="https://img.icons8.com/?size=100&id=de4vjQ6J061l&format=png&color=000000" alt="X (Twitter)" className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/coompass/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
                <img src="https://img.icons8.com/?size=100&id=98960&format=png&color=000000" alt="LinkedIn" className="h-5 w-5" />
              </a>
              <a href="https://coompass.medium.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                <img src="https://img.icons8.com/?size=100&id=BzFWSIqh6bCr&format=png&color=000000" alt="Medium" className="h-5 w-5" />
              </a>
              <a href="https://t.me/coompass_official" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500">
                <img src="https://img.icons8.com/?size=100&id=98970&format=png&color=000000" alt="Telegram" className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Company</h3>
            <ul className="space-y-2">
              <li>
                <span 
                  onClick={() => handleNavigation('/about-us')} 
                  className="text-gray-600 hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  About Us
                </span>
              </li>
              <li>
                <a href="https://coompass.medium.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition duration-300">Blog</a>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigation('/pricing')}
                  className="text-gray-600 hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  Pricing
                </span>
              </li>
              <li>
                <a href="https://coompass.notion.site/e08be489d94c45acbf0fa6eabc3067c7?v=1eea2173815c4944a21d93e4301d8e04" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition duration-300">Roadmap</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <span 
                  onClick={() => handleNavigation('/for-companies')}
                  className="text-gray-600 hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  For Companies
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigation('/for-nonprofits')}
                  className="text-gray-600 hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  For Nonprofits
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigation('/for-volunteers')}
                  className="text-gray-600 hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  For Volunteers
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Legal</h3>
            <ul className="space-y-2">
              <li>
                <span 
                  onClick={() => handleNavigation('/help-center')}
                  className="text-gray-600 hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  Help Center
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigation('/terms-conditions')}
                  className="text-gray-600 hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  Terms & Conditions
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigation('/privacy-policy')}
                  className="text-gray-600 hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  Privacy Policy
                </span>
              </li>
              <li>
                <a href="mailto:hello@coompass.org" className="text-gray-600 hover:text-gray-900 transition duration-300">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Partnerships Section between footer links and copyright */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-gray-200 mt-10 pt-10 mb-10">
          <div className="flex items-center justify-center lg:justify-start">
            <h3 className="text-sm mr-3 text-gray-500 font-normal">Taking action for the</h3>
            <a href="https://sdgs.un.org/goals" target="_blank" rel="noopener noreferrer">
              <img src="https://coompass.lovable.app/lovable-uploads/58c6e50c-180f-41f3-b958-92a8386c8f35.png" alt="UN Sustainable Development Goals" className="h-6" />
            </a>
          </div>
          <div className="flex items-center justify-center">
            <h3 className="text-sm mr-3 font-normal text-gray-500">Associated with</h3>
            <a href="https://grace.pt/pt" target="_blank" rel="noopener noreferrer">
              <img src="https://coompass.lovable.app/lovable-uploads/b67bd8ef-4464-49b8-a9ee-eacb70704a06.png" alt="GRACE" className="h-8" />
            </a>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <h3 className="text-sm mr-3 text-gray-500 font-normal">Legal advised by</h3>
            <a href="https://vpa.pt/" target="_blank" rel="noopener noreferrer">
              <img src="https://coompass.lovable.app/lovable-uploads/4e2fd2f8-821c-4c76-bd72-35c498d65bd6.png" alt="VPA Legal" className="h-8" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Coompass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
}
