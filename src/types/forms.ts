
export interface LegalDocument {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  year: string;
  ministry: string;
  pdfUrl: string;
  parts?: string[];
  category?: string;
  isPopular?: boolean;
  mudda?: string;
}

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
  caseNumber: string;
  issueNumber: string;
  applicantMunicipality: string;
  applicantDistrictName: string;
  applicantAdditionalInfo: string;
  applicantWardNumber: string;
  applicantFatherName: string;
  opponentMunicipality: string;
  mudda: string;
  opponentAdditionalInfo: string;
  opponentFatherName: string;
  opponentDistrictName: string;
  opponentYearsOfResidence: string;
  opponentWardNumber: string;
  otherWardNumber: string;
  otherName: string;
  otherMunicipality: string;
  otherWardName: string;
  dateBS: string;
}
