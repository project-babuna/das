export const assessmentCategories = [
  {
    id: "idea_clarity",
    title: "Idea Clarity",
    label: "idea clarity",
    description: "Do they know what problem they want to solve?",
  },
  {
    id: "customer_clarity",
    title: "Customer Clarity",
    label: "customer clarity",
    description: "Do you know who will pay and why?",
  },
  {
    id: "market_understanding",
    title: "Market Understanding",
    label: "market understanding",
    description: "Do you understand demand, competition, and available alternatives?",
  },
  {
    id: "business_model",
    title: "Business Model",
    label: "money model",
    description: "Do you know how the business will make money?",
  },
  {
    id: "execution_readiness",
    title: "Execution Readiness",
    label: "execution readiness",
    description: "Do you know the practical next steps?",
  },
  {
    id: "structure_growth",
    title: "Structure, Finance & Growth",
    label: "structure, finance, and growth",
    description:
      "Do you understand company structure, co-founders, finance, funding, and scaling decisions?",
  },
];

const optionSet = (options) =>
  options.map((label, index) => ({
    label,
    value: index,
    letter: String.fromCharCode(65 + index),
  }));

export const assessmentQuestions = [
  {
    id: "idea_status",
    category: "idea_clarity",
    question: "Do you currently have a business idea?",
    options: optionSet([
      "No idea yet",
      "I have a rough idea",
      "I have one clear idea",
      "I have a clear idea and have started working on it",
    ]),
  },
  {
    id: "idea_problem",
    category: "idea_clarity",
    question: "How clearly can you explain the problem your business will solve?",
    options: optionSet([
      "I cannot explain it clearly",
      "I can explain it generally",
      "I can explain the problem and who faces it",
      "I can explain the problem, customer pain, and why it matters",
    ]),
  },
  {
    id: "idea_paid_problem",
    category: "idea_clarity",
    question: "Do you know why this problem is important enough for people to pay for a solution?",
    options: optionSet([
      "Not sure",
      "I assume people will pay",
      "I have some reason to believe they will pay",
      "I have spoken to people or seen real proof of demand",
    ]),
  },
  {
    id: "customer_target",
    category: "customer_clarity",
    question: "Who is your target customer?",
    options: optionSet([
      "Everyone",
      "A broad group like students, businesses, professionals",
      "A specific type of customer",
      "A specific customer segment with clear needs and behaviour",
    ]),
  },
  {
    id: "customer_conversations",
    category: "customer_clarity",
    question: "Have you spoken to potential customers?",
    options: optionSet([
      "No",
      "Only casually",
      "Yes, a few people",
      "Yes, enough to understand their real problems",
    ]),
  },
  {
    id: "customer_acquisition",
    category: "customer_clarity",
    question: "Do you know how you will reach your first customers?",
    options: optionSet([
      "No idea",
      "Through social media somehow",
      "I have 1–2 possible channels",
      "I have a clear first customer acquisition plan",
    ]),
  },
  {
    id: "market_competitors",
    category: "market_understanding",
    question: "Do you know who your competitors or alternatives are?",
    options: optionSet([
      "No",
      "I know a few names",
      "I understand some competitors",
      "I understand direct competitors, indirect competitors, and customer alternatives",
    ]),
  },
  {
    id: "market_size",
    category: "market_understanding",
    question: "Do you know the size or potential of your market?",
    options: optionSet([
      "No",
      "I have a rough guess",
      "I have done basic research",
      "I understand the segment, demand, and growth potential",
    ]),
  },
  {
    id: "market_positioning",
    category: "market_understanding",
    question: "Do you know why customers would choose you instead of existing options?",
    options: optionSet([
      "No",
      "Because my idea is better",
      "I have some differentiation",
      "I have a clear positioning or advantage",
    ]),
  },
  {
    id: "model_revenue",
    category: "business_model",
    question: "How will your business make money?",
    options: optionSet([
      "Not sure yet",
      "Through sales, but not clearly defined",
      "I have a basic revenue model",
      "I know pricing, revenue model, and expected customer value",
    ]),
  },
  {
    id: "model_costs",
    category: "business_model",
    question: "Do you understand your basic costs?",
    options: optionSet([
      "No",
      "I know a few obvious costs",
      "I have estimated main costs",
      "I understand fixed cost, variable cost, and initial investment",
    ]),
  },
  {
    id: "model_profitability",
    category: "business_model",
    question: "Do you know when the business may become profitable?",
    options: optionSet([
      "No",
      "I have a rough hope",
      "I have basic assumptions",
      "I have estimated revenue, cost, and break-even logic",
    ]),
  },
  {
    id: "execution_next_step",
    category: "execution_readiness",
    question: "What is your next step?",
    options: optionSet([
      "I do not know",
      "Build product/register company/start posting online",
      "Validate idea or talk to customers",
      "Follow a clear step-by-step plan",
    ]),
  },
  {
    id: "execution_build_or_register",
    category: "execution_readiness",
    question: "Do you know whether to build product first or register company first?",
    options: optionSet([
      "No, I am confused",
      "I think company registration comes first",
      "I know it depends on situation",
      "I understand when to validate, when to register, and when to build",
    ]),
  },
  {
    id: "execution_cofounder",
    category: "execution_readiness",
    question: "Do you know whether you need a co-founder or partner?",
    options: optionSet([
      "No",
      "I think every startup needs a co-founder",
      "I understand some reasons to have one",
      "I understand role, equity, responsibility, and founder fit",
    ]),
  },
  {
    id: "structure_company_types",
    category: "structure_growth",
    question: "Do you understand basic business structures like proprietorship, LLP, OPC, or Pvt Ltd?",
    options: optionSet([
      "No",
      "I have heard the terms",
      "I understand basic differences",
      "I know which structure may fit which business stage",
    ]),
  },
  {
    id: "structure_funding",
    category: "structure_growth",
    question: "Do you know whether you need funding?",
    options: optionSet([
      "No idea",
      "I think every business needs funding",
      "I know some businesses need funding and some do not",
      "I understand bootstrapping, angel funding, VC funding, and timing",
    ]),
  },
  {
    id: "structure_ownership",
    category: "structure_growth",
    question: "Do you know how ownership and shares should be divided with a co-founder or partner?",
    options: optionSet([
      "No",
      "Equally, maybe",
      "Based on contribution, but I am not sure how",
      "Based on role, risk, capital, commitment, vesting, and long-term value",
    ]),
  },
];

