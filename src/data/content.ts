/**
 * Single source of truth for all personal / portfolio content.
 * Edit values here to update the site. No JSX or styling lives in this file.
 */

export type ProductVisual = 'flow' | 'reasoning' | 'music'

export type ProjectKind = 'product' | 'project'

export interface Product {
  id: string
  /** distinguishes a shipped product from a build/project */
  kind: ProjectKind
  title: string
  subtitle: string
  category: string
  problem: string
  userContext: string
  built: string
  approach: string[]
  impact: { label: string; value: string }[]
  tags: string[]
  productLens: string
  visual: ProductVisual
  /** optional external link ("Open case study" / live product) */
  link?: string
  linkLabel?: string
  /** links revealed on card hover */
  github?: string
  website?: string
}

export type CaseStatus = 'Coming Soon' | 'Drafting' | 'Published'

export interface CaseStudy {
  id: string
  type: string
  /** filter category this entry belongs to */
  category: CaseFilterId
  title: string
  description: string
  keyLearning?: string
  tags: string[]
  status: CaseStatus
  readingTime: string
  /** miniature visual style for the card */
  motif: 'tree' | 'funnel' | 'workflow' | 'notes' | 'teardown'
}

export type CaseFilterId =
  | 'all'
  | 'case-studies'
  | 'teardowns'
  | 'ai-automation'
  | 'growth'
  | 'notes'

export interface Experience {
  id: string
  company: string
  role: string
  dates: string
  headline: string
  outcomes: string[]
}

export interface SkillGroup {
  id: string
  label: string
  blurb: string
  skills: string[]
}

/* ------------------------------------------------------------------ */
/* Profile & navigation                                                */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Rohan Kumar Pillay',
  shortName: 'Rohan Pillay',
  wordmark: 'Rohan Pillay',
  role: 'Product-minded AI builder',
  statusLabel: 'Open to Product / Solutions / FDE roles',
  email: 'rpillay@umass.edu',
  linkedin: 'https://www.linkedin.com/in/rohan-pillay/',
  github: 'https://github.com/pillayroh',
  zoom: 'https://scheduler.zoom.us/rohan-kumar-rajendra-pillay',
  resumeUrl: '#',
  flowIntelligenceUrl:
    'https://open-vsx.org/extension/flow-intelligence/flow-intelligence/reviews',
  // Your `id` from umaring/members.json (UMass Amherst Web Ring).
  // Update this to match the exact id you submitted in the PR.
  webringId: 'rohan-pillay',
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: 'Builder / CS Grad / Product Thinker',
  name: 'Rohan Kumar Pillay',
  description:
    'I build AI products that turn messy customer workflows into reliable systems - from discovery and prototyping to deployment and measurable impact. I like working close to users and shipping things people actually trust.',
}

export const rolesSeeking = [
  'Associate Product Manager',
  'Product',
  'Solutions Engineer',
  'Forward Deployed Engineer',
  'GTM Engineer',
  'AI Software Engineer',
]

/** Shown once as an intro splash when the site first loads. */
export const introGreeting = 'Oh, Hey There'

