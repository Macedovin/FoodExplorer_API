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

The image below shows the database model used: 

<h2 align="center">
    <img src="./README-assets//DB_Model.png" alt="Macedovin Lucid Chart database model">
</h2>

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
	- [Sessions](#sessions)
		- [Create](#green_circle-post-sessions) 
	- [Users and roles](#users-and-roles)
		- [Create roles](#green_circle-post-roles)
		- [Create users](#green_circle-post-users)
		- [List/ Index all roles](#large_blue_circle-get-users_roles)
		- [Update users roles](#yellow_circle-patch-users_rolesid)
	- [Users](#users)
		- [Update users](#orange_circle-put-users)
		- [Update avatar](#yellow_circle-patch-usersavatar)
		- [Show roles](#large_blue_circle-get-usersroles)
	- [Dishes Categories](#dishes-categories)
		- [Create categories](#green_circle-post-dishes_categories)
		- [List/ Index all categories](#large_blue_circle-get-dishes_categories)
		- [Delete category](#red_circle-delete-dishes_categoriesid)
	- [Dishes](#dishes)
		- [Create dishes](#green_circle-post-dishes)
		- [List/ Index all dishes](#large_blue_circle-get-dishes)
		- [Show dish](#large_blue_circle-get-dishesid)
		- [Update dishes](#orange_circle-put-dishesid)
		- [Delete dish](#red_circle-delete-dishesid)
	- [Ingredients](#ingredients)
		- [Create ingredients](#green_circle-post-ingredients)
		- [Delete ingredients](#red_circle-delete-ingredientsid) 
	- [Favorites](#favorites)
		- [Create favorites](#green_circle-post-favoritesdish_id)
		-	[List/ Index user favorites](#large_blue_circle-get-favorites)
		- [Delete favorites](#red_circle-delete-favoritesdish_id)
	- [Orders](#orders)
		- [Create orders](#green_circle-post-orders)
		- [List/ Index orders of an user](#large_blue_circle-get-orders)
		- [Show order](#large_blue_circle-get-ordersid)
		- [Update orders](#orange_circle-put-ordersid)
		- [Delete orders](#red_circle-delete-ordersid)
	- [All orders](#all_orders)
		- [List/ Index orders](#large_blue_circle-get-all_orders)
		- [Update statuses](#yellow_circle-patch-all_ordersid)
	- [Statuses](#statuses)
		- [Create status](#green_circle-post-statuses)
		- [List/ Index statuses](#large_blue_circle-get-statuses)
	- [Files](#files)
		- [Avatar](#large_blue_circle-get-filesavatarimage-nameext)
		- [Picture](#large_blue_circle-get-filespictureimage-nameext)


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

- #### **Sessions**

	#### :green_circle: **POST/ sessions**

	**Description:**  Create sessions

	Almost all requests in this application (exception for [create users](#green_circle-post-users), [create roles](#green_circle-post-roles), [get files](), create sessions) requires a Bearer token (JTW) attached to it's headers.   

	To generate this token, send a request at URL bellow:

	`http://localhost:3333/sessions`

	**Request**

	```json
	{
		"email": "user@email.com",
		"password": "yourPassword123"
	}
	```

	**Response**

	```json
	{
		"user": {
			"id": 2,
			"name": "User",
			"email": "user@email.com",
			"avatar": "6e46f9e07b5dfc170784-Your-picture.ext"
		},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA1MzIyMzYsImV4cCI6MTY5MDYxODYzNiwic3ViIjoiNCJ9.faFu6Cd8tkw4KWVdG1E8oUqfEsuNDi2znhpMQm5yStw"
	}
	```

	> ext === extension

- #### **Users and roles**

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

		> Will manage and be able to access the hole API having both roles/ personas;

	- "User"
		
		> Will have restricted accesses and only one role/ persona ("ROLE_USER"), assigned to him as default;
	
	To achieve this, send the requests at URL bellow:

	`http://localhost:3333/users`

	**ATTENTION**:

	> As a security, it is advisable to encrypt the admin password, using the tool of your choice (might be MD5HASH). Save it for security and future access.

	> All users created without "roles" sended within request will be assigned as "__*users/ default *__". 

	**Requests**

	- **Administrator**

	```json
	{
		"name": "Administrador",
		"email": "admin@email.com",
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
		"email": "user@email.com",
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
				"email": "admin@email.com"
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
				"email": "user@email.com"
			}
		},
		{
			"status": 201,
			"message": "Usuário cadastrado com sucesso."
		}
	]
	```

	#### :large_blue_circle: **GET/ users_roles**
	
	**Description:** List all existing roles

	To see all existing roles in application send a request at URL bellow:

	`http://localhost:3333/users_roles`

	**ATTENTION**:

	> Only an user with roles type ADMIN can receive response on this request. Otherwise, 401, UNAUTHORIZED response will be returned.

	**Requests**

		> These requests don't need body parameters.

	**Response**

	Everything going well, the response will be something like this:

	```json
	[
		{
			"user_id": 1,
			"user_name": "Administrador",
			"email": "admin@foodexplorer.com",
			"created_at": "2023-05-26 14:01:43",
			"role_id": 2,
			"role_name": "ROLE_ADMIN",
			"max(`role_id`)": 2
		},
		{
			"user_id": 3,
			"user_name": "Administrator's name 1",
			"email": "administrator_email@email.com",
			"created_at": "2023-05-26 14:02:23",
			"role_id": 2,
			"role_name": "ROLE_ADMIN",
			"max(`role_id`)": 2
		},
		{
			"user_id": 4,
			"user_name": "Administrator's name 2",
			"email": "administrator_email@email.com",
			"created_at": "2023-05-26 17:41:14",
			"role_id": 1,
			"role_name": "ROLE_ADMIN",
			"max(`role_id`)": 1
		},
		{
			"user_id": 2,
			"user_name": "Usuário",
			"email": "user@foodexplorer.com",
			"created_at": "2023-05-26 14:02:01",
			"role_id": 1,
			"role_name": "ROLE_USER",
			"max(`role_id`)": 1
		},
		{
			"user_id": 5,
			"user_name": "User's name 1",
			"email": "user_email@email.com",
			"created_at": "2023-05-30 14:53:38",
			"role_id": 1,
			"role_name": "ROLE_USER",
			"max(`role_id`)": 1
		},
		{
			"user_id": 6,
			"user_name": "User's name 1",
			"email": "user_email@email.com",
			"created_at": "2023-06-29 21:07:36",
			"role_id": 1,
			"role_name": "ROLE_USER",
			"max(`role_id`)": 1
		}
	]
	``` 

	#### :yellow_circle: **PATCH/ users_roles/:id**

	**Description:** Update any user's roles

	To update a user's role send a request at the URL:

	`http://localhost:3333/users_roles/:id`

	**ATTENTION**:

	> Only an user with roles type ADMIN can receive response on this request. Otherwise, 401, UNAUTHORIZED response will be returned.

	**Request**

	```json
	{
		"new_userRole": [
			"ROLE_ADMIN"
		]
	}
	```

	**Response**

	```json
	{
		"message": "Nova persona atribuída ao usuário com sucesso."
	}	
	```

- #### **Users**

	#### :orange_circle: **PUT/ users**

	**Description:**  Update a user

	Any user can update your own profile data changing few information. They can be changed one by one only, or all at once.

	To achieve this a request must be send to the URL bellow:

	`http://localhost:3333/users`

	**Request**

	```json
	{
		"new_name": "Updated name",
		"new_email": "new@email.com",
		"new_password": "123456",
		"current_password": "123"
	}
	```

	**Response**

	```json
	{
		"updatedUser": {
			"name": "Updated name",
			"email": "new@email.com",
			"avatar": null,
			"updated_at": "2023-06-30 21:37:36"
		},
		"message": "Os dados foram atualizados com sucesso."
	}
	```
	
	> By default the user avatar field is __*null*__ as the user can be created without an avatar.
	
	> ext === extension
	
	#### :yellow_circle: **PATCH/ users/avatar**

	**Description:**  Update a user avatar image

	Any user can update your own avatar image file.

	To achieve this send a request to the URL bellow:

	`http://localhost:3333/users/avatar`

	**ATTENTION**:

	> By default the user avatar field is __*null*__ as the user can be created without an avatar.

	**Request**

		> Send the chosen image file inside a form (new FormData( )) appended in a field called "avatar".

	**Response**

	If everything goes fine, the response will be something like this:

	```json
	{
		"updatedUserWithAvatar": {
			"name": "Vinicius",
			"email": "vinicius@email.com",
			"avatar": "3a1f55a9d727b6adbb67-Updated-file-name_avatar.ext",
			"updated_at": "2023-07-31 03:02:39"
		}
	}
	```

	> ext === extension

	#### :large_blue_circle: **GET/ users/roles**

	**Description:** Show the roles of the current authenticated user

	Access and verify the roles of an authenticated user. URL for this:

	`http://localhost:3333/roles`

	**Requests**

		>	These requests don't need body parameters.
	
	**Response**

	Everything going well, the response will be something like this:

	- **Administrator**

	```json
	[
		"ROLE_USER",
		"ROLE_ADMIN"
	]
	```

	- **Default user**

	```json
	[
		"ROLE_USER"
	]
	```

- #### **Dishes Categories**

	#### :green_circle: **POST/ dishes_categories**
		
	**Description:** Create categories to group dishes

	All dishes created must be attached to a category. 

	They can be created together with a new dish, or alone, depending on demand.   

	In order to create a category send a request to the URL bellow:

	`http://localhost:3333/categories`

	**ATTENTION**:

	> Only an user with roles type ADMIN can receive response on this request. Otherwise, 401, UNAUTHORIZED response will be returned.

	**Requests**

	```json
	{
		"name": "Salads"
	}	
	```

	**Response**

	```json
	{
		"category": {
			"id": 1,
			"name": "Salads"
		},
		"message": "Categoria cadastrada com sucesso."
	}
	```

	#### :large_blue_circle: **GET/ dishes_categories**

	**Description:** List/ Index all categories
	
	To see all existing categories in application send a request to the URL bellow:  

	`http://localhost:3333/categories`

	**ATTENTION**:

	> Only an user with roles type ADMIN can receive response on this request. Otherwise, 401, UNAUTHORIZED response will be returned.

	**Requests**

		> These requests don't need body parameters.

	**Response**

	All doing well, the response will be something like this:

	```json
	[
		{
			"id": 1,
			"name": "Salads",
			"created_at": "2023-05-26 14:04:52"
		},
		{
			"id": 2,
			"name": "Meals",
			"created_at": "2023-05-26 14:04:58"
		},
		{
			"id": 3,
			"name": "Desserts",
			"created_at": "2023-05-26 14:05:04"
		}
	]
	```

	#### :red_circle: **DELETE/ dishes_categories/:id**

	**Description:** Delete a specific category

	In order to delete an existing category a request must be sended to the URL:

	`http://localhost:3333/categories/:id`

	**ATTENTION**:

	> Only an user with roles type ADMIN can receive response on this request. Otherwise, 401, UNAUTHORIZED response will be returned.

	**Requests**

		> These requests don't need body parameters.

	**Response**

	```json
	{
		"message": "Categoria excluída com sucesso."
	}
	```

- #### **Dishes**

	#### :green_circle: **POST/ dishes**
	
	**Description:** Create dishes
	 
	To achieve the creation of a dish, inside a form ("__*new FormData( )*__"),	send a request at the URL:

	`http://localhost:3333/dishes`

	The mentioned form must contains two fields: 

	- "__*data*__" -> which has the necessary fields that composes a dish; 
	- "__*picture*__" -> which has the image file; 

	**ATTENTION**:

	> Only an user with roles type ADMIN can receive response on this request. Otherwise, 401, UNAUTHORIZED response will be returned.

	> By default the dish picture field is __*null*__ as a dish can be created without a picture.

	**Requests**

	```json
	{
		"data": {
			"name": "Colorful salad",	
			"description": "A salad description.",
			"price": 26.70,
			"category_id": 1,
			"ingredients": [ 
				"lettuce",
				"tomato",
				"radish"
			]
		},
		"picture": null
	}
	```
	
	**Response**

	```json
	[
		{
			"id": 1,
			"name": "Colorful salad",	
			"description": "A salad description.",
			"price": 26.70,
			"picture": null,
			"category_id": 1,
			"created_at": "2023-07-31 03:39:42",
		},
		{
			"message": "Prato cadastrado com sucesso."
		}
	]
	```

	> 1 -> The ID number of the created dish 

	> ext === extension

	#### :large_blue_circle: **GET/ dishes**

	**Description:** List/ Index all dishes
	
	To see/ show all existing dishes in the application send a request to the URL bellow:  

	`http://localhost:3333/dishes`

	**Requests**

		> These requests don't need body parameters.

	**Response**

	Request being successful the response will be something like this:

	```json
	[
		{
			"category_id": 1,
			"category_name": "Meals",
			"dishes": [
				{
					"id": 1,
					"name": "First meal",
					"description": "Dish description.",
					"picture": "84640a87b0217aa5f28a-Prato_1.png",
					"price": 25.99,
					"category_id": 1,
					"created_at": "2023-05-26 14:06:31",
					"updated_at": "2023-07-21 21:32:11",
					"ingredients": [
						{
							"dish_id": 1,
							"id": 1,
							"name": "rice"
						},
						{
							"dish_id": 1,
							"id": 2,
							"name": "beans"
						},
						{
							"dish_id": 1,
							"id": 28,
							"name": "french fries"
						}
					]
				},
				{
					"id": 2,
					"name": "Second meal",
					"description": "Dish description.",
					"picture": null,
					"price": 52.9,
					"category_id": 1,
					"created_at": "2023-05-26 14:07:14",
					"updated_at": "2023-05-26 14:07:14",
					"ingredients": [
						{
							"dish_id": 2,
							"id": 1,
							"name": "rice"
						},
						{
							"dish_id": 2,
							"id": 2,
							"name": "beans"
						},
						{
							"dish_id": 2,
							"id": 7,
							"name": "cassava"
						}
					]
				},
				{
					"id": 5,
					"name": "Third meal",
					"description": "Dish description.",
					"picture": "ab08e5efb3b7848f4cfc-Badge.svg",
					"price": 9.99,
					"category_id": 1,
					"created_at": "2023-07-20 18:23:02",
					"updated_at": "2023-07-21 21:37:48",
					"ingredients": [
						{
							"dish_id": 21,
							"id": 26,
							"name": "steak"
						},
						{
							"dish_id": 21,
							"id": 28,
							"name": "french fries"
						}
					]
				}
			]
		},
		{
			"category_id": 2,
			"category_name": "Beverages",
			"dishes": [
				{
					"id": 3,
					"name": "First beverage",
					"description": "Beverage description.",
					"picture": null,
					"price": 2.9,
					"category_id": 2,
					"created_at": "2023-05-26 14:09:04",
					"updated_at": "2023-05-26 14:09:04",
					"ingredients": [
						{
							"dish_id": 3,
							"id": 4,
							"name": "water"
						}
					]
				},
				{
					"id": 6,
					"name": "Second beverage",
					"description": "Beverage description.",
					"picture": "e8a7164f72c6155b94b4-Prato_2.png",
					"price": 12.99,
					"category_id": 2,
					"created_at": "2023-05-26 14:09:38",
					"updated_at": "2023-05-26 14:09:38",
					"ingredients": [
						{
							"dish_id": 4,
							"id": 4,
							"name": "water"
						},
						{
							"dish_id": 4,
							"id": 5,
							"name": "tea"
						}
					]
				}
			]
		},
		{
			"category_id": 3,
			"category_name": "Desserts",
			"dishes": [
				{
					"id": 4,
					"name": "First dessert",
					"description": "Dessert description.",
					"picture": "d2678453d443d27d2b5e-doce.png",
					"price": 23.75,
					"category_id": 3,
					"created_at": "2023-05-26 14:14:33",
					"updated_at": "2023-07-21 21:36:36",
					"ingredients": [
						{
							"dish_id": 6,
							"id": 10,
							"name": "sugar"
						},
						{
							"dish_id": 6,
							"id": 8,
							"name": "dough"
						},
						{
							"dish_id": 6,
							"id": 29,
							"name": "almonds"
						}
					]
				}
			]
		}			
	]
	```
		
	#### :large_blue_circle: **GET/ dishes/:id**

	**Description:** Show a specific dish

	In order to access/ see an specific dish a request must be sended to the URL bellow:  

	`http://localhost:3333/dishes/:id`

	**Requests**

		> These requests don't need body parameters.

	**Response**

	All doing well, the response will be something like this:	

	```json
	{
		"category_id": 6,
		"category_name": "Burgers",
		"dish_id": 21,
		"dish_name": "Burger description",
		"picture": "84640a87b0217aa5f28a-Prato_1.png",
		"price": 25.99,
		"description": "Primeiro prato.",
		"dishIngredients": [
			{
				"id": 21,
				"name": "steak"
			},
			{
				"id": 28,
				"name": "french fries"
			},
			{
				"id": 11,
				"name": "cheese"
			},
			{
				"id": 16,
				"name": "ham"
			}
		]
	}
	```

	#### :orange_circle: **PUT/ dishes/:id**

	**Description:** Update dishes

	All dishes data can be updated at any time. Change only one data or all at once.

	To achieve this, inside a form ("__*new FormData( )*__"), send a request at the URL:

	`http://localhost:3333/dishes/:id`

	The mentioned form must contains two fields: 

	- "__*data*__" -> which has the necessary fields that composes a dish; 
	- "__*picture*__" -> which has the image file; 

	**ATTENTION**:

	> Only an user with roles type ADMIN can receive response on this request. Otherwise, 401, UNAUTHORIZED response will be returned.

	> By default the dish picture field is __*null*__ as a dish can be created without a picture.

	**Requests**

	```json
	{
		"data": {
			"new_name": "New colorful salad",	
			"new_description": "A new salad description.",
			"new_price": 37.60,
			"new_category_id": 4,
			"new_ingredients": [ 
				"broccoli",
				"carrot"			
			]
		},
		"picture": "Your-dish-picture-file_name.ext"
	}
	```
	
	**Response**

	If everything goes fine, the response will be something like this:

	```json
	[
		{
			"updatedDish": {
				"id": 1,
				"name": "New colorful salad",	
				"description": "A new salad description.",
				"price": 37.60,
				"picture": "d4c43e6410d3df10f8d8-Your-dish-picture-file_name.ext",
				"category_id": 4,
				"created_at": "2023-05-26 14:09:38",
				"updated_at": "2023-08-01 11:33:42"
			},
			"newDishIngredients": [
				{
					"id": 22,
					"name": "broccoli"
				},
				{
					"id": 31,
					"name": "carrot"
				}
			]
		},
		{
			"message": "Prato cadastrado com sucesso."
		}		
	]
	```

	> ext === extension

	#### :red_circle: **DELETE/ dishes/:id**

	**Description:** Delete a specific dish
	
	Existing and registered dishes can be deleted at any time. 

	In order to delete an existing dish a request using the **DELETE** method must be sended to the URL bellow:

	`http://localhost:3333/dishes/:id`

	**ATTENTION**:

	> Only an user with roles type ADMIN can receive response on this request. Otherwise, 401, UNAUTHORIZED response will be returned.

	**Requests**

		> These requests don't need body parameters.

	**Response**

	```json
	{
		"message": "Prato excluído com sucesso."
	}
	```
	
- #### **Ingredients**

	#### :green_circle: **POST/ ingredients**
	
	**Description:** Create ingredients

	All dishes created must contain at least one ingredient that composes it.

	They can be created together with a new dish, or alone, depending on demand.  

	To create a new standalone ingredient, send a request at the URL: 

	`http://localhost:3333/ingredients`


	**ATTENTION**:

	> Only an user with roles type ADMIN can receive response on this request. Otherwise, 401, UNAUTHORIZED response will be returned.

	**Requests** 

	```json
	{
		"name": "potato"
	}
	```

	**Response**

	```json
	{
		"message": "Ingrediente cadastrado com sucesso."
	}
	```

	#### :red_circle: **DELETE/ ingredients/:id** 
	
	**Description:** Delete specific ingredients
	
	Existing and registered ingredients can be deleted at any time. 

	In order to delete an ingredient a request must be sended to the URL bellow:

	`http://localhost:3333/ingredients/:id`

	**ATTENTION**:

	> Only an user with roles type ADMIN can receive response on this request. Otherwise, 401, UNAUTHORIZED response will be returned.

	**Requests**

		> These requests don't need body parameters.

	**Response**

	```json
	{
		"message": "Ingrediente excluído com sucesso."
	}
	```

- #### Favorites

	#### :green_circle: **POST/ favorites/:dish_id**
		
	**Description:** Create favorites

	All dishes in application can be set as favorite by any registered user (regardless the roles it has).

	To set a dish as favorite send a request to the URL bellow:

	`http://localhost:3333/favorites/:dish_id`

	**Requests**

		> These requests don't need body parameters.

	**Response**

	```json
	[
		{
			"favorited": 46
		},
		{
			"message": "Prato favoritado com sucesso."
		}
	]
	```

	#### :large_blue_circle: **GET/ favorites
	
	**Description:** List/ Index all favorites dishes of an user

	To see all dishes in the application that a registered user has set as favorite send a request to the URL bellow:

	`http://localhost:3333/favorites`
	
	**Requests**

		> These requests don't need body parameters.

	**Response**

	Everything going fine, response will be something like this:

	```json
	[
		{
			"favorite_id": 1,
			"user_id": 2,
			"dish_id": 5,
			"name": "Third beverage",
			"picture": "ac4911ab4f1f2f19c1eb-Dish-picture-name.ext"
		},
		{
			"favorite_id": 4,
			"user_id": 2,
			"dish_id": 16,
			"name": "Fifth meal",
			"picture": null
		}
	]
	```

	> ext === extension
	
	#### :red_circle: **DELETE/ favorites/:dish_id**
	
	**Description:** Delete favorites of an user

	Registered users can remove from favorites any dish once favorited by them. 

	In order to delete a dish from a user's favorites list, send a request using the **DELETE** method to the URL bellow:

	`http://localhost:3333/favorites/:dish_id`

	**Requests**

		> These requests don't need body parameters.

	**Response**

	```json
	{
		"message": "Favorito excluído com sucesso."
	}
	```
	
- #### **Orders**

	#### :green_circle: **POST/ orders**
	
	**Description:** Create orders
	
	#### :large_blue_circle: **GET/ orders**

	**Description:** List/ Index all the orders of a specific user
	
	#### :large_blue_circle: **GET/ orders/:id**

	**Description:** Show a specific order
	
	#### :orange_circle: **PUT/ orders/:id**

	**Description:** Update orders
	
	#### :red_circle: **DELETE/ orders/:id**

	**Description:** Delete orders
	
- #### **All orders**

	#### :large_blue_circle: **GET/ all_orders**
	
	**Description:** List/ Index all application's orders
	
	#### :yellow_circle: **PATCH/ all_orders/:id**
	
	**Description:** Update orders statuses

- #### **Statuses** 

	#### :green_circle: **POST/ statuses**

	**Description:** Create a new status for orders

	#### :large_blue_circle: **GET/ statuses**
	
	**Description:** List/ Index all existing statuses

- #### **Files**

	#### :large_blue_circle: **GET/ files/avatar/image-name.ext**

	**Description:** Request an Avatar file as response
	
	#### :large_blue_circle: **GET /files/picture/image-name.ext**

	**Description:** Request a Picture file as response