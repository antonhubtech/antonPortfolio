import {
  Bot,
  CalendarClock,
  CheckCheck,
  ClipboardList,
  Columns3,
  Database,
  FileSpreadsheet,
  FileText,
  Headset,
  LayoutGrid,
  ListChecks,
  Megaphone,
  MessagesSquare,
  NotebookPen,
  Palette,
  Search,
  Share2,
  ShoppingBag,
  SquareKanban,
  type LucideIcon,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────
   EDIT ME — everything personal lives in this file.
   Anything in [BRACKETS] is a placeholder to replace with your own.
   ──────────────────────────────────────────────────────────────── */

export const profile = {
  name: 'Anton',
  monogram: 'VA', // shown in the logo and preloader
  title: 'Freelance Virtual Assistant',
  shortBio: '[YOUR SHORT BIO]',
  email: 'argosoanthony@gmail.com',
  location: 'Bulacan Philippines',
  availability: 'Available for New Projects',
  photoLabel: '[YOUR PROFILE PHOTO]',
  // Optional: put a file in /public (e.g. /public/me.jpg) and set photoUrl: './me.jpg'
  photoUrl: '' as string,
  // Contact form: paste a form-service endpoint here (e.g. a Formspree URL, "https://formspree.io/f/xxxx").
  // While empty, the form validates but does NOT send anything and says so honestly.
  formEndpoint: '' as string,
  responseTime: '[YOUR RESPONSE TIME]',
  socials: [
    { id: 'linkedin', label: 'LinkedIn', href: '' }, // [YOUR SOCIAL MEDIA LINKS]
    { id: 'instagram', label: 'Instagram', href: '' },
    { id: 'facebook', label: 'Facebook', href: '' },
    { id: 'x', label: 'X', href: '' },
  ],
};

/** Figures are placeholders until real numbers are provided. */
export const stats = [
  { value: 100, suffix: '+', label: 'Tasks handled weekly', note: 'placeholder' },
  { value: 24, suffix: 'h', label: 'Typical response window', note: 'placeholder' },
  { value: 10, suffix: '', label: 'Tools in my daily stack', note: '' },
  { value: 9, suffix: '', label: 'Support areas covered', note: '' },
];

/* ───────────── Services ───────────── */

export interface Service {
  id: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
  detail: string;
  covers: string[];
  tools: string[];
}

export const services: Service[] = [
  {
    id: 'admin',
    title: 'Administrative Support',
    icon: ClipboardList,
    blurb: 'The everyday admin that quietly eats your week — handled and filed.',
    detail:
      'Recurring paperwork, scheduling, travel details, document prep and follow-ups, done on a reliable rhythm so nothing slips through the cracks.',
    covers: ['Document preparation and formatting', 'Travel and meeting logistics', 'Reminders and follow-up tracking', 'Filing systems and SOP drafts'],
    tools: ['Google Workspace', 'Microsoft Office', 'Notion'],
  },
  {
    id: 'inbox',
    title: 'Email & Calendar Management',
    icon: CalendarClock,
    blurb: 'A clear inbox and a calendar that protects your focus time.',
    detail:
      'Triage, drafting and organizing your inbox, plus scheduling that respects time zones and priorities, so you open your day knowing exactly what matters.',
    covers: ['Inbox triage and labeling', 'Draft replies for your approval', 'Scheduling and rescheduling', 'Time-zone aware booking'],
    tools: ['Google Workspace', 'Slack', 'Microsoft Office'],
  },
  {
    id: 'data',
    title: 'Data Entry & Organization',
    icon: Database,
    blurb: 'Clean, consistent, searchable data you can actually trust.',
    detail:
      'Accurate entry, clean-up and structuring of spreadsheets, CRMs and databases, with simple conventions that keep everything tidy as you grow.',
    covers: ['Spreadsheet and CRM entry', 'De-duplication and clean-up', 'Consistent naming and tagging', 'Simple reports and summaries'],
    tools: ['Google Workspace', 'Microsoft Office', 'Notion'],
  },
  {
    id: 'support',
    title: 'Customer Support',
    icon: Headset,
    blurb: 'Friendly, on-brand replies that keep customers feeling looked after.',
    detail:
      'Handling inquiries through email, chat and social inboxes using your tone and policies, and escalating the things that genuinely need you.',
    covers: ['Inbox and chat responses', 'Reusable reply templates', 'Order and booking inquiries', 'Escalation notes for you'],
    tools: ['Meta Business Suite', 'Slack', 'Google Workspace'],
  },
  {
    id: 'social',
    title: 'Social Media Management',
    icon: Share2,
    blurb: 'Consistent posting and engagement without it becoming your second job.',
    detail:
      'Content calendars, scheduling, community replies and light graphics so your channels stay active and recognizably yours.',
    covers: ['Content calendars', 'Scheduling and publishing', 'Comment and DM engagement', 'Simple branded graphics'],
    tools: ['Meta Business Suite', 'Canva', 'ChatGPT'],
  },
  {
    id: 'content',
    title: 'Content Management',
    icon: FileText,
    blurb: 'Drafts, edits and updates kept organized from idea to published.',
    detail:
      'Formatting and publishing posts, updating pages, organizing assets and keeping a tidy content pipeline so ideas never get lost.',
    covers: ['Blog and page updates', 'Asset libraries', 'Editing and proofreading', 'Content pipeline tracking'],
    tools: ['Notion', 'Canva', 'ChatGPT'],
  },
  {
    id: 'research',
    title: 'Research & Lead Generation',
    icon: Search,
    blurb: 'Well-sourced research and qualified prospect lists, delivered ready to use.',
    detail:
      'Market, competitor and vendor research, plus prospect lists built to your criteria and organized so your outreach can start immediately.',
    covers: ['Competitor and market research', 'Prospect list building', 'Vendor comparisons', 'Short summary briefs'],
    tools: ['Google Workspace', 'ChatGPT', 'Notion'],
  },
  {
    id: 'pm',
    title: 'Project Management',
    icon: SquareKanban,
    blurb: 'Tasks, owners and deadlines tracked so projects keep moving.',
    detail:
      'Setting up boards, chasing updates, keeping timelines visible and flagging risks early, so you always know where things stand.',
    covers: ['Board and workflow setup', 'Deadline and status tracking', 'Meeting notes and action items', 'Weekly progress updates'],
    tools: ['ClickUp', 'Asana', 'Trello'],
  },
  {
    id: 'ecom',
    title: 'E-commerce Support',
    icon: ShoppingBag,
    blurb: 'Listings, orders and customer messages kept running smoothly.',
    detail:
      'Product listing upkeep, order follow-through, inventory sheets and customer communication to keep your store tidy and your buyers happy.',
    covers: ['Product listing updates', 'Order and inventory tracking', 'Customer messages', 'Basic store reporting'],
    tools: ['Google Workspace', 'Meta Business Suite', 'Canva'],
  },
];

/** Short pitch used on the Home "How I help" block */
export const pillars = [
  { title: 'Organize', text: 'Inboxes, calendars, files and data brought into one calm, searchable system.' },
  { title: 'Execute', text: 'Recurring tasks and projects handled on schedule, with updates before you have to ask.' },
  { title: 'Grow', text: 'Time freed for the work only you can do — selling, creating, deciding.' },
];

export const process = [
  { step: '01', title: 'Discover', text: 'A short call to learn your business, your tools and where your time is leaking.' },
  { step: '02', title: 'Plan', text: 'We agree on priorities, communication rhythm and what “done” looks like.' },
  { step: '03', title: 'Execute', text: 'I work through the list, keep things documented and flag anything unclear early.' },
  { step: '04', title: 'Review', text: 'Regular check-ins to refine the workflow and take on more as trust grows.' },
];

/* ───────────── Portfolio (all placeholders) ───────────── */

export type Category = 'Admin' | 'Social Media' | 'Operations' | 'E-commerce' | 'Research';
export const categories: ('All' | Category)[] = ['All', 'Admin', 'Social Media', 'Operations', 'E-commerce', 'Research'];

export interface Project {
  id: string;
  title: string;
  category: Category;
  summary: string;
  tools: string[];
  scope: string[];
  deliverables: string[];
  hue: [number, number]; // thumbnail gradient hues
  motif: 'rings' | 'bars' | 'grid' | 'wave' | 'dots' | 'nodes';
}

export const projects: Project[] = [
  {
    id: 'inbox-reset',
    title: 'Inbox & Calendar Reset',
    category: 'Admin',
    summary: '[PROJECT DESCRIPTION] A sample layout for showing how you organized a busy founder’s inbox and schedule.',
    tools: ['Google Workspace', 'Slack'],
    scope: ['[What the client needed]', '[What you set up: labels, rules, templates]', '[How the schedule was structured]'],
    deliverables: ['[Deliverable 1]', '[Deliverable 2]'],
    hue: [205, 250],
    motif: 'rings',
  },
  {
    id: 'content-calendar',
    title: 'Monthly Content Calendar',
    category: 'Social Media',
    summary: '[PROJECT DESCRIPTION] A sample slot for a planning-and-scheduling workflow across a few channels.',
    tools: ['Canva', 'Meta Business Suite', 'ChatGPT'],
    scope: ['[Channels covered]', '[How ideas were planned and approved]', '[Posting rhythm]'],
    deliverables: ['[Calendar template]', '[Sample graphics]'],
    hue: [265, 215],
    motif: 'bars',
  },
  {
    id: 'project-board',
    title: 'Project Board Setup',
    category: 'Operations',
    summary: '[PROJECT DESCRIPTION] A sample slot for building a task board with owners, statuses and deadlines.',
    tools: ['ClickUp', 'Asana', 'Slack'],
    scope: ['[Workflow stages]', '[Automations or templates]', '[Reporting cadence]'],
    deliverables: ['[Board template]', '[Weekly update format]'],
    hue: [190, 235],
    motif: 'grid',
  },
  {
    id: 'store-ops',
    title: 'Online Store Order Support',
    category: 'E-commerce',
    summary: '[PROJECT DESCRIPTION] A sample slot for listing upkeep, order follow-up and customer messaging.',
    tools: ['Google Workspace', 'Meta Business Suite'],
    scope: ['[Listing updates]', '[Order tracking process]', '[Customer message templates]'],
    deliverables: ['[Tracking sheet]', '[Reply templates]'],
    hue: [280, 220],
    motif: 'wave',
  },
  {
    id: 'lead-list',
    title: 'Prospect List Build',
    category: 'Research',
    summary: '[PROJECT DESCRIPTION] A sample slot for researching and organizing a targeted prospect list.',
    tools: ['Google Workspace', 'ChatGPT', 'Notion'],
    scope: ['[Target criteria]', '[Research method]', '[How data was verified and organized]'],
    deliverables: ['[Prospect spreadsheet]', '[Summary brief]'],
    hue: [175, 225],
    motif: 'dots',
  },
  {
    id: 'sop-library',
    title: 'SOP & Knowledge Library',
    category: 'Operations',
    summary: '[PROJECT DESCRIPTION] A sample slot for documenting repeatable processes in a shared workspace.',
    tools: ['Notion', 'Google Workspace'],
    scope: ['[Processes documented]', '[Structure and naming]', '[Hand-off to the team]'],
    deliverables: ['[SOP pages]', '[Index and templates]'],
    hue: [245, 200],
    motif: 'nodes',
  },
];

/* ───────────── Tools ───────────── */

export type ToolGroup = 'Plan' | 'Communicate' | 'Create' | 'Assist';
export interface Tool {
  id: string;
  name: string;
  icon: LucideIcon;
  group: ToolGroup;
  use: string;
}

export const toolGroups: ToolGroup[] = ['Plan', 'Communicate', 'Create', 'Assist'];

export const tools: Tool[] = [
  { id: 'notion', name: 'Notion', icon: NotebookPen, group: 'Plan', use: 'Wikis, SOPs, content pipelines and shared client workspaces.' },
  { id: 'trello', name: 'Trello', icon: Columns3, group: 'Plan', use: 'Simple visual boards for tasks, approvals and content stages.' },
  { id: 'asana', name: 'Asana', icon: ListChecks, group: 'Plan', use: 'Projects with owners, due dates and dependencies.' },
  { id: 'clickup', name: 'ClickUp', icon: CheckCheck, group: 'Plan', use: 'All-in-one task, doc and goal tracking for busy teams.' },
  { id: 'slack', name: 'Slack', icon: MessagesSquare, group: 'Communicate', use: 'Day-to-day updates, quick questions and team coordination.' },
  { id: 'google', name: 'Google Workspace', icon: LayoutGrid, group: 'Communicate', use: 'Gmail, Calendar, Drive, Docs and Sheets, the daily engine room.' },
  { id: 'office', name: 'Microsoft Office', icon: FileSpreadsheet, group: 'Communicate', use: 'Word, Excel, PowerPoint and Outlook for client-standard documents.' },
  { id: 'canva', name: 'Canva', icon: Palette, group: 'Create', use: 'On-brand social graphics, presentations and simple layouts.' },
  { id: 'meta', name: 'Meta Business Suite', icon: Megaphone, group: 'Create', use: 'Scheduling posts and managing Facebook and Instagram inboxes.' },
  { id: 'chatgpt', name: 'ChatGPT', icon: Bot, group: 'Assist', use: 'Drafting, summarizing and research support, always reviewed by me.' },
];

export const workflow = [
  { title: 'Capture', text: 'Requests arrive in one place — email, Slack or a shared board.' },
  { title: 'Organize', text: 'Everything is prioritized, tagged and given an owner and a date.' },
  { title: 'Deliver', text: 'Work is completed and documented using the right tool for the job.' },
  { title: 'Report', text: 'Short, regular updates so you always know where things stand.' },
];

/* ───────────── About ───────────── */

export const about = {
  story: [
    'Behind every confident business owner is a system that keeps the small things from becoming big problems. That system is the part of the business I love building.',
    '[YOUR BACKGROUND — a sentence or two on how you got into virtual assistance and what you did before.]',
    'I care about the unglamorous details: the follow-up that goes out on time, the spreadsheet that stays tidy, the calendar that makes sense.',
  ],
  approach: [
    { title: 'Understand first', text: 'I learn how you work before changing anything, so the systems fit you rather than the other way around.' },
    { title: 'Communicate clearly', text: 'Short, regular updates and honest flags when something is unclear or running late.' },
    { title: 'Document everything', text: 'Processes are written down so work is repeatable and nothing lives only in my head.' },
    { title: 'Protect your trust', text: 'Client information is treated as confidential, and access is limited to what the job needs.' },
  ],
  values: [
    { title: 'Organized', text: 'Clear systems, tidy files, nothing falling through the cracks.' },
    { title: 'Dependable', text: 'Deadlines treated as promises, with early notice if plans change.' },
    { title: 'Proactive', text: 'Spotting the next problem before it lands on your desk.' },
    { title: 'Detail-oriented', text: 'Careful checking so the small things are right the first time.' },
    { title: 'Resourceful', text: 'If I do not know how, I find out — and then document it.' },
  ],
  mission:
    'To give business owners their time back, so they can spend it on the work that only they can do.',
};

/* ───────────── Testimonials (placeholders — do not invent real ones) ───────────── */

export const testimonials = [
  {
    quote: '[CLIENT TESTIMONIAL — paste a real quote here once you have permission to share it.]',
    name: '[CLIENT NAME]',
    role: '[ROLE / COMPANY]',
  },
  {
    quote: '[CLIENT TESTIMONIAL — a sentence on the result or experience of working together.]',
    name: '[CLIENT NAME]',
    role: '[ROLE / COMPANY]',
  },
  {
    quote: '[CLIENT TESTIMONIAL — what changed for them, in their own words.]',
    name: '[CLIENT NAME]',
    role: '[ROLE / COMPANY]',
  },
];

export const navItems = [
  { route: 'home', label: 'Home' },
  { route: 'about', label: 'About' },
  { route: 'services', label: 'Services' },
  { route: 'portfolio', label: 'Portfolio' },
  { route: 'tools', label: 'Tools' },
  { route: 'contact', label: 'Contact' },
] as const;

export const marqueeWords = services.map((s) => s.title);