export const heroWorkflowNodes = [
  'Customer Problem',
  'Research',
  'Prototype',
  'Deploy',
  'Learn',
  'Scale',
] as const

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  {
    id: 'flow-intelligence',
    kind: 'product',
    title: 'Flow Intelligence',
    subtitle: 'Measuring developer flow and human-AI collaboration, privately',
    category: 'Developer Tools / AI Research Instrument',
    problem:
      'AI coding assistants changed how software gets written, but output metrics like lines and commits poorly capture a developer\u2019s flow state or the quality of the human-AI partnership.',
    userContext:
      'Developers using AI coding tools (Cursor, Claude Code, Copilot) and researchers who want to study flow without compromising privacy.',
    built:
      'Built and deployed an editor extension - published to Open VSX and the VS Code Marketplace - plus a Supabase backend that captures behavioral and AI-interaction metadata and brief in-editor flow check-ins, and never touches code, prompts, or file contents.',
    approach: [
      'Framed two research questions: can flow be modeled from passive signals, and how does human-AI collaboration relate to flow?',
      'Designed a "metadata, never content" telemetry model with independent server-side enforcement at the trust boundary',
      'Made it anonymous by construction, consent-gated, and one-click withdrawable',
      'Combined measured AI attribution (Cursor / Claude Code hooks) with behavioral estimates elsewhere',
      'Shipped a researcher dashboard for aggregate analysis',
    ],
    impact: [
      { label: 'Organic installs', value: '2,500+' },
      { label: 'Status', value: 'Built & deployed' },
      { label: 'Content collected', value: 'None by design' },
    ],
    tags: [
      'Developer Tools',
      'AI Research',
      'Privacy by Design',
      'Telemetry',
      'Product Iteration',
    ],
    productLens:
      'How do we measure developer flow without ever touching code, prompts, or content?',
    visual: 'flow',
    link: 'https://open-vsx.org/extension/flow-intelligence/flow-intelligence/reviews',
    linkLabel: 'View on Open VSX',
    github: 'https://github.com/pillayroh/flow-intelligence',
    website:
      'https://open-vsx.org/extension/flow-intelligence/flow-intelligence/reviews',
  },
  {
    id: 'ec2er',
    kind: 'project',
    title: 'EC2ER',
    subtitle: 'From emotion classification to emotional reasoning in LLMs',
    category: 'Applied AI / LLM Research',
    problem:
      'LLMs can classify emotions but struggle to reason about complex, nuanced emotional context in a structured, reliable way.',
    userContext:
      'Researchers and product teams that need models to reason about emotional context, not just predict a label.',
    built:
      'Generated EmoBench-style training data with a multi-agent (therapist-client-supervisor) dialogue pipeline, then fine-tuned four open-source LLMs (Llama 3.1 8B, Mistral 7B, Qwen2.5 7B, Gemma 7B) with LoRA and evaluated on EmoBench.',
    approach: [
      'Started from a clear model capability gap on EmoBench',
      'Designed two synthetic-data pipelines: a multi-agent dialogue system and a category-aware single-conversation generator',
      'Fine-tuned with parameter-efficient LoRA across four base models',
      'Evaluated on EmoBench Emotional Understanding and Application tasks',
    ],
    impact: [
      { label: 'Llama-3.1-8B (EA)', value: '+365%' },
      { label: 'Llama-3.1-8B (EU)', value: '+438%' },
      { label: 'Published', value: 'arXiv 2601.01407' },
    ],
    tags: [
      'Applied AI',
      'LLM Fine-Tuning',
      'LoRA / PEFT',
      'Multi-Agent Systems',
      'Synthetic Data',
      'EmoBench',
    ],
    productLens:
      'How do we tell whether a model understands emotion rather than just predicting a label?',
    visual: 'reasoning',
    link: 'https://arxiv.org/abs/2601.01407',
    linkLabel: 'Read the paper (arXiv)',
    github: 'https://github.com/pillayroh/EC2ER',
  },
  {
    id: 'mozart',
    kind: 'project',
    title: 'Mozart',
    subtitle: 'Does music change how developers code?',
    category: 'HCI Research / Experiment Platform',
    problem:
      'Music is everywhere in developers\u2019 workflows, but its effect on different kinds of programming work - debugging vs. implementation vs. creative coding - is poorly understood.',
    userContext:
      'Developers and HCI researchers studying how the work environment shapes programming cognition.',
    built:
      'Designed and built a custom Next.js study platform (hosted at mozart.moriware.com) that runs a within-subject experiment: in-browser Python and web-design tasks, music / no-music conditions, questionnaires, execution logs, task timing, and an admin dashboard.',
    approach: [
      'Built one integrated platform: questionnaires, code editor, execution, music playback, and logging in a single flow',
      'Ran a counterbalanced within-subject study across debugging, structured coding, and creative "vibe coding"',
      'Collected objective behavioral traces (edit churn, run counts, timing) plus Likert self-reports',
      'Analyzed music-by-task-type interactions with mixed-effects models',
    ],
    impact: [
      { label: 'Participants', value: '~16' },
      { label: 'Strongest signal', value: 'Creative work' },
      { label: 'Debug edit churn', value: '5x lower w/ music' },
    ],
    tags: [
      'HCI',
      'Experiment Design',
      'Next.js',
      'Behavioral Analytics',
      'Developer Productivity',
    ],
    productLens:
      'When does music help developers - and for which kind of work?',
    visual: 'music',
    link: 'https://mozart.moriware.com',
    linkLabel: 'Visit the study platform',
    website: 'https://mozart.moriware.com',
  },
]