export const assessmentRoles = [
  "Aspiring founder",
  "Working professional",
  "Student",
  "Freelancer or self-employed",
  "Business owner",
  "Exploring business first",
];

export function getAssessmentOption(questionId, value) {
  const question = assessmentQuestions.find((item) => item.id === questionId);

  if (!question) {
    return null;
  }

  return question.options.find((option) => option.value === Number(value)) || null;
}

export function scoreAssessment(answerMap) {
  const categoryScores = assessmentCategories.map((category) => {
    const categoryQuestions = assessmentQuestions.filter((item) => item.category === category.id);
    const earned = categoryQuestions.reduce((sum, question) => {
      const rawValue = Number(answerMap?.[question.id] ?? 0);
      const safeValue = Number.isFinite(rawValue) ? Math.min(Math.max(rawValue, 0), 3) : 0;

      return sum + safeValue;
    }, 0);
    const max = categoryQuestions.length * 3;

    return {
      ...category,
      earned,
      max,
      percentage: max > 0 ? Math.round((earned / max) * 100) : 0,
    };
  });

  const earned = categoryScores.reduce((sum, item) => sum + item.earned, 0);
  const max = categoryScores.reduce((sum, item) => sum + item.max, 0);
  const percentage = max > 0 ? Math.round((earned / max) * 100) : 0;
  const weakestCategory = [...categoryScores].sort((a, b) => a.percentage - b.percentage)[0];

  let level = "Early clarity stage";
  let summary =
    "You are still forming the business picture. Before risking time, money, or career stability, your next step is to understand how the major decisions connect.";

  if (percentage >= 72) {
    level = "Strong starting clarity";
    summary =
      "You already have useful clarity in several areas. Your next step is to pressure-test the business system and identify the decisions that still carry risk.";
  } else if (percentage >= 42) {
    level = "Developing readiness";
    summary =
      "You have pieces of clarity, but some important business decisions are still disconnected. Your next step is to connect the idea, customer, model, structure, and growth path.";
  }

  return {
    earned,
    max,
    percentage,
    level,
    summary,
    weakestCategory,
    categoryScores,
  };
}
