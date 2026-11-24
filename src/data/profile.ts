/**
 * Single source of truth for every piece of personal content on the site.
 * Edit this file to update the portfolio. The components read from it.
 */

export const profile = {
	name: "Rithvik Gurajala",
	title: "Technology Consultant",
	location: "Atlanta, GA",
	locationNote: "Open to relocation",
	email: "rithvikgurajala@gmail.com",
	/** Shown on the intro card. Each entry renders as its own paragraph. */
	bio: [
		`I build software and data products for people who need clear answers from complicated systems.
		My work spans retail analytics, retrieval systems, APIs, and customer facing applications.`,
		`I like working close to users, measuring whether a system improves their work, and fixing the
		parts that do not.`,
	],
	/** Short line under the name in the contact card. */
	tagline: "Data, AI & Automation Engineering",
	/** Typed out on the intro card. */
	greeting: "Hello",
};

export const socials = [
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/rithvik-gurajala/",
		icon: "linkedin",
	},
	{
		label: "Email",
		href: `mailto:${profile.email}`,
		icon: "email",
	},
	// To add GitHub, drop in:
	// { label: "GitHub", href: "https://github.com/<username>", icon: "github" },
] as const;

export const navItems = [
	{ label: "Home", link: "/#home" },
	{ label: "Experience", link: "/#experience" },
	{ label: "Projects", link: "/#projects" },
	{ label: "Cases", link: "/#cases" },
	{ label: "Skills", link: "/#skills" },
	{ label: "Contact", link: "/#contact" },
];

export type Position = {
	title: string;
	institution?: string;
	dateRange: string;
	location: string;
	summary?: string;
	highlights?: string[];
};

export const experience: Position[] = [
	{
		title: "Data Analyst",
		institution: "Contract",
		dateRange: "Jan 2026 to Present",
		location: "United States",
		highlights: [
			"Owned weekly point of sale and inventory feeds for a major retailer, mapped retailer items to supplier SKUs, checked each load, and delivered Tableau dashboards to suppliers.",
			"Built data pipelines with Azure Data Factory, Snowflake, and dbt for more than 40 million rows across 8,000 stores. Store and item level anomaly checks flagged over 120 issues before client delivery.",
			"Combined source systems into a reporting layer with SQL, CTEs, stored procedures, and reconciliation checks, improving reporting efficiency by 10%.",
		],
	},
	{
		title: "Graduate Software Engineer",
		institution: "Indiana University Bloomington",
		dateRange: "Dec 2024 to Dec 2025",
		location: "Bloomington, IN",
		highlights: [
			"Built a Digital Humans learning platform for more than 500 students using LangChain, NVIDIA Omniverse, ElevenLabs, ChromaDB, and Gemini.",
			"Built Python ingestion and retrieval pipelines for more than 4,000 documents. On a 150 question benchmark, p95 retrieval time fell from 1.8 seconds to 640 milliseconds and grounded answers rose from 71% to 89%.",
			"Turned stakeholder feedback into product requirements and prioritized improvements to ingestion, retrieval, performance, and the student experience.",
		],
	},
	{
		title: "Software Engineering Intern",
		institution: "PricewaterhouseCoopers (PwC)",
		dateRange: "Aug 2024 to Dec 2024",
		location: "United States",
		highlights: [
			"Interviewed more than 15 stakeholders and turned their needs into product requirements, evaluation criteria, and reporting workflows.",
			"Built a retrieval based chatbot with Python, Flask, LangChain, Claude, and REST APIs. Benchmark testing estimated a 25% reduction in delays.",
			"Presented the architecture to more than 200 practitioners at PwC's Emerging Technologies Conference and coauthored a white paper for an RFP to AAA game studios.",
		],
	},
	{
		title: "Senior Analyst",
		institution: "Capgemini",
		dateRange: "Sep 2022 to May 2023",
		location: "India",
		highlights: [
			"Built integrations for Facebook Graph, Google Content, and Google Ads APIs so campaign and account management could run through one service.",
			"Added OAuth 2.0 sign up for storefronts such as Shopify and token based authentication between microservices.",
			"Built an invoice service that checked campaign costs and billing plans, resolving 10% of pricing discrepancies automatically.",
			"Shipped Fabric.js editor features for designing multiple ad creatives at once. Users created more than 23,000 creatives in two months.",
		],
	},
];

