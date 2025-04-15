import { useState, useEffect } from "react";
import { getAdvisors } from "@/lib/data/advisors";
import { Advisor } from "@/types/advisor";
import AdvisorCard from "./AdvisorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface AdvisorDirectoryProps {
  onSchedule?: (advisor: Advisor) => void;
  onMessage?: (advisor: Advisor) => void;
}

export default function AdvisorDirectory({
  onSchedule,
  onMessage,
}: AdvisorDirectoryProps) {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [filteredAdvisors, setFilteredAdvisors] = useState<Advisor[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(
    null,
  );
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Get all unique expertise areas, locations, and languages from advisors
  const expertiseAreas = [
    ...new Set(advisors.flatMap((advisor) => advisor.expertise)),
  ];
  const locations = [...new Set(advisors.map((advisor) => advisor.location))];
  const languages = [
    ...new Set(advisors.flatMap((advisor) => advisor.languages)),
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const data = getAdvisors();
      setAdvisors(data);
      setFilteredAdvisors(data);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = advisors;

    // Apply search filter
    if (searchValue) {
      const search = searchValue.toLowerCase();
      result = result.filter(
        (advisor) =>
          advisor.name.toLowerCase().includes(search) ||
          advisor.title.toLowerCase().includes(search) ||
          advisor.expertise.some((exp) => exp.toLowerCase().includes(search)) ||
          advisor.bio.toLowerCase().includes(search),
      );
    }

    // Apply expertise filter
    if (selectedExpertise && selectedExpertise !== "all-expertise") {
      result = result.filter((advisor) =>
        advisor.expertise.includes(selectedExpertise),
      );
    }

    // Apply location filter
    if (selectedLocation && selectedLocation !== "all-locations") {
      result = result.filter(
        (advisor) => advisor.location === selectedLocation,
      );
    }

    // Apply language filter
    if (selectedLanguage && selectedLanguage !== "all-languages") {
      result = result.filter((advisor) =>
        advisor.languages.includes(selectedLanguage),
      );
    }

    setFilteredAdvisors(result);
  }, [
    advisors,
    searchValue,
    selectedExpertise,
    selectedLocation,
    selectedLanguage,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleClearFilters = () => {
    setSelectedExpertise("all-expertise");
    setSelectedLocation("all-locations");
    setSelectedLanguage("all-languages");
  };

  return (
    <div className="w-full bg-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Find an Advisor</h2>
        <p className="text-muted-foreground">
          Connect with professional advisors who can provide guidance and
          support
        </p>
      </div>

      {/* Search and filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, expertise, or keywords..."
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-8 pr-10"
          />
          {searchValue && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2.5 top-2.5"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <select
            value={selectedExpertise || ""}
            onChange={(e) => setSelectedExpertise(e.target.value || null)}
            className="text-sm border rounded px-2 py-1 bg-background"
          >
            <option value="all-expertise">Expertise</option>
            {expertiseAreas.map((expertise) => (
              <option key={expertise} value={expertise}>
                {expertise}
              </option>
            ))}
          </select>

          <select
            value={selectedLocation || ""}
            onChange={(e) => setSelectedLocation(e.target.value || null)}
            className="text-sm border rounded px-2 py-1 bg-background"
          >
            <option value="all-locations">Location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <select
            value={selectedLanguage || ""}
            onChange={(e) => setSelectedLanguage(e.target.value || null)}
            className="text-sm border rounded px-2 py-1 bg-background"
          >
            <option value="all-languages">Language</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>

          {(selectedExpertise || selectedLocation || selectedLanguage) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-sm"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Results */}
      <div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredAdvisors.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredAdvisors.length} advisor
              {filteredAdvisors.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAdvisors.map((advisor) => (
                <AdvisorCard
                  key={advisor.id}
                  advisor={advisor}
                  onSchedule={onSchedule}
                  onMessage={onMessage}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg font-medium">No advisors found</p>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
