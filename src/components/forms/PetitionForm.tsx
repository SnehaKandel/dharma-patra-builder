
import { useState } from "react";
import { PetitionFormData } from "@/types/forms";
import FormAccordion from "./FormAccordion";
import FormField from "./FormField";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PetitionFormProps {
  formData: PetitionFormData;
  onFormChange: (data: PetitionFormData) => void;
}

const PetitionForm = ({ formData, onFormChange }: PetitionFormProps) => {
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    onFormChange({ ...formData, [id]: value });
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
      onFormChange(JSON.parse(savedDraft));
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
    <div className="space-y-6">
      <div className="bg-asklegal-dark rounded-lg border border-asklegal-purple/30 overflow-hidden">
        <div className="p-4 bg-asklegal-purple/10 border-b border-asklegal-purple/30">
          <h2 className="text-lg font-medium text-asklegal-purple">Petition Information</h2>
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
          
          <FormAccordion title="PETITION DETAILS">
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
  );
};

export default PetitionForm;
