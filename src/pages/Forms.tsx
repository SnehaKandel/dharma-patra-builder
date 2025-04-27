
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import FormAccordion from "@/components/forms/FormAccordion";
import FormField from "@/components/forms/FormField";
import DocumentPreview from "@/components/forms/DocumentPreview";
import { Textarea } from "@/components/ui/textarea";
import { PetitionFormData } from "@/types/forms";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Search, FileText } from "lucide-react";

const Forms = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<PetitionFormData>({
    subject: "दाखिल खारेज गरिपाउँ।",
    applicantName: "",
    district: "",
    address: "",
    residentYears: "",
    opponentName: "",
    opponentPosition: "",
    opponentOffice: "",
    petitionDetails: "",
    demands: "",
    date: new Date().toISOString().split('T')[0],
    
    // New fields
    caseNumber: "",
    issueNumber: "",
    applicantMunicipality: "",
    applicantDistrictName: "",
    applicantAdditionalInfo: "",
    applicantWardNumber: "",
    applicantFatherName: "",
    opponentMunicipality: "",
    mukuda: "",
    opponentAdditionalInfo: "",
    opponentFatherName: "",
    opponentDistrictName: "",
    opponentYearsOfResidence: "",
    opponentWardNumber: "",
    otherWardNumber: "",
    otherName: "",
    otherMunicipality: "",
    otherWardName: "",
    shubham: "",
    day: "",
    month: "",
    year: "",
    dateBS: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem("petitionDraft", JSON.stringify(formData));
    toast({
      title: "Draft Saved",
      description: "Your petition draft has been saved successfully.",
    });
  };

  const handleLoadDraft = () => {
    const savedDraft = localStorage.getItem("petitionDraft");
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
      toast({
        title: "Draft Loaded",
        description: "Your saved draft has been loaded successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "No Draft Found",
        description: "There is no saved draft to load.",
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-asklegal-purple">धर्मपत्र निर्माता (Dharma Patra Builder)</h1>
            <p className="text-white/70 mt-2">
              Create, customize, and download legal petition documents.
            </p>
          </div>
          
          <div className="flex items-center">
            <Link to="/kanoon-search">
              <Button className="flex items-center gap-2 bg-asklegal-purple hover:bg-asklegal-accent">
                <Search size={18} />
                <span>कानून खोज</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-asklegal-dark rounded-lg border border-asklegal-purple/30 overflow-hidden">
              <div className="p-4 bg-asklegal-purple/10 border-b border-asklegal-purple/30">
                <h2 className="text-lg font-medium text-asklegal-purple">
                  Petition Information
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <FormField
                  label="Subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Enter petition subject"
                />

                <FormAccordion title="CASE DETAILS" defaultOpen={true}>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="CASE NUMBER"
                      id="caseNumber"
                      value={formData.caseNumber}
                      onChange={handleInputChange}
                      placeholder="Enter case number"
                    />
                    <FormField
                      label="ISSUE NUMBER"
                      id="issueNumber"
                      value={formData.issueNumber}
                      onChange={handleInputChange}
                      placeholder="Enter issue number"
                    />
                  </div>
                </FormAccordion>

                <FormAccordion title="APPLICANT DETAILS" defaultOpen={true}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      label="ADDITIONAL INFO"
                      id="applicantAdditionalInfo"
                      value={formData.applicantAdditionalInfo}
                      onChange={handleInputChange}
                      placeholder="Enter additional info"
                    />
                    <FormField
                      label="APPLICANT MUNICIPALITY OR RURAL MUNICIPALITY"
                      id="applicantMunicipality"
                      value={formData.applicantMunicipality}
                      onChange={handleInputChange}
                      placeholder="Enter municipality"
                    />
                    <FormField
                      label="APPLICANT DISTRICT NAME"
                      id="applicantDistrictName"
                      value={formData.applicantDistrictName}
                      onChange={handleInputChange}
                      placeholder="Enter district name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <FormField
                      label="APPLICANT YEARS OF RESIDENCE"
                      id="residentYears"
                      type="number"
                      value={formData.residentYears}
                      onChange={handleInputChange}
                      placeholder="Enter years of residence"
                    />
                    <FormField
                      label="APPLICANT WARD NUMBER"
                      id="applicantWardNumber"
                      value={formData.applicantWardNumber}
                      onChange={handleInputChange}
                      placeholder="Enter ward number"
                    />
                    <FormField
                      label="APPLICANT FATHER NAME"
                      id="applicantFatherName"
                      value={formData.applicantFatherName}
                      onChange={handleInputChange}
                      placeholder="Enter father's name"
                    />
                  </div>
                </FormAccordion>

                <FormAccordion title="OPPONENT DETAILS">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      label="OPPONENT MUNICIPALITY OR RURAL MUNICIPALITY"
                      id="opponentMunicipality"
                      value={formData.opponentMunicipality}
                      onChange={handleInputChange}
                      placeholder="Enter opponent municipality"
                    />
                    <FormField
                      label="MUKUDA"
                      id="mukuda"
                      value={formData.mukuda}
                      onChange={handleInputChange}
                      placeholder="Enter mukuda"
                    />
                    <FormField
                      label="ADDITIONAL INFO"
                      id="opponentAdditionalInfo"
                      value={formData.opponentAdditionalInfo}
                      onChange={handleInputChange}
                      placeholder="Enter additional info"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <FormField
                      label="OPPONENT FATHER NAME"
                      id="opponentFatherName"
                      value={formData.opponentFatherName}
                      onChange={handleInputChange}
                      placeholder="Enter opponent father's name"
                    />
                    <FormField
                      label="OPPONENT DISTRICT NAME"
                      id="opponentDistrictName"
                      value={formData.opponentDistrictName}
                      onChange={handleInputChange}
                      placeholder="Enter opponent district name"
                    />
                    <FormField
                      label="OPPONENT YEARS OF RESIDENCE"
                      id="opponentYearsOfResidence"
                      value={formData.opponentYearsOfResidence}
                      onChange={handleInputChange}
                      placeholder="Enter opponent years of residence"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <FormField
                      label="OPPONENT WARD NUMBER"
                      id="opponentWardNumber"
                      value={formData.opponentWardNumber}
                      onChange={handleInputChange}
                      placeholder="Enter opponent ward number"
                    />
                  </div>
                </FormAccordion>
                
                <FormAccordion title="OTHER DETAILS">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      label="WARD NUMBER"
                      id="otherWardNumber"
                      value={formData.otherWardNumber}
                      onChange={handleInputChange}
                      placeholder="Enter ward number"
                    />
                    <FormField
                      label="NAME"
                      id="otherName"
                      value={formData.otherName}
                      onChange={handleInputChange}
                      placeholder="Enter name"
                    />
                    <FormField
                      label="MUNICIPALITY OR RURAL MUNICIPALITY"
                      id="otherMunicipality"
                      value={formData.otherMunicipality}
                      onChange={handleInputChange}
                      placeholder="Enter municipality"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <FormField
                      label="WARD NAME"
                      id="otherWardName"
                      value={formData.otherWardName}
                      onChange={handleInputChange}
                      placeholder="Enter ward name"
                    />
                    <FormField
                      label="SHUBHAM"
                      id="shubham"
                      value={formData.shubham}
                      onChange={handleInputChange}
                      placeholder="Enter shubham"
                    />
                    <FormField
                      label="DAY"
                      id="day"
                      value={formData.day}
                      onChange={handleInputChange}
                      placeholder="Enter day"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <FormField
                      label="MONTH"
                      id="month"
                      value={formData.month}
                      onChange={handleInputChange}
                      placeholder="Enter month"
                    />
                    <FormField
                      label="YEAR"
                      id="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      placeholder="Enter year"
                    />
                    <FormField
                      label="DATE IN BS"
                      id="dateBS"
                      value={formData.dateBS}
                      onChange={handleInputChange}
                      placeholder="Enter date in BS"
                    />
                  </div>
                </FormAccordion>

                <FormAccordion title="Petition Details">
                  <div className="space-y-2">
                    <label htmlFor="petitionDetails" className="block text-white/80">
                      Petition Details
                    </label>
                    <Textarea
                      id="petitionDetails"
                      value={formData.petitionDetails}
                      onChange={handleInputChange}
                      placeholder="Enter the details of your petition here..."
                      className="h-32 bg-transparent border-asklegal-purple/40 text-white focus:border-asklegal-purple focus:ring-asklegal-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="demands" className="block text-white/80">
                      Demands
                    </label>
                    <Textarea
                      id="demands"
                      value={formData.demands}
                      onChange={handleInputChange}
                      placeholder="Enter your demands here..."
                      className="h-32 bg-transparent border-asklegal-purple/40 text-white focus:border-asklegal-purple focus:ring-asklegal-purple"
                    />
                  </div>
                </FormAccordion>

                <FormField
                  label="Date"
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />

                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={handleSaveDraft} 
                    className="bg-asklegal-purple hover:bg-asklegal-accent text-white"
                  >
                    Save Draft
                  </Button>
                  <Button 
                    onClick={handleLoadDraft}
                    variant="outline" 
                    className="border-asklegal-purple/50 text-asklegal-purple hover:bg-asklegal-purple/10"
                  >
                    Load Draft
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Document Preview */}
          <div className="lg:sticky lg:top-4 lg:h-[calc(100vh-8rem)]">
            <DocumentPreview formData={formData} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Forms;
