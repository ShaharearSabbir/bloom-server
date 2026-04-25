// Replace with your actual better-auth client path

import { auth } from "../lib/auth";
import prisma from "../lib/prisma";

const tutorsData = [
  {
    name: "Alice Thompson",
    email: "alice.t@bloom.com",
    password: "Password123!",
    profession: "Senior Software Engineer",
    bio: "Teaching React and Node.js for 5 years.",
  },
  {
    name: "Marcus Chen",
    email: "marcus.c@bloom.com",
    password: "Password123!",
    profession: "Data Scientist",
    bio: "Expert in Python, SQL, and Machine Learning models.",
  },
  {
    name: "Sarah Jenkins",
    email: "sarah.j@bloom.com",
    password: "Password123!",
    profession: "University Math Professor",
    bio: "Specializing in Calculus and Linear Algebra.",
  },
  {
    name: "David Miller",
    email: "david.m@bloom.com",
    password: "Password123!",
    profession: "Financial Analyst",
    bio: "Helping students master Excel and Corporate Finance.",
  },
  {
    name: "Elena Rodriguez",
    email: "elena.r@bloom.com",
    password: "Password123!",
    profession: "Language Specialist",
    bio: "Bilingual tutor focused on Spanish and English linguistics.",
  },
  {
    name: "James Wilson",
    email: "james.w@bloom.com",
    password: "Password123!",
    profession: "Physics Researcher",
    bio: "I make Quantum Physics understandable for everyone.",
  },
  {
    name: "Sophia Lee",
    email: "sophia.l@bloom.com",
    password: "Password123!",
    profession: "UX/UI Designer",
    bio: "Learn Figma and Design Thinking from a pro.",
  },
  {
    name: "Robert Taylor",
    email: "robert.t@bloom.com",
    password: "Password123!",
    profession: "Historian",
    bio: "Deep dives into World History and Political Science.",
  },
  {
    name: "Olivia Brown",
    email: "olivia.b@bloom.com",
    password: "Password123!",
    profession: "Biochemist",
    bio: "Organic Chemistry made simple and fun.",
  },
  {
    name: "Liam Garcia",
    email: "liam.g@bloom.com",
    password: "Password123!",
    profession: "Full Stack Developer",
    bio: "Focusing on Next.js and TypeScript architectures.",
  },
  {
    name: "Isabella Martinez",
    email: "isabella.m@bloom.com",
    password: "Password123!",
    profession: "Marketing Director",
    bio: "Mastering Digital Marketing and Brand Strategy.",
  },
  {
    name: "Noah Robinson",
    email: "noah.r@bloom.com",
    password: "Password123!",
    profession: "Statistics Expert",
    bio: "Simplifying probability and data distributions.",
  },
  {
    name: "Mia Clark",
    email: "mia.c@bloom.com",
    password: "Password123!",
    profession: "Professional Artist",
    bio: "Teaching digital painting and traditional sketching.",
  },
  {
    name: "William Lewis",
    email: "william.l@bloom.com",
    password: "Password123!",
    profession: "Content Strategist",
    bio: "Improve your technical writing and storytelling.",
  },
  {
    name: "Charlotte Lee",
    email: "charlotte.l@bloom.com",
    password: "Password123!",
    profession: "Software Architect",
    bio: "Java, Spring Boot, and Microservices expert.",
  },
  {
    name: "Benjamin Hall",
    email: "ben.h@bloom.com",
    password: "Password123!",
    profession: "Economist",
    bio: "Macroeconomics and market trend analysis.",
  },
  {
    name: "Amelia Young",
    email: "amelia.y@bloom.com",
    password: "Password123!",
    profession: "Certified Translator",
    bio: "Specialized in French and German literature.",
  },
  {
    name: "Lucas Allen",
    email: "lucas.a@bloom.com",
    password: "Password123!",
    profession: "Cybersecurity Analyst",
    bio: "Network security and ethical hacking for beginners.",
  },
  {
    name: "Harper Scott",
    email: "harper.s@bloom.com",
    password: "Password123!",
    profession: "AI Research Lead",
    bio: "Exploring LLMs and Generative AI patterns.",
  },
  {
    name: "Mason King",
    email: "mason.k@bloom.com",
    password: "Password123!",
    profession: "Mechanical Engineer",
    bio: "Physics and CAD modeling specialized tutor.",
  },
];

