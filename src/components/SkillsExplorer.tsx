import { useState } from "react";
import { Search, MapPin, Filter, Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { usePoints } from "@/contexts/PointsContext";

const SkillsExplorer = () => {
  const navigate = useNavigate();
  const { userPoints, spendPoints, addPoints } = usePoints();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  // Show only first 6 students for the homepage section
  const allStudents = [
    {
      id: 1,
      name: "Ana María Rodríguez",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=150&q=80",
      location: "CABA, Buenos Aires",
      course: "Análisis de Sistemas",
      year: "3er Año",
      rating: 4.9,
      reviews: 23,
      skills: ["React", "Python", "JavaScript", "Node.js"],
      availability: "Disponible",
      sessionCost: 35
    },
    {
      id: 2,
      name: "Carlos López",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      location: "La Plata, Buenos Aires",
      course: "Desarrollo Web",
      year: "2do Año",
      rating: 4.8,
      reviews: 19,
      skills: ["Node.js", "MongoDB", "Express", "Vue.js"],
      availability: "Disponible",
      sessionCost: 30
    },
    {
      id: 3,
      name: "María González",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      location: "Córdoba, Córdoba",
      course: "Programación",
      year: "3er Año",
      rating: 4.7,
      reviews: 21,
      skills: ["Java", "Spring", "SQL", "Python"],
      availability: "Ocupado",
      sessionCost: 40
    },
    {
      id: 4,
      name: "Diego Fernández",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      location: "CABA, Buenos Aires",
      course: "Análisis de Sistemas",
      year: "2do Año",
      rating: 4.6,
      reviews: 15,
      skills: ["C#", ".NET", "Azure", "SQL"],
      availability: "Disponible",
      sessionCost: 35
    },
    {
      id: 5,
      name: "Lucía Martínez",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      location: "Rosario, Santa Fe",
      course: "Desarrollo Web",
      year: "3er Año",
      rating: 4.6,
      reviews: 18,
      skills: ["Vue.js", "TypeScript", "AWS", "React"],
      availability: "Disponible",
      sessionCost: 40
    },
    {
      id: 6,
      name: "Joaquín Morales",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      location: "Mendoza, Mendoza",
      course: "Análisis de Sistemas",
      year: "1er Año",
      rating: 4.4,
      reviews: 8,
      skills: ["Python", "Django", "PostgreSQL"],
      availability: "Disponible",
      sessionCost: 25
    }
  ];

  const locations = ["CABA, Buenos Aires", "La Plata, Buenos Aires", "Córdoba, Córdoba", "Rosario, Santa Fe", "Mendoza, Mendoza"];
  const allSkills = ["React", "Python", "JavaScript", "Node.js", "MongoDB", "Express", "Vue.js", "Java", "Spring", "SQL", "C#", ".NET", "Azure", "TypeScript", "AWS", "Django", "PostgreSQL"];

  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = !selectedLocation || selectedLocation === "all" || student.location === selectedLocation;
    const matchesSkill = !selectedSkill || selectedSkill === "all" || student.skills.includes(selectedSkill);
    
    return matchesSearch && matchesLocation && matchesSkill;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xs ${
          i < Math.floor(rating) ? "text-orange-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const handleViewProfile = (studentId: number) => {
    console.log('SkillsExplorer - Navigating to profile ID:', studentId);
    navigate(`/profile/${studentId}`);
  };

  const handleRequestSession = (student: any) => {
    const success = spendPoints(student.sessionCost, `Sesión con ${student.name}`);
    if (success) {
      alert(`¡Sesión solicitada con ${student.name}! Se han deducido ${student.sessionCost} puntos.`);
      
      // Simulate completing a session and earning bonus points for high-rated mentors
      setTimeout(() => {
        const isHighRated = student.rating >= 4.7;
        addPoints(
          Math.floor(student.sessionCost * 0.8), 
          `Sesión completada con ${student.name}`,
          isHighRated
        );
      }, 2000);
    } else {
      alert(`No tienes suficientes puntos. Necesitas ${student.sessionCost} puntos para esta sesión.`);
    }
  };

  return (
    <section id="skills" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl mb-3">
            Explorar Habilidades
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra mentores por ubicación y habilidades específicas
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre o habilidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por ubicación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ubicaciones</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por habilidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las habilidades</SelectItem>
                {allSkills.map(skill => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results - Show only first 6 for homepage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.slice(0, 6).map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow h-fit">
              <CardHeader className="text-center pb-3">
                <Avatar className="h-14 w-14 mx-auto mb-3">
                  <AvatarImage 
                    src={student.image} 
                    alt={student.name}
                    className="object-cover"
                  />
                  <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-base">{student.name}</CardTitle>
                <p className="text-teal-600 font-medium text-sm">{student.course}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  {student.location}
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                {/* Rating */}
                <div className="flex items-center justify-center gap-2">
                  <div className="flex">
                    {renderStars(student.rating)}
                  </div>
                  <span className="font-semibold text-sm">{student.rating}</span>
                  <span className="text-gray-500 text-xs">({student.reviews})</span>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">Habilidades:</p>
                  <div className="flex flex-wrap gap-1">
                    {student.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {student.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{student.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Session Cost */}
                <div className="flex items-center justify-center gap-1 text-sm font-medium text-orange-600">
                  <Coins className="h-4 w-4" />
                  {student.sessionCost} puntos/sesión
                </div>

                {/* Availability */}
                <div className="flex items-center justify-between">
                  <Badge 
                    className={student.availability === "Disponible" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                    }
                  >
                    {student.availability}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleViewProfile(student.id)}
                    variant="outline"
                    className="flex-1" 
                    size="sm"
                  >
                    Ver Perfil
                  </Button>
                  <Button 
                    onClick={() => handleRequestSession(student)}
                    className="flex-1 bg-teal-600 hover:bg-teal-700" 
                    size="sm"
                    disabled={student.availability === "Ocupado" || userPoints < student.sessionCost}
                  >
                    Solicitar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-base">
              No se encontraron estudiantes con los criterios seleccionados.
            </p>
          </div>
        )}

        <div className="text-center mt-6">
          <Button 
            onClick={() => navigate('/skills')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
          >
            Ver Todos los Estudiantes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SkillsExplorer;
