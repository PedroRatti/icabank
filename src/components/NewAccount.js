const NewAccount = ({ handleSubmit, closeWindow }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Create New User Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Account Type</label>
                            <select
                                required
                                name="accountType"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm px-2"
                            >
                                <option value="" disabled>Select Account Type</option>
                                <option value="PERSONAL">PERSONAL</option>
                                <option value="BUSINESS">BUSINESS</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm px-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Document</label>
                            <input
                                required
                                type="text"
                                name="document"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm px-2"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={closeWindow}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewAccount;