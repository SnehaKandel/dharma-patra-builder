
interface BSCalendarData {
  [year: number]: number[];
}

// Nepali calendar data - mapping BS years to the number of days in each month
// This is a simplified version - in a production app, you'd want more comprehensive data
const bsCalendarData: BSCalendarData = {
  2080: [31, 31, 31, 32, 31, 31, 30, 30, 29, 30, 29, 31], // 2080 BS
  2081: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2081 BS
  2082: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2082 BS  
  2083: [31, 31, 31, 32, 30, 31, 30, 30, 29, 29, 30, 31], // 2083 BS
  // Add more years as needed
};

// Define Nepali month names
export const nepaliMonths = [
  "Baisakh", "Jestha", "Asar", "Shrawan", "Bhadra", "Ashwin", 
  "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
];

// Define English month names
export const englishMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Generate years for dropdowns
export const generateYears = (start: number, end: number): number[] => {
  const years: number[] = [];
  for (let i = start; i <= end; i++) {
    years.push(i);
  }
  return years;
};

// Generate days based on month and year
export const generateDays = (year: number, month: number, isBS: boolean): number[] => {
  const days: number[] = [];
  let daysInMonth = 30; // Default

  if (isBS) {
    // For BS calendar
    if (bsCalendarData[year] && bsCalendarData[year][month - 1]) {
      daysInMonth = bsCalendarData[year][month - 1];
    }
  } else {
    // For AD calendar
    if (month === 2) {
      // February
      daysInMonth = isLeapYear(year) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
      daysInMonth = 30;
    } else {
      daysInMonth = 31;
    }
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
};

// Check if a year is a leap year (for AD calendar)
const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

// Convert BS to AD (simplified approximation)
export const convertBSToAD = (bsYear: number, bsMonth: number, bsDay: number): { year: number; month: number; day: number } => {
  // This is a simplified conversion - in a real app, use a comprehensive conversion algorithm
  // The offset between BS and AD is approximately 56/57 years, but varies
  let adYear = bsYear - 57;
  let adMonth = ((bsMonth + 3) % 12) || 12;
  let adDay = bsDay;
  
  if (adDay > 28 && adMonth === 2) {
    adDay = 28;
  }
  
  // Adjust year if needed
  if (bsMonth < 9) {
    adYear = bsYear - 56;
  }
  
  return { year: adYear, month: adMonth, day: adDay };
};

// Convert AD to BS (simplified approximation)
export const convertADToBS = (adYear: number, adMonth: number, adDay: number): { year: number; month: number; day: number } => {
  // This is a simplified conversion - in a real app, use a comprehensive conversion algorithm
  let bsYear = adYear + 56;
  let bsMonth = ((adMonth + 8) % 12) || 12;
  let bsDay = adDay;
  
  // Adjust year if needed
  if (adMonth > 4) {
    bsYear = adYear + 57;
  }
  
  return { year: bsYear, month: bsMonth, day: bsDay };
};

// Get today's date in BS
export const getTodaysDateBS = (): { year: number; month: number; day: number } => {
  const today = new Date();
  const adYear = today.getFullYear();
  const adMonth = today.getMonth() + 1;
  const adDay = today.getDate();
  
  return convertADToBS(adYear, adMonth, adDay);
};

// Get today's date in AD
export const getTodaysDateAD = (): { year: number; month: number; day: number } => {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate()
  };
};
