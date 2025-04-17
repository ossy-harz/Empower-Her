import { FileText } from "lucide-react";

export default function EmptyContentState() {
  return (
    <div className="text-center py-12">
      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No content found</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Try adjusting your search or filter to find what you're looking for, or
        create new content to share with the community.
      </p>
    </div>
  );
}
