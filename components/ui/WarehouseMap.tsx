// components/WarehouseMap.tsx
import { cn } from "@/lib/utils"

interface WarehouseMapProps {
  location: string // Format: "A1-B2"
  className?: string
}

export function WarehouseMap({ location, className }: WarehouseMapProps) {
  const [aisle, shelf] = location.split('-')
  
  // Create a grid of warehouse sections
  const aisles = ['A', 'B', 'C', 'D', 'E']
  const shelves = ['1', '2', '3', '4', '5']

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-sm" />
          <span className="text-sm text-muted-foreground">Current Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded-sm border" />
          <span className="text-sm text-muted-foreground">Available Space</span>
        </div>
      </div>
      
      <div className="relative">
        {/* Warehouse Entry */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-800 px-3 py-1 rounded-md text-sm">
          Warehouse Entry
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-5 gap-2 p-4 bg-muted rounded-lg">
          {aisles.map((currentAisle) => (
            <div key={currentAisle} className="space-y-2">
              {shelves.map((currentShelf) => {
                const isCurrentLocation = currentAisle === aisle[0] && currentShelf === shelf[0]
                
                return (
                  <div
                    key={`${currentAisle}${currentShelf}`}
                    className={cn(
                      "relative h-16 rounded-md border transition-colors",
                      isCurrentLocation
                        ? "bg-blue-500 border-blue-600 text-white"
                        : "bg-gray-100 border-gray-200 hover:bg-gray-200"
                    )}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-medium">{`${currentAisle}${currentShelf}`}</span>
                    </div>
                    
                    {isCurrentLocation && (
                      <div className="absolute -right-2 -top-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-md">
                        Current
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        
        {/* Aisle Labels */}
        <div className="mt-2 grid grid-cols-5 gap-2">
          {aisles.map((aisle) => (
            <div key={aisle} className="text-center">
              <span className="text-sm font-medium">Aisle {aisle}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Location Details */}
      <div className="mt-6 grid grid-cols-3 gap-4 bg-muted/50 p-4 rounded-lg">
        <div>
          <p className="text-sm text-muted-foreground">Aisle</p>
          <p className="font-medium">{aisle}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Shelf</p>
          <p className="font-medium">{shelf}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Position</p>
          <p className="font-medium">{location}</p>
        </div>
      </div>
    </div>
  )
}