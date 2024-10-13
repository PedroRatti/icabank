import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AccountDetails from "../components/AccountDetails";
import NewAccount from "../components/NewAccount";

const Dashboard = () => {

    const endpoint = "https://mock-ica.aquarela.win";
    const token = localStorage.getItem('access_token');
    var accountIds = JSON.parse(localStorage.getItem('account_ids')) || [];
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isStatemantOpen, setIsStatemantOpen] = useState(false);
    const [accountDetails, setUserDetails] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [statemant, setStatemant] = useState([]);
    const [noStatemant, setNoStatemant] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            accountsList();
        }
    }, [navigate]);

    const accountsList = async () => {
        if (accountIds.length === 0) {
            return "No account registered";
        }

        var accountsData = [];

        for (var id of accountIds) {
            try {
                const response = await fetch(`${endpoint}/account/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.status === 401) {
                    navigate('/login');
                }
                if (response.ok) {
                    const accountData = await response.json();
                    accountsData.push(accountData);
                    console.log(accountData, 'accounts');

                } else {
                    console.error(`Error when searching for account with ID: ${id}`);
                }
            } catch (error) {
                console.error(`Connection error when searching for account with ID: ${id}, error`);
            }
        }
        setAccounts(accountsData);
    };

    // Function to open the create account window
    const openWindow = () => setIsWindowOpen(true);

    // Function to close the window
    const closeWindow = () => {
        setIsWindowOpen(false);
    };

    // Function to display user details
    const openUserDetails = (account) => {
        setUserDetails(account);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false); // Close the details modal
    };

    // Function to fetch and open a user's statement
    const openStatemant = async (account) => {
        setSelectedUser(account);

        let url = `${endpoint}/account/${account.id}/statement`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                navigate('/login');
            }

            if (response.ok) {
                const data = await response.json();
                if (data.transactions.length > 0) {
                    setStatemant(data.transactions);
                    setNoStatemant(false); // There are transactions
                } else {
                    setNoStatemant(true); // No transactions
                }
            } else {
                console.error('Error fetching statement:', response.statusText);
            }
        } catch (error) {
            console.error('Connection error fetching statement:', error);
        }

        setIsStatemantOpen(true);
    };

    const closeStatemant = () => {
        setSelectedUser(null);
        setIsStatemantOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const accountType = event.target.accountType.value;
        const name = event.target.name.value;
        const document = event.target.document.value;

        fetch(`${endpoint}/account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                accountType: accountType,
                name: name,
                document: document,
            }),
        })
            .then(async (response) => {

                if (response.status === 401) {
                    navigate('/login');
                }
                const data = await response.json();
                if (response.ok) {

                    if (data.id) {
                        accountIds.push(data.id);
                        localStorage.setItem('account_ids', JSON.stringify(accountIds));
                        console.log('Account IDs saved to localStorage:', accountIds);
                    }
                    closeWindow();
                    window.location.reload();
                } else {
                    console.error('Error creating account:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error', error);
            });
    };

    // Function to sum the balances
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Bank Dashboard - Administration</h1>

                    {/* Button to create a new account */}
                    <div className="mb-6">
                        <button
                            onClick={openWindow}
                            className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary-dark"
                        >
                            Create New Account
                        </button>
                    </div>

                    {/* Account summary */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-700">Account Summary</h2>
                        <p>Total accounts: {accounts.length}</p>
                        <p>Total money in bank: $ {totalBalance.toFixed(2)}</p>
                    </div>

                    {/* User list */}
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        {accounts.map((account) => (
                            <div key={account.id} className="p-4 bg-gray-50 border rounded-md shadow-sm relative">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {account.name} {account.surname}
                                </h2>
                                <p className="text-gray-700">Document: {account.document}</p>
                                <p className="text-gray-700">Balance: $ {account.balance.toFixed(2)}</p>

                                {/* Button to view statement */}
                                <button
                                    onClick={() => openStatemant(account)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    View Statement
                                </button>
                                {/* Button to display user details */}
                                <button
                                    onClick={() => openUserDetails(account)}
                                    className="text-green-500 hover:text-green-700 ml-4"
                                >
                                    Details
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Account Details */}
                    {isDetailsModalOpen && accountDetails && (
                        <AccountDetails 
                            accName={accountDetails.name}
                            accDocument={accountDetails.document}
                            accBalance={accountDetails.balance}
                            accNumber={accountDetails.number}
                            closeDetailsModal={closeDetailsModal}
                        />
                    )}

                    {/* Window to add new account */}
                    {isWindowOpen && (
                        <NewAccount handleSubmit={handleSubmit} closeWindow={closeWindow} />
                    )}

                    {/* Modal to display account's statement */}
                    {isStatemantOpen && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                <h2 className="text-xl font-bold mb-4">Statement of {selectedUser.name}</h2>

                                {/* Check if there are transactions */}
                                {noStatemant ? (
                                    <p className="text-gray-500">No transactions yet.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {statemant.map((item, index) => (
                                            <li key={index} className="flex justify-between text-gray-700">
                                                <span>{item.date}</span>
                                                <span>{item.description}</span>
                                                <span>{item.recipientName}</span>
                                                <span>$ {item.amount.toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={closeStatemant}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;