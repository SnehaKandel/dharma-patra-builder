
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FormAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FormAccordion = ({ title, children, defaultOpen = false }: FormAccordionProps) => {
  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? "item-1" : undefined}>
      <AccordionItem value="item-1" className="border-asklegal-form-border">
        <AccordionTrigger className="accordion-title hover:no-underline">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-4 pb-2 space-y-4">
            {children}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FormAccordion;