const additionalTutors = [
  {
    name: "Liam Anderson",
    email: "liam.a@bloom.com",
    password: "Password123!",
    profession: "DevOps Engineer",
    bio: "Expert in Docker, Kubernetes, and CI/CD pipelines.",
  },
  {
    name: "Emma Walsh",
    email: "emma.w@bloom.com",
    password: "Password123!",
    profession: "Content Writer",
    bio: "Helping students master creative writing and SEO strategies.",
  },
  {
    name: "Noah Pires",
    email: "noah.p@bloom.com",
    password: "Password123!",
    profession: "AI Specialist",
    bio: "Deep learning enthusiast focused on Neural Networks.",
  },
  {
    name: "Olivia Vance",
    email: "olivia.v@bloom.com",
    password: "Password123!",
    profession: "Historian",
    bio: "Specializing in 20th-century European history.",
  },
  {
    name: "William Zhang",
    email: "william.z@bloom.com",
    password: "Password123!",
    profession: "Cloud Architect",
    bio: "AWS Certified Solution Architect with 8 years of experience.",
  },
  {
    name: "Sophia Rossi",
    email: "sophia.r@bloom.com",
    password: "Password123!",
    profession: "Interior Designer",
    bio: "Teaching spatial planning and color theory.",
  },
  {
    name: "James Kelly",
    email: "james.k@bloom.com",
    password: "Password123!",
    profession: "Cybersecurity Analyst",
    bio: "Learn ethical hacking and network defense from scratch.",
  },
  {
    name: "Isabella Silva",
    email: "isabella.s@bloom.com",
    password: "Password123!",
    profession: "Portuguese Tutor",
    bio: "Native speaker teaching business and conversational Portuguese.",
  },
  {
    name: "Benjamin Gupta",
    email: "benjamin.g@bloom.com",
    password: "Password123!",
    profession: "Economist",
    bio: "Simplifying macroeconomics and global market trends.",
  },
  {
    name: "Mia Dubois",
    email: "mia.d@bloom.com",
    password: "Password123!",
    profession: "Art Director",
    bio: "Mastering the Adobe Creative Suite for professional design.",
  },
  {
    name: "Lucas Meyer",
    email: "lucas.m@bloom.com",
    password: "Password123!",
    profession: "Backend Developer",
    bio: "Deep dive into Go, Rust, and distributed systems.",
  },
  {
    name: "Amelia Chen",
    email: "amelia.c@bloom.com",
    password: "Password123!",
    profession: "Statistician",
    bio: "Making complex probability and data analysis easy.",
  },
  {
    name: "Ethan Hunt",
    email: "ethan.h@bloom.com",
    password: "Password123!",
    profession: "Physics Teacher",
    bio: "Focusing on classical mechanics and thermodynamics.",
  },
  {
    name: "Charlotte Brontë",
    email: "charlotte.b@bloom.com",
    password: "Password123!",
    profession: "Literature Professor",
    bio: "Exploring Victorian literature and creative analysis.",
  },
  {
    name: "Mason Mount",
    email: "mason.m@bloom.com",
    password: "Password123!",
    profession: "Sports Scientist",
    bio: "Human anatomy and performance optimization specialist.",
  },
  {
    name: "Harper Lee",
    email: "harper.l@bloom.com",
    password: "Password123!",
    profession: "Journalist",
    bio: "Mastering investigative reporting and ethics.",
  },
  {
    name: "Evelyn Reed",
    email: "evelyn.r@bloom.com",
    password: "Password123!",
    profession: "Biologist",
    bio: "Genetics and molecular biology for university students.",
  },
  {
    name: "Aiden Shaw",
    email: "aiden.s@bloom.com",
    password: "Password123!",
    profession: "SEO Expert",
    bio: "Practical digital marketing and search optimization.",
  },
  {
    name: "Abigail Low",
    email: "abigail.l@bloom.com",
    password: "Password123!",
    profession: "Pianist",
    bio: "Music theory and classical piano instruction.",
  },
  {
    name: "Daniel Park",
    email: "daniel.p@bloom.com",
    password: "Password123!",
    profession: "Korean Teacher",
    bio: "Learn conversational Korean and TOPIK preparation.",
  },
  {
    name: "Ella Fitzgerald",
    email: "ella.f@bloom.com",
    password: "Password123!",
    profession: "Vocal Coach",
    bio: "Jazz theory and advanced vocal techniques.",
  },
  {
    name: "Sebastian Vettle",
    email: "seb.v@bloom.com",
    password: "Password123!",
    profession: "Mechanical Engineer",
    bio: "Aerodynamics and automotive engineering principles.",
  },
  {
    name: "Scarlett Johans",
    email: "scarlett.j@bloom.com",
    password: "Password123!",
    profession: "Drama Teacher",
    bio: "Method acting and stage presence coaching.",
  },
  {
    name: "Jack Sparrow",
    email: "jack.s@bloom.com",
    password: "Password123!",
    profession: "Marine Biologist",
    bio: "Deep sea ecosystems and conservation studies.",
  },
  {
    name: "Grace Hopper",
    email: "grace.h@bloom.com",
    password: "Password123!",
    profession: "Computer Scientist",
    bio: "Compiler design and COBOL legacy systems.",
  },
  {
    name: "Henry Ford",
    email: "henry.f@bloom.com",
    password: "Password123!",
    profession: "Operations Manager",
    bio: "Supply chain management and lean manufacturing.",
  },
  {
    name: "Lily Potter",
    email: "lily.p@bloom.com",
    password: "Password123!",
    profession: "Chemist",
    bio: "Inorganic chemistry and laboratory safety protocols.",
  },
  {
    name: "Samuel Adams",
    email: "sam.a@bloom.com",
    password: "Password123!",
    profession: "Political Scientist",
    bio: "Analysis of democratic institutions and governance.",
  },
  {
    name: "Chloe Sims",
    email: "chloe.s@bloom.com",
    password: "Password123!",
    profession: "Social Media Manager",
    bio: "Growth hacking strategies for Instagram and TikTok.",
  },
  {
    name: "Wyatt Earp",
    email: "wyatt.e@bloom.com",
    password: "Password123!",
    profession: "Criminologist",
    bio: "Forensic psychology and law enforcement theory.",
  },
  {
    name: "Victoria Secret",
    email: "victoria.s@bloom.com",
    password: "Password123!",
    profession: "Fashion Designer",
    bio: "Garment construction and textile science.",
  },
  {
    name: "Carter Page",
    email: "carter.p@bloom.com",
    password: "Password123!",
    profession: "Database Admin",
    bio: "Advanced PostgreSQL and database normalization.",
  },
  {
    name: "Madison Beer",
    email: "madison.b@bloom.com",
    password: "Password123!",
    profession: "Audio Engineer",
    bio: "Mixing, mastering, and professional sound design.",
  },
  {
    name: "Owen Wilson",
    email: "owen.w@bloom.com",
    password: "Password123!",
    profession: "Scriptwriter",
    bio: "Screenwriting for film and television dialogue.",
  },
  {
    name: "Layla Ali",
    email: "layla.a@bloom.com",
    password: "Password123!",
    profession: "Boxing Coach",
    bio: "Sports psychology and physical conditioning.",
  },
  {
    name: "Gabriel Garcia",
    email: "gab.g@bloom.com",
    password: "Password123!",
    profession: "Spanish Writer",
    bio: "Magical realism and Spanish literature analysis.",
  },
  {
    name: "Nora Jones",
    email: "nora.j@bloom.com",
    password: "Password123!",
    profession: "Jazz Musician",
    bio: "Contemporary songwriting and soul music.",
  },
  {
    name: "Julian Assange",
    email: "julian.a@bloom.com",
    password: "Password123!",
    profession: "Network Security",
    bio: "Encryption standards and data privacy.",
  },
  {
    name: "Hazel Nut",
    email: "hazel.n@bloom.com",
    password: "Password123!",
    profession: "Nutritionist",
    bio: "Dietary planning and metabolic health.",
  },
  {
    name: "Levi Strauss",
    email: "levi.s@bloom.com",
    password: "Password123!",
    profession: "Entrepreneur",
    bio: "Business scaling and manufacturing logistics.",
  },
  {
    name: "Zoey Deschanel",
    email: "zoey.d@bloom.com",
    password: "Password123!",
    profession: "Ukelele Instructor",
    bio: "Beginner-friendly ukelele and folk singing.",
  },
  {
    name: "Nathan Drake",
    email: "nathan.d@bloom.com",
    password: "Password123!",
    profession: "Archaeologist",
    bio: "Ancient civilizations and field research methods.",
  },
  {
    name: "Penelope Cruz",
    email: "penelope.c@bloom.com",
    password: "Password123!",
    profession: "Spanish Tutor",
    bio: "Castilian Spanish for professional environments.",
  },
  {
    name: "Leo Tolstoy",
    email: "leo.t@bloom.com",
    password: "Password123!",
    profession: "Philosophy Professor",
    bio: "Ethics, existentialism, and social philosophy.",
  },
  {
    name: "Riley Reid",
    email: "riley.r@bloom.com",
    password: "Password123!",
    profession: "Public Speaker",
    bio: "Overcoming anxiety and mastering rhetoric.",
  },
  {
    name: "Isaac Newton",
    email: "isaac.n@bloom.com",
    password: "Password123!",
    profession: "Mathematician",
    bio: "In-depth calculus and the laws of motion.",
  },
  {
    name: "Savannah Sky",
    email: "savannah.s@bloom.com",
    password: "Password123!",
    profession: "Meteorologist",
    bio: "Climatology and weather pattern forecasting.",
  },
  {
    name: "Christian Bale",
    email: "chris.b@bloom.com",
    password: "Password123!",
    profession: "Physical Trainer",
    bio: "Extreme body transformations and strength training.",
  },
  {
    name: "Audrey Hepburn",
    email: "audrey.h@bloom.com",
    password: "Password123!",
    profession: "Etiquette Coach",
    bio: "Professional poise and international protocol.",
  },
  {
    name: "Miles Davis",
    email: "miles.d@bloom.com",
    password: "Password123!",
    profession: "Trumpeter",
    bio: "Improvisation and modal jazz composition.",
  },
  {
    name: "Lebron James",
    email: "lebron.j@bloom.com",
    password: "Password123!",
    profession: "Leadership Coach",
    bio: "Team building and peak performance mindset.",
  },
  {
    name: "Serena Williams",
    email: "serena.w@bloom.com",
    password: "Password123!",
    profession: "Athlete Mentor",
    bio: "Developing resilience in competitive sports.",
  },
  {
    name: "Gordon Ramsay",
    email: "gordon.r@bloom.com",
    password: "Password123!",
    profession: "Executive Chef",
    bio: "Culinary arts and high-pressure kitchen management.",
  },
  {
    name: "Marie Curie",
    email: "marie.c@bloom.com",
    password: "Password123!",
    profession: "Radiologist",
    bio: "Nuclear physics and medical imaging technology.",
  },
  {
    name: "Steve Jobs",
    email: "steve.j@bloom.com",
    password: "Password123!",
    profession: "Product Designer",
    bio: "User-centric design and innovation strategy.",
  },
  {
    name: "Elon Musk",
    email: "elon.m@bloom.com",
    password: "Password123!",
    profession: "Rocket Engineer",
    bio: "Multi-planetary logistics and space systems.",
  },
  {
    name: "Jeff Bezos",
    email: "jeff.b@bloom.com",
    password: "Password123!",
    profession: "E-commerce Expert",
    bio: "Scaling online marketplaces and customer centricity.",
  },
  {
    name: "Mark Zuckerberg",
    email: "mark.z@bloom.com",
    password: "Password123!",
    profession: "Social Architect",
    bio: "Algorithmic design and social graph theory.",
  },
  {
    name: "Ada Lovelace",
    email: "ada.l@bloom.com",
    password: "Password123!",
    profession: "Programmer",
    bio: "Foundational algorithms and logical structures.",
  },
  {
    name: "Nikola Tesla",
    email: "nikola.t@bloom.com",
    password: "Password123!",
    profession: "Electrical Engineer",
    bio: "AC systems and wireless energy transmission.",
  },
  {
    name: "Albert Einstein",
    email: "albert.e@bloom.com",
    password: "Password123!",
    profession: "Theoretical Physicist",
    bio: "Relativity and the foundations of modern physics.",
  },
  {
    name: "Charles Darwin",
    email: "charles.d@bloom.com",
    password: "Password123!",
    profession: "Naturalist",
    bio: "Evolutionary biology and species adaptation.",
  },
  {
    name: "Sigmund Freud",
    email: "sigmund.f@bloom.com",
    password: "Password123!",
    profession: "Psychologist",
    bio: "Psychoanalysis and dream interpretation theory.",
  },
  {
    name: "Jane Austen",
    email: "jane.a@bloom.com",
    password: "Password123!",
    profession: "English Teacher",
    bio: "Grammar, syntax, and romantic era literature.",
  },
  {
    name: "Pablo Picasso",
    email: "pablo.p@bloom.com",
    password: "Password123!",
    profession: "Fine Artist",
    bio: "Cubism and abstract expressionism techniques.",
  },
  {
    name: "Vincent van Gogh",
    email: "vincent.v@bloom.com",
    password: "Password123!",
    profession: "Painter",
    bio: "Post-impressionist brushwork and color usage.",
  },
  {
    name: "Wolfgang Mozart",
    email: "wolf.m@bloom.com",
    password: "Password123!",
    profession: "Composer",
    bio: "Classical composition and piano virtuosity.",
  },
  {
    name: "Ludwig Beethoven",
    email: "ludwig.b@bloom.com",
    password: "Password123!",
    profession: "Conductor",
    bio: "Symphonic structure and romantic composition.",
  },
  {
    name: "William Shakespeare",
    email: "will.s@bloom.com",
    password: "Password123!",
    profession: "Playwright",
    bio: "Iambic pentameter and dramatic structure.",
  },
  {
    name: "Emily Dickinson",
    email: "emily.d@bloom.com",
    password: "Password123!",
    profession: "Poet",
    bio: "Modernist poetry and metaphoric analysis.",
  },
  {
    name: "Mahatma Gandhi",
    email: "mo.g@bloom.com",
    password: "Password123!",
    profession: "Ethics Teacher",
    bio: "Non-violent resistance and moral philosophy.",
  },
  {
    name: "Martin Luther",
    email: "martin.l@bloom.com",
    password: "Password123!",
    profession: "Theologian",
    bio: "Comparative religion and historical reformations.",
  },
  {
    name: "Nelson Mandela",
    email: "nelson.m@bloom.com",
    password: "Password123!",
    profession: "Human Rights Lawyer",
    bio: "International law and social justice advocacy.",
  },
  {
    name: "Mother Teresa",
    email: "mother.t@bloom.com",
    password: "Password123!",
    profession: "Social Worker",
    bio: "Non-profit management and community service.",
  },
  {
    name: "Rosa Parks",
    email: "rosa.p@bloom.com",
    password: "Password123!",
    profession: "Civil Rights Activist",
    bio: "Social activism and community organizing.",
  },
  {
    name: "Malala Yousafzai",
    email: "malala.y@bloom.com",
    password: "Password123!",
    profession: "Education Advocate",
    bio: "Global education policy and youth leadership.",
  },
  {
    name: "Stephen Hawking",
    email: "stephen.h@bloom.com",
    password: "Password123!",
    profession: "Cosmologist",
    bio: "Black holes and the origins of the universe.",
  },
  {
    name: "Bill Gates",
    email: "bill.g@bloom.com",
    password: "Password123!",
    profession: "Philanthropist",
    bio: "Global health initiatives and software strategy.",
  },
  {
    name: "Warren Buffett",
    email: "warren.b@bloom.com",
    password: "Password123!",
    profession: "Investor",
    bio: "Value investing and capital allocation.",
  },
  {
    name: "Oprah Winfrey",
    email: "oprah.w@bloom.com",
    password: "Password123!",
    profession: "Media Mogul",
    bio: "Broadcasting, media ethics, and communication.",
  },
  {
    name: "Coco Chanel",
    email: "coco.c@bloom.com",
    password: "Password123!",
    profession: "Brand Consultant",
    bio: "Luxury branding and fashion marketing.",
  },
  {
    name: "Walt Disney",
    email: "walt.d@bloom.com",
    password: "Password123!",
    profession: "Animator",
    bio: "Storyboarding and classical animation principles.",
  },
  {
    name: "JK Rowling",
    email: "jk.r@bloom.com",
    password: "Password123!",
    profession: "Fantasy Writer",
    bio: "World-building and character development.",
  },
  {
    name: "Stephen King",
    email: "stephen.k@bloom.com",
    password: "Password123!",
    profession: "Horror Author",
    bio: "Pacing and suspense in fictional writing.",
  },
  {
    name: "George Orwell",
    email: "george.o@bloom.com",
    password: "Password123!",
    profession: "Political Writer",
    bio: "Satire and dystopian literary techniques.",
  },
  {
    name: "Ernest Hemingway",
    email: "ernest.h@bloom.com",
    password: "Password123!",
    profession: "Novelist",
    bio: "Minimalist writing style and narrative brevity.",
  },
  {
    name: "Virginia Woolf",
    email: "virginia.w@bloom.com",
    password: "Password123!",
    profession: "Modernist Writer",
    bio: "Stream of consciousness and feminist theory.",
  },
  {
    name: "John Locke",
    email: "john.l@bloom.com",
    password: "Password123!",
    profession: "Legal Theorist",
    bio: "Social contract theory and property law.",
  },
  {
    name: "Thomas Hobbes",
    email: "thomas.h@bloom.com",
    password: "Password123!",
    profession: "Political Philosopher",
    bio: "The Leviathan and state authority studies.",
  },
  {
    name: "Socrates",
    email: "socrates@bloom.com",
    password: "Password123!",
    profession: "Dialectic Teacher",
    bio: "Critical questioning and Socratic methodology.",
  },
  {
    name: "Plato",
    email: "plato@bloom.com",
    password: "Password123!",
    profession: "Academician",
    bio: "The Republic and the theory of forms.",
  },
  {
    name: "Aristotle",
    email: "aristotle@bloom.com",
    password: "Password123!",
    profession: "Polymath",
    bio: "Logic, biology, and the golden mean ethics.",
  },
  {
    name: "Sun Tzu",
    email: "sun.tzu@bloom.com",
    password: "Password123!",
    profession: "Strategist",
    bio: "The Art of War and competitive game theory.",
  },
  {
    name: "Marco Polo",
    email: "marco.p@bloom.com",
    password: "Password123!",
    profession: "Travel Writer",
    bio: "Cross-cultural studies and silk road history.",
  },
  {
    name: "Christopher Columbus",
    email: "chris.c@bloom.com",
    password: "Password123!",
    profession: "Navigator",
    bio: "Cartography and maritime exploration history.",
  },
  {
    name: "Ferdinand Magellan",
    email: "ferd.m@bloom.com",
    password: "Password123!",
    profession: "Geographer",
    bio: "Circumnavigation and oceanographic principles.",
  },
  {
    name: "Vasco da Gama",
    email: "vasco.g@bloom.com",
    password: "Password123!",
    profession: "Maritime Trader",
    bio: "Early global trade routes and navigation.",
  },
  {
    name: "Amerigo Vespucci",
    email: "amerigo.v@bloom.com",
    password: "Password123!",
    profession: "Cartographer",
    bio: "Mapmaking and the discovery of the New World.",
  },
  {
    name: "Neil Armstrong",
    email: "neil.a@bloom.com",
    password: "Password123!",
    profession: "Astronaut",
    bio: "Aerospace engineering and lunar missions.",
  },
  {
    name: "Buzz Aldrin",
    email: "buzz.a@bloom.com",
    password: "Password123!",
    profession: "Astrogeologist",
    bio: "Planetary geology and celestial navigation.",
  },
];

