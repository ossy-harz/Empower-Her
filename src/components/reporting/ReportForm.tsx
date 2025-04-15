import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  MapPin,
  Upload,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { addReport, FormValues } from "@/lib/data/reports";

// Form schema validation
const formSchema = z.object({
  incidentType: z
    .string()
    .min(1, { message: "Please select an incident type" }),
  incidentDate: z
    .string()
    .min(1, { message: "Please provide the incident date" }),
  incidentDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  location: z.string().optional(),
  enableGeotagging: z.boolean().default(false),
  isAnonymous: z.boolean().default(false),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ReportFormProps {
  onSubmitSuccess?: (data: FormValues) => void;
}

const ReportForm = ({ onSubmitSuccess = () => {} }: ReportFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incidentType: "",
      incidentDate: "",
      incidentDescription: "",
      location: "",
      enableGeotagging: false,
      isAnonymous: false,
      contactEmail: "",
      contactPhone: "",
    },
  });

  const totalSteps = 4;
  const progressValue = (currentStep / totalSteps) * 100;

  const handleNext = async () => {
    const fieldsToValidate =
      {
        1: ["incidentType", "incidentDate", "incidentDescription"],
        2: [], // Media upload step doesn't require validation
        3: ["location"], // Location step
        4: [], // Final review step
      }[currentStep] || [];

    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setMediaFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call latency
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add the report to our data store
      const newReport = addReport(data, mediaFiles);
      console.log("Report submitted:", newReport);

      setIsSubmitted(true);
      onSubmitSuccess(data);

      // In a real app with proper auth, we would redirect to the user's reports
      // after a delay to show the success message
      setTimeout(() => {
        navigate("/reports");
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-3xl mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-green-600">
            Report Submitted Successfully
          </CardTitle>
          <CardDescription className="text-center">
            Thank you for your report. It has been submitted securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="rounded-full bg-green-100 p-4 mb-4">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <p className="text-center mb-4">
            Your report has been assigned a tracking number:
          </p>
          <div className="bg-gray-100 p-3 rounded-md font-mono text-lg mb-6">
            REP-{Math.floor(100000 + Math.random() * 900000)}
          </div>
          <p className="text-center text-sm text-gray-600 mb-6">
            {form.getValues().isAnonymous
              ? "You've submitted this report anonymously. You can track its status using the tracking number above."
              : "You will receive updates about your report via the contact information you provided."}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => window.location.reload()}>
            Submit Another Report
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>Submit a Secure Report</CardTitle>
        <CardDescription>
          Your information is encrypted and protected. You can choose to remain
          anonymous.
        </CardDescription>
        <Progress value={progressValue} className="mt-2" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round(progressValue)}% Complete</span>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            {currentStep === 1 && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="incidentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Incident Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select incident type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="harassment">Harassment</SelectItem>
                          <SelectItem value="censorship">Censorship</SelectItem>
                          <SelectItem value="digital_security">
                            Digital Security Breach
                          </SelectItem>
                          <SelectItem value="rights_violation">
                            Rights Violation
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the category that best describes the incident.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="incidentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Incident</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        When did this incident occur?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="incidentDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe what happened in detail..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide as much detail as possible about the incident.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium mb-2">
                    Add Evidence (Optional)
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload photos, videos, or documents related to the incident.
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept="image/*,video/*,application/pdf"
                    className="hidden"
                    id="media-upload"
                    onChange={handleMediaUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("media-upload")?.click()
                    }
                    className="mx-auto"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Select Files
                  </Button>
                </div>

                {mediaFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Uploaded Files ({mediaFiles.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {mediaFiles.map((file, index) => (
                        <div
                          key={index}
                          className="relative border rounded-md p-2 flex items-center"
                        >
                          <div className="flex-1 truncate text-xs">
                            {file.name}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-500"
                            onClick={() => removeMedia(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Alert className="mt-4 bg-blue-50">
                  <AlertTitle className="text-blue-800">
                    Your privacy is protected
                  </AlertTitle>
                  <AlertDescription className="text-blue-700">
                    All uploaded files are encrypted and stored securely. Only
                    authorized personnel can access them.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Location Information</h3>
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the location where the incident occurred"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a description of where this happened (e.g.,
                        district, city, landmark).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enableGeotagging"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Enable Precise Location
                        </FormLabel>
                        <FormDescription>
                          Allow the app to capture your exact GPS coordinates.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("enableGeotagging") && (
                  <div className="rounded-md bg-gray-100 p-4 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm font-medium">
                        Location services active
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your precise location will be securely attached to this
                      report.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="rounded-md bg-gray-50 p-4 mb-4">
                  <h3 className="text-lg font-medium mb-2">
                    Review Your Report
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Incident Type:</span>
                      <span className="col-span-2 capitalize">
                        {form.getValues().incidentType.replace("_", " ") ||
                          "Not specified"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Date:</span>
                      <span className="col-span-2">
                        {form.getValues().incidentDate || "Not specified"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Location:</span>
                      <span className="col-span-2">
                        {form.getValues().location || "Not specified"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Geo-tagging:</span>
                      <span className="col-span-2">
                        {form.getValues().enableGeotagging
                          ? "Enabled"
                          : "Disabled"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Media Files:</span>
                      <span className="col-span-2">
                        {mediaFiles.length} files attached
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="font-medium">Description:</span>
                      <p className="mt-1 p-2 bg-white rounded border text-gray-700">
                        {form.getValues().incidentDescription ||
                          "No description provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="isAnonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <FormLabel className="text-base cursor-pointer">
                            Submit Anonymously
                          </FormLabel>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="h-4 w-4 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">
                                  ?
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-[200px] text-xs">
                                  Anonymous reports don't include your personal
                                  information, but you won't receive updates.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <FormDescription>
                          {field.value ? (
                            <span className="flex items-center gap-1 text-amber-600">
                              <EyeOff className="h-3 w-3" /> Your identity will
                              be hidden
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" /> You'll receive updates
                              on your report
                            </span>
                          )}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {!form.getValues().isAnonymous && (
                  <div className="space-y-4 mt-4">
                    <h4 className="text-sm font-medium">
                      Contact Information (Optional)
                    </h4>
                    <p className="text-sm text-gray-500">
                      Provide your contact details to receive updates about your
                      report.
                    </p>

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+256 XXX XXX XXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            ) : (
              <div></div> // Empty div to maintain spacing with flex justify-between
            )}

            {currentStep < totalSteps ? (
              <Button type="button" onClick={handleNext}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ReportForm;
