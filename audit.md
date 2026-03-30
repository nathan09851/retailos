# RetailOS Audit

## Goal
This document is the migration checklist for converting the app from mixed local/mock data into fully backend-driven screens.

The guiding rule is simple:
- Screens should fetch canonical data from APIs.
- Mutations should go through APIs.
- Shared components should receive backend-shaped props instead of hardcoded demo arrays.
- Local mock data should only remain for loading states, empty states, or dev seeding.

## Screens

### App shell
- `/` -> redirects to `/dashboard`
- `/login` -> NextAuth credentials login
- `/register` -> currently a UI-only multi-step form; needs a backend registration flow before it can be real
- `/dashboard` -> main overview screen
- `/dashboard/ai` -> AI chat and assistant console
- `/dashboard/analytics` -> analytics charts and performance views
- `/dashboard/customers` -> customer list and segmentation
- `/dashboard/customers/[id]` -> customer detail profile
- `/dashboard/financial-calendar` -> financial dates and event planning
- `/dashboard/financials` -> P&L, cash flow, and transaction ledger
- `/dashboard/inventory` -> product inventory management
- `/dashboard/inventory-sync` -> inventory synchronization and reorder queue
- `/dashboard/omnichannel` -> channel performance overview
- `/dashboard/orders` -> order list and order detail workflow
- `/dashboard/reports` -> report generation and scheduling
- `/dashboard/settings` -> business and system settings
- `/dashboard/smart-alerts` -> alert configuration and alert feed

### Shell-only routes and wrappers
- `app/layout.tsx` -> global providers and metadata
- `app/dashboard/layout.tsx` -> sidebar, header, realtime provider, voice agent
- `app/dashboard/loading.tsx` -> loading skeleton
- `app/dashboard/template.tsx` -> route transition wrapper

## Feature Components

### Layout and shell
- `components/layout/Header.tsx`
- `components/layout/Sidebar.tsx`
- `components/ui/ThemeToggle.tsx`
- `components/ui/action-search-bar.tsx`
- `components/providers/RealtimeProvider.tsx`
- `components/providers/QueryProvider.tsx`
- `components/providers/ToastProvider.tsx`
- `components/ai/VoiceAgent.tsx`

### Dashboard
- `components/dashboard/AiInsight.tsx`
- `components/dashboard/AnalyticsTab.tsx`
- `components/dashboard/RecentActivity.tsx`
- `components/dashboard/RevenueVsTarget.tsx`
- `components/dashboard/SkeletonCard.tsx`
- `components/dashboard/StatCard.tsx`
- `components/dashboard/TodayAtAGlance.tsx`

### AI
- `components/ai/ChatInput.tsx`
- `components/ai/ChatMessage.tsx`
- `components/ai/ForecastWidget.tsx`
- `components/ai/VoiceAgent.tsx`

### Analytics
- `components/analytics/AOVTrendChart.tsx`
- `components/analytics/AcquisitionFunnel.tsx`
- `components/analytics/CategorySalesChart.tsx`
- `components/analytics/CustomerSegmentChart.tsx`
- `components/analytics/GeoSalesMap.tsx`
- `components/analytics/SalesHeatmap.tsx`
- `components/analytics/TopProductsTable.tsx`
- `components/analytics/analyticsData.ts`
- `components/analytics/types.ts`

### Customers
- `components/customers/RFMIndicator.tsx`
- `components/customers/SendMessageModal.tsx`
- `components/customers/customerData.ts`
- `components/customers/types.ts`

### Financials
- `components/financials/ExpenseDonut.tsx`
- `components/financials/LogTransactionModal.tsx`
- `components/financials/PLSummary.tsx`
- `components/financials/ProfitMarginChart.tsx`
- `components/financials/RevenueExpenseChart.tsx`
- `components/financials/TransactionTable.tsx`
- `components/financials/WaterfallChart.tsx`
- `components/financials/financialData.ts`
- `components/financials/types.ts`

### Inventory
- `components/inventory/AddProductModal.tsx`
- `components/inventory/CSVImport.tsx`
- `components/inventory/InventoryFilters.tsx`
- `components/inventory/ProductCard.tsx`
- `components/inventory/ProductGrid.tsx`
- `components/inventory/ProductTable.tsx`
- `components/inventory/StockAlerts.tsx`
- `components/inventory/inventoryData.ts`
- `components/inventory/types.ts`

### Orders
- `components/orders/DataTable.tsx`
- `components/orders/NewOrderModal.tsx`
- `components/orders/OrderDetailSlideover.tsx`
- `components/orders/TableFilters.tsx`
- `components/orders/columns.tsx`

### Shared UI primitives
- `components/ui/AnimatedCounter.tsx`
- `components/ui/EmptyState.tsx`
- `components/ui/avatar.tsx`
- `components/ui/badge.tsx`
- `components/ui/bento-grid.tsx`
- `components/ui/button.tsx`
- `components/ui/calendar.tsx`
- `components/ui/card.tsx`
- `components/ui/checkbox.tsx`
- `components/ui/dialog.tsx`
- `components/ui/dropdown-menu.tsx`
- `components/ui/input.tsx`
- `components/ui/interactive-hover-button.tsx`
- `components/ui/popover.tsx`
- `components/ui/scroll-area.tsx`
- `components/ui/select.tsx`
- `components/ui/separator.tsx`
- `components/ui/sheet.tsx`
- `components/ui/skeleton.tsx`
- `components/ui/table.tsx`
- `components/ui/tabs.tsx`
- `components/ui/text-shimmer.tsx`

