# CSC-307 Final Year Project Work Log
**Project Title**: RetailOS — AI-Native Omnichannel Retail Dashboard  
**Student Name**: Nathan  
**College**: St. Xavier's College, Mapusa, Goa  

---

### **Week 1: System Initialization & Database Architecture**

| Sr. No. | Date | Brief Description / Nature of Work | Time (Hrs) |
| :---: | :---: | :--- | :---: |
| 1 | 05/01/2026 | Initialized the Next.js 14.2.35 application using `create-next-app` with TypeScript and TailwindCSS enabled. Configured the root `package.json` to include essential core UI dependencies like `lucide-react` (v0.577.0) and `framer-motion` (v12.37.0). Setup the root `app/layout.tsx` and configured the global `.eslintrc.json` for strict code quality enforcement during the FYP development cycle. | 3.5 |
| 2 | 06/01/2026 | Provisioned a new PostgreSQL instance on Supabase and configured the connection string inside the local `.env` file via `DATABASE_URL`. Installed `@prisma/client` and `prisma` (v7.5.0) to act as the primary ORM layer. Verified database remote connectivity by running a basic connection test script. | 2.0 |
| 3 | 07/01/2026 | Designed the foundational entity-relationship model in `prisma/schema.prisma`. Explicitly modeled the `User`, `Product`, `Customer`, and `Order` tables, utilizing UUID strings with `@default(cuid())` for primary keys. Established one-to-many foreign key relationships between `Customer` and `Order` schemas to support future analytics routing. | 4.0 |
| 4 | 08/01/2026 | Executed the initial Prisma migration (`npx prisma migrate dev`) to provision the physical tables in the Supabase PostgreSQL database. Developed the Prisma configuration singleton in `prisma.config.ts` to prevent connection exhaustion during hot-reloads dynamically. | 2.5 |
| 5 | 09/01/2026 | Configured `next-auth` (v4.24.13) for administrative authentication routing in the Next.js App Router layer. Created the API catch-all file in `app/api/auth/[...nextauth]/route.ts` using JWT session strategies. Protected the `/dashboard` route group programmatically inside `middleware.ts`. | 4.0 |

**Week 1 Total Hours: 16.0**

---

### **Week 2: Core Components & UI System Design**

| Sr. No. | Date | Brief Description / Nature of Work | Time (Hrs) |
| :---: | :---: | :--- | :---: |
| 6 | 12/01/2026 | Integrated the `shadcn` UI library (v4.0.8) and initialized the `components.json` layout environment. Scaffolded the atomic design components for the administration panel within the `components/` directory. Verified custom class merging using `tailwind-merge` and `clsx` utility functions. | 3.0 |
| 7 | 13/01/2026 | Implemented the dynamic theme engine to manage the dashboard's five distinct color palettes (Claude Classic, Charcoal, Serene Clay, etc.). Configured CSS variables natively in `app/globals.css` to allow real-time layout changes mapping to `localStorage`. Altered `tailwind.config.ts` to bind semantic colors to the Tailwind utility scope. | 4.5 |
| 8 | 14/01/2026 | Constructed the persistent application shell inside `app/dashboard/layout.tsx`. Leveraged `framer-motion` to construct a smooth collapsing sidebar navigation element holding links to core modules. Ensured Next.js active route highlighting using native `usePathname` hooks. | 3.5 |
| 9 | 15/01/2026 | Developed the omni-purpose data table component utilizing `@tanstack/react-table` (v8.21.3) architecture. Enabled strict column sorting, pagination, and dynamic global filtering methodologies. Embedded a simulated loading shell inside `app/dashboard/loading.tsx` to prevent cumulative layout shift (CLS). | 5.0 |
| 10 | 16/01/2026 | Implemented a dedicated mobile-first responsive viewport architecture. Overrode sidebar rendering mechanisms on breakpoints `<768px` to transition into a fixed bottom navigational tab bar safely. Checked UI elements using Chrome DevTools device simulators. | 3.0 |

**Week 2 Total Hours: 19.0**

---

### **Week 3: Inventory & Omnichannel Modules**

| Sr. No. | Date | Brief Description / Nature of Work | Time (Hrs) |
| :---: | :---: | :--- | :---: |
| 11 | 19/01/2026 | Created the core view for the Inventory module at `app/dashboard/inventory/page.tsx`. Linked the frontend React table instances directly to the Prisma `Product` schema using Server Actions natively implemented inside Next 14. Programmed sorting behavior for SKU tracking. | 4.0 |
| 12 | 20/01/2026 | Drafted the REST APIs inside `app/api/inventory/` routines for external SKU synchronizations. Setup error handling logic leveraging strict `zod` (v4.3.6) validation pipelines to reject malformed item POST requests. Enforced HTTP status code standardization natively in route exports. | 3.5 |
| 13 | 21/01/2026 | Developed the `app/dashboard/inventory-sync/page.tsx` submodule designed to manage stock level discrepancy queues across channels. Wrote a complex Prisma `.aggregate()` query logic piece specifically to expose `stockLevel` sum variations for cross-platform status logs. | 4.5 |
| 14 | 22/01/2026 | Integrated `recharts` (v3.8.0) and `@tremor/react` (v3.18.7) to begin visual metric construction. Established the primary visual card grids in `app/dashboard/omnichannel/page.tsx`. Computed real-time GMV and AOV aggregates directly by parsing the Prisma `Order` and `Customer` joins. | 5.0 |
| 15 | 23/01/2026 | Designed complex SVG interactive graphs showing channel-based growth distributions mapped to historical line series data. Utilized `@tanstack/react-query` to cache these heavy reporting fetches, severely minimizing database network reads on layout thrashing. | 3.0 |

