// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCBS_Ji040RFDOpPNUHXvU8-zviEn7P7A8',
	authDomain: 'my-web-tasks.firebaseapp.com',
	projectId: 'my-web-tasks',
	storageBucket: 'my-web-tasks.firebasestorage.app',
	messagingSenderId: '793772032528',
	appId: '1:793772032528:web:2645695e97bc8a0abc0095'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
