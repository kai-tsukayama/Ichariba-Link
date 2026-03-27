export interface Event {
  id: string;
  title: string;
  startDate: string | Date;
  endDate: string | Date;
  description: string;
  prefecture: string;
  city: string;
  imageId: string;
  imageUrl?: string; // data URL or remote URL
  userId: string;
}

export interface ImageData {
  id: string;
  filePath: string;
}

export interface EventInput {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  prefecture: string;
  city?: string;
  imageFile?: File;
  imageUrl?: string;
}
