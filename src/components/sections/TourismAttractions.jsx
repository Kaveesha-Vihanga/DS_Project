import { MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { tourismAttractions } from '../../data/sampleData';

import img1 from '@/images/sigiriya.jpg'
import img2 from '@/images/temple of tooth.jpg'
import img3 from '@/images/galle.jpg'
import img4 from '@/images/yala.jpg' 
import img5 from '@/images/nine arch.jpg'
import img6 from '@/images/dam bulla.jpg'
import img7 from '@/images/mirissa.jpg'
import img8 from '@/images/nuwara eliya.jpg'


export default function TourismAttractions() {
  const attractionImages = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8
  ]



  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
              Major Attractions
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Top Tourism
            <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Destinations
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most visited attractions driving tourism growth across Sri Lanka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tourismAttractions.map((attraction, index) => (
            <Card 
              key={index}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={attractionImages[index]}
                  alt={attraction.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900 backdrop-blur-sm">
                  <Users className="h-3 w-3 mr-1" />
                  {attraction.visitors}
                </Badge>
              </div>
              <CardContent className="pt-4">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-gray-900 leading-tight">
                    {attraction.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {attraction.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
