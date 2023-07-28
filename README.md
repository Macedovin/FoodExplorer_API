<p align="center">
  <img src="./README-assets/README-icon.png" width="140px" alt="Food Explorer logo" />
</p>

<h4 align="center"> 
	 Status: Under development.
</h4>

<br/>

# Food Explorer API

<br/>

**Rocketseat's Explorer program ultimate challenge API.** 

---

<p align="center">
	<a href="#about">About</a> •
  <a href="#preview">Preview</a> •
	<a href="#tech-stack-and-tools">Tech Stack and tools</a> •
  <a href="#functionalities">Functionalities</a> •
	<a href="#utilization">Utilization</a> •
	<a href="#publication">Publication</a> •
	<a href="#author">Author</a> 
</p>

---

## About

> An API that helps at restaurant managing through an interactive menu.

Project developed as a result of the teachings learned at Rocketseat's program Explorer, a FullStack developer formation.

A Backend API using JavaScript and NodeJS that allows you to sign up and sign in as a default user as well as sign in as administrator.

As the first persona you will be able to edit your profile, see all the registered dishes, add them to favorites, checking and editing this list after, see it details by clicking them, add as many itens as you want to the shopping cart and see your current and previous orders.

As the second persona you will be able to create, see/ read, edit and delete (CRUD) any dishes at any time, add them to favorites, checking and edit this list after, see and control all and each one of the requests and its statuses, as well as see all the users and assign them to administrator role as needed and wanted.

## Preview



## Tech Stack and tools

<div style="display: inline_block"><br>
	<img align="center" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg" alt="Macedovin-Js" />
	<img align="center" height="40" width="40" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/nodejs/nodejs-plain.svg" alt="Macedovin-NodeJs" />
	<img align="center" height="40" width="40" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/npm/npm-original-wordmark.svg" alt="Macedovin-NPM" />
	<img align="center" height="60" width="60" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/sqlite/sqlite-original-wordmark.svg" alt="Macedovin-SQLite" />
	<img align="center" height="30" width="70" src="https://google.github.io/sqlcommenter/images/knex-logo.png" alt="Macedovin-Knex" />
	<img align="center" height="60" width="70" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/express/express-original-wordmark.svg" alt="Macedovin-Express" />
	<img align="center" height="40" width="45" src="./README-assets/Multer-icon.png" alt="Macedovin-Multer" />
	<img align="center" height="80" width="110" src="./README-assets/Beekeeper-Studio.svg" alt="Macedovin-Beekeeper" />	
	<img align="center" height="80" width="110" src="./README-assets/Insomnia.svg" alt="Macedovin-Insomnia" />
	<img align="center" height="40" width="40" src="https://raw.githubusercontent.com/caolan/async/086485292d80225ba3a22976b92831612e3e2373/logo/async-logo.svg" alt="Macedovin-Async" />
	<img align="center" height="40" width="100" src="./README-assets/jwtio-json-web-token.svg" alt="Macedovin-JSON Web Token" />	
	<img align="center" height="30" width="80" src="./README-assets/Bcryptjs.png" alt="Macedovin-BcryptJS" />
	<img align="center" height="30" width="80" src="https://raw.githubusercontent.com/Unitech/pm2/master/pres/pm2-v4.png" alt="Macedovin-PM2" />
	<img align="center" height="20" width="70" src="./README-assets/Lucid_chart-logo.png" alt="Macedovin-Lucid Chart" />
</div>

## Functionalities

- Register a user;
- Update user name, email, password, and avatar;
- Show the details of an specific dish;
- See/ read/ list/ index all available dishes;

	- In addition to being able to filter them by name or ingredient;

- As Administrator:

	> Do everything a default user can do and more.

	- List all users and change their personas, including them as other administrators;
	- Create, list/ read/ index and delete dishes categories;
	- Create and delete ingredients;
	- Create and delete dishes;
	- Update dish name, description, price, category, ingredients and picture;

## Utilization

- [Initializing the application](#initializaing-the-application)
- [Using the resources](#using-the-resources)
	- [Users roles](#users-roles)
		- [Create roles](#green_circle-post-roles)
		- [Create users](#green_circle-post-users)
	- [Users](#users)
		- [Update users](#orange_circle-put-users)

:badger:


---

### Initializing the application

To view that application functioning follow along the next steps:

- Make a clone of this repository;
- In the project root directory, install all **project dependencies** by typing this command line:

	```bash
	npm install
	```

	> To follow this step, [NodeJS with NPM](https://nodejs.org/) is required.

- The next step is to run the start command line:

	```bash
	npm start
	```

- After that, everything going well, the project can be accessed by a localhost port seen in the command line bellow:

  ```bash
	Server is running on port 3333.
  ```

- This means that a local server is running on the mentioned port;
- To use all resources from this API, use the following base URL:

	`http://localhost:3333`

- To make the requests, [Insomnia](https://insomnia.rest/download) will be used;

---

### Using the resources

- #### **Users roles**

	#### :green_circle: **POST/ roles**  

	**Description:** Create a role 

		First of all, create useful roles for the establishment. For now, this API is handling tow personas: _administrator_ and _default user_. To create a role, send a request at URL:

		`http://localhost:3333/roles`

	**ATTENTION**:

	> Use "ROLE_'NEW-ROLE'" as a pattern for the roles.
	
	> "ROLE_USER" has to be the first one to receive id (identity/ id = 1), as this will be used later. 

	**Requests**

	```json
	{
		"role": "ROLE_USER",
		"description": "Usuário padrão."
	}
	```

	```json
	{
		"role": "ROLE_ADMIN",
		"description": "Administrador."
	}
	```

	**Response**

	```json
	{
		"status": 201,
		"message": "Persona cadastrada com sucesso."
	}
	```

	#### :green_circle: **POST/ users**

	**Description:** Create a user
	
	Second step is create two specific first users: 

	- "Administrator

		> Will manage and can access the hole API having both roles/ personas;

	- "User"
		
		> Will have restricted accesses and only one role/ persona ("ROLE_USER"), assigned to him as default;
	
	To achieve this, send the requests at URL bellow:

	`http://localhost:3333/users`

	**ATTENTION**:

	> As security, encrypt Administrator password, is advised, using the tool of your choice (MD5HASH was used here). Save it for security and future accesses.

	> All users created without "roles" sended within request will be assigned as _"default users"_. 

	**Requests**

	- **Administrator**

	```json
	{
		"name": "Administrador",
		"email": "admin@foodexplorer.com",
		"password": "yourEncryptedPassword123",
		"roles": [
			"ROLE_USER",
			"ROLE_ADMIN"
		]
	}
	```

	- **Default user**

	```json
	{
		"name": "Usuário",
		"email": "user@foodexplorer.com",
		"password": "yourPassword123"
	}
	```

	**Responses**

	```json
	[
		{
			"userCreated": {
				"id": 1,
				"name": "Administrador",
				"email": "admin@foodexplorer.com"
			}
		},
		{
			"status": 201,
			"message": "Usuário cadastrado com sucesso."
		}
	]
	```

	```json
	[
		{
			"userCreated": {
				"id": 2,
				"name": "Usuário",
				"email": "user@foodexplorer.com"
			}
		},
		{
			"status": 201,
			"message": "Usuário cadastrado com sucesso."
		}
	]
	```
- #### **Users**

	#### :orange_circle: **PUT/ users**

	**Description:**  Update a user
	



	🔵 **GET/ users_roles**

	**Description:** Show a user

	Access and verify the roles of an authenticated user. URL for this:

	`http://localhost:3333/roles`