
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TagSelectorProps {
  options: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  optionLabels?: Record<string, string>;
}

export function TagSelector({ 
  options, 
  selectedTags, 
  onTagsChange, 
  placeholder = "Select options...",
  maxTags,
  optionLabels = {},
}: TagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const getOptionLabel = (option: string) => optionLabels[option] ?? option;

  const filteredOptions = options.filter(option => 
    getOptionLabel(option).toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedTags.includes(option)
  );

  const handleTagSelect = (tag: string) => {
    if (maxTags && selectedTags.length >= maxTags) {
      // If maxTags is set and we're at the limit, replace the first tag
      onTagsChange([tag]);
    } else {
      onTagsChange([...selectedTags, tag]);
    }
    setSearchTerm("");
    if (maxTags === 1) {
      setIsOpen(false);
    }
  };

  const handleTagRemove = (tag: string) => {
    onTagsChange(selectedTags.filter(t => t !== tag));
  };

  return (
    <div className="space-y-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start bg-muted/50 border-border text-foreground hover:bg-muted"
          >
            <Plus className="h-4 w-4 mr-2" />
            {placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-2">
            <Input
              placeholder="Search options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
            <div className="max-h-40 overflow-y-auto">
              {filteredOptions.map((option) => (
                <Button
                  key={option}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left h-8"
                  onClick={() => handleTagSelect(option)}
                >
                  {getOptionLabel(option)}
                </Button>
              ))}
              {filteredOptions.length === 0 && (
                <p className="text-sm text-muted-foreground p-2">No options found</p>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground">
              {getOptionLabel(tag)}
              <button
                onClick={() => handleTagRemove(tag)}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
