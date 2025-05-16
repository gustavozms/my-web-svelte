// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: '',
	authDomain: 'my-web-tasks.firebaseapp.com',
	projectId: 'my-web-tasks',
	storageBucket: 'my-web-tasks.firebasestorage.app',
	messagingSenderId: '',
	appId: ''
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
