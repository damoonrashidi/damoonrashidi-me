export interface Art {
  title: string;
  description: string;
  image: string;
  url: string;
}

export interface ArtCollection {
  title: string;
  description: string;
  art: Art[];
  thumbnail: string;
  createdPieces: number;
  soldPieces: number;
  isOngoing: boolean;
  openSeaUrl: string;
  id: string;
}

export const artCollections: ArtCollection[] = [
  {
    title: 'Seasons',
    id: 'season',
    description:
      'Four variations of the same rules. Each variation represents a season.',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fseasons%2Fspring.webp?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 4,
    soldPieces: 4,
    openSeaUrl: 'https://opensea.io/collection/generative-seasons',
  },
  {
    title: 'Grid',
    id: 'grid',
    description:
      'This series plays with how structred noise can form different macro patterns.',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fgrid%2Fgrid-5.webp?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 7,
    soldPieces: 7,
    openSeaUrl: 'https://opensea.io/collection/structured-noise',
  },
  {
    title: 'Disrupted Arrival',
    id: 'disrupted-arrival',
    description:
      'This series started as a study in ink like textures, flows and disruptions.',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fdisrupted-arrival%2FARRIVAL-4.webp?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 4,
    soldPieces: 0,
    openSeaUrl: 'https://opensea.io/collection/disrupted-arrival',
  },
  {
    title: 'Forces',
    id: 'forces',
    description:
      'My most versatile algorithm, allowing for different brush types, color methods, collisions, densities and macro shapes.',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fforces%2Fforces-13.webp?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 21,
    soldPieces: 15,
    openSeaUrl: 'https://opensea.io/collection/flow-state-1',
  },
  {
    title: 'Genesis',
    id: 'genesis',
    description:
      'This collection explores how different flocks and sizes of organisms interconnect.',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fgenesis%2Fgenesis-5.png?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 4,
    soldPieces: 1,
    openSeaUrl: 'https://opensea.io/collection/genesis-1',
  },
];
