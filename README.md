# UOP Attendance Management System

This repository contains a React frontend and a simple Node/Express backend with MongoDB.
The application implements an attendance flow where a student logs in, verifies their device (WebAuthn or photo fallback), enters a rotating lecture code, and has their location checked before the attendance is recorded.

## Project structure

```
├─ public/           # static assets
├─ src/              # React application (CRA)
│  ├─ components/    # custom UI components
│  ├─ api.js         # helper for backend calls
│  └─ ...
├─ server/           # Node/Express backend
│  ├─ models/        # mongoose schemas
│  └─ index.js       # express server and routes
├─ package.json
└─ README.md
```

## Running locally

1. **Install dependencies**
   ```bash
   npm install
   cd server && npm install express mongoose cors
   # optionally install dev tooling like nodemon or concurrently
   npm install --save-dev concurrently
   ```

2. **Start both frontend and backend**
   ```bash
   npm run dev
   ```

   - frontend: `http://localhost:3000`
   - backend: `http://localhost:5000` (API prefixed with `/api`)

3. **MongoDB**
   Ensure you have a MongoDB instance running locally or point `MONGO_URI` to your database.

4. **Environment**
   You can set `REACT_APP_API_BASE` in `.env` if the API is hosted elsewhere.
### Google login

To enable the Google sign‑in option the backend needs a Google OAuth client ID and secret. Create credentials in the Google Cloud Console (OAuth 2.0 Client IDs, type Web application).

You can provide the values in several ways:

* **Environment variables** (in your shell):
  ```bash
  export GOOGLE_CLIENT_ID="<your-client-id>"
  export GOOGLE_CLIENT_SECRET="<your-client-secret>"
  ```
* **.env file** – simply copy `.env.example` to `.env` in the project root and fill in your secrets. The server uses `dotenv` to load it automatically.

Other useful variables such as `MONGO_URI` may also be defined there.

The `/auth/google` route will redirect users to Google's login page; upon success they are redirected back to
`/login/success` which stores the student identifier and proceeds with the normal attendance flow.
## Flow overview

1. Student taps **Sign in with Google**; no manual email/ID entry is required.
2. Backend identifies or creates the corresponding student account using the Google profile.
3. Device verification occurs via WebAuthn or a live photo fallback.
4. Upon successful verification, the student enters an 8-digit lecture code.
5. Backend validates the code and checks geolocation (geo‑fencing).
6. If everything passes, attendance is recorded in MongoDB with the method used.

> **Note:** Google OAuth client ID/secret must be set (see "Google login" section below). Without them the `/auth/google` route will log a warning and not function.

The stubbed backend in `server/index.js` contains placeholder routes you can flesh out as you build the real logic.

---

The remainder of this file is the original CRA README (truncated)

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
