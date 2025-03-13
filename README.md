# NestJS + MongoDB + JWT + Upload fichier et Tâche Asynchrone

## Description

Ce projet est une application backend développée avec **NestJS** et **MongoDB**. Il intègre l'authentification avec **JWT**, l'upload de fichiers ainsi que la gestion des tâches asynchrones pour la compression d'images.

## Fonctionnalités

- **Authentification JWT** : Gestion des utilisateurs avec token JWT.
- **Upload de fichiers** : Sauvegarde des fichiers dans un dossier spécifique.
- **Compression d'images** : Tâche asynchrone pour réduire la taille des images uploadées.
- **Utilisation de MongoDB** : Base de données NoSQL pour stocker les informations des utilisateurs et fichiers.
- **Architecture modulaire** : Organisation en modules (auth, users, products, compression-task, etc.).
- **Documentation API avec Swagger** : Accessible via [Swagger UI](http://localhost:3000/api#/).

## Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [MongoDB](https://www.mongodb.com/) (local ou distant)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)

## Installation

1. **Cloner le projet**

```sh
$ git clone https://github.com/HiQaody/nestjs-mongodb-uploadfile.git
$ cd nestjs-mongodb-uploadfile
```

2. **Installer les dépendances**

```sh
$ npm install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env` à la racine du projet et ajouter les variables suivantes :

```env
MONGO_URI=mongodb://localhost:27017/projet_tech_web_avance
PORT=3000
```

4. **Démarrer l'application**

```sh
$ npm run start:dev
```

## Structure du projet

```
nestjs-mongodb-uploadfile/
├── public/                 # Dossier contenant les fichiers uploadés
├── src/
│   ├── auth/               # Gestion de l'authentification (JWT)
│   ├── compression-task/   # Gestion des tâches de compression d'images
│   ├── middleware/         # Middlewares personnalisés
│   ├── products/           # Gestion des produits
│   ├── users/              # Gestion des utilisateurs
│   ├── utils/              # Utilitaires (upload et compression d'images)
│   ├── app.module.ts       # Module principal de l'application
│   ├── main.ts             # Point d'entrée de l'application
├── test/                   # Tests unitaires
├── .env                    # Variables d'environnement
├── package.json            # Dépendances et scripts
├── tsconfig.json           # Configuration TypeScript
└── README.md               # Documentation du projet
```

## API Endpoints

### Authentification

- `POST /auth/register` : Inscription d'un utilisateur.
- `POST /auth/login` : Connexion et génération d'un token JWT.

### Gestion des fichiers

- `POST /upload` : Upload d'une image.
- `GET /files` : Liste des fichiers uploadés.

### Compression d'images

- **Asynchrone** : Une fois l'image uploadée, elle est compressée automatiquement en arrière-plan.

## Documentation API

L'API est documentée avec **Swagger** et accessible à l'URL suivante :

👉 [http://localhost:3000/api#/](http://localhost:3000/api#/)

## Technologies utilisées

- **NestJS** : Framework Node.js pour les applications côté serveur.
- **MongoDB** : Base de données NoSQL.
- **Mongoose** : ORM pour MongoDB.
- **JWT** : Authentification sécurisée avec JSON Web Tokens.
- **Multer** : Gestion de l'upload de fichiers.
- **Sharp** : Compression et manipulation d'images.
- **Swagger** : Documentation interactive de l'API.

## Contributions

Les contributions sont les bienvenues ! Clonez le projet, créez une branche et soumettez une pull request.

## Licence

Ce projet est sous licence **MIT**.

