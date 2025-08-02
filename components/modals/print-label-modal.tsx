// components/modals/print-label-modal.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductLabel } from "@/components/ui/ProductLabel";
import { Printer } from "lucide-react";
import { jsPDF } from "jspdf";

interface PrintLabelModalProps {
  item: {
    id: string;
    name: string;
    category: string;
    location: string;
  };
}

export function PrintLabelModal({ item }: PrintLabelModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePrint = () => {
    const element = document.getElementById('label-content');
    if (!element) return;

    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
    });

    pdf.html(element, {
      callback: function (doc) {
        doc.save(`label-${item.id}.pdf`);
      },
      x: 10,
      y: 10,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Printer className="h-4 w-4 mr-2" />
          Print Label
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Print Product Label</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div id="label-content">
            <ProductLabel item={item} />
          </div>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print Label
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}