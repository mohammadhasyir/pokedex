
# Pokedex App
	
	Laravel ver:12.11.2
	Next.js ver: 16.1.6

Setup:
	

 - go to the /frontend directory and run command ***npm install*** in the terminal
 - go to the /backend directory and run command ***composer install*** or ***composer update*** in the terminal
 - make a copy of env.example and rename it into .env
 - run command ***php artisan key:generate*** in the terminal

To run the system:

 - run command ***npm run dev*** for /frontend
 - run command ***php artisan serve*** for /backend

API endpoint:

 - http://localhost:8000/api/pokemons/?offset={number}&limit={number} (GET)
 - http://localhost:8000/api/pokemons/search (POST)

	

