
export interface PetitionFormData {
  subject: string;
  applicantName: string;
  district: string;
  address: string;
  residentYears: string;
  opponentName: string;
  opponentPosition: string;
  opponentOffice: string;
  petitionDetails: string;
  demands: string;
  date: string;
  
  // New fields from the screenshot
  caseNumber: string;
  issueNumber: string;
  applicantMunicipality: string;
  applicantDistrictName: string;
  applicantAdditionalInfo: string;
  applicantWardNumber: string;
  applicantFatherName: string;
  opponentMunicipality: string;
  mukuda: string;
  opponentAdditionalInfo: string;
  opponentFatherName: string;
  opponentDistrictName: string;
  opponentYearsOfResidence: string;
  opponentWardNumber: string;
  otherWardNumber: string;
  otherName: string;
  otherMunicipality: string;
  otherWardName: string;
  shubham: string;
  day: string;
  month: string;
  year: string;
  dateBS: string;
}

export interface KanoonSearchQuery {
  searchTerm: string;
  category?: string;
  year?: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  category: string;
  year: string;
  ministry: string;
  pdfUrl: string;
  isPopular?: boolean;
  parts?: string[]; // Added the missing property
}
