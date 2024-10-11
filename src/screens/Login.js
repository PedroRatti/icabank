import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {

    const endpoint = "https://mock-ica.aquarela.win";
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const clientId = event.target.clientId.value;
        const clientSecret = event.target.clientSecret.value;

        fetch(`${endpoint}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientId: clientId,
                clientSecret: clientSecret,
            }),
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <Header />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        src="https://icabank.com.br/static/media/Logo.6e249b4f.svg"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="clientId" className="block text-sm font-medium leading-6 text-gray-900">
                                Client ID
                            </label>
                            <div className="mt-2">
                                <input
                                    id="clientId"
                                    name="clientId"
                                    type="text"
                                    required
                                    autoComplete="client-id"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="clientSecret" className="block text-sm font-medium leading-6 text-gray-900">
                                    Client Secret
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-primary hover:text-primary">
                                        Forgot secret?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="clientSecret"
                                    name="clientSecret"
                                    type="password"
                                    required
                                    autoComplete="client-secret"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
