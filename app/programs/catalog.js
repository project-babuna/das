export const learnPrograms = [
  { number: "01", title: "Clarity", price: "₹199", format: "3 hours · Live session", verb: "Understand", description: "See the business-building journey before you start.", href: "/clarity-session", join: "/register?program=clarity_session" },
  { number: "02", title: "Full Program", price: "₹9,999", format: "120 hours of learning · Self-paced", verb: "Learn", description: "Learn the complete business framework at your own pace.", href: "/full-program", join: "/register?program=full_program" },
  { number: "03", title: "Mentorship", price: "₹49,999", format: "12-week program · Live mentorship and events", verb: "Apply", description: "Apply your learning with mentor guidance.", href: "/learn-with-mentorship", join: "/register?program=mentorship" },
];

export const buildPrograms = [
  {
    slug: "incubation", number: "04", title: "Incubation", verb: "Build & Prove", image: "build",
    description: "Test your opportunity with a first version and real customers.",
    headline: "Build small. Prove what matters.",
    intro: "Turn your opportunity into a first version and test it with real customers.",
    fit: ["You have a problem or opportunity to explore.", "You are ready to test assumptions with real customers.", "You want evidence before committing more resources."],
    focus: [
      { title: "Validate the problem", text: "Understand the customer, the problem, and the alternatives they already use." },
      { title: "Build a first version", text: "Identify the smallest useful solution that can test your assumptions." },
      { title: "Test demand and economics", text: "Learn whether customers value the offer and whether the numbers can work." },
    ],
  },
  {
    slug: "accelerator", number: "05", title: "Accelerator", verb: "Accelerate", image: "accelerate",
    description: "Make a working business model repeatable.",
    headline: "Turn early traction into repeatable growth.",
    intro: "Build on what customers already value. Improve how you find customers, deliver, and run the business.",
    fit: ["You have a first version and evidence of customer demand.", "You want to understand what drives repeat purchases and retention.", "You need more reliable processes for sales and delivery."],
    focus: [
      { title: "Find what is repeatable", text: "Examine which customers, offers, and sales activities produce consistent results." },
      { title: "Strengthen the business model", text: "Understand retention, costs, margins, and cash flow as demand grows." },
      { title: "Build reliable processes", text: "Improve the systems that help your team deliver a consistent customer experience." },
    ],
  },
  {
    slug: "scale-up", number: "06", title: "Scale-up", verb: "Scale", image: "scale",
    description: "Develop the people and systems for a larger organisation.",
    headline: "Build a company that can grow beyond you.",
    intro: "Develop the leadership, people, and systems that can support a larger organisation.",
    fit: ["You have a business model that works repeatedly.", "You are preparing for greater operational complexity.", "You want the company to depend less on the founder for daily decisions."],
    focus: [
      { title: "Develop leadership and ownership", text: "Clarify responsibilities and help teams take greater ownership of decisions." },
      { title: "Strengthen operating systems", text: "Build the processes and financial discipline that can support a larger company." },
      { title: "Expand with discipline", text: "Evaluate growth opportunities while protecting quality and business fundamentals." },
    ],
  },
];

export const entrySteps = [
  { title: "Apply", text: "Share your business, current stage, and the support you need." },
  { title: "Assessment", text: "Your application is reviewed for readiness and program fit. More information may be requested." },
  { title: "Selection", text: "If selected, discuss the program scope and next steps before joining." },
];
