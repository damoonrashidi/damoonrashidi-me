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
}

export const artCollections: ArtCollection[] = [
  {
    title: 'Forces',
    description: 'An exploration in flow fields with different behaviors.',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fforces-16-day-at-the-beach.webp?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 0,
    soldPieces: 0,
  },
  {
    title: 'Disrupted Arrival',
    description: 'A series exploring ink like textures, flows and disruptions',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Farrival-2.webp?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 0,
    soldPieces: 0,
  },
  {
    title: 'Seasons',
    description:
      'Four variations of the same rules. Each variation represents a season.',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fseasons-spring.webp?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 0,
    soldPieces: 0,
  },
  {
    title: 'Grid',
    description:
      'A series of images exploring random noise structured and grouped into columns. Two contrast variations',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fgrid-6.webp?alt=media',
    art: [],
    isOngoing: true,
    createdPieces: 0,
    soldPieces: 0,
  },
];
