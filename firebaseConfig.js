// config/firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "api_key",
  authDomain: "pawpalnativeapa.firebaseapp.com",
  projectId: "pawpalnativeapa",
  storageBucket: "pawpalnativeapa.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "1:585648580243:android:357aafc5e8f5a837c54f66"
};

const app = initializeApp(firebaseConfig);
export default app;