/* ------------------------------------------------------------------ */
/* Case studies / Product thinking                                     */
/* ------------------------------------------------------------------ */

export const caseFilters: { id: CaseFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'teardowns', label: 'Product Teardowns' },
  { id: 'ai-automation', label: 'AI + Automation' },
  { id: 'growth', label: 'Growth' },
  { id: 'notes', label: 'Product Notes' },
]

export const caseStudies: CaseStudy[] = [
  {
    id: 'four-weeks-to-one',
    type: 'Case Study',
    category: 'case-studies',
    title:
      'From Four Weeks to One: Designing an Enterprise AI Automation Workflow',
    description:
      'A detailed breakdown of how I approached customer discovery, workflow mapping, stakeholder alignment, LLM-powered automation design, deployment, and iteration for an enterprise back-office process.',
    keyLearning:
      'Automation only creates value when users trust the workflow, understand exceptions, and can see what happens when things go wrong.',
    tags: [
      'Enterprise Automation',
      'Customer Discovery',
      'LLMs',
      'Workflow Design',
      'Deployment',
    ],
    status: 'Coming Soon',
    readingTime: '8 min read',
    motif: 'workflow',
  },
  {
    id: 'flow-intelligence-adoption',
    type: 'Product Case Study',
    category: 'growth',
    title:
      'Building Flow Intelligence: What 1,500 Organic Installs Taught Me About Developer Product Adoption',
    description:
      'A product story about identifying a developer pain point, building and launching a VS Code extension, earning adoption without paid acquisition, and designing privacy controls as part of the core product experience.',
    keyLearning:
      'Organic growth follows when a product solves a frequent pain point and reduces friction for the first user.',
    tags: ['Developer Tools', 'Product Growth', 'User Feedback', 'Privacy', 'AI'],
    status: 'Coming Soon',
    readingTime: '7 min read',
    motif: 'funnel',
  },
  {
    id: 'more-than-a-prompt',
    type: 'Product Note',
    category: 'ai-automation',
    title: 'Why AI Automation Needs More Than a Good Prompt',
    description:
      'A perspective on why enterprise AI products need workflow design, exception handling, governance, observability, human review, and reliable user experience - not just impressive model outputs.',
    tags: ['AI Product', 'Automation', 'Trust', 'Governance', 'UX'],
    status: 'Drafting',
    readingTime: '5 min read',
    motif: 'notes',
  },
  {
    id: 'feedback-to-decisions',
    type: 'Product Framework',
    category: 'notes',
    title: 'How I Think About Turning Customer Feedback Into Product Decisions',
    description:
      'A practical framework for converting customer requests, support issues, workflow breakdowns, and edge cases into prioritized product decisions.',
    tags: [
      'Product Management',
      'Customer Feedback',
      'Prioritization',
      'B2B SaaS',
    ],
    status: 'Coming Soon',
    readingTime: '6 min read',
    motif: 'tree',
  },
  {
    id: 'reliable-ai-teardown',
    type: 'Product Teardown',
    category: 'teardowns',
    title: 'Product Teardown: What Makes an AI Workflow Feel Reliable?',
    description:
      'An evolving series analyzing AI products through the lens of onboarding, workflow design, trust, feedback loops, error handling, governance, and measurable user value.',
    tags: ['Product Teardown', 'AI UX', 'Enterprise SaaS', 'Product Strategy'],
    status: 'Coming Soon',
    readingTime: '10 min read',
    motif: 'teardown',
  },
]

