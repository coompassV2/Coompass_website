
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, Filter, Download, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface VolunteerHour {
  id: number;
  volunteerName: string;
  date: Date;
  hours: number;
  project: string;
  status: "pending" | "verified" | "submitted";
}

export function VolunteerHoursTracking() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showAddHoursDialog, setShowAddHoursDialog] = useState(false);
  const [newHoursEntry, setNewHoursEntry] = useState({
    volunteerName: "",
    hours: "",
    project: "",
    date: new Date(),
  });

  // Mock data for volunteer hours
  const [volunteerHours, setVolunteerHours] = useState<VolunteerHour[]>([
    {
      id: 1,
      volunteerName: "Emma Johnson",
      date: new Date(2025, 3, 15),
      hours: 4.5,
      project: "Beach Cleanup",
      status: "verified"
    },
    {
      id: 2,
      volunteerName: "Michael Chen",
      date: new Date(2025, 3, 10),
      hours: 3,
      project: "Food Drive",
      status: "verified"
    },
    {
      id: 3,
      volunteerName: "Sofia Rodriguez",
      date: new Date(2025, 4, 2),
      hours: 2,
      project: "Mentorship Program",
      status: "pending"
    }
  ]);

  const filteredHours = volunteerHours.filter(entry => {
    const matchesSearch = entry.volunteerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         entry.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !selectedDate || 
                       (entry.date.getDate() === selectedDate.getDate() &&
                        entry.date.getMonth() === selectedDate.getMonth() &&
                        entry.date.getFullYear() === selectedDate.getFullYear());
    
    return matchesSearch && matchesDate;
  });

  const handleAddHours = () => {
    if (!newHoursEntry.volunteerName || !newHoursEntry.hours || !newHoursEntry.project) {
      toast.error(t('Please fill in all required fields'));
      return;
    }

    const newEntry: VolunteerHour = {
      id: volunteerHours.length + 1,
      volunteerName: newHoursEntry.volunteerName,
      date: newHoursEntry.date,
      hours: parseFloat(newHoursEntry.hours),
      project: newHoursEntry.project,
      status: "pending"
    };

    setVolunteerHours(prev => [...prev, newEntry]);
    setShowAddHoursDialog(false);
    setNewHoursEntry({
      volunteerName: "",
      hours: "",
      project: "",
      date: new Date(),
    });

    toast.success(t('Volunteer hours added successfully'));
  };

  const handleVerifyHours = (id: number) => {
    setVolunteerHours(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, status: "verified" } : entry
      )
    );
    toast.success(t('Hours verified'));
  };

  const handleDeleteHours = (id: number) => {
    setVolunteerHours(prev => prev.filter(entry => entry.id !== id));
    toast.success(t('Hours entry deleted'));
  };

  const totalHours = filteredHours.reduce((sum, entry) => sum + entry.hours, 0);
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t('Volunteer Hours Tracking')}</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              {t('Filter')}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              {t('Export')}
            </Button>
            <Dialog open={showAddHoursDialog} onOpenChange={setShowAddHoursDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('Add Hours')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('Add Volunteer Hours')}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="volunteerName">{t('Volunteer Name')}</Label>
                    <Input 
                      id="volunteerName" 
                      value={newHoursEntry.volunteerName}
                      onChange={(e) => setNewHoursEntry({...newHoursEntry, volunteerName: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="hours">{t('Hours')}</Label>
                    <Input 
                      id="hours" 
                      type="number"
                      step="0.5" 
                      value={newHoursEntry.hours}
                      onChange={(e) => setNewHoursEntry({...newHoursEntry, hours: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project">{t('Project')}</Label>
                    <Input 
                      id="project" 
                      value={newHoursEntry.project}
                      onChange={(e) => setNewHoursEntry({...newHoursEntry, project: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t('Date')}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newHoursEntry.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newHoursEntry.date ? format(newHoursEntry.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newHoursEntry.date}
                          onSelect={(date) => setNewHoursEntry({...newHoursEntry, date: date || new Date()})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddHours}>{t('Add Hours')}</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('Search volunteer or project...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>{t('Filter by date')}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {selectedDate && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9"
                onClick={() => setSelectedDate(undefined)}
              >
                {t('Clear')}
              </Button>
            )}
          </div>
        </div>
        
        <div className="rounded-md border mb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Volunteer')}</TableHead>
                <TableHead>{t('Date')}</TableHead>
                <TableHead>{t('Hours')}</TableHead>
                <TableHead>{t('Project')}</TableHead>
                <TableHead>{t('Status')}</TableHead>
                <TableHead className="text-right">{t('Actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHours.length > 0 ? filteredHours.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.volunteerName}</TableCell>
                  <TableCell>{format(entry.date, "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {entry.hours}
                    </div>
                  </TableCell>
                  <TableCell>{entry.project}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        entry.status === "verified" && "bg-green-500/20 text-green-700 dark:bg-green-950 dark:text-green-400",
                        entry.status === "pending" && "bg-amber-500/20 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                      )}
                    >
                      {entry.status === "verified" ? t('Verified') : t('Pending')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {entry.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleVerifyHours(entry.id)}
                        >
                          {t('Verify')}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteHours(entry.id)}
                      >
                        {t('Delete')}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    {t('No hours entries found')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">{t('Total Hours')}</div>
            <div className="text-2xl font-semibold">{totalHours.toFixed(1)}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">{t('Pending Hours')}</div>
            <div className="text-2xl font-semibold">
              {filteredHours.filter(entry => entry.status === "pending").reduce((sum, entry) => sum + entry.hours, 0).toFixed(1)}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">{t('Verified Hours')}</div>
            <div className="text-2xl font-semibold">
              {filteredHours.filter(entry => entry.status === "verified").reduce((sum, entry) => sum + entry.hours, 0).toFixed(1)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
