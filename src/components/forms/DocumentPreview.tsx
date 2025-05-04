
import { PetitionFormData } from "@/types/forms";

interface DocumentPreviewProps {
  formData: PetitionFormData;
}

const DocumentPreview = ({ formData }: DocumentPreviewProps) => {
  return (
    <div className="bg-asklegal-dark rounded-lg border border-asklegal-purple/30 overflow-hidden flex flex-col h-full">
      <div className="p-4 bg-asklegal-purple/10 border-b border-asklegal-purple/30 flex justify-between items-center">
        <h3 className="text-lg font-medium text-asklegal-purple">Document Preview</h3>
      </div>
      
      <div className="p-6 flex-1 overflow-auto">
        <div className="bg-white text-gray-900 p-8 shadow-lg min-h-[842px] w-full max-w-[595px] mx-auto animate-paper-print">
          <div className="text-center mb-6">
            <h1 className="text-xl font-nepali font-bold">श्री सर्वोच्च अदालत, काठमाडौँमा पेश गरेको</h1>
            <h2 className="text-lg font-nepali font-bold">निवेदन पत्र</h2>
          </div>
          
          <div className="mb-6">
            <p className="font-nepali text-center">
              विषय : तारिख सकार गरिपाउँ।
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-nepali mb-1">मुद्दा र. नं.{formData.caseNumber || "_________"}</p>
              <p className="font-nepali mb-1">को छोरा, जिल्ला न.पा./गा.पा. वडा नं.</p>
              <p className="font-nepali mb-1">बस्ने वर्ष को {formData.applicantName || "___________"}</p>
              <p className="font-nepali">निवेदक</p>
            </div>
            
            <div>
              <p className="font-nepali mb-4">विरुद्ध</p>
              <p className="font-nepali mb-1">को छोरा, जिल्ला न.पा./गा.पा. वडा नं.</p>
              <p className="font-nepali mb-1">बस्ने वर्ष को {formData.opponentName || "___________"}</p>
              <p className="font-nepali">विपक्षी</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-nepali font-bold mb-2">मुद्दा–</h3>
            <p className="font-nepali ml-4">
              निवेदनबापत लाग्ने दस्तुर रु.१०।– साथै राखी निम्नानुसार निवेदन गर्दछु/गर्दछौँ :
            </p>
          </div>
          
          <div className="mb-6">
            <ol className="list-decimal pl-6 space-y-4">
              <li className="font-nepali">
                उक्त मुद्दामा मैले/हामीले जिल्ला न.पा./गा.पा. वडा नं बस्ने लाई वारिस राख्न अख्तियारनामा लेखिदिएको र निज वारिसलाई यस अदालतबाट मिति गतेको तारिख तोकिएकोमा म/हामी आफै तारिखमा रहने हुँदा मुलुकी देवानी कार्यविधि संहिता, २०७४ को दफा १५२ बमोजिम आफ्नो मुद्दाको तारिख आफै सकार गरिपाउँ।
              </li>
              <li className="font-nepali">
                लेखिएको व्यहोरा ठिक साँचो हो फरक ठहरे कानूनबमोजिम सहुँला बुझाउँला।
              </li>
            </ol>
          </div>
          
          <div className="text-right mt-12">
            <p className="font-nepali">निवेदक</p>
            <p className="font-nepali">नाम: {formData.applicantName || "___________"}</p>
            <p className="font-nepali">मिति: {formData.dateBS || formData.date || "___________"}</p>
          </div>
          
          <div className="mt-16 text-center text-sm">
            <p className="font-nepali">इति संवत् साल महिना गते रोज शुभम् ।</p>
          </div>
          
          <div className="mt-16 pt-4 border-t border-gray-300 text-xs text-gray-500">
            <p className="font-nepali">नोट : (१) यो निवेदनको छाँचा सेवाग्राहीको सहजताको लागि अदालतबाट नि:शुल्क रुपमा उपलब्ध हुने र व्यहोरा भर्ने तरसकिनेरुलाई अदालतबाट भरिदिने व्यवस्था छ।</p>
            <p className="font-nepali">(२) असमर्थ पक्षलाई नि:शुल्क कानूनी सेवा उपलब्ध छ।</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