export const education: Position[] = [
	{
		title: "Master of Science, Information Systems",
		institution: "Indiana University, Kelley School of Business",
		dateRange: "Aug 2023 to Dec 2024",
		location: "Bloomington, IN",
		summary: "GPA: 3.7 / 4.0",
		highlights: [
			"Relevant coursework: Big Data Analysis, Cloud Computing, IT Architecture, Software Product Development, ERP Systems, IT Governance/Risk/Controls, IT Audit.",
			"Activities: AI and Data Analytics Club, case competitions, MSIS Student Ambassador, Buddy Program.",
		],
	},
	{
		title: "Bachelor of Technology, Electronics and Computer Science Engineering",
		institution: "Jawaharlal Nehru Technological University, Hyderabad",
		dateRange: "Jul 2018 to Jul 2022",
		location: "Hyderabad, India",
		summary: "GPA: 3.72 / 4.0",
		highlights: [
			"Relevant coursework: Digital Logic Design, Digital Signal Processing, Data Structures and Algorithms, Python Programming, Statistics, Multivariate Calculus, Machine Learning, Big Data Analytics, Cloud Computing.",
			"Activities and societies: Soccer team, Literature club, Newspaper editorial team, TEDx.",
		],
	},
];

export type Project = {
	title: string;
	kind: string;
	description: string;
	tags: string[];
	href?: string;
	label?: string;
	/** Two hex colors used to generate the card's visual panel. */
	gradient: [string, string];
	/** Screenshot or rendered project output shown on the card panel. */
	image: string;
	imageAlt: string;
	imageFit?: "cover" | "contain";
};

export const projects: Project[] = [
	{
		title: "Rapid Dispatch",
		kind: "Voice AI dispatch platform",
		description: `Built a voice AI platform for emergency plumbing calls on a live phone line.
		It uses ElevenLabs Agents, Twilio, LiveKit, FastAPI, PostgreSQL, and Redis to assess urgency,
		read safety steps, and book technicians from a schedule protected against conflicting updates.`,
		tags: [
			"ElevenLabs Agents",
			"Twilio",
			"LiveKit",
			"FastAPI",
			"PostgreSQL",
			"Redis",
		],
		href: "https://homeguard-rapid-dispatch.vercel.app/",
		label: "Visit Site",
		gradient: ["#1e3a5f", "#0f1b2d"],
		image: "/images/projects/rapid-dispatch.png",
		imageAlt: "Rapid Dispatch live site overview",
	},
	{
		title: "BatteryVision",
		kind: "Battery defect detection",
		description: `Built a PyTorch pipeline using ResNet18 and U Net to find defects in battery
		electrode coatings. Pinhole detection F1 rose from 0.63 with an OpenCV baseline to 0.88.
		Sending 20% of images for human review caught 58% of model errors.`,
		tags: ["PyTorch", "Computer Vision", "ResNet18", "U Net"],
		href: "https://batteryvision.streamlit.app/",
		label: "Visit Site",
		gradient: ["#283b5c", "#101827"],
		image: "/images/projects/batteryvision.png",
		imageAlt: "BatteryVision image inspection interface",
	},
	{
		title: "AR Automation Prototype",
		kind: "Accounts receivable workflow automation",
		description: `Runs the whole accounts receivable cycle. Invoices get due dates from their terms.
		Overdue accounts climb through four escalating dunning notices, and the last one puts the customer
		on credit hold. Payments are matched by reference first, then by exact amount, then oldest invoice
		first, and anything left over is flagged as unapplied cash. The dashboard tracks DSO, aging
		buckets, and a running log of every automated action. Plain Node, no dependencies.`,
		tags: ["Node.js", "Vanilla JS", "REST API", "Workflow Automation"],
		href: "https://github.com/PickleRith/ar-automation-prototype",
		label: "View Repository",
		gradient: ["#123a3a", "#08191a"],
		image: "/images/projects/ar-automation.png",
		imageAlt: "AR Flow dashboard showing receivables and aging",
	},
	{
		title: "Song Recommendation Engine",
		kind: "NLP topic modeling & recommendation engine",
		description: `Scrapes lyrics, cleans them up with lemmatization that respects part of speech, then
		fits an LDA topic model to work out what each song is actually about. Every song ends up as a
		vector of topic weights, so cosine similarity and a heap sort can pull the nearest matches for any
		track in the corpus. Built and tested on a four album discography.`,
		tags: ["Python", "scikit-learn", "LDA", "NLTK", "Cosine Similarity"],
		href: "https://github.com/PickleRith/travis-scott-song-analyzer",
		label: "View Repository",
		gradient: ["#3a2352", "#160f1f"],
		image: "/images/projects/song-recommendation.png",
		imageAlt: "Song analysis chart showing topic prevalence across albums",
		imageFit: "contain",
	},
	{
		title: "Soccer Analytics Pipeline",
		kind: "Full stack & data engineering",
		description: `Pulls in historical and live match events, moves them through Bronze, Silver, and
		Gold layers, and puts the results behind a nine page Streamlit app.`,
		tags: ["Python", "Polars", "DuckDB", "dbt", "Streamlit"],
		href: "https://github.com/PickleRith/soccer-analytics-pipeline",
		label: "View Repository",
		gradient: ["#1f3d34", "#0e1a17"],
		image: "/images/projects/soccer-analytics.png",
		imageAlt:
			"Soccer Analytics Pipeline architecture in the project README",
	},
	{
		title: "DoorDash Cincinnati Analysis",
		kind: "Independent data analytics project",
		description: `Dug into DoorDash's Cincinnati delivery data to see how merchants, dashers, and
		customers were actually performing. DashMart turned out to hold roughly 70% of the market, and
		every extra minute of CLAT raised the odds of a late order by about 12.5%.`,
		tags: ["Python", "Pandas", "Statistical Analysis"],
		// TODO: add a public link (GitHub repo or write-up) if you want this clickable.
		gradient: ["#4a2c1a", "#1c110a"],
		image: "/images/projects/doordash-analysis.png",
		imageAlt: "DoorDash Cincinnati case study charts on delivery lateness",
	},
];

