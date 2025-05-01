
import { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  convertBSToAD, 
  convertADToBS, 
  nepaliMonths, 
  englishMonths,
  generateYears, 
  generateDays,
  getTodaysDateBS,
  getTodaysDateAD
} from "@/utils/dateConverter";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Constants for dropdown options
const BS_YEARS = generateYears(2000, 2090);
const AD_YEARS = generateYears(1943, 2033);

const DateConverter = () => {
  const { toast } = useToast();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
  // BS Date State
  const [bsYear, setBsYear] = useState<number>(2080);
  const [bsMonth, setBsMonth] = useState<number>(1);
  const [bsDay, setBsDay] = useState<number>(1);
  
  // AD Date State
  const [adYear, setAdYear] = useState<number>(2023);
  const [adMonth, setAdMonth] = useState<number>(4);
  const [adDay, setAdDay] = useState<number>(14);
  
  // Today's date
  const [todayBS, setTodayBS] = useState(getTodaysDateBS());
  const [todayAD, setTodayAD] = useState(getTodaysDateAD());
  
  // Available days based on selected month and year
  const [bsAvailableDays, setBsAvailableDays] = useState<number[]>([]);
  const [adAvailableDays, setAdAvailableDays] = useState<number[]>([]);

  // Update available days when month or year changes
  useEffect(() => {
    setBsAvailableDays(generateDays(bsYear, bsMonth, true));
  }, [bsYear, bsMonth]);

  useEffect(() => {
    setAdAvailableDays(generateDays(adYear, adMonth, false));
  }, [adYear, adMonth]);

  // Validate selected day against available days
  useEffect(() => {
    if (bsAvailableDays.length && !bsAvailableDays.includes(bsDay)) {
      setBsDay(bsAvailableDays[bsAvailableDays.length - 1]);
    }
  }, [bsAvailableDays, bsDay]);

  useEffect(() => {
    if (adAvailableDays.length && !adAvailableDays.includes(adDay)) {
      setAdDay(adAvailableDays[adAvailableDays.length - 1]);
    }
  }, [adAvailableDays, adDay]);

  // Convert BS to AD when BS date changes
  useEffect(() => {
    const converted = convertBSToAD(bsYear, bsMonth, bsDay);
    setAdYear(converted.year);
    setAdMonth(converted.month);
    setAdDay(converted.day);
  }, [bsYear, bsMonth, bsDay]);

  // Convert AD to BS when AD date changes
  const handleADDateChange = (newYear: number, newMonth: number, newDay: number) => {
    setAdYear(newYear);
    setAdMonth(newMonth);
    setAdDay(newDay);
    
    const converted = convertADToBS(newYear, newMonth, newDay);
    setBsYear(converted.year);
    setBsMonth(converted.month);
    setBsDay(converted.day);
  };

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: text,
      duration: 2000,
    });
  };

  // Format BS date as string
  const formatBSDate = (year: number, month: number, day: number) => 
    `${year} ${nepaliMonths[month - 1]} ${day}`;

  // Format AD date as string
  const formatADDate = (year: number, month: number, day: number) => 
    `${year} ${englishMonths[month - 1]} ${day}`;

  return (
    <div className="flex flex-col bg-background rounded-lg p-4 shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-asklegal-heading theme-transition">
        Date Converter
      </h1>

      {/* Today's Date Section */}
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="flex-1">
          <h2 className="text-lg font-medium mb-2 text-asklegal-heading theme-transition">Today's Date</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between bg-background/60 p-3 rounded border border-asklegal-form-border/30">
              <span className="text-asklegal-text theme-transition">{formatBSDate(todayBS.year, todayBS.month, todayBS.day)}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard(formatBSDate(todayBS.year, todayBS.month, todayBS.day))}
                className="text-asklegal-text/70 hover:text-asklegal-purple"
              >
                <Copy size={16} />
              </Button>
            </div>
            <div className="flex items-center justify-between bg-background/60 p-3 rounded border border-asklegal-form-border/30">
              <span className="text-asklegal-text theme-transition">{formatADDate(todayAD.year, todayAD.month, todayAD.day)}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard(formatADDate(todayAD.year, todayAD.month, todayAD.day))}
                className="text-asklegal-text/70 hover:text-asklegal-purple"
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Converter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nepali Date Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-asklegal-heading theme-transition">Nepali Date</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="text-sm text-asklegal-text/70 theme-transition">Year</label>
              <Select
                value={bsYear.toString()}
                onValueChange={(value) => setBsYear(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BS_YEARS.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-asklegal-text/70 theme-transition">Month</label>
              <Select
                value={bsMonth.toString()}
                onValueChange={(value) => setBsMonth(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {nepaliMonths.map((month, index) => (
                    <SelectItem key={index} value={(index + 1).toString()}>
                      ({index + 1}) {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-asklegal-text/70 theme-transition">Day</label>
              <Select
                value={bsDay.toString()}
                onValueChange={(value) => setBsDay(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bsAvailableDays.map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background/60 p-3 rounded border border-asklegal-form-border/30">
            <span className="text-asklegal-text theme-transition">{formatBSDate(bsYear, bsMonth, bsDay)}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => copyToClipboard(formatBSDate(bsYear, bsMonth, bsDay))}
              className="text-asklegal-text/70 hover:text-asklegal-purple"
            >
              <Copy size={16} />
            </Button>
          </div>
        </div>

        {/* English Date Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-asklegal-heading theme-transition">English Date</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="text-sm text-asklegal-text/70 theme-transition">Year</label>
              <Select
                value={adYear.toString()}
                onValueChange={(value) => handleADDateChange(parseInt(value), adMonth, adDay)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AD_YEARS.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-asklegal-text/70 theme-transition">Month</label>
              <Select
                value={adMonth.toString()}
                onValueChange={(value) => handleADDateChange(adYear, parseInt(value), adDay)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {englishMonths.map((month, index) => (
                    <SelectItem key={index} value={(index + 1).toString()}>
                      ({index + 1}) {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-asklegal-text/70 theme-transition">Day</label>
              <Select
                value={adDay.toString()}
                onValueChange={(value) => handleADDateChange(adYear, adMonth, parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {adAvailableDays.map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background/60 p-3 rounded border border-asklegal-form-border/30">
            <span className="text-asklegal-text theme-transition">{formatADDate(adYear, adMonth, adDay)}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => copyToClipboard(formatADDate(adYear, adMonth, adDay))}
              className="text-asklegal-text/70 hover:text-asklegal-purple"
            >
              <Copy size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateConverter;
