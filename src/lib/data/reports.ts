import { v4 as uuidv4 } from "uuid";

export interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  status: "pending" | "in-progress" | "resolved" | "rejected";
  progress: number;
  anonymous: boolean;
  location?: string;
  description?: string;
  submittedBy?: string;
  submitterAvatar?: string;
  media?: Media[];
  timeline?: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  user?: string;
  userAvatar?: string;
}

export interface Media {
  id: string;
  type: "image" | "video" | "document";
  url: string;
  thumbnail?: string;
  name: string;
}

export interface FormValues {
  incidentType: string;
  incidentDate: string;
  incidentDescription: string;
  location?: string;
  enableGeotagging: boolean;
  isAnonymous: boolean;
  contactEmail?: string;
  contactPhone?: string;
}

// Mock data for reports
const mockReports: Report[] = [
  {
    id: "1",
    title: "Harassment at workplace",
    type: "Harassment",
    date: "2023-06-15",
    status: "in-progress",
    progress: 45,
    anonymous: true,
    location: "Kampala",
    description:
      "I experienced verbal harassment while attempting to access public services at the local government office. The official demanded a bribe to process my documents and made inappropriate comments when I refused.",
    submittedBy: "Anonymous",
    media: [
      {
        id: "1",
        type: "image",
        url: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&q=80",
        name: "Office Entrance.jpg",
      },
    ],
    timeline: [
      {
        id: "1",
        date: "2023-06-15",
        time: "11:45 AM",
        title: "Report Submitted",
        description:
          "Your report has been successfully submitted and is awaiting review.",
        user: "System",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=System",
      },
      {
        id: "2",
        date: "2023-06-16",
        time: "09:15 AM",
        title: "Report Assigned",
        description:
          "Your report has been assigned to a case officer for investigation.",
        user: "Admin",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
      },
    ],
  },
  {
    id: "2",
    title: "Digital security threat",
    type: "Digital Security",
    date: "2023-07-22",
    status: "pending",
    progress: 10,
    anonymous: false,
    submittedBy: "Jane Doe",
    submitterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: "3",
    title: "Discrimination in hiring process",
    type: "Discrimination",
    date: "2023-05-30",
    status: "resolved",
    progress: 100,
    anonymous: false,
    location: "Entebbe",
    submittedBy: "Sarah Johnson",
    submitterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "4",
    title: "Online bullying on social media",
    type: "Digital Security",
    date: "2023-08-05",
    status: "in-progress",
    progress: 60,
    anonymous: true,
  },
  {
    id: "5",
    title: "Unfair dismissal from job",
    type: "Employment",
    date: "2023-07-10",
    status: "rejected",
    progress: 0,
    anonymous: false,
    location: "Jinja",
    submittedBy: "Mary Okello",
    submitterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mary",
  },
];

// In-memory storage for reports
let reports = [...mockReports];

// Get all reports
export const getAllReports = () => {
  return reports;
};

// Get report by ID
export const getReportById = (id: string) => {
  return reports.find((report) => report.id === id);
};

// Add a new report
export const addReport = (formData: FormValues, mediaFiles: File[] = []) => {
  const now = new Date();
  const formattedDate = now.toISOString().split("T")[0];
  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Convert media files to Media objects
  const media: Media[] = mediaFiles.map((file) => ({
    id: uuidv4(),
    type: file.type.startsWith("image/")
      ? "image"
      : file.type.startsWith("video/")
        ? "video"
        : "document",
    url: URL.createObjectURL(file),
    name: file.name,
  }));

  // Create timeline event for submission
  const timeline: TimelineEvent[] = [
    {
      id: uuidv4(),
      date: formattedDate,
      time: formattedTime,
      title: "Report Submitted",
      description:
        "Your report has been successfully submitted and is awaiting review.",
      user: "System",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=System",
    },
  ];

  // Create new report
  const newReport: Report = {
    id: uuidv4(),
    title: `${formData.incidentType.replace("_", " ")} incident`,
    type: formData.incidentType.replace("_", " "),
    date: formData.incidentDate,
    status: "pending",
    progress: 10,
    anonymous: formData.isAnonymous,
    location: formData.location,
    description: formData.incidentDescription,
    submittedBy: formData.isAnonymous ? "Anonymous" : "Jane Doe", // In a real app, this would be the current user
    submitterAvatar: formData.isAnonymous
      ? undefined
      : "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    media,
    timeline,
  };

  reports = [newReport, ...reports];
  return newReport;
};

// Update report status
export const updateReportStatus = (
  id: string,
  status: Report["status"],
  comment?: string,
) => {
  const reportIndex = reports.findIndex((report) => report.id === id);
  if (reportIndex === -1) return null;

  const now = new Date();
  const formattedDate = now.toISOString().split("T")[0];
  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Update progress based on status
  let progress = reports[reportIndex].progress;
  switch (status) {
    case "pending":
      progress = 10;
      break;
    case "in-progress":
      progress = 50;
      break;
    case "resolved":
      progress = 100;
      break;
    case "rejected":
      progress = 0;
      break;
  }

  // Create timeline event for status update
  const newEvent: TimelineEvent = {
    id: uuidv4(),
    date: formattedDate,
    time: formattedTime,
    title: `Status Updated to ${status.charAt(0).toUpperCase() + status.slice(1)}`,
    description:
      comment || `The status of your report has been updated to ${status}.`,
    user: "Case Officer",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Officer",
  };

  // Update report
  const updatedReport = {
    ...reports[reportIndex],
    status,
    progress,
    timeline: [...(reports[reportIndex].timeline || []), newEvent],
  };

  reports[reportIndex] = updatedReport;
  return updatedReport;
};
