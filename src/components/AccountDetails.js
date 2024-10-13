const AccountDetails = ({ accName, accDocument, accBalance, accNumber, closeDetailsModal }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Account Details</h2>
                <p><strong>Name:</strong> {accName}</p>
                <p><strong>Document:</strong> {accDocument}</p>
                <p><strong>Balance:</strong> $ {accBalance.toFixed(2)}</p>
                <p><strong>Account Number:</strong> {accNumber}</p>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={closeDetailsModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;