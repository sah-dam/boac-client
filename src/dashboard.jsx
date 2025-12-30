import { Bell, Mail, DollarSign, Target, Calendar, MapPin, ChevronRight } from 'lucide-react';
import meril from './assets/merril-logo.png';
import bull from './assets/merril-bull.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function BankOfAmericaDashboard() {
  const [balance, setBalance] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [lastFour, setLastFour] = useState('');
  const navigate = useNavigate();

  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchAccount() {
      try {
        const {value: user_id} = (await cookieStore.get('boac_id'));
        const {value: password} = (await cookieStore.get('boac_pass'));
  
        fetch(`${api_url}/account`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user_id, password})
        })
        .then(async response => {
          if (!response.ok) {
            navigate('/');
            return
          }
  
          response = await response.json();
  
          setBalance(response.balance);
          setFname(response.fname);
          setLname(response.lname);
          setLastFour(response.last_four);
        });
      }
      catch (err) {
        navigate('/');
      }
    }
    fetchAccount();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
        {/* Greeting */}
        <div className="mb-6 flex items-center justify-start gap-3 sm:gap-4 lg:gap-6 flex-nowrap overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <h1 className="text-base sm:text-lg lg:text-3xl text-gray-800 whitespace-nowrap flex-shrink-0">Hello, {fname}</h1>
          <div className="flex space-x-1 sm:space-x-2 text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
            <a href="#" className="text-blue-700 hover:underline">Update Profile</a>
            <span>|</span>
            <a href="#" className="text-blue-700 hover:underline">Security Center</a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:justify-center">
          {/* Left Column - Main Content */}
          <div className="flex-1">

            {/* Personal Accounts */}
            <div className="bg-white border border-gray-300 rounded mb-4">
              <div className="border-b-2 border-blue-700 px-4 py-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="25" viewBox="580 0 140 73" className="mr-2">
                  <g fill="none">
                    <path d="M653.3 72.1c21-18 50.5-35.5 66.7-41.8-2.5-1.6-6.4-3.9-10.8-6.4-20.9 6.9-45.3 22.2-67.1 39.5 3.7 2.8 7.6 5.7 11.2 8.7z" fill="#E31837"/>
                    <path d="M643.7 23.2c-3.1-1.5-6.5-2.9-9.1-4.1-7.9 3.9-18.2 9.8-31.2 19.1 2.8 1.5 5.8 3.3 9 5.1 10-7.4 20.1-14.4 31.3-20.1z" fill="#012169"/>
                    <path d="M662.4 14.6c-3.8-2.1-17-7-26.1-9.1-2.7 1-6.5 2.5-9.1 3.6 3.3.9 15.6 4.2 26.1 9.5 2.7-1.3 6.5-2.9 9.1-4z" fill="#E31837"/>
                    <path d="M617.7 13.3c-11.7 5.4-24 12.8-30.7 17.1 2.4 1.1 4.8 2 8.1 3.6 14.8-10 26.4-16.1 31-18.1-3.3-1.2-6.4-2-8.4-2.6z" fill="#012169"/>
                    <path d="M671.2 11.5c2.7-.9 5.8-1.7 8.5-2.5-7.8-3.3-17.6-6.8-26.4-9-1.4.4-5.6 1.5-8.5 2.4 3 .9 12.9 3.2 26.4 9.1zm-49.3 37.6c3.2 1.9 6.6 4.5 9.9 6.7 21.9-17 43.5-30.1 67.2-37.5-3.3-1.7-6.2-3.2-9.9-5-14.2 3.6-38.5 13.3-67.2 35.8z" fill="#E31837"/>
                  </g>
                </svg>
                <h2 className="text-sm lg:text-lg font-semibold text-gray-800">Personal accounts<sup>a</sup></h2>
              </div>
              <div className="p-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1 gap-1 sm:gap-2">
                  <a href="#" className="text-xs sm:text-xs lg:text-base text-blue-700 hover:underline font-medium break-words">Adv SafeBalance Banking - {lastFour}</a>
                  <span className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 flex-shrink-0">${parseFloat(balance).toLocaleString('en-US')}</span>
                </div>
                <button className="text-blue-700 hover:underline text-xs">Quick View</button>
              </div>
            </div>

            {/* Investment Accounts */}
            <div className="bg-white border border-gray-300 rounded mb-4">
              <div className="border-b-2 border-blue-700 px-4 py-3 flex items-center">
                <img src={bull} alt="" className="h-9 lg:h-9 object-contain" />
                <h2 className="text-sm lg:text-lg font-semibold text-gray-800">Investment accounts</h2>
              </div>
              <div className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-start space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-4">
                  <div className="flex-shrink-0">
                    <img src={meril} alt="" className="h-14 sm:h-16 lg:h-20 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-xs lg:text-base text-gray-700 mb-2">
                      Celebrate the season <span className="font-semibold">with up to $600</span> when you invest in a new Merrill account.
                    </p>
                    <a href="#" className="text-blue-700 hover:underline text-xs flex items-center">
                      See more <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Open Account Button */}
            <div className="bg-gray-100 border border-gray-300 rounded p-4">
              <a href="#" className="flex items-center text-blue-700 hover:underline">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <DollarSign className="w-6 h-6 text-gray-600" />
                  <span className="absolute text-blue-600 text-xs font-bold">+</span>
                </div>
                <span className="font-medium">Open a new account</span>
              </a>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 text-xs text-gray-600">
              <sup>a</sup>The balance may reflect transactions that have not yet posted to your account. SafeBalance Banking accounts do not count towards the checking account requirement or the balance requirement for relationship pricing programs such as Platinum Privileges, Preferred Rewards, and Banking Rewards for Wealth Management. The SafeBalance Banking account does not receive fee waivers and other benefits associated with the Platinum Privileges and Preferred Rewards programs.
            </div>
          </div>

          {/* Right Column - Activity Center */}
          <div className="lg:w-80 flex-shrink-0 hidden lg:block">
            <div className="bg-gray-200 border border-gray-300 rounded">
              <div className="bg-gray-300 px-4 py-3 border-b border-gray-400">
                <h3 className="text-lg font-semibold text-gray-700">Activity Center</h3>
              </div>
              <div className="p-3">
                {/* Grid of Activity Items */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {/* Alerts */}
                  <a href="#" className="bg-white border border-gray-300 rounded p-3 flex flex-col items-center justify-center hover:bg-gray-50">
                    <Bell className="w-8 h-8 text-gray-500 mb-2" />
                    <span className="text-xs text-center text-gray-700">Alerts</span>
                  </a>

                  {/* Pay Bills */}
                  <a href="#" className="bg-white border border-gray-300 rounded p-3 flex flex-col items-center justify-center hover:bg-gray-50">
                    <div className="w-8 h-8 text-gray-500 mb-2 relative">
                      <div className="absolute inset-0 bg-blue-100 rounded"></div>
                      <div className="absolute inset-1 bg-blue-300 rounded-t"></div>
                    </div>
                    <span className="text-xs text-center text-gray-700">Pay Bills</span>
                  </a>

                  {/* Inbox */}
                  <a href="#" className="bg-white border border-gray-300 rounded p-3 flex flex-col items-center justify-center hover:bg-gray-50">
                    <Mail className="w-8 h-8 text-gray-500 mb-2" />
                    <span className="text-xs text-center text-gray-700">Inbox</span>
                  </a>

                  {/* Special Offers */}
                  <a href="#" className="bg-white border border-gray-300 rounded p-3 flex flex-col items-center justify-center hover:bg-gray-50">
                    <div className="w-8 h-8 text-gray-500 mb-2 relative">
                      <div className="absolute inset-0 border-2 border-blue-400 rounded-full"></div>
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-400"></div>
                    </div>
                    <span className="text-xs text-center text-gray-700">Special Offers & Deals</span>
                  </a>

                  {/* Open Account */}
                  <a href="#" className="bg-white border border-gray-300 rounded p-3 flex flex-col items-center justify-center hover:bg-gray-50">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2 relative">
                      <DollarSign className="w-5 h-5 text-gray-600" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">+</span>
                      </div>
                    </div>
                    <span className="text-xs text-center text-gray-700">Open an Account</span>
                  </a>

                  {/* Spending & Budgeting */}
                  <a href="#" className="bg-white border border-gray-300 rounded p-3 flex flex-col items-center justify-center hover:bg-gray-50">
                    <DollarSign className="w-8 h-8 text-gray-500 mb-2" />
                    <span className="text-xs text-center text-gray-700">Spending & Budgeting</span>
                  </a>
                </div>

                {/* Goals */}
                <a href="#" className="bg-white border border-gray-300 rounded p-3 flex items-center hover:bg-gray-50 mb-3">
                  <Target className="w-8 h-8 text-gray-500 mr-3" />
                  <span className="text-sm text-gray-700">Goals</span>
                </a>

                {/* Bottom Links */}
                <div className="flex justify-between">
                  <a href="#" className="flex items-center text-blue-700 hover:underline text-xs">
                    <Calendar className="w-5 h-5 mr-1" />
                    <span>Schedule an appointment</span>
                  </a>
                  <a href="#" className="flex items-center text-blue-700 hover:underline text-xs">
                    <MapPin className="w-5 h-5 mr-1" />
                    <span>Find us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}