**Week 3 Total Hours: 20.0**

---

### **Week 4: Speech-to-Text & AI Voice Setup**

| Sr. No. | Date | Brief Description / Nature of Work | Time (Hrs) |
| :---: | :---: | :--- | :---: |
| 16 | 26/01/2026 | Initiated integration of the `@elevenlabs/react` conversational widget into the global layout shell. Created the `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` parameter logically linked to `elevenlabs` API routing definitions inside `app/api/elevenlabs`. Established websocket constraints for continuous STT streaming. | 4.0 |
| 17 | 27/01/2026 | Bootstrapped the OpenAI GPT-4 Turbo underlying pipeline routing natively at `app/api/voice/`. Utilized `@anthropic-ai/sdk` and `openai` (v6.32.0) native libraries to handle contextual user intents dynamically injected from voice endpoints. Setup base prompt instructions enforcing semantic data retrieval mappings. | 4.5 |
| 18 | 28/01/2026 | Overhauled the database schema globally in `prisma/schema.prisma` to add `AIInsight` and `AIChat` relational collections logically. Enabled conversation persistence tracking ensuring the agent contextualizes past commands smoothly over sessions. Executed `npx prisma db push`. | 3.0 |
| 19 | 29/01/2026 | Engineered API wrapper tools such as `getDailyRevenue()` and connected them natively to functions within `app/api/voice/top-products/route.ts` and `app/api/voice/customers/route.ts`. Granted the ElevenLabs client agent permission structure to auto-fire external tool commands against the Supabase DB instance securely via context chaining. | 5.0 |
| 20 | 30/01/2026 | Profiled speech-to-system network calls directly in the Next cache layers specifically tuning toward sub-second response latency. Removed strict static rendering blocks in the AI API files utilizing `export const dynamic = 'force-dynamic'` enabling Vercel edge capabilities securely. | 3.5 |

**Week 4 Total Hours: 20.0**

---

### **Week 5: Financial Calendar & Smart Integrations**

| Sr. No. | Date | Brief Description / Nature of Work | Time (Hrs) |
| :---: | :---: | :--- | :---: |
| 21 | 02/02/2026 | Constructed the core `app/dashboard/financial-calendar/page.tsx` structural interface. Embedded the `react-day-picker` (v9.14.0) dependency strictly utilizing native `date-fns` formatting utilities to render multi-dimensional invoice grids visually. | 4.0 |
| 22 | 03/02/2026 | Connected the `Transaction` entity within the Prisma schema specifically to layout upcoming taxation and payroll milestone schedules chronologically inside the financial calendar UI. Displayed calculated monthly recurring revenue (MRR) dynamically using `react-countup` numeric sequences. | 3.5 |
| 23 | 04/02/2026 | Sculpted the interactive `cmd/ctrl + K` command palette global component logically bridging to hot-key event listeners mounted inside `useEffect()`. Permitted the administrative user to instantaneously jump between `/inventory`, `/orders`, and native search arrays securely via `next/navigation`. | 4.5 |
| 24 | 05/02/2026 | Developed the logic blocks encapsulating the Smart Alerts submodule natively at `app/dashboard/smart-alerts/page.tsx`. Handcoded custom state hook engines (`hooks/useAlerts.ts`) measuring revenue drop velocities and abnormal stock depletion rates dynamically across datasets. | 4.0 |
| 25 | 06/02/2026 | Wired `react-hot-toast` generic components directly into the data mutation architecture. Triggered in-app toast overlays securely upon execution of Prisma `update()` calls, low-inventory pings, and webhook failures smoothly improving the end-user UX pipeline. | 2.5 |

**Week 5 Total Hours: 18.5**

---

### **Week 6: Testing, Refinement & Final Delivery Setup**

| Sr. No. | Date | Brief Description / Nature of Work | Time (Hrs) |
| :---: | :---: | :--- | :---: |
| 26 | 09/02/2026 | Wrote mock data injection logic directly across the testing array layers inside `test-seed.js` and `app/api/seed`. Synthesized 1,000+ realistic product SKUS and transactions procedurally to load test the `@tanstack/react-table` UI capabilities and verify indexing stability within PostgreSQL. | 4.0 |
| 27 | 10/02/2026 | Diagnosed security vulnerability instances internally mapped by `$ npm audit` command execution. Upgraded targeted sub-dependencies native to Next.js middleware and isolated non-essential development dependencies to patch prototype attack vectors natively. | 3.0 |
| 28 | 11/02/2026 | Audited the entire frontend design implementation verifying deep WCAG accessibility contrasts and semantic `<section>` and `<h1>` markup tags globally. Integrated the `frontend-design` optimizations native to layout alignments polishing the Dashboard Data Table metrics padding. | 3.5 |
| 29 | 12/02/2026 | Performed production deployment build steps via `$ npm run build`, parsing the `.next` server outputs in `build-output.log`. Repaired typescript type coercion errors structurally across the `recharts` API prop interfaces ensuring safe Edge runtime transpilation. | 4.5 |
| 30 | 13/02/2026 | Compiled the `README.md` and standard project documentation. Extracted system block diagrams, framework logic charts, ERD schemas, and workflow sequences directly for inclusion within the CSC-307 Final Year Project hardbound academic report. | 5.0 |

**Week 6 Total Hours: 20.0**

---

**Total Project Logged Hours: 113.5 Hours**