export type CaseStudy = {
	/** Competition or course the case was run under. */
	competition: string;
	/** The client or subject organization. */
	client: string;
	date: string;
	/** The question the team was asked to answer. */
	challenge: string;
	/** What the team recommended. */
	recommendation: string;
	/** Headline number, shown large on the card. */
	metric: string;
	metricLabel: string;
	tags: string[];
	/** Optional placement/prize, rendered as a badge on the card. */
	award?: string;
};

export const caseCompetitions: CaseStudy[] = [
	{
		competition: "Toyota Material Handling North America",
		client: "Integrating Toyota Heavy Duty (formerly Hoist)",
		date: "Dec 2023",
		award: "1st Place · $5,000 prize",
		challenge:
			"TMHNA builds one in three forklifts in North America. It had just bought Hoist, rebranded as Toyota Heavy Duty, and had to fold a siloed subsidiary with far lower technical maturity into a digital transformation already underway.",
		recommendation: `Three pillars. Bring Toyota Production System practices, Jidoka and Just In Time,
		into THD's factory and bayside assembly. Move THD off SAP ECC and its scattered Access, SQL, and
		Dynamics systems onto SAP S/4HANA RISE in three phases, building on the Project REACH work already
		done. Then put quoting, equipment, and account data for every TMHNA brand behind one customer
		portal.`,
		metric: "38%",
		metricLabel:
			"projected ROI over 18 months, on $5.33M of benefits against $3.87M of cost",
		tags: [
			"SAP S/4HANA",
			"Digital Transformation",
			"M&A Integration",
			"Financial Modeling",
		],
	},
	{
		competition: "IBA Data Jam",
		client: "Google Trends dataset",
		date: "Spring 2024",
		challenge:
			"Turn the Google Trends BigQuery dataset into dashboards that tell a business something it can act on.",
		recommendation: `Queried 300 million Google Trends rows in BigQuery and built Tableau dashboards
		that showed regional demand patterns. The team identified a potential revenue opportunity for
		small businesses and used ARIMA_PLUS to forecast leading search terms by state.`,
		metric: "20%",
		metricLabel: "projected revenue opportunity for small businesses",
		tags: ["BigQuery SQL", "Tableau", "ARIMA_PLUS", "Time series"],
	},
	{
		competition: "Grant Thornton IDEA",
		client: "WiseAcquire (electronics & appliances retailer)",
		date: "2023",
		challenge:
			"Position an electronics retailer for Black Friday using generative AI, without creating a data privacy problem in the process.",
		recommendation: `A shopping assistant running RAG over the product catalog and customer reviews.
		LangChain handles context, prompts are structured to draw out what the shopper actually needs, and
		guardrails keep the model answering from retrieved data instead of inventing specifications. The
		same setup was extended to post sale sentiment analysis and automated ad testing.`,
		metric: "27.9%",
		metricLabel:
			"projected ROI, ranging from 11.9% to 59.9%, on $114M of cost",
		tags: ["Generative AI", "RAG", "LangChain", "ROI Modeling"],
	},
	{
		competition: "EY Case Competition",
		client: "LongLife Pharma",
		date: "Aug 2023",
		challenge:
			"A top three drug manufacturer was watching antigen sales fall after the pandemic while newer competitors won business by being open about pricing. What should it do differently?",
		recommendation: `Project North Star. A new analytics wing feeding a digital marketplace and CRM. A
		hybrid operating model that keeps government accounts in person, since they drive 60% of revenue,
		and moves direct sales online. And one database pulling together vendor, hospital, and website data
		so demand could actually be forecast.`,
		metric: "1.31",
		metricLabel:
			"cost to benefit ratio, on $260M of cost against $8B of projected revenue lift",
		tags: [
			"Data Strategy",
			"CRM",
			"Demand Forecasting",
			"Financial Modeling",
		],
	},
	{
		competition: "IT Strategy, Kelley Core",
		client: "Volkswagen of America",
		date: "Oct 2023",
		challenge:
			"Line up a $16M IT budget with the business strategy, after an earlier attempt to consolidate the IT department had failed.",
		recommendation: `Every project has to clear three checks before it gets funded: does it meet the
		SIB, ROI, OCI, and legal criteria, does it serve an enterprise goal, and is there budget left this
		cycle. Anything that fails the third check waits for the next one. Running alongside it, an 18 month
		program across People, Culture, and Governance using the MEA01 framework and the Knoster change
		model.`,
		metric: "$16M",
		metricLabel:
			"budget allocated across People, Governance, and Culture workstreams",
		tags: ["IT Governance", "Prioritization", "Change Management"],
	},
	{
		competition: "Business Technology Strategy",
		client: "FC Barcelona",
		date: "Oct 2023",
		challenge:
			"The club was collecting plenty of data and refining almost none of it, spread across departments that couldn't talk to each other on systems that didn't match.",
		recommendation: `Integrate horizontally onto a single ERP, stand up an AI department in house, and
		centralize the dashboards. That breaks the silos, makes on pitch questions like set piece
		performance answerable, and opens the door to personalizing what fans see. All of it wrapped in a
		change plan built around the people who would have to use it.`,
		metric: "3",
		metricLabel:
			"new departments proposed to clarify data ownership and roles",
		tags: ["ERP", "Data Strategy", "AI/ML", "Change Management"],
	},
];

