import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { AppHeader } from './Header.js';
import { AppFooter } from './Footer.js';
import { ArtList } from './ArtList.js';
import { ArtCollectionItem } from './ArtCollectionItem.js';
import { BitalarmSection } from './BitalarmSection.js';
import { WdpSection } from './WdpSection.js';
import { DamoonRashidi } from './DamoonRashidi.js';
import { SectionWrapper } from './SectionWrapper.js';

customElements.define('damoon-rashidi', DamoonRashidi);
customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
customElements.define('bitalarm-section', BitalarmSection);
customElements.define('wdp-section', WdpSection);
customElements.define('art-list', ArtList);
customElements.define('art-collection-item', ArtCollectionItem);
customElements.define('section-wrapper', SectionWrapper);

const firebaseConfig = {
  apiKey: 'AIzaSyBYlO_L8zRFaytWdn2OaequwCZaWVxeWN4',
  authDomain: 'website-e57e8.firebaseapp.com',
  projectId: 'website-e57e8',
  storageBucket: 'website-e57e8.appspot.com',
  messagingSenderId: '474195770921',
  appId: '1:474195770921:web:00a1fd35fcac971b39a638',
  measurementId: 'G-R0KKFY41H2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

analytics.app.automaticDataCollectionEnabled = true;
