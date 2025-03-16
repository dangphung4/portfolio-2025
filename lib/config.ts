export const config = {
  app: {
    site_name: "Dang Phung",
    author: "Dang Phung",
    twitter_handle: "@dangphung4",
    description:
      `Undergraduate computer science student and software engineer with over ${getYearsOfExperience(new Date("2023-06-01"))} year${getYearsOfExperience(new Date("2023-06-01")) > 1 ? 's' : ''} of professional experience. This is my portfolio website.`,
    long_description:
      "Hey I'm Dang, a computer science undergraduate pursuing my bachelors at the University of Mary Washington. I am also a software developer with 1 year of professional experience. I am passionate about building web applications and solving real-world problems. Check out my portfolio website to know more about me.",
    keywords:
      "dang, dang phung, dangtphung, fullstack developer, mern stack developer, software developer, software engineer, frontend developer, portfolio, web developer, react developers, c# developer, javascript, dang phung official website, dang phung portfolio website, dang tri phung, dangtphung, dang-phung",
  },
  me: {
    avatar: "/images/dangphung.png",
    name: "Dang Phung",
    about: [
      "I'm a Junior Software Engineer who loves cheesecake.",
      "I am currently pursing a B.Sc in Computer Science at the University of Mary Washington.",
      "Currently, I am working as a Junior Software Engineer at Recro Corporation.",
      "I like to run, play around with new technologies, and read webtoons.",
    ],
    job: "Junior Software Engineer",
    started: "2023-06-01",
    yearsOfExperience: getYearsOfExperience(new Date("2023-06-01")),
    stack: "This site was built with Next.js, and Tailwind.",
    hobby: "gamble my life savings",
    projectLink: "/projects",
    resumeLink: "https://drive.google.com/file/d/1dNVVXDWa5p81EOZHs0MHrrvlxI4Rp75z/view?usp=sharing",
  },
  about: {
    certificationsAndAchievements: [
      {
        title: "Certified Kubernetes Administrator (CKA)",
        organization: "Cloud Native Computing Foundation",
        date: "Soon",
        credentialId: "",
        link: "https://www.cncf.io/certification/cka/",
        logoUrl: "/certifications/cka.png",
        inProgress: true,
      },
      {
        title: "Certified Kubernetes Application Developer (CKAD)",
        organization: "Cloud Native Computing Foundation",
        date: "Soon",
        credentialId: "",
        link: "https://www.cncf.io/certification/ckad/",
        logoUrl: "/certifications/ckad.png",
        inProgress: true,
      },
      {
        title: "InsioHacks Hackathon - First Place Winner",
        organization: "InsioHacks",
        date: "2023",
        credentialId: "",
        link: "https://devpost.com/software/pomotivity",
        logoUrl: "/projects/pomotivitylogo.jpg",
        description: "Won first place for developing Pomotivity, a productivity web app that uses the Pomodoro technique to help users stay focused and manage their time effectively.",
        inProgress: false,
      },
    ],
    workExperiences: [
      {
        years: "June 2024 - Present",
        title: "Software Engineer Intern",
        company: "General Dynamics Mission Systems (Hybrid)",
        logoUrl: "/companies/gd-logo.jpg",
        link: "https://gdmissionsystems.com/",
        contributions: [
          "Spearheaded the development of a multi-repository nuclear monitoring system, building the primary GUI with Next.js, while architecting additional monitoring interfaces using Angular for global nuclear station tracking",
          "Engineered a scalable monorepo architecture integrating React, Next.js and Express.js to streamline complex data visualization for internal nuclear monitoring systems across Red Hat Linux machines worldwide",
          "Implemented Docker & Kubernetes for Linux and multiple VM deployments, reducing deployment times by 20%",
          "Engineered and optimized Express APIs with Objection.js and Knex for SQLite, resulting in a 25% improvement in query performance and 20% reduction in database latency",
          "Developed a comprehensive testing strategy using Jest and Supertest, achieving 95% coverage of the codebase, ensuring robust functionality and maintainability",
        ],
      },
      {
        years: "Jan 2024 - Present",
        title: "Junior Software Engineer",
        company: "Recro Corporation (Remote)",
        logoUrl: "/companies/recro_co_logo-1.jpeg",
        link: "https://recro.com/",
        contributions: [
          "Architected and developed a complete company website overhaul using Statamic, Laravel, PHP & TailwindCSS, implementing a robust CMS system that enabled content management and improved site performance, resulting in an increase of user traffic",
          "Spearheaded the development of a job application portal facilitating internal job applications, enabling organization expansion",
          "Developing a CRM recruiting platform with C#, ASP.NET Core, Aspire, Blazor, Entity Framework, PostgreSQL, and Azure leading to an efficiency increase in the recruitment team",
          "Led the migration of over 40,000 lines of code to server-side Blazor, enhancing application performance andefficiency by 40%",
          "Optimized complex database interactions by implementing Repository Patterns, abstracting data access from API endpoints to improve system maintainability and scalability by over 30%",
        ],
      },
      {
        years: "Aug 2023 - Jan 2024",
        title: "Associate Software Engineer",
        company: "Mofilo LLC. (Remote)",
        logoUrl: "/companies/mofilo_logo.png",
        link: "https://mofilo.app/",
        contributions: [
          "Led the development of a fitness mobile app using React Native and integrated microservices with AWS Amplify, Lambda, Ec2, AppSync, and DynamoDB, resulting in a 20% reduction in response time",
          "Developed API's with Node.js & Python with a scalable DynamoDB architecture, allowing for 30% reduction in operational costs",
          "Conducted code reviews and created GitHub Actions pipelines resulting in a 30% increase in code quality by automating builds, tests, and deployments",
        ],
      },
      {
        years: "June 2023 - Aug 2024",
        title: "Software Engineer Intern",
        company: "Bridge Core (Hybrid)",
        logoUrl: "/companies/bcore-mark.png",
        link: "https://bcore.com/",
        contributions: [
          "Spearheaded the development of an autonomous bidirectional sync API with Bluescape, boosting data efficiency by over 30% and improving data efficiency by 40%",
          "Maintained 95% application uptime with Lambda & EC2 integrations and enhanced API documentation for 3+ million users",
          "Designed and optimized webhooks using FastAPI, GraphQL, Node.js refining data processing for 30+ endpoints",
        ],
      },
    ],
    educationDetails: [
      {
        title: "Bachelor of Science in Computer Science (Honours)",
        institute: "University of Mary Washington",
        address: "Fredericksburg, VA, USA",
        years: "2022 - 2026",
        gpa: "3.84",
        logoUrl: "/education/umwlogo.jpg",
        link: "https://umw.edu/",
      },
    ],
    skills: [
      { title: "JavaScript", icon: "javascript-plain bg-black bg-cover overflow-hidden" },
      { title: "TypeScript", icon: "typescript-plain" },
      { title: "Python", icon: "python-plain" },
      { title: "C#", icon: "csharp-plain" },
      { title: "Java", icon: "java-plain" },
      { title: "HTML5", icon: "html5-plain" },
      { title: "CSS3", icon: "css3-plain" },
      { title: "React.js", icon: "react-plain group-hover:bg-black p-1 rounded-full" },
      { title: "Next.js", icon: "nextjs-plain bg-white font-normal rounded-full" },
      { title: "Express.js", icon: "express-original rounded-fulll" },
      { title: "React Native", icon: "react-plain group-hover:bg-black p-1 rounded-full" },
      { title: "Redux", icon: "redux-original" },
      { title: "Kubernetes", icon: "kubernetes-plain" },
      { title: "FastAPI", icon: "fastapi-plain" },
      { title: "Blazor", icon: "blazor-plain" },
      { title: "ASP.NET Core", icon: "dotnetcore-plain" },
      { title: "Node.js", icon: "nodejs-plain-wordmark p-1 group-hover:bg-black rounded-full" },
      { title: "Flask", icon: "flask-original" },
      { title: "Django", icon: "django-plain" },
      { title: "AWS", icon: "amazonwebservices-plain" },
      { title: "Azure", icon: "azure-plain" },
      { title: "MongoDB", icon: "mongodb-plain" },
      { title: "PostgreSQL", icon: "postgresql-plain" },
      { title: "SQLite", icon: "sqlite-plain" },
      { title: "TailwindCSS", icon: "tailwindcss-plain" },
      { title: "Astro.js", icon: "astro-plain" },
      { title: "Vite", icon: "vite-plain" },
      { title: "Bootstrap", icon: "bootstrap-plain" },
      { title: "MaterialUI", icon: "materialui-plain" },
      { title: "Chakra UI", icon: "chakraui-plain" },
      { title: "GraphQL", icon: "graphql-plain" },
      { title: "Postman", icon: "postman-plain bg-white font-normal rounded-full" },
      { title: "Docker", icon: "docker-plain" },
      { title: "Git", icon: "git-plain" },
      { title: "Ubuntu", icon: "ubuntu-plain" },
      { title: "Red Hat Linux", icon: "redhat-plain" },
      { title: "Rocky Linux", icon: "rockylinux-plain" },
      { title: "MacOS", icon: "apple-original" },
      { title: "Windows", icon: "windows8-original" },
      { title: "GitHub", icon: "github-original bg-white font-normal rounded-full" },
      { title: "GitLab", icon: "gitlab-plain" },
    ],
  },
  website: "https://dangtphung.com",
  pages: [
    { title: "Home", url: "/" },
    { title: "Profile", url: "/profile" },
    { title: "Projects", url: "/projects" },
    {
      title: "Resume",
      url: "https://drive.google.com/file/d/1dNVVXDWa5p81EOZHs0MHrrvlxI4Rp75z/view?usp=sharing",
      external: true,
    },
    { title: "GitHub", url: "https://github.com/dangphung4", external: true, displayInDrawerOnly: true },
    { title: "LinkedIn", url: "https://www.linkedin.com/in/dang-phung/", external: true, displayInDrawerOnly: true },
    { title: "dangphung4@gmail.com", url: "mailto:dangphung4@gmail.com", external: true, displayInDrawerOnly: true },
  ],
  socials: {
    GitHub: "https://github.com/dangphung4",
    LinkedIn: "https://www.linkedin.com/in/dang-phung/",
    Email: "mailto:dangphung4@gmail.com",
  },
  projects: [
    {
      appName: "Solus",
      url: "https://soluscore.com/",
      about: "Singular clarity for every decision",
      tags: ["React.js", "TypeScript", "TailwindCSS", "Vite", "Firebase", "Dexie", "PWA", "Vercel"],
      image: "/projects/solus.png",
      codeUrl: "https://github.com/dangphung4/solus",
    },
    {
      appName: "Lucent",
      url: "https://skincaregod.vercel.app/",
      about: "A skin care tracking app I made for my girlfriend.",
      tags: ["React.js", "TypeScript", "TailwindCSS", "Vite", "Firebase", "Dexie", "PWA", "Vercel"],
      image: "/projects/lucent.png",
      codeUrl: "https://github.com/dangphung4/lucent",
    },
    {
      appName: "Chardle",
      url: "https://chardle.com",
      about:
        "A daily character guessing game featuring characters from popular series like Avatar, Star Wars, and Percy Jackson.",
      tags: ["React.js", "TypeScript", "TailwindCSS", "Express.js", "MongoDB", "AWS"],
      image: "/projects/chardle.png",
    },
    {
      appName: "Leaflet",
      url: "https://leaflet.at/",
      about:
        "My personal alternative to apple notes.",
      tags: ["React.js", "TypeScript", "Vite", "TailwindCSS", "Cloudfare", "Vercel", "Firebase"],
      image: "/projects/notes.png",
      codeUrl: "https://github.com/dangphung4/leaflet",
    },
    {
      appName: "Manipulate AI",
      url: "https://manipulate.app/",
      about: "A funny hackathon project I made with my friends.",
      tags: [
        "Next.js",
        "Shadcn",
        "Vercel",
        "React.js",
        "TypeScript",
        "TailwindCSS",
        "FastAPI",
        "MongoDB",
        "OpenAI",
        "AWS",
      ],
      image: "/projects/manipulate.jpg",
      codeUrl: "https://github.com/dangphung4/manipulate",
    },
    {
      appName: "Pomotivity",
      url: "https://github.com/dangphung4/pomodoro-insiohacks2023",
      about:
        "A productivity web app that uses the Pomodoro technique to help users stay focused and manage their time effectively.",
      tags: ["React.js", "TypeScript", "Vite", "MaterialUI", "Express.js", "Supabase", "PostgreSQL"],
      image: "/projects/pomotivitylogo.jpg",
      codeUrl: "https://github.com/dangphung4/pomodoro-insiohacks2023",
    },
    {
      appName: "Transcriptify",
      url: "https://github.com/dangphung4/voice-notes",
      about: "A web app that transcribes voice notes to text with real time speech recognition.",
      tags: ["React.js", "TypeScript", "Vite", "TailwindCSS", "Redux TK", "IBM Watson", "OpenAI", "FireBase"],
      image: "/projects/transcriptify.jpg",
      codeUrl: "https://github.com/dangphung4/voice-notes",
    },
    {
      appName: "Bring The Menu",
      url: "https://github.com/dangphung4/vue-patriothacks2023",
      about: "An AI powered hackathon project that finds coupons and discounts for restaurants near you.",
      tags: ["Vue.js", "JavaScript", "Vite", "FastAPI", "MongoDB", "SKLearn", "AWS"],
      image: "/projects/bringthemenu.jpg",
      codeUrl: "https://github.com/dangphung4/vue-patriothacks2023",
    },
    {
      appName: "Health Buddy",
      url: "https://github.com/dangphung4/HealthBuddy",
      about: "A web app I made for my grandma with dementia and alzheimer's so she can get medical advice from people she trusts.",
      tags: ["React.js", "Vite", "FastAPI", "OpenAI", "AWS", "Google Cloud"],
      image: "/projects/healthb.png",
      codeUrl: "https://github.com/dangphung4/HealthBuddy",
    },
    {
      appName: "Quick Keys",
      url: "https://github.com/dangphung4/typing-game",
      about: "A typing test game based on the popular game monkeytype. Comes in dracula theme.",
      tags: ["React.js", "TypeScript", "TailwindCSS", "Framer Motion"],
      image: "/projects/quickkeys.png",
      codeUrl: "https://github.com/dangphung4/typing-game",
    },
  ],
  testimonials: [
    {
      avatar: "/testimonials/tommyn.jpeg",
      role: "Cybersecurity Intern at Crosshair Cyber",
      name: "Tommy Nguyen",
      message:
        "I have worked with Dang for personal projects, fun side projects, and hackathons. He is super fun to work with, is always ready to go under pressure and not afraid of failing. He is super motivated and is always ready to give his best. He loves to see others succeed with him and I cannot wait for him to keep growing",
      link: "https://www.linkedin.com/in/tommy-nguyen14/",
    },
    {
      avatar: "/testimonials/billyh.jpeg",
      role: "CEO of Mofilo LLC.",
      name: "Billy Hoang",
      message:
        "I had the opportunity to work alongside Dang on building the first draft of the mobile app. Working with him, I saw many rare traits. He came in wanting to learn and attack the problems head-on. His willingness to take on challenges and work ethic sets him apart. He is fantastic to work with and communicates effectively, which is one of the most important traits I find essential.",
      link: "https://www.linkedin.com/in/billyhoang100/",
    },
    {
      avatar: "/testimonials/jasontay.jpeg",
      role: "3rd year Biochemistry Major at Hampton University",
      name: "Jason Taylor",
      message:
        "Dang is a good friend of mine. He loves this field, and is very passionate about it. He is always willing to help others, and is a great asset to any team.",
      link: "https://www.linkedin.com/in/jason-taylor-308780281/",
    },
  ],
}

function getYearsOfExperience(startDate: Date) {
  try {
    // Ensure we're working with a valid date object
    const start = startDate instanceof Date ? startDate : new Date(startDate);
    
    // Check if the date is valid
    if (isNaN(start.getTime())) {
      console.error("Invalid start date provided to getYearsOfExperience");
      return 1; // Fallback to a default value
    }
    
    const now = new Date();
    const diffInMonths = (now.getFullYear() - start.getFullYear()) * 12 + 
                        (now.getMonth() - start.getMonth());
    
    const years = Math.floor(diffInMonths / 12);
    return years;
  } catch (error) {
    console.error("Error calculating years of experience:", error);
    return 1; // Fallback to a default value
  }
}