/* ------------------------------------------------------------------ */
/* My Thoughts page (writing / blog)                                   */
/* ------------------------------------------------------------------ */

export const thoughts = {
  eyebrow: 'MY THOUGHTS',
  heading: 'Writing about products, AI, and building things people trust.',
  supporting:
    'A running notebook of product decisions, customer problems, AI workflows, experiments, and the occasional teardown. Some are polished; some are working notes.',
}

export interface BlogPost {
  id: string
  title: string
  /** one or two sentences shown on the card */
  excerpt: string
  /** display date, e.g. "Nov 3, 2026" */
  date: string
  readingTime: string
  tags: string[]
  /** where the full post lives (opens in a new tab) */
  url: string
  /** platform label shown on the card, e.g. "Medium" */
  platform: string
  /** cover image URL (or a path under /public) */
  thumbnail: string
  thumbnailAlt: string
}

/** Newest first. Add a new object at the top to publish a post. */
export const blogPosts: BlogPost[] = [
  {
    id: 'linkedin-find-nearby',
    title:
      'LinkedIn Had the Answer to My Social Battery Problem. Then It Took It Away',
    excerpt:
      'LinkedIn once had "Find Nearby", a way to discover people around you at events. It was pulled during COVID and never came back. Here\'s why I think it deserves a second shot.',
    date: 'Nov 3, 2026',
    readingTime: '3 min read',
    tags: ['LinkedIn', 'Product Thinking', 'Networking'],
    url: 'https://medium.com/@rohankumarraj/linkedin-had-the-answer-to-my-social-battery-problem-then-it-took-it-away-61a7fe4ca013',
    platform: 'Medium',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/0*ytElzdWXF1a2ru3n',
    thumbnailAlt: 'Cover photo by Olena Kholina on Unsplash',
  },
]

/* ------------------------------------------------------------------ */
/* Product principles                                                  */
/* ------------------------------------------------------------------ */

export const principles: { title: string; support: string }[] = [
  {
    title: 'Start with the user workflow, not the technology',
    support: 'A great model cannot fix a poorly understood problem.',
  },
  {
    title: 'Understand the business outcome before defining the feature',
    support: 'A feature is only useful if it fits into how someone actually works.',
  },
  {
    title: 'Prototype quickly, but validate with real users',
    support: 'A deployment is not a product outcome until users adopt it.',
  },
  {
    title: 'Design for exceptions, trust, and adoption',
    support: 'Reliability is a user experience feature.',
  },
  {
    title: 'Treat customer feedback as product signal',
    support: 'User feedback becomes valuable when it changes a decision.',
  },
  {
    title: 'Measure outcomes, not just outputs',
    support: 'Metrics should reveal whether a customer is better off.',
  },
  {
    title: 'Communicate clearly across technical and non-technical teams',
    support: 'The best decision is worthless if the room does not understand it.',
  },
]

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  short:
    "I'm an MS Computer Science student at UMass Amherst working at the intersection of AI, data, automation, and product. I've deployed enterprise AI automation, built a developer tool that earned 1,500+ organic installs, and shipped production ML systems. I like understanding how a workflow breaks, turning ambiguity into a plan, and building solutions people trust. My goal is to build products that are technically thoughtful, commercially useful, and easy to adopt.",
  bio: [
    "I'm Rohan Kumar Pillay, an MS Computer Science student at UMass Amherst building at the intersection of AI, data, automation, and product. I enjoy working close to users - understanding how their workflows break, translating ambiguity into an executable plan, and shipping solutions that improve how work gets done.",
    'I have worked across enterprise AI automation, data science, customer-facing deployments, developer tools, and applied machine learning. My goal is to build products that are technically thoughtful, commercially useful, and easy for people to trust.',
  ],
  brings: [
    {
      title: 'Product Discovery',
      body: 'Customer conversations, requirements gathering, workflow mapping, problem framing',
    },
    {
      title: 'Product Execution',
      body: 'Prototyping, prioritization, iteration, deployment, measurable outcomes',
    },
    {
      title: 'AI and Data Systems',
      body: 'LLM applications, RAG, workflow automation, ML, analytics, backend systems',
    },
    {
      title: 'Customer & Stakeholder Communication',
      body: 'Demos, executive communication, technical documentation, user training, cross-functional collaboration',
    },
  ],
  currentFocus:
    'Building practical AI products that make complex enterprise workflows simpler, more reliable, and easier to operate.',
}

