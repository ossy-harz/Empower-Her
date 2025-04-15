export interface Advisor {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  location: string;
  languages: string[];
  rating: number;
  reviews: number;
  availability: string;
  imageUrl: string;
  bio: string;
  contactInfo: {
    email: string;
    phone?: string;
  };
}
