export interface Invite {
  displayName: string;
  guests: Guest[];
}

export interface Guest {
  name: string;
  willAttend: boolean;
  foodPreferences: string;
  bio: string;
  willSpeak: boolean;
}
