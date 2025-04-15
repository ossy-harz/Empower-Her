import { Advisor } from "@/types/advisor";
import { v4 as uuidv4 } from "uuid";

export const advisors: Advisor[] = [
  {
    id: uuidv4(),
    name: "Dr. Sarah Nambi",
    title: "Legal Advisor",
    expertise: ["Human Rights Law", "Gender-Based Violence", "Legal Aid"],
    location: "Kampala",
    languages: ["English", "Luganda", "Swahili"],
    rating: 4.9,
    reviews: 127,
    availability: "Mon-Fri, 9am-5pm",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Dr. Nambi has over 15 years of experience providing legal counsel to women in Uganda. She specializes in cases related to gender-based violence and human rights violations.",
    contactInfo: {
      email: "sarah.nambi@example.com",
      phone: "+256 700 123456",
    },
  },
  {
    id: uuidv4(),
    name: "Grace Achieng",
    title: "Financial Consultant",
    expertise: ["Microfinance", "Business Planning", "Financial Literacy"],
    location: "Jinja",
    languages: ["English", "Luo", "Luganda"],
    rating: 4.7,
    reviews: 98,
    availability: "Tue-Sat, 10am-6pm",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
    bio: "Grace helps women-led businesses secure funding and develop sustainable financial plans. She has assisted over 200 small businesses in eastern Uganda.",
    contactInfo: {
      email: "grace.achieng@example.com",
    },
  },
  {
    id: uuidv4(),
    name: "Dr. Joseph Okello",
    title: "Healthcare Specialist",
    expertise: ["Women's Health", "Mental Health", "Community Healthcare"],
    location: "Gulu",
    languages: ["English", "Acholi", "Luganda"],
    rating: 4.8,
    reviews: 156,
    availability: "Mon-Thu, 8am-4pm",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joseph",
    bio: "Dr. Okello provides healthcare consultations with a focus on women's health issues. He has worked extensively in northern Uganda's rural communities.",
    contactInfo: {
      email: "joseph.okello@example.com",
      phone: "+256 701 987654",
    },
  },
  {
    id: uuidv4(),
    name: "Esther Nakato",
    title: "Technology Trainer",
    expertise: ["Digital Literacy", "Online Safety", "Mobile Technology"],
    location: "Mbarara",
    languages: ["English", "Runyankole", "Luganda"],
    rating: 4.6,
    reviews: 87,
    availability: "Wed-Sun, 9am-7pm",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Esther",
    bio: "Esther specializes in teaching digital skills to women in rural areas. She has trained over 1,000 women in basic computer skills and online safety.",
    contactInfo: {
      email: "esther.nakato@example.com",
      phone: "+256 702 345678",
    },
  },
  {
    id: uuidv4(),
    name: "Florence Adeke",
    title: "Psychosocial Counselor",
    expertise: ["Trauma Counseling", "Group Therapy", "Conflict Resolution"],
    location: "Mbale",
    languages: ["English", "Lugisu", "Swahili"],
    rating: 4.9,
    reviews: 142,
    availability: "Mon-Fri, 10am-8pm",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Florence",
    bio: "Florence provides psychosocial support to women affected by conflict and violence. She has extensive experience working with community-based organizations.",
    contactInfo: {
      email: "florence.adeke@example.com",
    },
  },
];

export const getAdvisors = () => {
  return advisors;
};

export const getAdvisorById = (id: string) => {
  return advisors.find((advisor) => advisor.id === id);
};

export const getAdvisorsByExpertise = (expertise: string) => {
  return advisors.filter((advisor) => advisor.expertise.includes(expertise));
};

export const getAdvisorsByLocation = (location: string) => {
  return advisors.filter((advisor) => advisor.location === location);
};

export const getAdvisorsByLanguage = (language: string) => {
  return advisors.filter((advisor) => advisor.languages.includes(language));
};
