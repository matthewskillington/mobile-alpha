import { FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAGING_ID } from '@env';

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'mobile-alpha-bc6c3.firebaseapp.com',
  // databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'mobile-alpha-bc6c3',
  storageBucket: 'mobile-alpha-bc6c3.appspot.com',
  messagingSenderId: FIREBASE_MESSAGING_ID,
  appId: FIREBASE_APP_ID,
  // measurementId: 'G-measurement-id',
};

export { firebaseConfig };
