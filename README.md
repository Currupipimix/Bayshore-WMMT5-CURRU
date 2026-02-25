🏎️ WMMT5 Server — Backend Moderno (Node.js + Prisma + MySQL)

Servidor backend completo y moderno para Wangan Midnight Maximum Tune 5 (WMMT5), totalmente compatible con:

- Ghost Battle  
- Time Attack  
- User System  
- Car System  
- Dress‑Up  
- Titles  
- Plates  

Construido con:

- Node.js + Express  
- Prisma ORM  
- MySQL  
- XML responses (compatibles con el arcade original)  

📁 Estructura del Proyecto

`
wmmt5-server/
 ├── src/
 │ ├── index.js
 │ │
 │ ├── routes/
 │ │ ├── ghostBattle/
 │ │ ├── timeAttack/
 │ │ ├── user/
 │ │ ├── car/
 │ │ ├── dressup/
 │ │ ├── titles/
 │ │ └── plates/
 │ │
 │ ├── modules_legacy/
 │ │ ├── ghost/
 │ │ ├── vs/
 │ │ ├── timeattack/
 │ │ ├── user/
 │ │ └── car/
 │ │
 │ ├── prisma/
 │ │ ├── schema.prisma
 │ │ └── seed.js
 │ │
 │ └── utils/
 │ └── xml.js
 │
 ├── package.json
 └── README.md
`

---

⚙️ Requisitos

- Node.js 18+
- MySQL 5.7 / 8.0
- Prisma CLI

---

🔧 Instalación

1. Instalar dependencias

`
npm install
`

2. Configurar base de datos

En .env:

`
DATABASE_URL="mysql://usuario:password@localhost:3306/wmmt5"
`

3. Crear tablas

`
npx prisma db push
`

4. Ejecutar seed (coches, titles, plates, usuario de prueba)

`
node src/prisma/seed.js
`

5. Iniciar servidor

`
node src/index.js
`

El servidor arrancará en:

`
http://localhost:9000
`

---

🧩 Funcionalidades

🟥 1. Ghost Battle

/ghostBattle/start
Devuelve rival + ghost blob.

/ghostBattle/result
Guarda ghost + resultado + recompensa.

/ghostBattle/ranking
Ranking por victorias.

---

🟦 2. Time Attack

/timeAttack/start
Devuelve ghost base del circuito.

/timeAttack/result
Guarda tiempo + ghost + recompensa.

/timeAttack/ranking
Ranking por mejor tiempo.

---

🟩 3. User System

/user/login
Login por card_id.

/user/register
Crea usuario + coche inicial.

/user/profile
Devuelve perfil + coches.

---

🟧 4. Car System

/car/create
Crea coche nuevo.

/car/list
Lista coches del usuario.

/car/tune
Tuneo básico (+10 power/handling).

---

🟪 5. Dress‑Up

/dressup/list
Devuelve nivel actual.

/dressup/apply
Sube nivel de dress‑up.

---

🟫 6. Titles

/titles/list
Lista títulos desbloqueados + equipado.

/titles/equip
Equipa un título.

---

🟨 7. Plates

/plates/list
Lista plates desbloqueados + equipado.

/plates/equip
Equipa un plate.

---

🗄️ Base de Datos (Prisma)

El schema completo está en:

`
src/prisma/schema.prisma
`

Incluye:

- user  
- car  
- ghost  
- ghost_battle  
- time_attack  
- titles / user_titles  
- plates / user_plates  

---

🌱 Seed (Datos iniciales)

El seed incluye:

- Lista oficial de coches WMMT5  
- Titles básicos  
- Plates básicos  
- Usuario de prueba  
- Coche inicial  

Ejecutar:

`
node src/prisma/seed.js
`

---

🧪 Pruebas recomendadas

1. Registrar tarjeta  
2. Crear coche  
3. Ghost Battle (start → result)  
4. Time Attack (start → result)  
5. Dress‑Up  
6. Titles  
7. Plates  

---

🚀 Producción

Puedes usar:

- PM2
- Docker
- Nginx reverse proxy
- HTTPS con Certbot
