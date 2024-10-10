import { useState } from "react";

const Dashboard = () => {
    // mock users(usar db posteriormente)
    const [users, setUsers] = useState([
        {
            id: 1, name: "João", surname: "Silva", dob: "1990-05-12", cpf: "123.456.789-10", balance: 1200.0,
            transactions: [{ date: "2024-01-15", description: "Depósito", amount: 1200 }]
        },
        {
            id: 2, name: "Maria", surname: "Souza", dob: "1985-08-25", cpf: "987.654.321-00", balance: 5300.0,
            transactions: [{ date: "2024-02-20", description: "Depósito", amount: 5300 }]
        },
    ]);

    // flags para abrir e fechar janelas
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // selecionar um usuário
    const [isTransactionOpen, setIsTransactionOpen] = useState(false);

    // criar novos usuarios /tenant
    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        dob: "",
        cpf: "",
        balance: 0,
    });

    // Função para abrir o modal de criar conta
    const openModal = () => setIsModalOpen(true);
    
    // Função para fechar o modal
    const closeModal = () => {
        setNewUser({ name: "", surname: "", dob: "", cpf: "", balance: 0 });
        setIsModalOpen(false);
    };

    // Verifica se todos os campos foram preenchidos
    const isFormValid = newUser.name && newUser.surname && newUser.dob && newUser.cpf && newUser.balance;

    // Função para adicionar um novo usuário
    const addUser = () => {
        const newUserWithId = {
            ...newUser,
            id: users.length + 1,
            balance: parseFloat(newUser.balance), // Converte para número
            transactions: [{ date: new Date().toISOString().split('T')[0], description: "Depósito", amount: parseFloat(newUser.balance) }],
        };
        setUsers([...users, newUserWithId]);
        closeModal();
    };

    // Função para excluir um usuário
    const deleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    };

    // Função para somar os saldos
    const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);

    // Função para abrir o extrato de um usuário
    const openTransactions = (user) => {
        setSelectedUser(user);
        setIsTransactionOpen(true);
    };

    // Função para fechar o extrato
    const closeTransactions = () => {
        setSelectedUser(null);
        setIsTransactionOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Painel Bancário - Administração</h1>

                {/* Botão para criar uma nova conta */}
                <div className="mb-6">
                    <button
                        onClick={openModal}
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                    >
                        Criar Nova Conta
                    </button>
                </div>

                {/* Resumo das contas */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700">Resumo das Contas</h2>
                    <p>Total de contas abertas: {users.length}</p>
                    <p>Total de dinheiro no banco: R$ {totalBalance.toFixed(2)}</p>
                </div>

                {/* Lista de usuários */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                    {users.map((user) => (
                        <div key={user.id} className="p-4 bg-gray-50 border rounded-md shadow-sm relative">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {user.name} {user.surname}
                            </h2>
                            <p className="text-gray-700">CPF: {user.cpf}</p>
                            <p className="text-gray-700">Data de Nascimento: {user.dob}</p>
                            <p className="text-gray-700">Saldo: R$ {user.balance.toFixed(2)}</p>

                            {/* Botão para visualizar extrato */}
                            <button
                                onClick={() => openTransactions(user)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Ver Extrato
                            </button>

                            {/* Botão para excluir */}
                            <button
                                onClick={() => deleteUser(user.id)}
                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                            >
                                Excluir
                            </button>
                        </div>
                    ))}
                </div>

                {/* Modal para adicionar novo usuário */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Criar Nova Conta de Usuário</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nome</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                        value={newUser.surname}
                                        onChange={(e) => setNewUser({ ...newUser, surname: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                        value={newUser.dob}
                                        onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">CPF</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                        value={newUser.cpf}
                                        onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Saldo Inicial</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                        value={newUser.balance}
                                        onChange={(e) => setNewUser({ ...newUser, balance: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={addUser}
                                    className={`${
                                        isFormValid ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    } px-4 py-2 rounded-md`}
                                    disabled={!isFormValid}
                                >
                                    Adicionar Usuário
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para visualizar extrato de um usuário */}
                {isTransactionOpen && selectedUser && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Extrato de {selectedUser.name} {selectedUser.surname}</h2>
                            <ul className="space-y-2">
                                {selectedUser.transactions.map((transaction, index) => (
                                    <li key={index} className="flex justify-between text-gray-700">
                                        <span>{transaction.date}</span>
                                        <span>{transaction.description}</span>
                                        <span>R$ {transaction.amount.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={closeTransactions}
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
