import localforage from "localforage";
import { v4 as uuidv4 } from "uuid";
import { FormValues } from "./api/reports";

// Configure localforage
localforage.config({
  name: "digital-empowerment-platform",
  storeName: "reports",
  description: "Offline storage for reports and media",
});

// Types for offline storage
export interface OfflineReport {
  id: string;
  data: FormValues;
  mediaFiles: OfflineMediaFile[];
  status: "pending" | "synced" | "error";
  createdAt: string;
  syncError?: string;
}

export interface OfflineMediaFile {
  id: string;
  file: Blob;
  fileName: string;
  fileType: string;
}

// Save a report to offline storage
export const saveReportOffline = async (
  data: FormValues,
  mediaFiles: File[] = [],
): Promise<{ success: boolean; reportId: string; error: any }> => {
  try {
    const reportId = uuidv4();

    // Convert media files to a format that can be stored
    const offlineMediaFiles: OfflineMediaFile[] = await Promise.all(
      mediaFiles.map(async (file) => ({
        id: uuidv4(),
        file: file,
        fileName: file.name,
        fileType: file.type,
      })),
    );

    // Create the offline report object
    const offlineReport: OfflineReport = {
      id: reportId,
      data,
      mediaFiles: offlineMediaFiles,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Save to localforage
    await localforage.setItem(`report:${reportId}`, offlineReport);

    // Add to the pending reports list
    const pendingReports = await getPendingReports();
    pendingReports.push(reportId);
    await localforage.setItem("pendingReports", pendingReports);

    return { success: true, reportId, error: null };
  } catch (error) {
    console.error("Error saving report offline:", error);
    return { success: false, reportId: "", error };
  }
};

// Get all pending reports that need to be synced
export const getPendingReports = async (): Promise<string[]> => {
  try {
    const pendingReports =
      await localforage.getItem<string[]>("pendingReports");
    return pendingReports || [];
  } catch (error) {
    console.error("Error getting pending reports:", error);
    return [];
  }
};

// Get a report from offline storage
export const getOfflineReport = async (
  reportId: string,
): Promise<OfflineReport | null> => {
  try {
    const report = await localforage.getItem<OfflineReport>(
      `report:${reportId}`,
    );
    return report;
  } catch (error) {
    console.error("Error getting offline report:", error);
    return null;
  }
};

// Get all reports from offline storage
export const getAllOfflineReports = async (): Promise<OfflineReport[]> => {
  try {
    const reports: OfflineReport[] = [];
    await localforage.iterate<OfflineReport, void>((value, key) => {
      if (key.startsWith("report:")) {
        reports.push(value);
      }
    });
    return reports;
  } catch (error) {
    console.error("Error getting all offline reports:", error);
    return [];
  }
};

// Update a report's status in offline storage
export const updateOfflineReportStatus = async (
  reportId: string,
  status: OfflineReport["status"],
  syncError?: string,
): Promise<boolean> => {
  try {
    const report = await getOfflineReport(reportId);
    if (!report) return false;

    report.status = status;
    if (syncError) report.syncError = syncError;

    await localforage.setItem(`report:${reportId}`, report);

    // If synced successfully, remove from pending reports
    if (status === "synced") {
      const pendingReports = await getPendingReports();
      const updatedPendingReports = pendingReports.filter(
        (id) => id !== reportId,
      );
      await localforage.setItem("pendingReports", updatedPendingReports);
    }

    return true;
  } catch (error) {
    console.error("Error updating offline report status:", error);
    return false;
  }
};

// Delete a report from offline storage
export const deleteOfflineReport = async (
  reportId: string,
): Promise<boolean> => {
  try {
    await localforage.removeItem(`report:${reportId}`);

    // Remove from pending reports if it exists
    const pendingReports = await getPendingReports();
    const updatedPendingReports = pendingReports.filter(
      (id) => id !== reportId,
    );
    await localforage.setItem("pendingReports", updatedPendingReports);

    return true;
  } catch (error) {
    console.error("Error deleting offline report:", error);
    return false;
  }
};
