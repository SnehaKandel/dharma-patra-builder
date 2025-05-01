
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DateConverter from "./DateConverter";

const DateConverterPopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center text-asklegal-heading hover:text-asklegal-purple gap-2 theme-transition relative"
        >
          <Calendar size={18} />
          <span className="hidden md:inline">Calendar</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[350px] md:w-[600px] p-4 shadow-md"
      >
        <DateConverter />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateConverterPopover;
