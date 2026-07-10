export const assessmentCategories = [
  {
    id: "idea_clarity",
    title: "Idea Clarity",
    label: "idea clarity",
    description: "Do you know what problem you want to solve?",
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
    label: "business model",
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

const options = (items) =>
  items.map((item, index) => ({
    id: String.fromCharCode(97 + index),
    label: item.label,
    score: item.score,
  }));

export const assessmentQuestionBank = [
  {
    id: "idea_clarity",
    category: "idea_clarity",
    variants: [
      {
        id: "fitness_space",
        question:
          "Rohan wants to build “something in the fitness space” because the industry is growing fast. He hasn't picked a specific angle yet. What should Rohan do next?",
        options: options([
          { label: "Start building a fitness app since the category is proven.", score: 0 },
          { label: "Pick a narrow fitness-adjacent problem he can name in one sentence.", score: 3 },
          { label: "Study 5 competing fitness apps before deciding anything.", score: 1 },
          { label: "Survey 50 people on whether they “like” fitness apps.", score: 1 },
        ]),
      },
      {
        id: "three_ideas",
        question:
          "Meera has three unrelated ideas: a tutoring app, a plant-care subscription, and a resume-writing service. She likes all three equally. What's the most useful next move?",
        options: options([
          { label: "Pick the one with the biggest total market size.", score: 1 },
          { label: "Test the one where she personally knows the buyer best.", score: 3 },
          { label: "Launch a small version of all three at once.", score: 0 },
          { label: "Ask friends to vote on their favorite.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "problem_validation",
    category: "idea_clarity",
    variants: [
      {
        id: "budgeting_app",
        question:
          "Arjun's idea is a budgeting app for gig workers. Ten people he's shown it to all said “yeah, that sounds useful.” What should Arjun conclude?",
        options: options([
          { label: "The idea is validated because ten people confirmed it.", score: 0 },
          { label: "He needs a bigger sample, maybe 50 people.", score: 1 },
          { label: "Agreement isn't proof; he needs evidence of current problem-solving behavior.", score: 3 },
          { label: "He should now build a working prototype.", score: 1 },
        ]),
      },
      {
        id: "paid_workaround",
        question:
          "Priya finds that 8 out of 10 people she interviewed are currently paying for a workaround: spreadsheets, a freelancer, or a competitor's basic tool. What does this tell her?",
        options: options([
          { label: "The market is already too competitive to enter.", score: 1 },
          { label: "There's real willingness to pay already, which is a strong signal.", score: 3 },
          { label: "She should undercut the workaround's price immediately.", score: 1 },
          { label: "People only say this to be polite.", score: 0 },
        ]),
      },
    ],
  },
  {
    id: "product_vs_validation",
    category: "idea_clarity",
    variants: [
      {
        id: "salon_tool",
        question:
          "Karan has an idea for a scheduling tool for salons. He has ₹2 lakh saved and eight weeks before deciding whether to quit his job. What's the best use of week one?",
        options: options([
          { label: "Register the company so he looks credible to salons.", score: 1 },
          { label: "Hire a developer to start building.", score: 0 },
          { label: "Visit or call 15 salon owners about current scheduling habits.", score: 3 },
          { label: "Design the logo and landing page.", score: 1 },
        ]),
      },
      {
        id: "prototype_first",
        question:
          "Sana has already built a working prototype over three weekends before speaking to any customers. What should she do now?",
        options: options([
          { label: "Keep improving the prototype until it feels complete.", score: 0 },
          { label: "Show it to 10 real users and observe what they actually do.", score: 3 },
          { label: "Launch it publicly and see what happens.", score: 1 },
          { label: "Get feedback only from other founders.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "customer_clarity",
    category: "customer_clarity",
    variants: [
      {
        id: "save_money",
        question:
          "Vikram describes his customer as “young professionals who want to save money.” A potential co-founder challenges this. What's the sharper version?",
        options: options([
          { label: "Everyone under 35 with a bank account.", score: 0 },
          { label: "People who use finance apps.", score: 1 },
          { label: "Salaried employees, 24-30, who run out of money by day 20.", score: 3 },
          { label: "Anyone interested in personal finance content.", score: 1 },
        ]),
      },
      {
        id: "small_retailers",
        question:
          "Divya's product helps small retailers manage inventory. She's currently targeting “small business owners in India.” Which narrowing is most useful?",
        options: options([
          { label: "Small business owners who are active on Instagram.", score: 1 },
          { label: "Kirana store owners managing 500+ SKUs by notebook or Excel.", score: 3 },
          { label: "Small business owners aged 30-50.", score: 1 },
          { label: "Anyone who runs a retail shop.", score: 0 },
        ]),
      },
    ],
  },
  {
    id: "reading_customer_signals",
    category: "customer_clarity",
    variants: [
      {
        id: "probably_use",
        question:
          "After a demo, a prospect says: “This looks really useful, I'll probably use it once it's ready.” How should this be read?",
        options: options([
          { label: "As a strong buying signal.", score: 0 },
          { label: "As interest, but not proof because no commitment was made.", score: 3 },
          { label: "As a sign to lower the price.", score: 1 },
          { label: "As a reason to start building immediately.", score: 1 },
        ]),
      },
      {
        id: "pay_now",
        question:
          "A prospect says: “I don't love the price, but can I pay for the first month right now to try it?” How should this be read compared to praise?",
        options: options([
          { label: "Both signals carry equal weight.", score: 0 },
          { label: "This is stronger because money moved despite an objection.", score: 3 },
          { label: "This customer will likely churn quickly.", score: 1 },
          { label: "The price should be lowered before anything else.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "first_customers",
    category: "customer_clarity",
    variants: [
      {
        id: "architecture_budget",
        question:
          "Farhan has ₹50,000 to spend on reaching first customers for a niche B2B tool used by architecture firms. What's the better use of that budget?",
        options: options([
          { label: "A broad Instagram ad campaign to build brand awareness.", score: 0 },
          { label: "Direct outreach to 100 named architecture firms.", score: 3 },
          { label: "A referral program before he has customers to refer.", score: 1 },
          { label: "A billboard near a business district.", score: 0 },
        ]),
      },
      {
        id: "students_professionals",
        question:
          "Neha can serve students or working professionals at launch. Students are 10x more numerous. Professionals have 3x willingness to pay and a clearer problem. Which should she start with?",
        options: options([
          { label: "Students, because volume matters most early on.", score: 1 },
          { label: "Professionals, because a smaller high-conviction group is easier to learn from.", score: 3 },
          { label: "Both, split evenly, to see which converts better.", score: 1 },
          { label: "Whichever group is easier to advertise to.", score: 0 },
        ]),
      },
    ],
  },
  {
    id: "market_understanding",
    category: "market_understanding",
    variants: [
      {
        id: "industry_report",
        question:
          "Aditya says his market is “worth ₹500 crore” based on an industry report he found online. What's missing from his market understanding?",
        options: options([
          { label: "Nothing; the number is enough to proceed.", score: 0 },
          { label: "How many buyers are reachable and already paying for alternatives.", score: 3 },
          { label: "A bigger number from a different report.", score: 1 },
          { label: "Whether investors will find the number attractive.", score: 1 },
        ]),
      },
      {
        id: "research_vs_customers",
        question:
          "Two founders enter the same ₹200 crore market. One researched industry size. The other spoke to 30 customers about alternatives and spending. Who understands the market better?",
        options: options([
          { label: "The one with industry research because bigger numbers are reliable.", score: 0 },
          { label: "Both are equally prepared.", score: 1 },
          { label: "The one who spoke to customers; behavior beats aggregate size.", score: 3 },
          { label: "Neither; market size doesn't matter this early.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "competition_differentiation",
    category: "market_understanding",
    variants: [
      {
        id: "twelve_competitors",
        question:
          "Ishaan discovers 12 competitors already operating in his space. What should he do?",
        options: options([
          { label: "Abandon the idea because the space is too crowded.", score: 0 },
          { label: "Copy the market leader's exact model.", score: 1 },
          { label: "Study customer choices and find an underserved segment.", score: 3 },
          { label: "Ignore competitors and focus only on his product.", score: 1 },
        ]),
      },
      {
        id: "quality_vs_segment",
        question:
          "Two founders claim differentiation. One says “better quality.” The other serves solo lawyers ignored by bigger players due to deal size. Whose differentiation is stronger?",
        options: options([
          { label: "The first, because better quality always wins eventually.", score: 1 },
          { label: "The second, because a specific underserved segment is harder to copy.", score: 3 },
          { label: "Neither; differentiation doesn't matter if the market is big.", score: 0 },
          { label: "They're equally strong.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "business_model",
    category: "business_model",
    variants: [
      {
        id: "free_users",
        question:
          "Tanya's app has 10,000 free users and no paying customers. An investor asks her to explain the business model. What should her answer be built around?",
        options: options([
          { label: "We'll add ads once we hit 100,000 users.", score: 1 },
          { label: "Who pays, how much, how often, and why.", score: 3 },
          { label: "Growth first, monetization later, like successful apps.", score: 0 },
          { label: "A competitor comparison showing who raised funding.", score: 1 },
        ]),
      },
      {
        id: "saas_churn",
        question:
          "Two SaaS founders charge ₹999/month. One has 40% monthly churn; the other has 5%. Whose business model is healthier, even with the same revenue this month?",
        options: options([
          { label: "They're equally healthy because revenue is revenue.", score: 0 },
          { label: "The high-churn one because they're acquiring faster.", score: 1 },
          { label: "The low-churn one because high churn leaks revenue monthly.", score: 3 },
          { label: "Impossible to say without knowing ad spend.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "pricing_signals",
    category: "business_model",
    variants: [
      {
        id: "price_too_high",
        question:
          "Several prospects like the product but say the ₹1,999 price is too high. What should be checked first before changing the price?",
        options: options([
          { label: "Whether the product is being shown to the right customer segment.", score: 3 },
          { label: "Whether the price should simply be cut in half.", score: 1 },
          { label: "Whether a free trial would fix the objection.", score: 1 },
          { label: "Whether the product should be made free entirely.", score: 0 },
        ]),
      },
      {
        id: "price_increase",
        question:
          "A founder raises prices by 20% and loses only 2% of customers. What does this suggest?",
        options: options([
          { label: "The price was probably too low to begin with.", score: 3 },
          { label: "The remaining customers are angry and will churn later.", score: 1 },
          { label: "Price increases always cause damage and should be reversed.", score: 0 },
          { label: "This is too small a sample to learn anything.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "unit_economics",
    category: "business_model",
    variants: [
      {
        id: "d2c_ads",
        question:
          "A D2C brand sells a ₹1,000 product. It costs ₹700 to make and ship, and ₹400 is spent on ads to acquire each customer. Sales are growing 20% month over month. What's happening?",
        options: options([
          { label: "The business is healthy because sales are growing.", score: 0 },
          { label: "The business loses money on every order, and growth worsens it.", score: 3 },
          { label: "The business will become profitable once it scales.", score: 1 },
          { label: "This is normal for the first year.", score: 1 },
        ]),
      },
      {
        id: "subscription_ltv",
        question:
          "A subscription business spends ₹2,000 to acquire a customer who pays ₹500/month and stays for 3 months on average. Is this model sound?",
        options: options([
          { label: "Yes; ₹1,500 revenue against ₹2,000 spent is close enough.", score: 1 },
          { label: "No; the business loses money over the average customer's lifetime.", score: 3 },
          { label: "Yes; subscription businesses always improve over time.", score: 0 },
          { label: "Cannot be determined without more information.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "execution_readiness",
    category: "execution_readiness",
    variants: [
      {
        id: "plan_vs_trials",
        question:
          "Two aspiring founders want to start a tutoring business. One builds a 40-page plan. The other runs three ₹0-cost trial sessions with real students. Who is better positioned after a month?",
        options: options([
          { label: "The planner, because a solid plan reduces risk.", score: 1 },
          { label: "The tester, because real sessions produced evidence.", score: 3 },
          { label: "Both equally; different paths to the same readiness.", score: 1 },
          { label: "Neither; a month is too short to judge.", score: 0 },
        ]),
      },
      {
        id: "learn_everything",
        question:
          "Rahul keeps saying he'll start once he “learns everything” about running a business. What's the risk in this approach?",
        options: options([
          { label: "There is no risk; thorough preparation is always good.", score: 0 },
          { label: "Learning replaces action, and the idea never meets reality.", score: 3 },
          { label: "The risk is only that competitors move faster.", score: 1 },
          { label: "The risk is that he'll spend too much on courses.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "mvp_thinking",
    category: "execution_readiness",
    variants: [
      {
        id: "four_month_app",
        question:
          "A founder spends 4 months building a fully featured app before showing it to a single customer. What went wrong with this approach?",
        options: options([
          { label: "Nothing; a complete product looks more professional.", score: 0 },
          { label: "Four months is too long for any single feature.", score: 1 },
          { label: "Core assumptions stayed untested while resources were spent.", score: 3 },
          { label: "He should have hired more developers to go faster.", score: 1 },
        ]),
      },
      {
        id: "manual_mvp",
        question:
          "A founder builds a manual version of her service first, delivering it by phone and WhatsApp for 20 customers with no app at all. Is this a legitimate MVP?",
        options: options([
          { label: "No; an MVP has to be real working software.", score: 1 },
          { label: "Yes; it tests demand before automating the service.", score: 3 },
          { label: "No; customers will be disappointed there's no app.", score: 0 },
          { label: "Only if she plans to keep doing it manually forever.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "registration_legal_structure",
    category: "execution_readiness",
    variants: [
      {
        id: "no_revenue",
        question:
          "Aman has an idea but no customers, no revenue, and no co-founder yet. Is it time to register a company?",
        options: options([
          { label: "Yes; registering first builds credibility with customers.", score: 1 },
          { label: "Not yet; structure becomes urgent when revenue, partners, or contracts require it.", score: 3 },
          { label: "Yes; every serious founder registers on day one.", score: 0 },
          { label: "No; registration should wait until the business is profitable.", score: 1 },
        ]),
      },
      {
        id: "large_contract",
        question:
          "Two friends freelance together informally and now have a ₹15 lakh annual contract requiring formal invoices and GST registration. Has the moment to formalize arrived?",
        options: options([
          { label: "No; informal partnerships can handle any contract size.", score: 0 },
          { label: "Yes; the client requirements and contract value make it necessary.", score: 3 },
          { label: "Only if they plan to hire employees.", score: 1 },
          { label: "Only if they want to raise funding later.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "business_structure_choice",
    category: "structure_growth",
    variants: [
      {
        id: "solo_consulting",
        question:
          "A solo founder is building a low-risk consulting business with no funding or partner plans. Which structure fits best?",
        options: options([
          { label: "Private Limited, because it's always the safest choice.", score: 1 },
          { label: "Proprietorship or LLP, matched to low risk and solo ownership.", score: 3 },
          { label: "A structure copied from a well-known unicorn startup.", score: 0 },
          { label: "Whichever has the lowest registration fee.", score: 1 },
        ]),
      },
      {
        id: "funding_team",
        question:
          "Two co-founders plan to raise outside funding within a year and hire a team quickly. Which structure fits their situation best?",
        options: options([
          { label: "Proprietorship, since it's the fastest to set up.", score: 0 },
          { label: "Private Limited, since investors and equity distribution typically require it.", score: 3 },
          { label: "Whichever their friends used for their startups.", score: 1 },
          { label: "LLP, since it avoids double taxation.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "funding_decisions",
    category: "structure_growth",
    variants: [
      {
        id: "profitable_raise",
        question:
          "A founder has a working product, paying customers, and a clear plan for how capital would accelerate growth, but is profitable without it. Should she raise funding?",
        options: options([
          { label: "Yes; every serious startup should raise funding.", score: 0 },
          { label: "No; profitable businesses should never raise money.", score: 1 },
          { label: "It depends whether capital accelerates what already works.", score: 3 },
          { label: "Only if a well-known investor approaches her.", score: 1 },
        ]),
      },
      {
        id: "pre_validation_offer",
        question:
          "A founder with no product and no validated customers is offered a large investor check. What should he consider before accepting?",
        options: options([
          { label: "Take it because capital solves most early problems.", score: 0 },
          { label: "Whether raising now gives up equity before proof he needs that money.", score: 3 },
          { label: "Whether the investor is famous enough for credibility.", score: 1 },
          { label: "Whether to ask for even more money while the offer is open.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "cofounder_equity",
    category: "structure_growth",
    variants: [
      {
        id: "late_part_time",
        question:
          "Two friends start a company. One works full-time from day one; the other joins six months later, part-time, after validation. What's the more defensible equity split?",
        options: options([
          { label: "50/50, since they're equally good friends.", score: 0 },
          { label: "Weighted toward the earlier full-time contributor, with vesting for both.", score: 3 },
          { label: "Whoever had the original idea gets 100%.", score: 1 },
          { label: "Split based only on each person's cash investment.", score: 1 },
        ]),
      },
      {
        id: "coffee_advisor",
        question:
          "A founder may give a friend 15% equity for advice and occasional intros over coffee, with no defined role or commitment. What's the risk?",
        options: options([
          { label: "No risk; friends should be rewarded for helping.", score: 0 },
          { label: "Meaningful equity for undefined help dilutes future contributors.", score: 3 },
          { label: "The risk is only that the friend asks for more later.", score: 1 },
          { label: "There's no risk as long as it's in writing.", score: 1 },
        ]),
      },
    ],
  },
  {
    id: "growth_scaling",
    category: "structure_growth",
    variants: [
      {
        id: "founder_process",
        question:
          "A founder personally handles every customer interaction and now wants to hire to grow faster. What should happen before hiring?",
        options: options([
          { label: "Hire immediately because speed matters more than process.", score: 1 },
          { label: "Document the process well enough for someone else to follow.", score: 3 },
          { label: "Wait until revenue triples before considering hiring.", score: 1 },
          { label: "Avoid hiring entirely to keep costs low.", score: 0 },
        ]),
      },
      {
        id: "personal_growth",
        question:
          "A business grows 30% month over month, but every new customer requires the founder's personal, non-repeatable involvement. Is it scalable now?",
        options: options([
          { label: "Yes; the growth rate proves it's working.", score: 0 },
          { label: "No; founder-time growth is expansion, not scale, until systemized.", score: 3 },
          { label: "Yes, as long as she hires more people like herself.", score: 1 },
          { label: "Only measurable after a full year of data.", score: 1 },
        ]),
      },
    ],
  },
];

export const assessmentQuestions = assessmentQuestionBank.map((topic) => {
  const variant = topic.variants[0];

  return {
    id: `${topic.id}:${variant.id}`,
    topicId: topic.id,
    variantId: variant.id,
    category: topic.category,
    question: variant.question,
    options: variant.options.map((option, index) => ({
      ...option,
      value: option.id,
      letter: String.fromCharCode(65 + index),
    })),
  };
});

export const assessmentRoles = [
  "Aspiring founder",
  "Working professional",
  "Student",
  "Freelancer or self-employed",
  "Business owner",
  "Exploring business first",
];

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

export function createAssessmentSession() {
  return assessmentQuestionBank.map((topic) => {
    const variant = topic.variants[Math.floor(Math.random() * topic.variants.length)];
    const shuffledOptions = shuffle(variant.options).map((option, index) => ({
      ...option,
      value: option.id,
      letter: String.fromCharCode(65 + index),
    }));

    return {
      id: `${topic.id}:${variant.id}`,
      topicId: topic.id,
      variantId: variant.id,
      category: topic.category,
      question: variant.question,
      options: shuffledOptions,
    };
  });
}

export function getAssessmentQuestion(questionId) {
  if (typeof questionId !== "string") {
    return null;
  }

  const [topicId, variantId] = questionId.split(":");
  const topic = assessmentQuestionBank.find((item) => item.id === topicId);
  const variant = topic?.variants.find((item) => item.id === variantId);

  if (!topic || !variant) {
    return null;
  }

  return {
    id: `${topic.id}:${variant.id}`,
    topicId: topic.id,
    variantId: variant.id,
    category: topic.category,
    question: variant.question,
    options: variant.options,
  };
}

export function getAssessmentOption(questionId, value) {
  const question = getAssessmentQuestion(questionId);

  if (!question) {
    return null;
  }

  return question.options.find((option) => option.id === value) || null;
}

function getDiagnosticRating(percentage) {
  if (percentage >= 75) {
    return "Strong";
  }

  if (percentage >= 55) {
    return "Developing";
  }

  if (percentage >= 35) {
    return "Needs Clarity";
  }

  return "Foundational";
}

export function scoreAssessment(answerMap) {
  const selectedQuestions = Object.keys(answerMap || {})
    .map((questionId) => getAssessmentQuestion(questionId))
    .filter(Boolean);

  const categoryScores = assessmentCategories.map((category) => {
    const categoryQuestions = selectedQuestions.filter((item) => item.category === category.id);
    const earned = categoryQuestions.reduce((sum, question) => {
      const selectedOption = getAssessmentOption(question.id, answerMap?.[question.id]);
      const safeValue = selectedOption?.score ?? 0;

      return sum + safeValue;
    }, 0);
    const max = categoryQuestions.length * 3;

    const percentage = max > 0 ? Math.round((earned / max) * 100) : 0;

    return {
      ...category,
      earned,
      max,
      percentage,
      rating: getDiagnosticRating(percentage),
    };
  });

  const earned = categoryScores.reduce((sum, item) => sum + item.earned, 0);
  const max = categoryScores.reduce((sum, item) => sum + item.max, 0);
  const percentage = max > 0 ? Math.round((earned / max) * 100) : 0;
  const lowestCategory = [...categoryScores]
    .filter((category) => category.max > 0)
    .sort((a, b) => a.percentage - b.percentage)[0];
  const weakestCategory = lowestCategory && lowestCategory.percentage < 75 ? lowestCategory : null;

  let level = "Beginner Explorer";
  let scoreLabel = "Foundational";
  let summary = "You are interested in business but need stronger foundational clarity.";

  if (earned >= 43) {
    level = "Business Ready";
    scoreLabel = "Strong";
    summary =
      "You show strong business clarity, but your assumptions still need to be validated with real customer conversations, pricing signals, and practical execution tests before major investment.";
  } else if (earned >= 31) {
    level = "Serious Starter";
    scoreLabel = "Developing";
    summary =
      "You understand many basics, but you need stronger validation, structure, and execution planning.";
  } else if (earned >= 16) {
    level = "Early Builder";
    scoreLabel = "Emerging";
    summary =
      "You have direction, but important parts like customer, market, business model, or execution may still be unclear.";
  }

  return {
    earned,
    max,
    percentage,
    level,
    scoreLabel,
    summary,
    note:
      "This score is not a final judgment of your business potential. It reflects your current clarity based on your answers.",
    weakestCategory,
    categoryScores,
  };
}
