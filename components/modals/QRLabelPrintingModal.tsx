// components/modals/qr-label-modal.tsx
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Printer } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface QRLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    name: string;
    category: string;
    location: string;
    stock: number;
    value: string;
  };
}

export function QRLabelModal({ isOpen, onClose, item }: QRLabelModalProps) {
  const handlePrint = async () => {
    const element = document.getElementById('qr-label');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a6',
    });

    pdf.addImage(imgData, 'PNG', 10, 10, 128, 90);
    pdf.save(`${item.id}-label.pdf`);
  };

  // Create a URL-friendly string that contains the product information
  const qrData = `${window.location.origin}/inventory/product/${item.id}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Product Label - {item.id}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <Card id="qr-label" className="w-full p-4">
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <h3 className="font-bold text-xl">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.id}</p>
                <p className="text-sm">Location: {item.location}</p>
              </div>
              <QRCodeSVG
                value={qrData}
                size={200}
                level="H"
                includeMargin={true}
              />
            </CardContent>
          </Card>
          <Button onClick={handlePrint} className="w-full">
            <Printer className="h-4 w-4 mr-2" />
            Print Label
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}