const categoryIds = [
  "bdb3379c-8e70-46f9-96b0-3f5b7aa4f8f3",
  "83e7c11a-f2c0-4408-a5f7-5e29f970befe",
  "5788bb8b-6744-4c6c-9474-b51712fe176b",
  "db30c09d-a183-49a9-a338-9efe8c6c30c7",
  "d06b7275-c968-414e-838f-15c7fcff38ab",
  "ff24be1a-32c7-49a3-ab36-0ec76025620a",
  "d1a03ed4-46ae-4976-94f6-3811b926c6a8",
];
async function seedSingleTutor(tutor: (typeof tutorsData)[0]) {
  try {
    // 1. Create the Auth user
    const { user } = await auth.api.signUpEmail({
      body: {
        email: tutor.email,
        password: tutor.password,
        name: tutor.name,
        role: "TUTOR",
      },
    });

    if (!user?.id) {
      console.error(`❌ User creation failed for: ${tutor.email}`);
      return;
    }

    // 2. Random Category Selection
    const randomCategory =
      categoryIds[Math.floor(Math.random() * categoryIds.length)];

    console.log(randomCategory);

    // 3. Create Tutor Profile
    const tutorProfile = await prisma.tutor.create({
      data: {
        userId: user.id,
        categoryId: randomCategory,
        bio: tutor.bio,
        profession: tutor.profession,
        hourlyRate: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
        avgRating: 0,
        reviewCount: 0,
      },
    });

    if (!tutorProfile) {
      await prisma.tutor.create({
        data: {
          userId: user.id,
          categoryId: "0bde4a46-f227-4558-afdc-2e9b23e2fa09",
          bio: tutor.bio,
          profession: tutor.profession,
          hourlyRate: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
          avgRating: 0,
          reviewCount: 0,
        },
      });
    }

    // 4. Update emailVerified directly in the User table
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });

    console.log(`✅ Successfully seeded & verified: ${tutor.name}`);
  } catch (err) {
    console.error(`🚨 Critical error for ${tutor.email}:`, err);
  }
}

/**
 * Main Runner
 */
async function main() {
  console.log("🚀 Starting Tutor Seeding...");

  // Using for...of ensures it waits for each tutor to finish before starting the next
  for (const tutor of additionalTutors) {
    await seedSingleTutor(tutor);
  }

  console.log("🏁 All 20 tutors processed!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
