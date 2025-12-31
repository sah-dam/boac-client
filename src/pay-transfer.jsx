import { useState, useEffect } from 'react';
import { ArrowLeftRight, DollarSign, Globe, Download, Printer, SlidersHorizontal, Info, X, AlertCircle } from 'lucide-react';
import zelle from './assets/zelle.svg';
import { useNavigate } from 'react-router';

export default function PayTransferComponent() {
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [showWireForm, setShowWireForm] = useState(false);
  const [showZelleForm, setShowZelleForm] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: '',
    accountNumber: '',
    accountType: 'checking',
    transferAmount: ''
  });
  const [wireFormData, setWireFormData] = useState({
    bankName: '',
    routingNumber: '',
    country: '',
    accountNumber: '',
    fullName: '',
    transferAmount: ''
  });
  const [zelleFormData, setZelleFormData] = useState({
    email: '',
    phoneNumber: '',
    transferAmount: ''
  });
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  
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
          
          // Format response.created as Month, day, year
          let date = new Date(response.created);
          date = date.toDateString().split(' ');
          date = date.splice(1).join(', ');
  
          response.created = date;
          setDetails(response);
        });
      }
      catch (err) {
        navigate('/');
      }
    }

    fetchAccount();
  }, []);

  const handleTransferClick = (e) => {
    setShowLoading(true);
    
    setTimeout(() => {
      setShowLoading(false);
      setShowErrorModal(true);
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[0-9]/g, ''); // Remove all digits
    setFormData(prev => ({ ...prev, recipientName: value }));
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow digits
    setFormData(prev => ({ ...prev, accountNumber: value }));
  };

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, ''); // Only allow numbers and decimal point
    
    // Prevent multiple decimal points
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 2 decimal places
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    setFormData(prev => ({ ...prev, transferAmount: value }));
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length === 0) return '';
    
    if (digits.length === 1) {
      return `+${digits}`;
    } else if (digits.length <= 4) {
      return `+${digits[0]} ${digits.slice(1)}`;
    } else if (digits.length <= 7) {
      return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    } else {
      return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
    }
  };

  const formatAmountDisplay = (value) => {
    if (!value) return '';
    
    // Split into integer and decimal parts
    const parts = value.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    // Format integer part with commas
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Combine with decimal part if it exists
    return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  };

  const handleSubmit = () => {
    // Validate all fields are filled
    if (!formData.recipientName || !formData.accountNumber || !formData.transferAmount) {
      alert('Please fill in all fields');
      return;
    }
    
    // Handle form submission
    closeModal();

    handleTransferClick();
  };

  const closeModal = () => {
    setShowTransferForm(false);
    setFormData({ recipientName: '', accountNumber: '', accountType: 'checking', transferAmount: '' });
  };

  const closeWireModal = () => {
    setShowWireForm(false);
    setWireFormData({ bankName: '', routingNumber: '', country: '', accountNumber: '', fullName: '', transferAmount: '' });
  };

  const closeZelleModal = () => {
    setShowZelleForm(false);
    setZelleFormData({ email: '', phoneNumber: '', transferAmount: '' });
  };

  const handleZelleEmailChange = (e) => {
    setZelleFormData(prev => ({ ...prev, email: e.target.value }));
  };

  const handleZellePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    setZelleFormData(prev => ({ ...prev, phoneNumber: value }));
  };

  const handleZelleAmountChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, ''); // Only allow numbers and decimal point
    
    // Prevent multiple decimal points
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 2 decimal places
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    setZelleFormData(prev => ({ ...prev, transferAmount: value }));
  };

  const handleZelleSubmit = () => {
    if (!zelleFormData.email || !zelleFormData.phoneNumber || !zelleFormData.transferAmount) {
      alert('Please fill in all fields');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(zelleFormData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    closeZelleModal();
    handleTransferClick();
  };

  const isZelleFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return zelleFormData.email.trim() !== '' && 
           emailRegex.test(zelleFormData.email) &&
           zelleFormData.phoneNumber.trim() !== '' && 
           zelleFormData.transferAmount.trim() !== '' &&
           parseFloat(zelleFormData.transferAmount) > 0;
  };

  const handleWireBankNameChange = (e) => {
    const value = e.target.value.replace(/[0-9]/g, ''); // Remove all digits
    setWireFormData(prev => ({ ...prev, bankName: value }));
  };

  const handleWireRoutingNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow digits
    setWireFormData(prev => ({ ...prev, routingNumber: value }));
  };

  const handleWireCountryChange = (e) => {
    setWireFormData(prev => ({ ...prev, country: e.target.value }));
  };

  const handleWireAccountNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow digits
    setWireFormData(prev => ({ ...prev, accountNumber: value }));
  };

  const handleWireFullNameChange = (e) => {
    const value = e.target.value.replace(/[0-9]/g, ''); // Remove all digits
    setWireFormData(prev => ({ ...prev, fullName: value }));
  };

  const handleWireAmountChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, ''); // Only allow numbers and decimal point
    
    // Prevent multiple decimal points
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 2 decimal places
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    setWireFormData(prev => ({ ...prev, transferAmount: value }));
  };

  const handleWireSubmit = () => {
    if (!wireFormData.bankName || !wireFormData.routingNumber || !wireFormData.country || !wireFormData.accountNumber || !wireFormData.fullName || !wireFormData.transferAmount) {
      alert('Please fill in all fields');
      return;
    }
    
    closeWireModal();

    handleTransferClick();
  };

  const isWireFormValid = () => {
    return wireFormData.bankName.trim() !== '' && 
           wireFormData.routingNumber.trim() !== '' && 
           wireFormData.country.trim() !== '' &&
           wireFormData.accountNumber.trim() !== '' &&
           wireFormData.fullName.trim() !== '' &&
           wireFormData.transferAmount.trim() !== '' &&
           parseFloat(wireFormData.transferAmount) > 0;
  };

  const isFormValid = () => {
    return formData.recipientName.trim() !== '' && 
           formData.accountNumber.trim() !== '' && 
           formData.transferAmount.trim() !== '' &&
           parseFloat(formData.transferAmount) > 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 px-6 lg:p-12">
      {/* Loading Overlay */}
      {showLoading && (
        <div style={{backgroundColor: 'rgba(1, 1, 1, 0.9)'}} className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>
              <p className="text-gray-700 font-medium">Processing...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
      <div style={{backgroundColor: 'rgba(1, 1, 1, 0.9)'}} className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
              <div className="bg-red-100 rounded-full p-2">
                  <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Transfer Unavailable</h3>
              </div>
              <button 
              onClick={() => setShowErrorModal(false)}
              className="text-gray-400 hover:text-gray-600"
              >
              <X className="w-5 h-5" />
              </button>
          </div>
          
          <div className="ml-11 mb-6">
              <p className="text-gray-700 mb-4">
              {details?.message}
              </p>
              <p className="text-gray-700 mb-2">
              Please contact us to resolve this issue:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              {/* <p className="text-sm text-gray-600 mb-1">Your claims representative</p> */}
              <p className="text-xl font-semibold text-blue-700">{formatPhoneNumber(details?.contact || '')}</p>
              </div>
          </div>
          
          <div className="flex justify-end">
              <button 
              onClick={() => setShowErrorModal(false)}
              className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
              Close
              </button>
          </div>
          </div>
      </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Pay & Transfer Header */}
        <h1 className="text-2xl lg:text-3xl font-light text-gray-800 mb-8">Pay & Transfer</h1>

        {/* Payment Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {/* Transfer Card */}
          <button onClick={() => setShowTransferForm(true)} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col items-center text-center group w-full">
            <div className="mb-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 24H40M40 24L32 16M40 24L32 32M8 24L16 16M8 24L16 32" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-base lg:text-lg font-medium text-blue-700 mb-2 group-hover:underline">Transfer</h3>
            <p className="text-xs lg:text-sm text-gray-600">between my accounts</p>
          </button>

          {/* Zelle Card */}
          <button onClick={() => setShowZelleForm(true)} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col items-center text-center group w-full">
            <div className="mb-4">
              <img src={zelle} alt="" className="h-9 lg:h-9 object-contain" />
            </div>
            <h3 className="text-base lg:text-lg font-medium text-blue-700 mb-2 group-hover:underline">Zelle®</h3>
            <p className="text-xs lg:text-sm text-gray-600">send or receive</p>
          </button>

          {/* Wire/ACH Card */}
          <button onClick={() => setShowWireForm(true)} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col items-center text-center group w-full">
            <div className="mb-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="14" stroke="#1D4ED8" strokeWidth="2"/>
                <ellipse cx="24" cy="24" rx="6" ry="14" stroke="#1D4ED8" strokeWidth="2"/>
                <path d="M10 24H38M24 10C24 10 18 16 18 24C18 32 24 38 24 38M24 10C24 10 30 16 30 24C30 32 24 38 24 38" stroke="#1D4ED8" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="text-base lg:text-lg font-medium text-blue-700 mb-2 group-hover:underline">Wire/ACH</h3>
            <p className="text-xs lg:text-sm text-gray-600">U.S. or international</p>
          </button>
        </div>

        {/* Activity Section */}
        <div className="mb-8">
          {/* History Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800">History</h3>
                <p className="text-sm text-gray-600">Last 3 months</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                  <span className="text-xs lg:text-sm">Sort: Date (Newest)</span>
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                  <span className="text-xs lg:text-sm">Filter</span>
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Transaction Entry */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm lg:text-base font-medium text-gray-800">ACH Wire Deposit</p>
                  <p className="text-xs lg:text-sm text-gray-600">Adv SafeBalance Banking - {details.last_four}</p>
                </div>
                <div className="flex items-center justify-between lg:justify-end gap-4">
                  <span className="text-sm lg:text-base font-semibold text-gray-800" style={{color: 'green'}}>+${parseFloat(details.balance).toLocaleString('en-US')}</span>
                  <span className="text-xs lg:text-sm text-gray-600">
                    {details.created}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Form Modal */}
        {showTransferForm && (
          <div onClick={closeModal} className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{backgroundColor: 'rgba(1, 1, 1, 0.9)'}}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Transfer Funds</h2>
                  <button 
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Recipient Name */}
                  <div>
                    <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient's Full Name
                    </label>
                    <input
                      type="text"
                      id="recipientName"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleNameChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter recipient's name"
                    />
                  </div>

                  {/* Account Number */}
                  <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient's Account Number
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleAccountNumberChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter account number"
                    />
                  </div>

                  {/* Account Type */}
                  <div>
                    <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <select
                      id="accountType"
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="checking">Checking</option>
                      <option value="savings">Savings</option>
                    </select>
                  </div>

                  {/* Transfer Amount */}
                  <div>
                    <label htmlFor="transferAmount" className="block text-sm font-medium text-gray-700 mb-2">
                      Transfer Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="text"
                        id="transferAmount"
                        name="transferAmount"
                        value={formatAmountDisplay(formData.transferAmount)}
                        onChange={handleAmountChange}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick= {handleSubmit}
                      disabled={!isFormValid()}
                      className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                    >
                      Submit Transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wire/ACH Form Modal */}
        {showWireForm && (
          <div onClick={closeWireModal} className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{backgroundColor: 'rgba(1, 1, 1, 0.9)'}}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Wire/ACH Transfer</h2>
                  <button 
                    onClick={closeWireModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Bank Name */}
                  <div>
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      value={wireFormData.bankName}
                      onChange={handleWireBankNameChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter bank name"
                    />
                  </div>

                  {/* Routing Number */}
                  <div>
                    <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      id="routingNumber"
                      name="routingNumber"
                      value={wireFormData.routingNumber}
                      onChange={handleWireRoutingNumberChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter routing number"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={wireFormData.country}
                      onChange={handleWireCountryChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select a country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="CN">China</option>
                      <option value="IN">India</option>
                      <option value="BR">Brazil</option>
                      <option value="MX">Mexico</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="wireFullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="wireFullName"
                      name="fullName"
                      value={wireFormData.fullName}
                      onChange={handleWireFullNameChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter recipient's full name"
                    />
                  </div>

                  {/* Account Number */}
                  <div>
                    <label htmlFor="wireAccountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="wireAccountNumber"
                      name="accountNumber"
                      value={wireFormData.accountNumber}
                      onChange={handleWireAccountNumberChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter account number"
                    />
                  </div>

                  {/* Amount */}
                  <div>
                    <label htmlFor="wireTransferAmount" className="block text-sm font-medium text-gray-700 mb-2">
                      Transfer Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="text"
                        id="wireTransferAmount"
                        name="transferAmount"
                        value={formatAmountDisplay(wireFormData.transferAmount)}
                        onChange={handleWireAmountChange}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeWireModal}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleWireSubmit}
                      disabled={!isWireFormValid()}
                      className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                    >
                      Submit Transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Zelle Form Modal */}
        {showZelleForm && (
          <div onClick={closeZelleModal} className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{backgroundColor: 'rgba(1, 1, 1, 0.9)'}}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Zelle® Transfer</h2>
                  <button 
                    onClick={closeZelleModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Email Address */}
                  <div>
                    <label htmlFor="zelleEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient's Email Address
                    </label>
                    <input
                      type="email"
                      id="zelleEmail"
                      name="email"
                      value={zelleFormData.email}
                      onChange={handleZelleEmailChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter email address"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="zellePhone" className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient's Phone Number
                    </label>
                    <input
                      type="text"
                      id="zellePhone"
                      name="phoneNumber"
                      value={formatPhoneNumber(zelleFormData.phoneNumber)}
                      onChange={handleZellePhoneChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* Transfer Amount */}
                  <div>
                    <label htmlFor="zelleAmount" className="block text-sm font-medium text-gray-700 mb-2">
                      Transfer Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="text"
                        id="zelleAmount"
                        name="transferAmount"
                        value={formatAmountDisplay(zelleFormData.transferAmount)}
                        onChange={handleZelleAmountChange}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeZelleModal}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleZelleSubmit}
                      disabled={!isZelleFormValid()}
                      className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                    >
                      Submit Transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
