import { MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { tourismAttractions } from '../../data/sampleData';

export default function TourismAttractions() {
  const attractionImages = [
    'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1588607916307-281f665a6c3a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1584735174965-e94cd6d69ba7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop',
  ];

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
