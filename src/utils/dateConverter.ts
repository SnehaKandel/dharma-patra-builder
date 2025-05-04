
interface BSCalendarData {
  [year: number]: number[];
}

// Nepali calendar data - mapping BS years to the number of days in each month
// More comprehensive data for accurate BS-AD conversion
const bsCalendarData: BSCalendarData = {
  2070: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2071: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2072: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2073: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2077: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2081: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],  
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2084: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2085: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2086: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2087: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2088: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2090: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  // Add more years as needed
};

// Reference date for BS-AD conversion
const BS_REFERENCE_DATE = {
  bs: {
    year: 2000,
    month: 1,
    day: 1
  },
  ad: {
    year: 1943,
    month: 4,
    day: 14
  }
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

// Get the total days from a specific date
const getTotalDaysFromDate = (date: { year: number, month: number, day: number }, isBS: boolean): number => {
  let totalDays = 0;
  
  if (isBS) {
    // For BS date
    for (let i = BS_REFERENCE_DATE.bs.year; i < date.year; i++) {
      for (let j = 1; j <= 12; j++) {
        totalDays += bsCalendarData[i]?.[j - 1] || 30;
      }
    }
    
    for (let i = 1; i < date.month; i++) {
      totalDays += bsCalendarData[date.year]?.[i - 1] || 30;
    }
  } else {
    // For AD date
    const startDate = new Date(BS_REFERENCE_DATE.ad.year, BS_REFERENCE_DATE.ad.month - 1, BS_REFERENCE_DATE.ad.day);
    const targetDate = new Date(date.year, date.month - 1, date.day);
    
    // Calculate difference in milliseconds and convert to days
    totalDays = Math.floor((targetDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  }
  
  return totalDays + date.day;
};

// Convert BS to AD
export const convertBSToAD = (bsYear: number, bsMonth: number, bsDay: number): { year: number; month: number; day: number } => {
  // Check if the date is valid
  if (!bsCalendarData[bsYear] || bsDay > (bsCalendarData[bsYear][bsMonth - 1] || 30)) {
    return getTodaysDateAD(); // Return today's date as fallback
  }
  
  // Calculate total days from BS reference date
  let totalDays = -1; // Start from -1 to account for the reference day itself
  
  // Add days for years
  for (let year = BS_REFERENCE_DATE.bs.year; year < bsYear; year++) {
    if (bsCalendarData[year]) {
      totalDays += bsCalendarData[year].reduce((sum, days) => sum + days, 0);
    } else {
      totalDays += 365; // Approximation for missing years
    }
  }
  
  // Add days for months in the current year
  for (let month = 1; month < bsMonth; month++) {
    totalDays += bsCalendarData[bsYear][month - 1] || 30;
  }
  
  // Add days of the current month
  totalDays += bsDay;
  
  // Calculate the AD date by adding days to the reference AD date
  let adDate = new Date(BS_REFERENCE_DATE.ad.year, BS_REFERENCE_DATE.ad.month - 1, BS_REFERENCE_DATE.ad.day);
  adDate.setDate(adDate.getDate() + totalDays);
  
  return {
    year: adDate.getFullYear(),
    month: adDate.getMonth() + 1,
    day: adDate.getDate()
  };
};

// Convert AD to BS
export const convertADToBS = (adYear: number, adMonth: number, adDay: number): { year: number; month: number; day: number } => {
  // Create JavaScript Date object for the AD date
  const adDate = new Date(adYear, adMonth - 1, adDay);
  
  // Calculate days between reference AD date and target AD date
  const referenceDate = new Date(BS_REFERENCE_DATE.ad.year, BS_REFERENCE_DATE.ad.month - 1, BS_REFERENCE_DATE.ad.day);
  const daysDifference = Math.floor((adDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Initialize BS date to reference date
  let bsYear = BS_REFERENCE_DATE.bs.year;
  let bsMonth = BS_REFERENCE_DATE.bs.month;
  let bsDay = BS_REFERENCE_DATE.bs.day;
  
  // Add the difference in days to the BS reference date
  let remainingDays = daysDifference;
  
  // Advance years
  while (true) {
    // Check if we have data for this year
    if (!bsCalendarData[bsYear]) {
      // Use approximation for missing years
      if (remainingDays >= 366) {
        remainingDays -= 366;
        bsYear++;
      } else {
        break;
      }
      continue;
    }
    
    // Calculate total days in the current BS year
    const daysInYear = bsCalendarData[bsYear].reduce((sum, days) => sum + days, 0);
    
    if (remainingDays >= daysInYear) {
      remainingDays -= daysInYear;
      bsYear++;
    } else {
      break;
    }
  }
  
  // Advance months
  for (bsMonth = 1; bsMonth <= 12; bsMonth++) {
    const daysInMonth = bsCalendarData[bsYear]?.[bsMonth - 1] || 30;
    
    if (remainingDays >= daysInMonth) {
      remainingDays -= daysInMonth;
    } else {
      break;
    }
  }
  
  // Set day
  bsDay = remainingDays + 1;
  
  // Ensure valid values
  bsMonth = Math.min(bsMonth, 12);
  const maxDaysInMonth = bsCalendarData[bsYear]?.[bsMonth - 1] || 30;
  bsDay = Math.min(bsDay, maxDaysInMonth);
  
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

// Format date as string for display
export const formatBSDate = (year: number, month: number, day: number): string => 
  `${year} ${nepaliMonths[month - 1]} ${day}`;

export const formatADDate = (year: number, month: number, day: number): string => 
  `${year} ${englishMonths[month - 1]} ${day}`;

// Function to validate BS date
export const isValidBSDate = (year: number, month: number, day: number): boolean => {
  if (!bsCalendarData[year]) return false;
  if (month < 1 || month > 12) return false;
  const daysInMonth = bsCalendarData[year][month - 1] || 30;
  return day >= 1 && day <= daysInMonth;
};
