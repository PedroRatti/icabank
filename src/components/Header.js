const Header = () => {
    return (
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="https://icabank.com.br/static/media/Logo.6e249b4f.svg" // Substitua pela sua logo
                alt="Logo"
                className="h-8 w-auto"
              />
            </div>
  
            {/* Navegação */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#home"
                className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#contact"
                className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Contato
              </a>
              <a
                href="#about"
                className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Sobre
              </a>
            </nav>
  
            {/* Botão de Logout */}
            <div className="hidden md:block">
              <button className="bg-primary text-black px-4 py-2 rounded-md shadow-sm hover:bg-opacity-90">
                Logout
              </button>
            </div>
  
            {/* Menu para mobile */}
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
  
        {/* Menu para mobile (quando aberto) */}
        <div className="md:hidden">
          <nav className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="#home"
              className="block text-gray-900 hover:bg-primary hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="#contact"
              className="block text-gray-900 hover:bg-primary hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Contato
            </a>
            <a
              href="#about"
              className="block text-gray-900 hover:bg-primary hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Sobre
            </a>
            <button className="w-full bg-primary text-white px-4 py-2 rounded-md shadow-sm hover:bg-opacity-90">
              Logout
            </button>
          </nav>
        </div>
      </header>
    );
  };
  
  export default Header;