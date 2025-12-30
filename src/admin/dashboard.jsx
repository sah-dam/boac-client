import { useState, useEffect } from 'react';
import { Users, MessageSquare, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('accounts');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [errMessageFromDb, setErrMessagefromDb] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userId: '',
    password: '',
    balance: '',
    accountLast4: ''
  });
  const [messageData, setMessageData] = useState({
    message: '',
    contact: '',
    contactDigits: ''
  });

  const api_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const getAccounts = async () => {
        fetch(`${api_url}/getaccounts`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: (await cookieStore.get('boac_admin_email'))?.value, 
                password: (await cookieStore.get('boac_admin_pass'))?.value,
            })
        })
        .then(async response => {
            if (response.status == 401) {
                return navigate('../login')
            }
            else if (response.ok) {
                setAccounts(await response.json());
            }
        })
    }
    getAccounts();
  }, []);

  useEffect(() => {
    const getAccounts = async () => {
        fetch(`${api_url}/geterrmessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: (await cookieStore.get('boac_admin_email'))?.value, 
                password: (await cookieStore.get('boac_admin_pass'))?.value,
            })
        })
        .then(async response => {
            if (response.status == 401) {
                return navigate('../login')
            }
            else if (response.ok) {
                setErrMessagefromDb(await response.json());
            }
        })
    }
    getAccounts();
  }, []);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMessageChange = (field, value) => {
    setMessageData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = 
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.userId.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.balance.trim() !== '' &&
    formData.accountLast4.length === 4;

  const isMessageFormValid = 
    messageData.message.trim() !== '' &&
    messageData.contact.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAccount = {
      fullName: `${formData.firstName} ${formData.lastName}`,
      userId: formData.userId,
      password: formData.password,
      balance: formData.balance,
      accountLast4: formData.accountLast4
    };

    const response = await fetch(`${api_url}/newaccount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: (await cookieStore.get('boac_admin_email'))?.value, 
            password: (await cookieStore.get('boac_admin_pass'))?.value,
            fname: formData.firstName, 
            lname: formData.lastName, 
            user_id: formData.userId, 
            account_password: formData.password, 
            balance: formData.balance.replaceAll(',', ''), 
            last_four: formData.accountLast4
        })
    });

    if (response.ok) {
        setAccounts(prev => [...prev, newAccount]);
        setFormData({
          firstName: '',
          lastName: '',
          userId: '',
          password: '',
          balance: '',
          accountLast4: ''
        });
        setShowAddForm(false);
    }
    else {
        if (response.status == 401) {
            return navigate('../login')
        }

        alert('Please check your input and try again.')
    }
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

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    console.log('New message:', messageData);

    // Add your API call here
    fetch(`${api_url}/errmessage`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: (await cookieStore.get('boac_admin_email'))?.value, 
            password: (await cookieStore.get('boac_admin_pass'))?.value,
            message: messageData.message,
            contact: messageData.contactDigits
        })
    })
    .then(async response => {
        if (response.status == 401) {
            return navigate('../login')
        }
        else if (response.ok) {
            setErrMessagefromDb([{
                message: messageData.message,
                contact: messageData.contactDigits
            }]);
        }
    })

    setMessageData({
      message: '',
      contact: '',
      contactDigits: ''
    });
    setShowMessageForm(false);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this account?')) {

      // Add your API call here to delete from backend
        fetch(`${api_url}/deleteaccount`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userId,
                email: (await cookieStore.get('boac_admin_email'))?.value, 
                password: (await cookieStore.get('boac_admin_pass'))?.value,
            })
            })
            .then(async response => {
                if (response.status == 401) {
                    return navigate('../login')
                }
                else if (response.ok) {
                    setAccounts(prev => prev.filter(account => account.id !== userId));
                }
        })
    }
  };

  const handleDeleteErrMessage = async () => {
    if (window.confirm('Are you sure you want to delete this account?')) {

      // Add your API call here to delete from backend
        fetch(`${api_url}/deleteerrmessage`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: (await cookieStore.get('boac_admin_email'))?.value, 
                password: (await cookieStore.get('boac_admin_pass'))?.value,
            })
            })
            .then(async response => {
                if (response.status == 401) {
                    return navigate('../login')
                }
                else if (response.ok) {
                    setErrMessagefromDb([]);
                }
        })
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setFormData({
      firstName: '',
      lastName: '',
      userId: '',
      password: '',
      balance: '',
      accountLast4: ''
    });
  };

  const handleMessageCancel = () => {
    setShowMessageForm(false);
    setMessageData({
      message: '',
      contact: '',
      contactDigits: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-light text-gray-900">Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('accounts')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === 'accounts'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users size={18} className="mr-2" />
                Accounts
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === 'messages'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageSquare size={18} className="mr-2" />
                Error Message
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'accounts' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Accounts</h2>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Account
                  </button>
                </div>
                <div className="space-y-3">
                  {accounts.map((account, index) => (
                    <div
                      key={account.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Full Name</p>
                          <p className="text-lg font-medium text-gray-900">{`${account.fname} ${account.lname}`}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(account.id)}
                          className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">User ID</p>
                          <p className="font-medium text-gray-900">{account.user_id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Password</p>
                          <p className="font-medium text-gray-900">{account.password}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Balance</p>
                          <p className="font-medium text-gray-900">${(+account.balance).toLocaleString('en-US')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Account Number</p>
                          <p className="font-medium text-gray-900">****{account.last_four}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Error Messages</h2>
                  <button
                    disabled={errMessageFromDb.length}
                    onClick={() => setShowMessageForm(true)}
                    className="flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
                    style={{ backgroundColor: (errMessageFromDb.length) ? 'gray' : 'black'}}
                  >
                    <Plus size={18} className="mr-2" />
                    New Message
                  </button>
                </div>
                <div className="space-y-3">
                  {errMessageFromDb.map((message, i) => (
                    <div
                      key={i}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-gray-900">Contact Number: {formatPhoneNumber(message.contact)}</p>
                        <button
                          onClick={handleDeleteErrMessage}
                          className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{message['message']}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Account Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Add New Account</h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[a-zA-Z\s\-'\.]*$/.test(value)) {
                        handleFormChange('firstName', value);
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                    placeholder="John"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[a-zA-Z\s\-'\.]*$/.test(value)) {
                        handleFormChange('lastName', value);
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                    placeholder="Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={formData.userId}
                    onChange={(e) => handleFormChange('userId', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                    placeholder="user_12345"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) => handleFormChange('password', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                    placeholder="Password123!"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Balance
                  </label>
                  <input
                    type="text"
                    value={formData.balance}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d.]/g, '');
                      const parts = value.split('.');
                      if (parts.length > 2) return;
                      
                      let formatted = value;
                      if (parts[0]) {
                        const num = parseFloat(parts[0]);
                        if (!isNaN(num)) {
                          formatted = num.toLocaleString('en-US');
                          if (parts.length === 2) {
                            formatted += '.' + parts[1].slice(0, 2);
                          }
                        }
                      }
                      handleFormChange('balance', formatted);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                    placeholder="1,234.56"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last 4 Digits of Account Number
                  </label>
                  <input
                    type="text"
                    value={formData.accountLast4}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,4}$/.test(value)) {
                        handleFormChange('accountLast4', value);
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                    placeholder="1234"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  isFormValid
                    ? 'text-white bg-gray-900 hover:bg-gray-800'
                    : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                }`}
              >
                Add Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Message Modal */}
      {showMessageForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">New Error Message</h3>
              <button
                onClick={handleMessageCancel}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={messageData.message}
                    onChange={(e) => handleMessageChange('message', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition resize-none"
                    placeholder="Enter your error message..."
                    rows="4"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact
                  </label>
                  <input
                    type="text"
                    value={messageData.contact}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const digitsOnly = inputValue.replace(/\D/g, '');
                      
                      // Check if user is deleting (input is shorter than current formatted value)
                      let newDigits = digitsOnly;
                      if (inputValue.length < messageData.contact.length) {
                        // User pressed backspace - remove last digit
                        newDigits = messageData.contactDigits.slice(0, -1);
                      }
                      
                      // Limit to 11 digits
                      newDigits = newDigits.substring(0, 11);
                      
                      // Format the phone number
                      let formatted = '';
                      if (newDigits.length > 0) {
                        formatted = '+' + newDigits.substring(0, 1);
                        if (newDigits.length > 1) {
                          formatted += ' (' + newDigits.substring(1, 4);
                          if (newDigits.length > 4) {
                            formatted += ') ' + newDigits.substring(4, 7);
                            if (newDigits.length > 7) {
                              formatted += '-' + newDigits.substring(7, 11);
                            }
                          } else if (newDigits.length === 4) {
                            formatted += ')';
                          }
                        }
                      }
                      
                      setMessageData(prev => ({
                        ...prev,
                        contact: formatted,
                        contactDigits: newDigits
                      }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                    placeholder="+1 (876) 555-1234"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleMessageCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleMessageSubmit}
                disabled={!isMessageFormValid}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  isMessageFormValid
                    ? 'text-white bg-gray-900 hover:bg-gray-800'
                    : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}