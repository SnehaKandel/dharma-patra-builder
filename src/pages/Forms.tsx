
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import FormAccordion from "@/components/forms/FormAccordion";
import FormField from "@/components/forms/FormField";
import DocumentPreview from "@/components/forms/DocumentPreview";
import { Textarea } from "@/components/ui/textarea";
import { PetitionFormData } from "@/types/forms";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Forms = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<PetitionFormData>({
    subject: "",
    applicantName: "",
    district: "",
    address: "",
    residentYears: "",
    opponentName: "",
    opponentPosition: "",
    opponentOffice: "",
    petitionDetails: "",
    demands: "",
    date: new Date().toISOString().split('T')[0]
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-asklegal-purple">धर्मपत्र निर्माता (Dharma Patra Builder)</h1>
          <p className="text-white/70 mt-2">
            Create, customize, and download legal petition documents.
          </p>
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

                <FormAccordion title="Applicant Information" defaultOpen={true}>
                  <FormField
                    label="Applicant Name"
                    id="applicantName"
                    value={formData.applicantName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                  <FormField
                    label="District"
                    id="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Enter your district"
                  />
                  <FormField
                    label="Address"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                  />
                  <FormField
                    label="Years of Residence"
                    id="residentYears"
                    type="number"
                    value={formData.residentYears}
                    onChange={handleInputChange}
                    placeholder="Enter years of residence"
                  />
                </FormAccordion>

                <FormAccordion title="Opponent Information">
                  <FormField
                    label="Opponent Name"
                    id="opponentName"
                    value={formData.opponentName}
                    onChange={handleInputChange}
                    placeholder="Enter opponent name"
                  />
                  <FormField
                    label="Opponent Position"
                    id="opponentPosition"
                    value={formData.opponentPosition}
                    onChange={handleInputChange}
                    placeholder="Enter opponent position"
                  />
                  <FormField
                    label="Opponent Office"
                    id="opponentOffice"
                    value={formData.opponentOffice}
                    onChange={handleInputChange}
                    placeholder="Enter opponent office"
                  />
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
