const Header = () => {

  const logOut = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  }

    return (
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex-shrink-0">
              <img
                src="https://icabank.com.br/static/media/Logo.6e249b4f.svg"
                alt="Logo"
                className="h-8 w-auto"
              />
            </div>
  
            <div className="hidden md:block">
              <button className="bg-primary text-black px-4 py-2 rounded-md shadow-sm hover:bg-opacity-90" onClick={logOut}>
                Logout
              </button>
            </div>
  
            <div className="md:hidden">
              <button
                className="text-gray-900"
                type="button"
                aria-label="Open mobile menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
  
      </header>
    );
  };
  
  export default Header;