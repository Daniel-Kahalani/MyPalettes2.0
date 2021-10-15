import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import seedPalettes from './palettes.js';

const firebaseConfig = {
	apiKey: 'AIzaSyCEdvg71GFw_kvqKcF6miTAgQs60ZFEEdA',
	authDomain: 'my-palettes.firebaseapp.com',
	projectId: 'my-palettes',
	storageBucket: 'my-palettes.appspot.com',
	messagingSenderId: '111447204509',
	appId: '1:111447204509:web:7e8803e248287b7eb52a74',
	measurementId: 'G-93G45GFDHB',
};

initializeApp(firebaseConfig);
const db = getFirestore();

try {
	for (const palette of seedPalettes) {
		const docRef = await addDoc(collection(db, 'palettes'), palette);
		console.log('Document written with ID: ', docRef.id);
	}
} catch (e) {
	console.error('Error adding document: ', e);
}
