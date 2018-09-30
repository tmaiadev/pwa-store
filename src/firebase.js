import config from './firebase-config';

import firebase from 'firebase/app';
import 'firebase/auth';

export const app = firebase.initializeApp(config);
export default firebase;