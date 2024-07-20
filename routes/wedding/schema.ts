export interface Invite {
  displayName: string;
  guests: Guest[];
}

export interface Guest {
  name: string;
  willAttend: "yes" | "no" | "unknown";
  foodPreferences: string;
  bio: string;
  willSpeak: boolean;
}
