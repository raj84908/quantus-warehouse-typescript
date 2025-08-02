// In your InventoryContent component, add this state:
const [isQRModalOpen, setIsQRModalOpen] = useState(false);
const [selectedQRItem, setSelectedQRItem] = useState<any>(null);

// Then modify your DropdownMenuItem for QR code generation:
<DropdownMenuItem onClick={(e) => {
  e.stopPropagation(); // Prevent row click event
  setSelectedQRItem(item);
  setIsQRModalOpen(true);
}}>
  <QrCode className="h-4 w-4 mr-2" />
  Generate QR Code
</DropdownMenuItem>

// Add the QRLabelModal component at the bottom of your JSX:
{selectedQRItem && (
  <QRLabelModal
    isOpen={isQRModalOpen}
    onClose={() => setIsQRModalOpen(false)}
    item={selectedQRItem}
  />
)}