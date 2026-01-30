
import { Layout } from "@/components/layout";
import { useState, useEffect } from "react";
import { Search, Users, Star, Phone, Video, Mail, Calendar, Info, Filter, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample professionals data
const professionalsList = [
  {
    id: "1",
    name: "Dr. Nitish Singh",
    title: "Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma"],
    experience: "12 years",
    rating: 4.8,
    reviews: 124,
    price: "₹1,500",
    availability: "Mon, Wed, Fri",
    image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    bio: "Dr. Singh specializes in cognitive behavioral therapy and has helped hundreds of clients overcome anxiety and depression. He takes a compassionate, evidence-based approach to therapy."
  },
  {
    id: "2",
    name: "Dr. Atharv Khadkikar",
    title: "Psychiatrist",
    specialties: ["Medication Management", "Bipolar Disorder", "ADHD"],
    experience: "15 years",
    rating: 4.7,
    reviews: 98,
    price: "₹2,000",
    availability: "Tue, Thu, Sat",
    image: "https://thumbs.dreamstime.com/b/indian-doctor-stethoscope-around-neck-his-office-170292594.jpg",
    bio: "Dr. Khadkikar is board-certified in psychiatry with extensive experience in medication management. He believes in a holistic approach that considers both medication and lifestyle factors."
  },
  {
    id: "3",
    name: "Antonela Roccuzzo",
    title: "Licensed Therapist",
    specialties: ["Relationships", "Self-Esteem", "Work Stress"],
    experience: "8 years",
    rating: 4.9,
    reviews: 87,
    price: "₹1,200",
    availability: "Mon-Fri",
    image: "https://www.hola.com/us/horizon/square/0dd0d7c3b783-paris-france-antonela-roccuzzo-attends-the-louis-vuitton-womenswear-fall-winter-.jpg",
    bio: "Antonela specializes in helping clients navigate relationship challenges and build self-confidence. Her approach combines cognitive behavioral therapy with mindfulness techniques."
  },
  {
    id: "4",
    name: "Dr. Cristiano Ronaldo",
    title: "Clinical Psychologist",
    specialties: ["Grief", "Life Transitions", "Identity"],
    experience: "10 years",
    rating: 4.6,
    reviews: 76,
    price: "₹1,800",
    availability: "Tue, Wed, Thu",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFc0Cry8E_MF-5Qkl5umnXnZ77LI0B8tYKTn-nIG48KTFKnzxLHhIP2Usqb8Hsq0ERpH8_pM0M06a1kB-A0CToMw",
    bio: "Dr.Ronaldo helps clients navigate life's difficult transitions with compassion and practical strategies. He specializes in grief counseling and identity exploration."
  },
  {
    id: "5",
    name: "Anushka Sharma",
    title: "Art Therapist",
    specialties: ["Trauma", "Anxiety", "Self-Expression"],
    experience: "6 years",
    rating: 4.8,
    reviews: 52,
    price: "₹1,300",
    availability: "Mon, Thu, Sat",
    image: "https://i.pinimg.com/736x/77/9c/2f/779c2f7f9fc0bf477751be0a6d777ffc.jpg",
    bio: "Anushka uses art therapy to help clients process trauma and anxiety. Her approach is especially effective for those who find it difficult to express themselves through traditional talk therapy."
  },
  {
    id: "6",
    name: "Dr. Harsh Dhanawade",
    title: "Addiction Specialist",
    specialties: ["Substance Abuse", "Recovery", "Family Therapy"],
    experience: "14 years",
    rating: 4.7,
    reviews: 91,
    price: "₹1,600",
    availability: "Wed, Fri, Sat",
    image: "https://img.freepik.com/free-photo/portrait-male-health-worker_23-2148980804.jpg",
    bio: "Dr. Dhanawade specializes in addiction recovery and supporting families affected by substance abuse. He takes a non-judgmental, recovery-oriented approach to treatment."
  }
];

// Available specialties for filtering
const allSpecialties = [
  "Anxiety",
  "Depression",
  "Trauma",
  "Relationships",
  "Self-Esteem",
  "Work Stress",
  "Medication Management",
  "Bipolar Disorder",
  "ADHD",
  "Grief",
  "Life Transitions",
  "Identity",
  "Self-Expression",
  "Substance Abuse",
  "Recovery",
  "Family Therapy",
];

