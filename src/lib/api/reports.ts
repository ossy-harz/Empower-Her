import { supabase } from "../supabase";
import { v4 as uuidv4 } from "uuid";
import { Database } from "@/types/supabase";

export type Report = Database["public"]["Tables"]["reports"]["Row"];
export type ReportMedia = Database["public"]["Tables"]["report_media"]["Row"];

export type FormValues = {
  incidentType: string;
  incidentDate: string;
  incidentDescription: string;
  location?: string;
  enableGeotagging: boolean;
  isAnonymous: boolean;
  contactEmail?: string;
  contactPhone?: string;
};

// Create a new report
export const createReport = async (
  data: FormValues,
  mediaFiles: File[] = [],
): Promise<{ report: Report | null; error: any }> => {
  try {
    // Get the current user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    // Create the report
    const { data: reportData, error: reportError } = await supabase
      .from("reports")
      .insert({
        user_id: userData.user?.id,
        title: `${data.incidentType} incident on ${data.incidentDate}`,
        type: data.incidentType,
        date: data.incidentDate,
        description: data.incidentDescription,
        location: data.location || null,
        is_anonymous: data.isAnonymous,
        contact_email: data.isAnonymous ? null : data.contactEmail,
        contact_phone: data.isAnonymous ? null : data.contactPhone,
        status: "pending",
        progress: 0,
      })
      .select()
      .single();

    if (reportError) throw reportError;

    // Upload media files if any
    if (mediaFiles.length > 0 && reportData) {
      await uploadReportMedia(reportData.id, mediaFiles);
    }

    return { report: reportData, error: null };
  } catch (error) {
    console.error("Error creating report:", error);
    return { report: null, error };
  }
};

// Upload media files for a report
export const uploadReportMedia = async (
  reportId: string,
  mediaFiles: File[],
): Promise<{ success: boolean; error: any }> => {
  try {
    const uploadPromises = mediaFiles.map(async (file) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `reports/${reportId}/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from("report-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("report-media")
        .getPublicUrl(filePath);

      // Add record to report_media table
      const { error: dbError } = await supabase.from("report_media").insert({
        report_id: reportId,
        file_path: filePath,
        file_type: file.type,
        file_name: file.name,
      });

      if (dbError) throw dbError;

      return { filePath, publicUrl: urlData.publicUrl };
    });

    await Promise.all(uploadPromises);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error uploading media:", error);
    return { success: false, error };
  }
};

// Get all reports for the current user
export const getUserReports = async (): Promise<{
  reports: Report[];
  error: any;
}> => {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { reports: data || [], error: null };
  } catch (error) {
    console.error("Error fetching reports:", error);
    return { reports: [], error };
  }
};

// Get a single report by ID
export const getReportById = async (
  reportId: string,
): Promise<{ report: Report | null; media: ReportMedia[]; error: any }> => {
  try {
    // Get the report
    const { data: reportData, error: reportError } = await supabase
      .from("reports")
      .select("*")
      .eq("id", reportId)
      .single();

    if (reportError) throw reportError;

    // Get the media files
    const { data: mediaData, error: mediaError } = await supabase
      .from("report_media")
      .select("*")
      .eq("report_id", reportId);

    if (mediaError) throw mediaError;

    return {
      report: reportData,
      media: mediaData || [],
      error: null,
    };
  } catch (error) {
    console.error("Error fetching report:", error);
    return { report: null, media: [], error };
  }
};

// Update a report
export const updateReport = async (
  reportId: string,
  data: Partial<Report>,
): Promise<{ success: boolean; error: any }> => {
  try {
    const { error } = await supabase
      .from("reports")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error("Error updating report:", error);
    return { success: false, error };
  }
};

// Delete a report
export const deleteReport = async (
  reportId: string,
): Promise<{ success: boolean; error: any }> => {
  try {
    // Delete all media files from storage first
    const { data: mediaData } = await supabase
      .from("report_media")
      .select("file_path")
      .eq("report_id", reportId);

    if (mediaData && mediaData.length > 0) {
      const filePaths = mediaData.map((media) => media.file_path);
      const { error: storageError } = await supabase.storage
        .from("report-media")
        .remove(filePaths);

      if (storageError) throw storageError;
    }

    // Delete the report (this will cascade delete the media records)
    const { error } = await supabase
      .from("reports")
      .delete()
      .eq("id", reportId);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting report:", error);
    return { success: false, error };
  }
};