## Expected Data Flows

### Authentication
- `login/page.tsx` submits credentials through NextAuth.
- `middleware.ts` blocks `/dashboard/*` when the user is not authenticated.
- Target backend source of truth: `lib/auth.ts` and `app/api/auth/[...nextauth]/route.ts`.
- Migration target: real user creation and password handling for `/register`.

### Dashboard overview
- Current data sources: `GET /api/dashboard` and `GET /api/orders?limit=5`.
- Current UI state also depends on `lib/queryStore.ts` polling and `components/providers/RealtimeProvider.tsx`.
- Target backend source of truth:
  - dashboard summary stats
  - recent activity stream
  - AI insight summary
  - revenue target snapshot
  - recent orders
- Migration target: remove random client-only events and replace them with backend event data or subscriptions.

### AI assistant
- `app/dashboard/ai/page.tsx` should load conversation history and stream replies from backend.
- `components/ai/VoiceAgent.tsx` uses:
  - `GET /api/elevenlabs/signed-url`
  - `GET /api/voice/revenue`
  - `GET /api/voice/low-stock`
  - `GET /api/voice/top-products`
  - `GET /api/voice/customers`
  - `GET /api/voice/financials`
- Target backend source of truth:
  - chat history
  - chat streaming
  - forecast generation
  - insight generation
- Migration target: keep the UI, but make the assistant entirely data-backed.

### Analytics
- Current screen is partly API-backed and partly static.
- Target backend source of truth:
  - sales by category
  - sales by hour
  - top products
  - acquisition trend
  - AOV trend
  - conversion metrics
- Migration target: remove static chart datasets and build all charts from server responses.

### Customers
- Current screen still leans on local mock data and local filtering.
- Target backend source of truth:
  - paginated customer list
  - customer detail
  - RFM scores
  - search and segment filters
  - soft delete and profile updates
- Missing backend gap:
  - notes/messages endpoints if message sending is meant to persist

### Financials
- Current screen is mixed: some API data, some local data, some export helpers.
- Target backend source of truth:
  - revenue
  - expenses
  - gross profit
  - net profit
  - monthly trends
  - cash flow
  - transaction ledger
- Migration target: transaction creation and filtering should stay server-driven; local P&L arrays should be removed.

### Inventory
- Current screen fetches `/api/inventory`, but also starts from local mock products and derives alerts locally.
- Target backend source of truth:
  - products
  - stock status
  - margin
  - reorder point
  - stock adjustments
  - CSV import and product creation
- Migration target: stop using `MOCK_PRODUCTS` as the initial screen state and build alerts from backend query results.

### Orders
- Current screen fetches `/api/orders`, with table state and filtering mostly local.
- Target backend source of truth:
  - paginated order list
  - order detail
  - create order
  - update order status
  - delete/cancel order
- Migration target: move filters, search, and pagination into the API so the table reflects canonical server state.

### Reports
- Current screen is mostly mock UI with simulated narrative generation.
- Target backend source of truth:
  - report records
  - scheduled report records
  - report generation payload
  - generated narrative
- Migration target: replace preview-only content with saved report state and backend-driven schedules.

### Settings
- Current screen should persist via `/api/settings`.
- Target backend source of truth:
  - user profile
  - theme and layout preferences
  - notification preferences
  - AI settings
  - integration settings
- Migration target: every toggle and field should eventually round-trip to the settings API.

### Smart alerts
- Current screen is local mock state.
- Target backend source of truth:
  - alert definitions
  - enabled/disabled state
  - thresholds
  - delivery channels
  - recent alert feed
- Missing backend gap:
  - dedicated alerts tables and APIs do not exist yet

### Inventory sync and omnichannel
- Current screens are mostly simulated dashboards.
- Target backend source of truth:
  - supplier sync status
  - sync logs
  - reorder queue
  - channel revenue
  - order mix by channel
  - channel-level growth metrics
- Missing backend gap:
  - channel dimension model
  - sync job tracking
  - supplier integration records

## Backend Conversion Priority

### High priority
- Replace local mock arrays in dashboard, inventory, orders, customers, financials, and AI pages.
- Add backend persistence for register flow.
- Add backend support for alert feed and smart-alert rules.
- Fix schema mismatches before trusting route logic.

### Medium priority
- Add pagination and search to every list endpoint.
- Add mutation endpoints for all edit flows.
- Add backend event feed for realtime and dashboard activity.

### Lower priority
- Refine export helpers.
- Improve loading/empty/error states once canonical APIs are stable.

## Known Schema Gaps To Close
- `Customer.lastOrderAt` is referenced but not present in the schema.
- `Order.items` is an integer count, so item-level product sales reporting is not yet possible.
- There is no order-item table for rich order detail, top products, or stock restoration.
- There is no alert table for smart-alerts or realtime alert history.
- There is no inventory log table for stock history.
- Register flow has no backend user creation endpoint yet.

## Migration Rule Of Thumb
When converting a screen:
- Keep the component tree if it is good UI.
- Move data loading into an API or server action.
- Move filtering/sorting/pagination server-side when the dataset is not tiny.
- Remove hardcoded demo arrays once a real endpoint exists.
- Keep only local state that is truly ephemeral, like modals, tabs, and form drafts.

