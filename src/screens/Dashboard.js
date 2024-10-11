import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
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
                    console.log(accountData, 'contas');
                    
                } else {
                    console.error(`Error when searching for account with ID: ${id}`);
                }
            } catch (error) {
                console.error(`Connection error when searching for account with ID: ${id}`, error);
            }
        }
        setAccounts(accountsData);
    };

    // Função para abrir a janela de criar conta
    const openWindow = () => setIsWindowOpen(true);

    // Função para fechar a janela
    const closeWindow = () => {
        setIsWindowOpen(false);
    };

    // Função para exibir os detalhes do usuário
    const openUserDetails = (account) => {
        setUserDetails(account);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false); // Fecha o modal de detalhes
    };

    // Função para buscar e abrir o extrato de um usuário
    const openStatemant = async (account) => {
        setSelectedUser(account);

        let url = `${endpoint}/account/${account.id}/statement`;

        // Adiciona parâmetros de data se estiverem preenchidos
        if (startDate || endDate) {
            url += `?${startDate ? `startDate=${startDate}&` : ''}${endDate ? `endDate=${endDate}` : ''}`;
        }

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
                    setNoStatemant(false); // Existem transações
                } else {
                    setNoStatemant(true); // Não há transações
                }
            } else {
                console.error('Erro ao buscar extrato:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão ao buscar extrato:', error);
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
                        console.log('IDs das contas salvos no localStorage:', accountIds);
                    }
                    closeWindow();
                } else {
                    console.error('erro ao criar conta:', data.message);
                }
            })
            .catch((error) => {
                console.error('error', error);
            });
    };

    // Função para somar os saldos
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Painel Bancário - Administração</h1>

                {/* Botão para criar uma nova conta */}
                <div className="mb-6">
                    <button
                        onClick={openWindow}
                        className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary-dark"
                    >
                        Criar Nova Conta
                    </button>
                </div>

                {/* Resumo das contas */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700">Resumo das Contas</h2>
                    <p>Total de contas abertas: {accounts.length}</p>
                    <p>Total de dinheiro no banco: $ {totalBalance.toFixed(2)}</p>
                </div>

                {/* Lista de usuários */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                    {accounts.map((account) => (
                        <div key={account.id} className="p-4 bg-gray-50 border rounded-md shadow-sm relative">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {account.name} {account.surname}
                            </h2>
                            <p className="text-gray-700">Document: {account.document}</p>
                            <p className="text-gray-700">Balance: $ {account.balance.toFixed(2)}</p>

                            {/* Botão para visualizar extrato */}
                            <button
                                onClick={() => openStatemant(account)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Ver Extrato
                            </button>
                            {/* Botão para exibir detalhes do usuário */}
                            <button
                                onClick={() => openUserDetails(account)}
                                className="text-green-500 hover:text-green-700 ml-4"
                            >
                                Details
                            </button>
                        </div>
                    ))}
                </div>

                {isDetailsModalOpen && accountDetails && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Detalhes da Conta</h2>
                            <p><strong>Nome:</strong> {accountDetails.name}</p>
                            <p><strong>Documento:</strong> {accountDetails.document}</p>
                            <p><strong>Saldo:</strong> R$ {accountDetails.balance.toFixed(2)}</p>
                            <p><strong>Account Number:</strong> {accountDetails.number}</p>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={closeDetailsModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Window para adicionar novo usuário */}
                {isWindowOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Criar Nova Conta de Usuário</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tipo de Conta</label>
                                        <input
                                            type="text"
                                            name="accountType"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Documento</label>
                                        <input
                                            type="text"
                                            name="document"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={closeWindow}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                                    >
                                        Adicionar Usuário
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Modal para exibir extrato de um usuário */}
                {isStatemantOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Extrato de {selectedUser.name}</h2>

                            {/* Verifica se há transações */}
                            {noStatemant ? (
                                <p className="text-gray-500">Ainda não há transferências.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {statemant.map((item, index) => (
                                        <li key={index} className="flex justify-between text-gray-700">
                                            <span>{item.date}</span>
                                            <span>{item.description}</span>
                                            <span>{item.recipientName}</span>
                                            <span>R$ {item.amount.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={closeStatemant}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;