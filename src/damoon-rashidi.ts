import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { AppRoot } from './Root.js';
import { AppHeader } from './Header.js';
import { AppMain } from './Main.js';
import { AppFooter } from './Footer.js';
import { SectionWrapper } from './SectionWrapper.js';

import { AppHome } from './pages/home/Home.js';
import { ArtList } from './pages/home/ArtList.js';
import { ArtCollectionItem } from './pages/home/ArtCollectionItem.js';
import { BitalarmSection } from './pages/home/BitalarmSection.js';
import { WdpSection } from './WdpSection.js';

import { ArtPage } from './pages/art/ArtPage.js';

customElements.define('app-root', AppRoot);

/**
 * General components
 */
customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
customElements.define('app-main', AppMain);
customElements.define('section-wrapper', SectionWrapper);

/**
 * Home page
 */
customElements.define('app-home', AppHome);
customElements.define('bitalarm-section', BitalarmSection);
customElements.define('wdp-section', WdpSection);
customElements.define('art-list', ArtList);
customElements.define('art-collection-item', ArtCollectionItem);

/**
 * Art page
 */
customElements.define('app-art', ArtPage);

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