export type SkillGroup = {
	label: string;
	items: string[];
};

export const skills: SkillGroup[] = [
	{
		label: "Programming & Full Stack",
		items: [
			"Python",
			"JavaScript",
			"TypeScript",
			"SQL",
			"React",
			"GraphQL",
			"Flask",
			"HTML/CSS",
			"Pandas",
			"NumPy",
		],
	},
	{
		label: "AI / ML",
		items: [
			"PyTorch",
			"scikit-learn",
			"Neural networks",
			"LLM APIs",
			"RAG",
			"Finetuning",
			"Model evaluation",
			"Prompt & context design",
		],
	},
	{
		label: "Cloud & Deployment",
		items: [
			"AWS Lambda",
			"API Gateway",
			"S3",
			"ECS Fargate",
			"Bedrock",
			"BigQuery",
			"Azure Data Factory",
			"Azure DevOps",
			"Docker",
			"Git",
			"CI/CD",
			"Microservices",
		],
	},
	{
		label: "Data & Databases",
		items: [
			"PostgreSQL",
			"Snowflake",
			"MySQL",
			"MongoDB",
			"ChromaDB",
			"Redis",
			"ETL/ELT",
			"dbt",
			"Tableau",
			"Data modeling",
		],
	},
];

/** Rendered as the summary paragraph beside the skills grid. */
export const skillsSummary = [
	`I have built pipelines for retail sales data, retrieval systems for large document sets,
	and API services for advertising and billing.`,
	`My recent work uses Snowflake, dbt, Tableau, LangChain, Gemini, Claude, and voice tools
	to turn those systems into products people can use.`,
];
