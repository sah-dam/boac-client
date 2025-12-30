import { useState, useEffect } from "react";
import { Link } from 'react-router';
import { useLocation } from "react-router";
import { useNavigate } from 'react-router';

export default function Header() {
    const [activeTab, setActiveTab] = useState("");
    const location = useLocation();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
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
        
                    setFname(response.fname);
                    setLname(response.lname);
                });
            }
            catch (err) {
                navigate('/');
            }
        }
        fetchAccount();
    }, []);

    useEffect(() => {
        setActiveTab(location?.pathname || '/myaccounts');
    }, []);

    const handleLogout = async () => {
        Promise.all([cookieStore.delete('boac_pass'), cookieStore.delete('boac_id')]);
        navigate('/');
    }
    
    return (
        <>
            <div className="sticky top-0 z-50 bg-red-600 text-white px-4 lg:px-6 py-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Logo and Online Banking */}
                        <a href="/myaccounts" onClick={() => setActiveTab("/myaccounts")}>
                            <div className="flex items-center space-x-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="20" viewBox="0 0 720 73" className="lg:w-[240px] lg:h-[24px]">
                                    <g fill="none">
                                    <path d="M653.3 72.1c21-18 50.5-35.5 66.7-41.8-2.5-1.6-6.4-3.9-10.8-6.4-20.9 6.9-45.3 22.2-67.1 39.5 3.7 2.8 7.6 5.7 11.2 8.7z" fill="#fff"/>
                                    <path d="M643.7 23.2c-3.1-1.5-6.5-2.9-9.1-4.1-7.9 3.9-18.2 9.8-31.2 19.1 2.8 1.5 5.8 3.3 9 5.1 10-7.4 20.1-14.4 31.3-20.1z" fill="#fff"/>
                                    <path d="M662.4 14.6c-3.8-2.1-17-7-26.1-9.1-2.7 1-6.5 2.5-9.1 3.6 3.3.9 15.6 4.2 26.1 9.5 2.7-1.3 6.5-2.9 9.1-4z" fill="#fff"/>
                                    <path d="M617.7 13.3c-11.7 5.4-24 12.8-30.7 17.1 2.4 1.1 4.8 2 8.1 3.6 14.8-10 26.4-16.1 31-18.1-3.3-1.2-6.4-2-8.4-2.6z" fill="#fff"/>
                                    <path d="M671.2 11.5c2.7-.9 5.8-1.7 8.5-2.5-7.8-3.3-17.6-6.8-26.4-9-1.4.4-5.6 1.5-8.5 2.4 3 .9 12.9 3.2 26.4 9.1zm-49.3 37.6c3.2 1.9 6.6 4.5 9.9 6.7 21.9-17 43.5-30.1 67.2-37.5-3.3-1.7-6.2-3.2-9.9-5-14.2 3.6-38.5 13.3-67.2 35.8z" fill="#fff"/>
                                    <path d="M0 66.9h16c8.1 0 11.9-4.2 11.9-10.1 0-4.8-2.5-8-7.7-9 4.6-1.1 6.7-3.9 6.7-8 0-5.2-3.8-9.4-11.9-9.4H.1v36.5H0zm13.9-15.5c3 0 5.1 1.5 5.1 4.5 0 3.2-2 4.5-5.1 4.5H8.7v-9.1h5.2v.1zm-1-14.6c3 0 5.1 1.3 5.1 4.3s-2 4.3-5.1 4.3H8.7v-8.6h4.2zm47.3-6.5h-9L37.5 66.9h9.1l2.5-7.6h13.2l2.5 7.6H74L60.2 30.3zm-4.5 8.8L60 52.6h-8.8l4.5-13.5zm63.9-8.8h-8.3v24.5L95.7 30.3h-9.3v36.6h8.3V42.5l15.6 24.4h9.3V30.3zm38.3 36.6l-12-18.6v18.6H137V30.3h8.9v17.6l11.4-17.6h9.9l-12 17.6 13.1 19h-10.4zm41.9-18.3c0 7.3 4.4 11.8 10.1 11.8 5.7 0 10.1-4.5 10.1-11.8 0-7.3-4.4-11.8-10.1-11.8-5.7 0-10.1 4.5-10.1 11.8zm-9.4 0c.1-10.7 7.6-19.1 19.5-19.1s19.4 8.4 19.5 19.1c-.1 10.7-7.6 19.1-19.5 19.1s-19.4-8.4-19.5-19.1zm51.2 18.3h8.9V52.5h11.6v-7h-11.6v-8.2h14l1.6-7h-24.5v36.6zm66-36.6h-9l-13.7 36.6h9.1l2.5-7.6h13.2l2.5 7.6h9.2l-13.8-36.6zm-4.5 8.8l4.3 13.5h-8.8l4.5-13.5zm71.1-8.8h-10.4l-9.5 19.8-9.5-19.8h-10.4v36.6h8V42.4l11.8 24.5L366 42.4v24.5h8.3l-.1-36.6zm17.3 36.6h25v-7h-16.1v-8.2h12.7v-6.8h-12.7v-7.6h14.7l1.6-7h-25.2v36.6zm58.9 0h9.7L451 51.4c5-1.4 7.4-4.9 7.4-10 0-6.6-4-11-13-11h-14.1V67h8.7V52.6h2.4l8 14.3zm-6.7-29.8c3.7 0 5.6 1.6 5.6 4.7s-1.9 4.7-5.6 4.7h-3.8v-9.4h3.8zm29.7 29.8h8.9V30.4h-8.9v36.5zm52.7-9.8c-3.4 2.4-6.4 3.2-9.5 3.2-6.8 0-11.6-4.7-11.6-11.7 0-7 4.7-11.7 11.3-11.7 3 0 6 .8 9.3 3.2v-8.3c-3-1.7-6.5-2.4-10.4-2.4-12.1 0-19.7 8.4-19.8 19.1.1 10.8 7.5 19.1 19.8 19.1 4.1 0 7.6-.7 10.8-2.4v-8.1h.1zm32.6-26.8h-9L536 66.9h9.1l2.5-7.6h13.2l2.5 7.6h9.2l-13.8-36.6zm-4.5 8.8l4.3 13.5h-8.8l4.5-13.5z" fill="#fff"/>
                                    </g>
                                </svg>
                                <span className="text-xl font-light hidden lg:inline">Online Banking</span>
                            </div>
                        </a>

                        {/* Right Side Links */}
                        <div className="flex items-center space-x-4 text-sm">
                        <span className="hidden md:inline">{fname + ' ' + lname}</span>
                        <span className="hidden md:inline">|</span>
                        <button className="hover:underline font-semibold"
                        onClick={handleLogout}
                        >
                            Log Out
                        </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-t lg:border-b border-gray-300 shadow-sm fixed lg:static bottom-0 left-0 right-0 lg:bottom-auto">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <nav className="flex items-center justify-between lg:justify-start overflow-x-auto [&::-webkit-scrollbar]:lg:hidden lg:[scrollbar-width:none]">
                        <div
                            onClick={(e) => { setActiveTab("/myaccounts"); }}
                            className={`flex flex-col items-center lg:flex-row lg:px-4 py-3 text-xs lg:text-sm whitespace-nowrap hover:bg-gray-50 border-b-2 flex-1 lg:flex-none ${
                                activeTab === "/myaccounts" ? "lg:border-blue-700 lg:font-semibold" : "border-transparent"
                            }`}
                        >
                        <Link to="/myaccounts" className="flex flex-col items-center lg:flex-row text-[10px] lg:text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`mb-0.5 lg:mb-0 lg:mr-2 lg:hidden ${
                                activeTab === "/myaccounts" ? "text-blue-600" : "text-gray-600"
                            }`}>
                                <circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M9 11h6"/></svg>
                            Accounts
                        </Link>
                        </div>
                        <div
                            onClick={(e) => { setActiveTab("/pay-transfer-pay-portal"); }}
                            className={`flex flex-col items-center lg:flex-row lg:px-4 py-3 text-xs lg:text-sm whitespace-nowrap hover:bg-gray-50 border-b-2 flex-1 lg:flex-none ${
                                activeTab === "/pay-transfer-pay-portal" ? "lg:border-blue-700 lg:font-semibold" : "border-transparent"
                            }`}
                        >
                            <Link to="/pay-transfer-pay-portal" className="flex flex-col items-center lg:flex-row text-[10px] lg:text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`mb-0.5 lg:mb-0 lg:mr-2 lg:hidden ${
                                    activeTab === "/pay-transfer-pay-portal" ? "text-blue-600" : "text-gray-600"
                                }`}>
                                    <path d="M12 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z"/><path d="M12 7v8"/><path d="M10 10h4"/><path d="M16 12h5"/><path d="M18 11l2 1-2 1"/></svg>
                                Pay & Transfer
                            </Link>
                        </div>
                        <a 
                            href="#deposit" 
                            onClick={(e) => { e.preventDefault(); setActiveTab("deposit"); }}
                            className={`flex flex-col items-center lg:flex-row lg:px-4 py-3 text-[10px] lg:text-sm whitespace-nowrap hover:bg-gray-50 border-b-2 flex-1 lg:flex-none ${
                                activeTab === "deposit" ? "lg:border-blue-700 lg:font-semibold" : "border-transparent"
                            }`}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`mb-0.5 lg:mb-0 lg:mr-2 lg:hidden ${
                            activeTab === "deposit" ? "text-blue-600" : "text-gray-600"
                        }`}>
                            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M2 9h20"/><circle cx="19" cy="17" r="2"/></svg>
                        Deposit Checks
                        </a>
                        <a 
                            href="#invest" 
                            onClick={(e) => { e.preventDefault(); setActiveTab("invest"); }}
                            className={`flex flex-col items-center lg:flex-row lg:px-4 py-3 text-[10px] lg:text-sm whitespace-nowrap hover:bg-gray-50 border-b-2 flex-1 lg:flex-none ${
                                activeTab === "invest" ? "lg:border-blue-700 lg:font-semibold" : "border-transparent"
                            }`}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`mb-0.5 lg:mb-0 lg:mr-2 lg:hidden ${
                            activeTab === "invest" ? "text-blue-600" : "text-gray-600"
                        }`}>
                            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        Invest
                        </a>
                        {['Rewards & Deals', 'Tools & Investing', 'Security Center', 'Help & Support'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={(e) => { e.preventDefault(); setActiveTab(item); }}
                            className={`hidden lg:inline-block px-4 py-3 text-sm whitespace-nowrap hover:bg-gray-50 border-b-2 ${
                                activeTab === item ? "border-blue-700 font-semibold" : "border-transparent"
                            }`}
                        >
                            {item}
                        </a>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}