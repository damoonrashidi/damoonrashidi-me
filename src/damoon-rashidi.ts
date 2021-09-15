import { AppHeader } from './Header.js';
import { ArtList } from './ArtList.js';
import { ArtListItem } from './ArtListItem.js';
import { BitalarmSection } from './BitalarmSection.js';
import { WdpSection } from './WdpSection.js';
import { DamoonRashidi } from './DamoonRashidi.js';
import { SectionWrapper } from './SectionWrapper.js';

customElements.define('damoon-rashidi', DamoonRashidi);
customElements.define('app-header', AppHeader);
customElements.define('bitalarm-section', BitalarmSection);
customElements.define('wdp-section', WdpSection);
customElements.define('art-list', ArtList);
customElements.define('art-list-item', ArtListItem);
customElements.define('section-wrapper', SectionWrapper);
