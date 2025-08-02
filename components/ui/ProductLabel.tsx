// components/ProductLabel.tsx
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent } from "@/components/ui/card";

interface ProductLabelProps {
  item: {
    id: string;
    name: string;
    category: string;
    location: string;
  };
}

export function ProductLabel({ item }: ProductLabelProps) {
  const qrData = JSON.stringify({
    id: item.id,
    name: item.name,
    category: item.category,
    location: item.location,
  });

  return (
    <Card className="w-[300px] p-4">
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
  );
}