import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyCEdvg71GFw_kvqKcF6miTAgQs60ZFEEdA',
	authDomain: 'my-palettes.firebaseapp.com',
	projectId: 'my-palettes',
	storageBucket: 'my-palettes.appspot.com',
	messagingSenderId: '111447204509',
	appId: '1:111447204509:web:7e8803e248287b7eb52a74',
	measurementId: 'G-93G45GFDHB',
};

export const app = initializeApp(firebaseConfig);
