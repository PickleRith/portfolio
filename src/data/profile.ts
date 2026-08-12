/**
 * Single source of truth for every piece of personal content on the site.
 * Edit this file to update the portfolio. The components read from it.
 */

export const profile = {
	name: "Rithvik Gurajala",
	title: "Forward Deployed Engineer",
	location: "Atlanta, GA",
	locationNote: "Open to relocation",
	email: "rithvikgurajala@gmail.com",
	/** Shown on the intro card. Each entry renders as its own paragraph. */
	bio: [
		`I'm a Forward Deployed Engineer focused on turning ambiguous business problems into reliable
		technical solutions. I work across customers and engineering to translate requirements into
		production ready AI, data, API, and full stack applications.`,
		`I'm most interested in problems that need strong technical execution, fast iteration, and a
		clear account of the tradeoffs. The goal is work that holds up technically and is genuinely
		useful to the people using it.`,
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
		title: "Technical Implementations Analyst",
		institution: "Contract",
		dateRange: "Jan 2026 to Present",
		location: "United States",
		highlights: [
			"Built and maintained SQL data workflows across multiple customer source systems using joins, CTEs, stored procedures, schema standardization, and reconciliation checks, improving reporting efficiency by 10%.",
			"Mapped, cleaned, transformed, and validated inconsistent operational, financial, and compliance data using SQL and Tableau Prep before publishing reusable datasets for client stakeholders.",
			"Partnered with client and internal teams to investigate discrepancies, translate operational requirements into reporting logic, and communicate findings to technical and business audiences.",
			"Fulfilled ad hoc data requests and translated complex operational findings into clear dashboards and performance analyses.",
		],
	},
	{
		title: "Forward Deployed Engineer",
		institution: "Indiana University Bloomington",
		dateRange: "Dec 2024 to Dec 2025",
		location: "Bloomington, IN",
		highlights: [
			"Built and deployed a full stack Digital Humans learning platform for 500+ students, integrating an NVIDIA Omniverse interface, the Eleven Labs voice API, and a multimodal RAG service using ChromaDB and Gemini.",
			"Developed Python ingestion and retrieval pipelines for document cleaning, chunking, embeddings, metadata indexing, and content refresh.",
			"Benchmarked latency, retrieval quality, groundedness, and engagement to guide system improvements.",
			"Built Looker dashboards and automated KPI reporting so stakeholders could monitor adoption, investigate anomalies, and make product decisions grounded in the data.",
		],
	},
	{
		title: "Product Analytics Intern",
		institution: "PricewaterhouseCoopers (PwC)",
		dateRange: "Aug 2024 to Dec 2024",
		location: "United States",
		highlights: [
			"Gathered requirements through 15+ stakeholder interviews and translated ambiguous business needs into structured product requirements, evaluation criteria, and reporting workflows.",
			"Built a RAG based AI chatbot in Python, Flask, and LangChain, integrating the Claude API, REST endpoints, retrieval tuning, context management, and an evaluation harness scored against benchmarks. Estimated a 25% reduction in delays.",
			"Presented architecture, tradeoffs, and workflow design to 200+ practitioners at PwC's Emerging Technologies Conference.",
			"Helped write a white paper that supported an RFP submission to game studios.",
		],
	},
	{
		title: "Senior Analyst",
		institution: "Capgemini",
		dateRange: "Sep 2022 to May 2023",
		location: "India",
		highlights: [
			"Automated regression testing for Nokia's IoT platform using Selenium, validating workflows across a system supporting 1M+ connected devices and improving ticket resolution rates by 15%.",
			"Built repeatable QA and defect analysis workflows in Jira, investigated production issues, and documented reproducible failures.",
			"Partnered with client engineering teams to validate fixes in an Agile delivery model.",
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
		],
	},
	{
		title: "B.Tech, Electrical, Electronics and Communications Engineering",
		institution: "Jawaharlal Nehru Technological University, Hyderabad",
		dateRange: "2018 to 2022",
		location: "Hyderabad, India",
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
	/** Short glyph or abbreviation rendered on the card panel. */
	glyph: string;
};

export const projects: Project[] = [
	{
		title: "Rapid Dispatch",
		kind: "Voice AI dispatch platform",
		description: `The model talks to the caller. It doesn't decide anything. A separate rules engine
		sets priority from P0 to P3, records the reason code behind every call it makes, and runs again
		after each turn of the conversation. Public safety calls are blocked from scheduling at the API
		layer rather than in the prompt.`,
		tags: [
			"ElevenLabs Agents",
			"Twilio",
			"FastAPI",
			"PostgreSQL",
			"Redis",
		],
		href: "https://homeguard-rapid-dispatch.vercel.app/",
		label: "Visit Site",
		gradient: ["#1e3a5f", "#0f1b2d"],
		glyph: "P0",
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
		glyph: "DSO",
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
		glyph: "♪",
	},
	{
		title: "Soccer Analytics Pipeline",
		kind: "Full stack & data engineering",
		description: `Pulls in historical and live match events, moves them through Bronze, Silver, and
		Gold layers, and puts the results behind a nine page Streamlit app.`,
		tags: ["Python", "Polars", "DuckDB", "dbt", "Streamlit"],
		gradient: ["#1f3d34", "#0e1a17"],
		glyph: "⚽",
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
		glyph: "70%",
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
		recommendation: `A Tableau dashboard built around a clickable US map, showing how terms rank in each
		state, which ones gained ground over four weeks, and which swung hardest either way. On top of that,
		an ARIMA_PLUS model in BigQuery forecasting the top three terms per state six months out.`,
		metric: "80%",
		metricLabel:
			"of popular terms were Sports or Media and Entertainment (40.2% and 32.9%)",
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
	`Most of my work sits between a messy source system and someone who needs an answer out of it.
	In practice that means pipelines, retrieval services, and the APIs and dashboards on top of them.`,
	`I've shipped RAG systems on Gemini and Claude, voice agents on ElevenLabs and Twilio, and
	analytics on BigQuery, DuckDB, and dbt.`,
];
