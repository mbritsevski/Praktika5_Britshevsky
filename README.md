# Raamatu loendi leht

Veebileht, kus saab haldada raamatute loendi, avastada uusi raamatuid lugemiseks ning nende läbi rautamiseks. Loodud React/vite, Node.js/Express ja PostgreSQL-iga.

### Funktsionaalid
* Autententimine läbi rolle admin/user.
* Raamatute otsimine läbi pealkrija, kategooria ja autori.
* Raamatute uuendamine, kustutamine ja lisamine.
* Logi failid adminile haldamiseks.

### Rollide ülevaatus

Admin - Raamatute haldus (lisamine, muutmine, eemaldamine), komentaaritde loomine ja kustutamine, logi failide vaatlus
User - Raamatute vaatlus ja komentaaride lisamine.

### Tehnnilised andmed
* Frontend - React/vite, React router, Axios, Vanilla css
* Backend - Express, Sequelize, CORS
* Andmebaas- PostgreSQL, Sequelize
* Autentimine- JWT, bcryptjs

### Paigaldus ja käivitus

#### backend seadistus

git clone https://github.com/mbritsevski/Praktika5_Britshevsky.git

Looge .env fail
```bash
DB_HOST=dev.vk.edu.ee
DB_PORT=5432
DB_DATABASE=yourDatabase
DB_USER=yourUser
DB_PASSWORD=yourPassword
DB_DIALECT=postgres
DB_SCHEMA=books
SECRET_ACCESS_TOKEN=secret
```
```bash
cd backend
npm install

```

NB! Terminal ei pruugi alla tõmmata kõik moodulid seega tuleb neid manuaalselt alla tõmbama npm installiga

looge schema "books" teie Postgre andmebaasis

```bash
CREATE SCHEMA books;

```
Järgmisena tuleb importeerida kõik raamatud andmebaasi

```bash
npx sequelize-cli db:migrate
node scripts/importBooks.js
```

peale seda tuleb sisestada tabelisse admini ja kasutajat.

* login: admin1 / password: admin1

* login: user1 / password: user1

```bash
INSERT INTO books.users (id, username, email, password, role) VALUES
(1, 'admin1', 'admin1@example.com', '$2b$10$1KDMfoLTSZyLR89Iozc5Hei2RLkfW3G5fxIIyjzaZ5BZH3QH1M51S', 'Admin'),
(2, 'user1', 'user1@example.com', '$2b$10$Hkv7FEEHIy3/F1diplVPLuX325rK.KaT2xYMx020Ib0ckFmkUvhVC', 'User');
```
VÕI
* võib registreerida kasutajat pärast veebilehe käivitust.
* Thunder Client-is luua endale kasutajaid admin ja user rolliga.

Backend serveri käivitus
```bash
node server.js
```

Frontend käivitus

Avage uus terminal ning sisestage antud koodid.

```bash
cd frontend
npm install
npm run dev
```
NB! Terminal ei pruugi alla tõmmata kõik moodulid seega tuleb neid manuaalselt alla tõmbama npm installiga

Tuleb siuke vastus ning antud linki saab kasutada et minna veebilehte!

![alt text](image.png)

# API Endpoints
Auth
POST /api/auth/signin

Raamatud
GET /api/books

GET /api/books/:id

POST /api/books (Admin)

PUT /api/books/:id (Admin)

DELETE /api/books/:id (Admin)

Komentaarid
POST /api/comments/:bookId

GET /api/comments/:bookId

DELETE /api/comments/:commentId

Logi andmed
GET /api/logs (Admin only)
