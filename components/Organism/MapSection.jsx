// MapSection.js
import { Card, CardContent } from "@mui/material";
import Image from "next/image";
import MapComponent from "./MapComponent";
import { MapPin } from "lucide-react";

const MapSection = ({ userLocation, filteredCompanies, handleCardClick }) => {
  return (
    <section className="w-full py-12 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex items-center gap-2 mb-8">
          <MapPin className="h-6 w-6" />
          <h2 className="text-2xl font-bold">
            Encuentra lugares cercanos a ti con accesibilidad garantizada
            explorando nuestro mapa
          </h2>
        </div>
        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <MapComponent userLocation={userLocation} />
          <div className="space-y-4 overflow-y-auto max-h-[400px]">
            {filteredCompanies.map((company, index) => (
              <Card
                key={company._id}
                onClick={() => handleCardClick(company._id)}
                className="cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded">
                      <Image
                        src={
                          company.profilePicture ||
                          "/4574c6_19f52cfb1ef44a3d844774c6078ffafc~mv2.png"
                        }
                        alt={company.companyName}
                        width={64}
                        height={64}
                        className="rounded"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{company.companyName}</h3>
                      <div className="flex items-center mt-2">
                        {[...Array(company.rating || 0)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                          </svg>
                        ))}
                      </div>
                      <div className="flex items-center mt-2">
                        {Array.from({ length: company.averageRating || 0 }).map(
                          (_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                            </svg>
                          )
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {company.giro || "Información de accesibilidad no disponible"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;