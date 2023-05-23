<p align="center">
  <img src="./README-assets/README-icon.png" width="140px" alt="Food Explorer logo" />
</p>

<h4 align="center"> 
	 Status: Under development.
</h4>

<br/>

# Food Explorer

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

As the first persona you will be able to edit your profile, see all the registered dishes, add them to favorites, checking and editing this list after, see it details by clicking them, add as many itens as you want to the shopping cart, see your current and previous orders and do the checkout.

As the second persona you will be able to create, see /read, edit and delete (CRUD) any dishes at any time, add them to favorites, checking and edit this list after, see and control all and each one of the requests and its , as well as see all the users and assign them to administrator role as needed and wanted.

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
	<img align="center" height="40" width="100" src="./README-assets/jwtio-json-web-token.svg" alt="Macedovin-JSON Web Token" />	
	<img align="center" height="30" width="80" src="./README-assets/Bcryptjs.png" alt="Macedovin-BcryptJS" />
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

- [initializing the application](#initializing-the-application)
- [Using the resources](#using-the-resources)
  - [Usuários](#usuários)
    - [Criar](#criar-um-usuário)
    - [Atualizar](#atualizar-um-usuário)
    - [Atualizar o Avatar](#atualizar-o-avatar-de-um-usuário)
  - [Seções](#seções)
    - [Criar](#criar-uma-seção)
  - [Notas](#notas)
    - [Criar](#criar-uma-nota)
    - [Atualizar](#atualizar-uma-nota)
    - [Excluir](#excluir-uma-nota)
    - [Mostrar Especifica](#mostrar-uma-nota)
    - [Mostrar Várias](#mostrar-várias-notas)
  - [Arquivos](#arquivos)
    - [Mostrar](#mostrar-um-arquivo)

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

- #### 