const Professionals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [professionals, setProfessionals] = useState(professionalsList);
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Initialize professionals from localStorage or use default list
    const storedProfessionals = localStorage.getItem("professionals");
    if (storedProfessionals) {
      setProfessionals(JSON.parse(storedProfessionals));
    } else {
      // Save default professionals to localStorage
      localStorage.setItem("professionals", JSON.stringify(professionalsList));
    }
    localStorage.removeItem("professionals");

  }, []);

  // Filter professionals based on search and specialty filters
  const filteredProfessionals = professionals.filter((professional) => {
    // Filter by search term
    const matchesSearch =
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Filter by selected specialties
    const matchesSpecialties =
      selectedSpecialties.length === 0 ||
      professional.specialties.some((specialty) =>
        selectedSpecialties.includes(specialty)
      );

    return matchesSearch && matchesSpecialties;
  });

  const handleSpecialtyToggle = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialties([]);
  };

  const handleContactProfessional = (type: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to contact professionals.",
        variant: "destructive",
      });
      return;
    }

    let message = "";
    switch (type) {
      case "call":
        message = "Scheduling a phone call";
        break;
      case "video":
        message = "Scheduling a video session";
        break;
      case "message":
        message = "Sending a message";
        break;
      case "appointment":
        message = "Booking an appointment";
        break;
    }

    toast({
      title: "Contact request sent",
      description: `${message} with ${selectedProfessional.name}. They will contact you soon.`,
    });
  };

  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8 text-center">
          <span className="inline-block px-3 py-1 bg-calm-100 dark:bg-calm-900/30 text-calm-700 dark:text-calm-400 rounded-full text-sm font-medium mb-4">
            <Users className="inline-block w-4 h-4 mr-2" />
            Mental Health Professionals
          </span>
          <h1 className="section-title">Connect with Experts</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find and connect with qualified mental health professionals who can support your journey.
          </p>
        </header>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search field */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, specialization, or title..."
              className="input-field pl-10"
            />
          </div>

          {/* Filter button (mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden btn-ghost flex items-center justify-center gap-2"
          >
            <Filter className="h-5 w-5" />
            <span>Filters {selectedSpecialties.length > 0 && `(${selectedSpecialties.length})`}</span>
          </button>

          {/* Desktop filters */}
          <div className="hidden md:block">
            <button
              onClick={clearFilters}
              className="btn-ghost flex items-center justify-center gap-2"
              disabled={searchTerm === "" && selectedSpecialties.length === 0}
            >
              <X className="h-4 w-4" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>

        {/* Mobile filters dropdown */}
        {showFilters && (
          <div className="md:hidden glass-card p-4 mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Filter by Specialty</h3>
              <button onClick={clearFilters} className="text-sm text-primary">
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allSpecialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => handleSpecialtyToggle(specialty)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                    selectedSpecialties.includes(specialty)
                      ? "bg-calm-500 text-white"
                      : "bg-calm-100 dark:bg-calm-900/30 text-calm-800 dark:text-calm-200"
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="glass-card p-4 sticky top-24">
              <h3 className="font-medium mb-3">Filter by Specialty</h3>
              <div className="space-y-2">
                {allSpecialties.map((specialty) => (
                  <label key={specialty} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSpecialties.includes(specialty)}
                      onChange={() => handleSpecialtyToggle(specialty)}
                      className="rounded border-muted text-primary focus:ring-primary"
                    />
                    <span>{specialty}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Professionals list */}
          <div className="flex-grow">
            {filteredProfessionals.length > 0 ? (
              <div className="space-y-6">
                {filteredProfessionals.map((professional) => (
                  <div key={professional.id} className="glass-card p-4 md:p-6 hover:shadow-lg transition-all">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4 flex-shrink-0">
                        <img
                          src={professional.image}
                          alt={professional.name}
                          className="w-full h-auto aspect-square object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                          <h2 className="text-xl font-bold">{professional.name}</h2>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 font-medium">{professional.rating}</span>
                            <span className="ml-1 text-muted-foreground">({professional.reviews} reviews)</span>
                          </div>
                        </div>
                        <p className="text-lg font-medium text-primary mb-2">{professional.title}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {professional.specialties.map((specialty) => (
                            <span 
                              key={specialty} 
                              className="px-2 py-1 text-xs bg-calm-100 dark:bg-calm-900/30 text-calm-800 dark:text-calm-200 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                        
                        <p className="mb-4">{professional.bio}</p>
                        
                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-4">
                          <div>
                            <strong>Experience:</strong> {professional.experience}
                          </div>
                          <div>
                            <strong>Price:</strong> {professional.price} per session
                          </div>
                          <div>
                            <strong>Availability:</strong> {professional.availability}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => {
                              setSelectedProfessional(professional);
                              handleContactProfessional("appointment");
                            }}
                            className="btn-primary"
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Appointment
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProfessional(professional);
                              handleContactProfessional("message");
                            }}
                            className="btn-ghost"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-6 text-center">
                <h3 className="text-xl font-medium mb-3">No professionals found</h3>
                <p className="text-muted-foreground">
                  Try changing your search terms or clearing filters.
                </p>
                <button onClick={clearFilters} className="btn-ghost mt-4">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Information section */}
        <div className="mt-12 glass-card p-6 bg-calm-50 dark:bg-calm-900/30 border-calm-200 dark:border-calm-800/50">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-calm-600" />
            Finding the Right Professional
          </h2>
          <p className="text-calm-900 dark:text-calm-100 mb-4">
            Choosing the right mental health professional is a personal decision. Consider these factors:
          </p>
          <ul className="space-y-2 text-calm-900 dark:text-calm-100">
            <li className="flex items-start gap-2">
              <span className="font-bold min-w-[140px]">Specialization:</span>
              <span>Look for someone who specializes in your specific concerns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold min-w-[140px]">Credentials:</span>
              <span>Check their education, training, and licensure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold min-w-[140px]">Approach:</span>
              <span>Consider their therapeutic approach and whether it matches your preferences</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold min-w-[140px]">Connection:</span>
              <span>Trust your intuition about your comfort level with them</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold min-w-[140px]">Availability:</span>
              <span>Consider their scheduling flexibility and session costs</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Professionals;