/* ------------------------------------------------------------------ */
/* Experience & education                                              */
/* ------------------------------------------------------------------ */

export const experiences: Experience[] = [
  {
    id: 'brane',
    company: 'Brane Enterprises',
    role: 'Forward Deployed Software Engineer',
    dates: 'August 2023 - May 2025',
    headline: 'Deployed AI automation for enterprise back-office workflows.',
    outcomes: [
      'Worked directly with three enterprise clients and more than 30 stakeholders to understand operational processes and build AI-powered workflow automations.',
      'Reduced process time from four weeks to one week.',
      'Partnered with product and engineering to turn live deployment feedback and production edge cases into workflow improvements.',
      'Presented complex AI systems to senior and C-level audiences.',
      'Delivered user training and documentation for more than 200 users.',
      'Converted all three enterprise clients into long-term production deployments.',
    ],
  },
  {
    id: 'abinbev',
    company: 'AB InBev',
    role: 'APM Intern',
    dates: 'July 2022 - December 2022',
    headline: 'Used data and automation to influence business decisions.',
    outcomes: [
      'Analyzed business process data across U.S. and European markets for 10+ brands.',
      'Identified a consumer-demand opportunity and delivered a recommendation that influenced a strategic business decision.',
      'Automated repetitive reporting workflows with Python and SQL, reducing manual reporting work by more than 50%.',
      'Presented findings to 50+ finance and operations stakeholders.',
    ],
  },
]

export const education = {
  university: 'University of Massachusetts Amherst',
  degree: 'Master of Science in Computer Science',
  graduation: 'Expected May 2027',
  focus: [
    'AI',
    'NLP',
    'Information Retrieval',
    'Software Engineering Theory',
    'Distributed Systems',
    'Product Management',
    'Data Science',
  ],
  note: 'Technical depth in AI and systems; product instinct built through customer-facing delivery.',
}

/* ------------------------------------------------------------------ */
/* Skills - "Product Builder Toolkit"                                  */
/* ------------------------------------------------------------------ */

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai',
    label: 'AI Products & Automation',
    blurb: 'Turning model capability into workflows people can rely on.',
    skills: [
      'Python',
      'LLM APIs',
      'Claude',
      'OpenAI',
      'Gemini',
      'LangChain',
      'LangGraph',
      'AutoGen',
      'Prompt Engineering',
      'MCP Servers',
      'RAG Pipelines',
      'Business Process Automation',
      'Workflow Design',
    ],
  },
  {
    id: 'data',
    label: 'Data & Backend',
    blurb: 'The systems that make products fast, reliable, and observable.',
    skills: [
      'FastAPI',
      'Flask',
      'REST APIs',
      'PostgreSQL',
      'MongoDB',
      'SQL',
      'Supabase',
    ],
  },
  {
    id: 'product',
    label: 'Product & Customer',
    blurb: 'Staying close to the people the product is actually for.',
    skills: [
      'Requirements Gathering',
      'Customer Discovery',
      'Stakeholder Demos',
      'User Training',
      'Technical Documentation',
      'Cross-Functional Collaboration',
      'Workflow Mapping',
      'Feedback Loops',
    ],
  },
  {
    id: 'delivery',
    label: 'Product Delivery',
    blurb: 'Shipping, tracking, and communicating the work.',
    skills: [
      'Git',
      'CI/CD',
      'JIRA',
      'Power BI',
      'React.js',
      'TypeScript',
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  eyebrow: "LET'S TALK",
  heading: 'Have something interesting to discuss?',
  supporting: "I'd Love to talk 'bout products, climbing, exploring or anything in general",
  availability:
    'Currently exploring Product, APM, Solutions Engineering, FDE, and GTM Engineering opportunities.',
}
