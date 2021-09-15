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
  url: string;
}

export const artCollections: ArtCollection[] = [
  {
    title: 'Seasons',
    description:
      'Four variations of the same rules. Each variation represents a season.',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fseasons%2Fspring.webp?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 4,
    soldPieces: 4,
    url: 'https://opensea.io/collection/generative-seasons',
  },
  {
    title: 'Grid',
    description:
      'A series of images exploring random noise structured and grouped into columns. Two contrast variations',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fgrid%2Fgrid-6.webp?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 7,
    soldPieces: 7,
    url: 'https://opensea.io/collection/structured-noise',
  },
  {
    title: 'Disrupted Arrival',
    description: 'A series exploring ink like textures, flows and disruptions',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fdisrupted-arrival%2FARRIVAL-4.webp?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 4,
    soldPieces: 0,
    url: 'https://opensea.io/collection/disrupted-arrival',
  },
  {
    title: 'Forces',
    description: 'An exploration in flow fields with different behaviors.',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fforces%2Fforces-13.webp?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 21,
    soldPieces: 15,
    url: 'https://opensea.io/collection/flow-state-1',
  },
  {
    title: 'Genesis',
    description:
      'This collection explores how different flocks and sizes of organisms interconnect.',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fgenesis%2Fgenesis-6.png?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 10,
    soldPieces: 0,
    url: 'https://opensea.io/collection/genesis-1',
  },
];
