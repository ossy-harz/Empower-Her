import { createReport } from "./api/reports";
import {
  getPendingReports,
  getOfflineReport,
  updateOfflineReportStatus,
  OfflineReport,
} from "./offlineStorage";

// Check if the device is online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Sync a single report
export const syncReport = async (reportId: string): Promise<boolean> => {
  try {
    // Get the offline report
    const offlineReport = await getOfflineReport(reportId);
    if (!offlineReport) return false;

    // Skip if already synced
    if (offlineReport.status === "synced") return true;

    // Convert offline media files to File objects
    const mediaFiles: File[] = offlineReport.mediaFiles.map((media) => {
      return new File([media.file], media.fileName, { type: media.fileType });
    });

    // Create the report in the database
    const { report, error } = await createReport(
      offlineReport.data,
      mediaFiles,
    );

    if (error) {
      await updateOfflineReportStatus(reportId, "error", error.message);
      return false;
    }

    // Update the offline report status
    await updateOfflineReportStatus(reportId, "synced");
    return true;
  } catch (error) {
    console.error("Error syncing report:", error);
    await updateOfflineReportStatus(reportId, "error", error.message);
    return false;
  }
};

// Sync all pending reports
export const syncAllPendingReports = async (): Promise<{
  success: boolean;
  synced: number;
  failed: number;
}> => {
  try {
    // Check if online
    if (!isOnline()) {
      return { success: false, synced: 0, failed: 0 };
    }

    // Get all pending reports
    const pendingReportIds = await getPendingReports();
    if (pendingReportIds.length === 0) {
      return { success: true, synced: 0, failed: 0 };
    }

    // Sync each report
    let synced = 0;
    let failed = 0;

    for (const reportId of pendingReportIds) {
      const success = await syncReport(reportId);
      if (success) {
        synced++;
      } else {
        failed++;
      }
    }

    return {
      success: failed === 0,
      synced,
      failed,
    };
  } catch (error) {
    console.error("Error syncing all pending reports:", error);
    return { success: false, synced: 0, failed: 0 };
  }
};

// Set up automatic sync when the app comes online
export const setupAutoSync = (): void => {
  window.addEventListener("online", async () => {
    console.log("Device is online. Starting automatic sync...");
    await syncAllPendingReports();
  });
};

// Initialize sync functionality
export const initSync = (): void => {
  setupAutoSync();

  // Try to sync any pending reports on initialization
  if (isOnline()) {
    syncAllPendingReports().then((result) => {
      console.log(
        `Sync completed. Synced: ${result.synced}, Failed: ${result.failed}`,
      );
    });
  }
};
