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
      {
        id: "singapore_meal_kit",
        question:
          "Leena saw a successful meal-kit startup in Singapore and wants to bring the same model to India, unchanged. What should she check first?",
        options: options([
          { label: "Whether the same problem and buying behavior actually exist in her target Indian city.", score: 3 },
          { label: "Whether the Singapore founders would approve of the idea.", score: 0 },
          { label: "Whether the brand name is available to register in India.", score: 1 },
          { label: "Whether a similar app already exists on the Play Store.", score: 1 },
        ]),
      },
      {
        id: "untested_b2b_tool",
        question:
          "Yusuf has had one idea for six months — a niche B2B invoicing tool — but hasn't mentioned it to anyone or tested any interest. What's the biggest risk in his current approach?",
        options: options([
          { label: "Someone else will definitely copy the idea first.", score: 1 },
          { label: "Six months of untested assumptions have accumulated with zero real-world feedback.", score: 3 },
          { label: "He hasn't spent enough time refining the idea privately.", score: 1 },
          { label: "He should keep it secret for even longer to protect it.", score: 0 },
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
      {
        id: "hypothetical_survey",
        question:
          'Nikhil runs a survey asking "Would you use an app that helps you save money?" and gets 200 "yes" responses. What\'s the issue with this validation method?',
        options: options([
          { label: "200 responses is too small a sample to matter.", score: 1 },
          { label: "Hypothetical questions about hypothetical products rarely predict real behavior.", score: 3 },
          { label: "The question should have offered a discount to get better answers.", score: 1 },
          { label: "Nothing — 200 yeses is strong enough proof.", score: 0 },
        ]),
      },
      {
        id: "reddit_complaints",
        question:
          "Aisha finds a Reddit thread with 40 comments from people complaining about a problem her product would solve. Is this validation?",
        options: options([
          { label: "Yes, complete validation — the problem is clearly confirmed.", score: 0 },
          { label: "It's a good signal the problem is real, but she still needs to see if these people would act, not just vent.", score: 3 },
          { label: "No, online complaints are never a reliable signal.", score: 1 },
          { label: "Only if the thread has more than 100 comments.", score: 1 },
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
      {
        id: "landing_page_signups",
        question:
          "Before writing any code, Om builds a simple landing page describing his product and collects email signups from a small ad campaign. Is this a reasonable move before building?",
        options: options([
          { label: "No, a landing page without a real product is misleading.", score: 1 },
          { label: "Yes, it tests real interest cheaply before committing to development.", score: 3 },
          { label: "Yes, but only if it also has a working checkout.", score: 1 },
          { label: "No, signups don't mean anything until people pay.", score: 0 },
        ]),
      },
      {
        id: "agency_before_customers",
        question:
          "Reema is considering hiring a development agency for ₹8 lakh to build a full version of her app before speaking to any customers. What should she reconsider first?",
        options: options([
          { label: "Whether ₹8 lakh is a fair market price from the agency.", score: 1 },
          { label: "Whether to negotiate a lower price with a different agency.", score: 1 },
          { label: "Whether to validate the problem and rough solution with customers before spending that much.", score: 3 },
          { label: "Nothing — a professional build is always the safer first step.", score: 0 },
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
      {
        id: "new_parent_segment",
        question:
          'Two founders both target "new parents." One defines it that broadly. The other defines it as "first-time parents in the first six weeks after birth, overwhelmed by conflicting advice." Whose definition will make marketing and product decisions easier?',
        options: options([
          { label: "The broad one — it doesn't exclude potential buyers.", score: 1 },
          { label: "The narrow one — a specific moment and pain point is easier to design and speak to.", score: 3 },
          { label: "Neither — customer definitions matter less than product quality.", score: 0 },
          { label: "They're equally useful at this early stage.", score: 1 },
        ]),
      },
      {
        id: "hr_transition",
        question:
          'Two founders define their customer differently. One says "HR managers." The other says "HR managers at companies going through a leadership transition, where hiring urgency has just spiked." Which definition better predicts who will actually buy soon?',
        options: options([
          { label: '"HR managers" — job title is the clearest starting filter.', score: 1 },
          { label: "Neither — buying urgency can't be predicted this early.", score: 1 },
          { label: "The situational one — it captures a moment of urgency, not just a role.", score: 3 },
          { label: "Both are equally weak without a company size range.", score: 0 },
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
      {
        id: "detailed_demo_questions",
        question:
          "During a product demo, a prospect asks eight detailed questions about integrations, pricing tiers, and onboarding timelines. How should this be read compared to a prospect who says nothing and just nods along?",
        options: options([
          { label: "The quiet prospect is more polite and likely more interested.", score: 0 },
          { label: "Both are equally engaged — question count doesn't matter.", score: 1 },
          { label: "Detailed, specific questions usually signal someone seriously evaluating a real use case.", score: 3 },
          { label: "Too many questions usually signal skepticism, not interest.", score: 1 },
        ]),
      },
      {
        id: "unprompted_referral",
        question:
          'Without being asked, a customer forwards the product to a colleague and says "you should try this too." How should this unprompted referral be weighed against a five-star written review?',
        options: options([
          { label: "The review is stronger — it's public and permanent.", score: 1 },
          { label: "They're roughly equal signals of satisfaction.", score: 1 },
          { label: "The referral is stronger — people rarely risk their own credibility recommending something they don't actually value.", score: 3 },
          { label: "Neither means much without a repeat purchase.", score: 0 },
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
      {
        id: "existing_platform",
        question:
          "Farah can either spend three months building her own audience from scratch, or partner with an existing platform that already has 20,000 of her exact target users. Which is usually the faster path to first customers?",
        options: options([
          { label: "Building her own audience — it gives more long-term control.", score: 1 },
          { label: "Partnering with the existing platform — reaching an already-assembled audience first.", score: 3 },
          { label: "Both at once, splitting effort evenly.", score: 1 },
          { label: "Neither — paid ads are always faster than either.", score: 0 },
        ]),
      },
      {
        id: "paid_pilot",
        question:
          "Deepak is deciding between offering his product free to 100 people, or charging a small but real fee to just five people for a pilot. Which gives him more useful early signal?",
        options: options([
          { label: "Free to 100 — more data points are always better.", score: 1 },
          { label: "Paid pilot with five — payment, even small, filters for real intent that free access doesn't.", score: 3 },
          { label: "Neither works without a much larger sample.", score: 0 },
          { label: "Free to 100, since it builds word-of-mouth faster.", score: 1 },
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
      {
        id: "booming_industry",
        question:
          'News articles describe Aditi\'s target industry as "booming," with several large funding rounds announced recently. Does this tell her what she needs to know about her specific opportunity?',
        options: options([
          { label: "Yes — industry-wide momentum is a reliable proxy for her own demand.", score: 0 },
          { label: "Not on its own — it says nothing about whether her specific customer segment is reachable and paying.", score: 3 },
          { label: "Yes, especially if the funded companies are her direct competitors.", score: 1 },
          { label: "No — funding news should be ignored entirely.", score: 1 },
        ]),
      },
      {
        id: "skip_market_research",
        question:
          'Sanjay believes market research is a waste of time and prefers to "just build and see what happens." What\'s the risk in skipping it entirely?',
        options: options([
          { label: "There's no real risk if the product is good enough.", score: 0 },
          { label: "He may spend months building for a market that doesn't have the demand or willingness to pay he assumes.", score: 3 },
          { label: "The only risk is losing a slight speed advantage.", score: 1 },
          { label: "Market research only matters for companies raising funding.", score: 1 },
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
      {
        id: "zero_competitors",
        question:
          "Priyanka researches her space thoroughly and finds zero existing competitors, direct or indirect. What should this make her consider?",
        options: options([
          { label: "She's found a guaranteed opportunity nobody else has spotted.", score: 0 },
          { label: "It's worth checking whether the absence means there's no real demand, not just an open field.", score: 3 },
          { label: "She should launch immediately before anyone else notices the gap.", score: 1 },
          { label: "She should lower her prices to win the space fast.", score: 1 },
        ]),
      },
      {
        id: "competitor_price_drop",
        question:
          "A direct competitor drops their price by 30% two weeks after Kabir launches. What's his best immediate response?",
        options: options([
          { label: "Match the price cut right away to stay competitive.", score: 1 },
          { label: "Assess whether his differentiation still holds at his current price before reacting on price alone.", score: 3 },
          { label: "Ignore it completely — competitor pricing is irrelevant.", score: 0 },
          { label: "Raise his own price to signal higher quality.", score: 1 },
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
      {
        id: "free_tier_conversion",
        question:
          "Tarun's app has a free tier used by 50,000 people and a paid tier used by only 40, with no clear plan for converting more. What's the core gap in his business model?",
        options: options([
          { label: "He hasn't done enough marketing to the free users.", score: 1 },
          { label: "There's no defined reason or moment that would make a free user decide to pay.", score: 3 },
          { label: "The free tier should be removed to force conversions.", score: 1 },
          { label: "Nothing — a large free user base is valuable on its own.", score: 0 },
        ]),
      },
      {
        id: "marketplace_charging_side",
        question:
          "Wafa is building a marketplace connecting freelance designers with small businesses, and is unsure whether to charge the designers, the businesses, or both. What should determine this decision?",
        options: options([
          { label: "Whichever side is easier to bill administratively.", score: 1 },
          { label: "Charging both sides evenly, to seem fair.", score: 0 },
          { label: "Whichever side gets more value and has more willingness to pay for solving their side of the problem.", score: 3 },
          { label: "Whichever competitors are already charging.", score: 1 },
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
      {
        id: "no_price_objections",
        question:
          "Nobody who sees Rakesh's pricing page has ever objected to the price, even once. What might this actually suggest?",
        options: options([
          { label: "The pricing is perfectly calibrated — no changes needed.", score: 1 },
          { label: "It's worth testing a higher price — an absence of pushback can mean it's underpriced.", score: 3 },
          { label: "It means demand is weak, since price isn't even a topic.", score: 0 },
          { label: "Prices should never be changed once set.", score: 1 },
        ]),
      },
      {
        id: "discount_requests",
        question:
          "Many customers ask for a discount before signing up, but almost none walk away when told there isn't one. What does this pattern suggest?",
        options: options([
          { label: "The discount requests should always be granted to avoid losing customers.", score: 1 },
          { label: "Asking for a discount is a negotiating habit here, not a real barrier to buying.", score: 3 },
          { label: "The price is clearly too high and needs to be cut.", score: 0 },
          { label: "The product should be offered free during the sales conversation.", score: 1 },
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
      {
        id: "acquisition_profit_math",
        question:
          "A founder spends ₹3,000 to acquire a customer. That customer generates ₹1,000/month in profit and typically stays four months. Is this a sound economic model?",
        options: options([
          { label: "Yes — ₹4,000 in total profit against a ₹3,000 cost works.", score: 3 },
          { label: "No — any acquisition cost above ₹1,000 is automatically unsustainable.", score: 1 },
          { label: "Cannot say without knowing the founder's total revenue.", score: 1 },
          { label: "No — customers should never be expected to churn at all.", score: 0 },
        ]),
      },
      {
        id: "margin_vs_volume",
        question:
          "Two competing product lines both sell for ₹500. One has a 60% gross margin; the other has a 15% gross margin but sells twice as many units. Which line is contributing more actual profit to the business?",
        options: options([
          { label: "The 15% line, since higher volume always wins.", score: 1 },
          { label: "They contribute equally since revenue is the same order of magnitude.", score: 0 },
          { label: "It depends on the actual math — volume alone doesn't determine which is more profitable.", score: 3 },
          { label: "The 60% line, since margin percentage is what matters most.", score: 1 },
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
      {
        id: "cofounder_delay",
        question:
          'Farah says she\'ll start her business "as soon as she finds the right co-founder," and has been saying this for eight months. What\'s the risk in this stance?',
        options: options([
          { label: "No risk — a strong co-founder is essential before starting anything.", score: 1 },
          { label: "The search for a co-founder has become a reason to delay testing the idea at all.", score: 3 },
          { label: "The risk is only that a co-founder search takes too long financially.", score: 1 },
          { label: "There's no risk as long as she keeps networking actively.", score: 0 },
        ]),
      },
      {
        id: "rough_real_users",
        question:
          "Imran ships a version of his product to ten real users that is visibly rough — missing features, some bugs, no polish. Is this a reasonable move?",
        options: options([
          { label: "No, an unpolished product will permanently damage his reputation.", score: 1 },
          { label: "Yes, as long as the core value is testable and he's upfront that it's early.", score: 3 },
          { label: "Only acceptable if none of the ten users ever find out it's incomplete.", score: 0 },
          { label: "No, products should never be shown until fully finished.", score: 1 },
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
      {
        id: "no_code_mvp",
        question:
          "Zoya wants to test her idea using a no-code tool instead of custom-built software, to launch in days instead of months. Is this a legitimate approach?",
        options: options([
          { label: "No, an MVP must be custom-coded to be taken seriously.", score: 1 },
          { label: "Yes, if it can test the core assumption, the underlying tool doesn't matter.", score: 3 },
          { label: "Only if she plans to rebuild it in code within a week.", score: 1 },
          { label: "No, no-code tools can't be trusted with real customer data.", score: 0 },
        ]),
      },
      {
        id: "weak_core_mvp",
        question:
          'Rehan builds a "minimum" version of his product by cutting corners on the one feature customers actually came for, while keeping everything else polished. What\'s the flaw in this approach?',
        options: options([
          { label: "There's no flaw — trimming somewhere is always necessary.", score: 0 },
          { label: "MVP means testing the core value with minimum extras, not delivering a weak version of the core itself.", score: 3 },
          { label: "The flaw is spending too much time on polish elsewhere.", score: 1 },
          { label: "The flaw is only that it will take longer to build.", score: 1 },
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
      {
        id: "family_investment_no_agreement",
        question:
          "Two friends in different cities agree by phone to build a company together and start accepting money from family and friends as early investment, with nothing in writing. What's the most pressing risk here?",
        options: options([
          { label: "There's no meaningful risk until the company grows large.", score: 0 },
          { label: "Taking investment money without any documented agreement creates real legal and relationship exposure early.", score: 3 },
          { label: "The risk is only that family members might ask for updates too often.", score: 1 },
          { label: "The risk is limited to whichever city has stricter business laws.", score: 1 },
        ]),
      },
      {
        id: "pvt_ltd_too_early",
        question:
          'Before defining what the product even does, Kunal registers a Private Limited company because it "feels like the professional first step." What\'s the issue with this sequencing?',
        options: options([
          { label: "There's no issue — registering early always helps credibility.", score: 0 },
          { label: "Registration brings ongoing compliance costs and obligations that start accruing before there's any validated business to justify them.", score: 3 },
          { label: "The issue is only that he chose the wrong structure.", score: 1 },
          { label: "The issue is that registration should happen after hiring, not before.", score: 1 },
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
      {
        id: "food_manufacturing_liability",
        question:
          "A founder is starting a small food manufacturing business involving physical equipment, staff, and product liability risk, entirely funded from personal savings. Which consideration should weigh most in the structure decision?",
        options: options([
          { label: "Which structure has the simplest annual paperwork.", score: 1 },
          { label: "Personal liability protection, given the physical and product risks involved.", score: 3 },
          { label: "Whichever structure a similar successful business used.", score: 1 },
          { label: "Whichever structure requires the least starting capital.", score: 0 },
        ]),
      },
      {
        id: "unequal_capital_sweat",
        question:
          "Two co-founders are starting together, but one is contributing ₹8 lakh in capital and the other is contributing only sweat equity. Should this affect their choice of business structure?",
        options: options([
          { label: "No — structure should never be influenced by capital contribution.", score: 0 },
          { label: "Yes — an LLP or Pvt Ltd with clearly defined ownership stakes can reflect the unequal contribution formally.", score: 3 },
          { label: "No — only equal partnerships should ever be formalized.", score: 1 },
          { label: "Only if they plan to dissolve the business later.", score: 1 },
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
      {
        id: "growth_plateau_funding",
        question:
          "A bootstrapped founder has grown steadily for two years but has hit a plateau — the same channels and team size aren't producing more growth. Is this a good moment to consider raising funding?",
        options: options([
          { label: "No — funding should only be raised in the first six months.", score: 1 },
          { label: "Possibly — if the plateau is a resource constraint rather than a demand or model problem, capital could help.", score: 3 },
          { label: "Yes, automatically — any plateau means funding is needed.", score: 0 },
          { label: "No — plateaus mean the business idea has failed.", score: 1 },
        ]),
      },
      {
        id: "angel_control_rights",
        question:
          "An angel investor offers funding but asks for a board seat and veto rights over most major decisions, despite investing a relatively small amount. What should the founder weigh most carefully?",
        options: options([
          { label: "Whether the investor's name will impress future investors.", score: 1 },
          { label: "Whether the control being given up is proportionate to the capital and value being received.", score: 3 },
          { label: 'Whether to simply ask for a larger check to make it "worth it".', score: 1 },
          { label: "Whether to accept immediately since angel investors are hard to find.", score: 0 },
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
      {
        id: "technical_cofounder_split",
        question:
          "Aryan has strong business and sales instincts but no technical skill, and is considering bringing on a co-founder purely to fill that gap. What should guide the equity split with this new co-founder?",
        options: options([
          { label: "A flat 10% regardless of role, since Aryan had the original idea.", score: 1 },
          { label: "Their respective ongoing contribution, risk, and commitment going forward — not just who thought of it first.", score: 3 },
          { label: "Whatever percentage makes the co-founder immediately agree.", score: 0 },
          { label: "An equal 50/50 split by default, to avoid negotiation.", score: 1 },
        ]),
      },
      {
        id: "disengaged_cofounder",
        question:
          "A co-founder who received 30% equity two years ago has become largely disengaged — inconsistent hours, minimal output — while the other co-founder does nearly all the work. What does this reveal about how the original equity was structured?",
        options: options([
          { label: "Nothing — equity splits are permanent once agreed.", score: 1 },
          { label: "The absence of a vesting schedule tied to ongoing contribution is now costing the active co-founder.", score: 3 },
          { label: "The disengaged co-founder should be forgiven since they helped early on.", score: 0 },
          { label: "The issue is unrelated to equity and only about personal motivation.", score: 1 },
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
      {
        id: "sales_team_before_fit",
        question:
          "Before confirming product-market fit, a founder hires three salespeople to accelerate growth. What's the risk in this sequencing?",
        options: options([
          { label: "No risk — more salespeople always means more revenue.", score: 0 },
          { label: "Scaling a sales team before the product reliably converts and retains customers can scale the wrong thing.", score: 3 },
          { label: "The only risk is the extra salary cost.", score: 1 },
          { label: "The risk is limited to how quickly the new hires can be trained.", score: 1 },
        ]),
      },
      {
        id: "second_city_churn",
        question:
          "A founder is considering expanding to a second city, even though her first city still has high customer churn she hasn't addressed. What should she prioritize first?",
        options: options([
          { label: "Expanding anyway — new cities bring fresh growth regardless.", score: 1 },
          { label: "Understanding and fixing why customers are churning in the first city, before replicating the same problem elsewhere.", score: 3 },
          { label: "Splitting focus evenly between fixing churn and launching the new city.", score: 1 },
          { label: "Expansion should be delayed only if churn exceeds 50%.", score: 0 },
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
  const focusCategories = [...categoryScores]
    .filter((category) => category.max > 0 && category.percentage < 75)
    .sort((a, b) => a.percentage - b.percentage);

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
    focusCategories,
    categoryScores,
  };
}
