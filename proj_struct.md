EventHQ/
├── app/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── privateController.js
│   │   └── publicController.js
│   ├── lib/
│   │   ├── delete.js
│   │   ├── get.js
│   │   ├── post.js
│   │   └── put.js
│   ├── models/
│   │   └── user.js
│   │   └── event.js
│   │   └── org.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventsRoutes.js
│   │   └── orgsRoutes.js
│   │   └── usersRoutes.js
│   ├── utils/
│   │   └── database.js
│   └── views/
│       ├── auth/
│       │   ├── assets/
│       │   └── auth.html
│       │   └── auth.js
│       ├── private/
│       │   └── dashboard.ejs
│       │   └── private.html
│       └── public/
│           └── index.ejs
│           └── public.html
├── config/
│   └── config.js
├── node_modules/
├── package.json
└── server.js