# 💰 Finance Dashboard - Multi-Page App with Routing

A beautiful, modern finance dashboard built with React, Vite, and Tailwind CSS featuring multi-page routing, role-based access control, and comprehensive financial analytics.

## ✨ Key Features (v2.0)

### 🔄 **Multi-Page Routing** ← NEW
- **React Router Integration**: Seamless navigation between pages
- **Dashboard Page**: Overview and analytics visualization
- **Transactions Page**: Complete transaction management
- **Insights Page**: Detailed financial analysis
- **Sidebar Navigation**: Always visible, intuitive navigation
- **Active Route Tracking**: Visual indicators for current page

### 📱 **Improved UI/UX**
- Modern gradient designs and animations
- Responsive sidebar navigation (fixed left panel)
- Beautiful card components with hover effects
- Smooth page transitions with animations
- Empty state handling with friendly messages
- Loading states and visual feedback

### 🛠️ **Dashboard Page**
- **Summary Cards** (4 metrics with gradient backgrounds)
  - Total Balance
  - Total Income
  - Total Expenses  
  - Transaction Count
- **Analytics Section**
  - Balance Trend Chart (SVG line chart with gradient)
  - Spending by Category (animated bar chart)
- Page-specific header with description

### 💳 **Transactions Page**
- **Quick Stats** (mini cards showing totals)
- **Advanced Filtering**
  - Search by description
  - Filter by type (Income/Expense)
  - Filter by category
  - Active filter display
  - One-click reset all filters
- **Transaction List**
  - Sortable table (date, amount)
  - Color-coded transactions
  - Category badges with unique colors
  - Admin-only delete button
  - Alternating row colors for readability
  - Row hover effects
- **Add Transaction** (Admin only)
  - Floating action button (FAB)
  - Modal form with validation
  - Success/error feedback
  - Real-time dashboard updates

### 📊 **Insights Page**
- **6 Key Metrics Cards**
  - Top Spending Category
  - Average Expense per Transaction
  - Savings Rate
  - Income to Expense Ratio
  - Category Diversification Count
  - Total Spending
- **Financial Analysis Section**
  - Contextual advice based on savings rate
  - Tips for better financial health
  - Smart recommendations
- **Category Breakdown Grid**
  - Visual representation of all categories
  - Percentage calculations
  - Color-coded display

### 🔐 **Role-Based UI**
- **Viewer Mode**
  - ✅ Read-only access to all pages
  - ✅ View transactions, insights, analytics
  - ❌ Cannot add/edit/delete transactions
  
- **Admin Mode**
  - ✅ All viewing permissions
  - ✅ Add New Transaction (floating button)
  - ✅ Delete Transactions (row action)
  - ✅ Edit capability (prepared for future)

- **Role Switcher**
  - Dropdown in header
  - Visual mode indicator (👁️ Viewer / 🔑 Admin)
  - Status display in sidebar

## 🎨 Design System

### Color Palette
| Element | Color | RGB | Usage |
|---------|-------|-----|-------|
| Primary | Blue | #3B82F6 | Buttons, links, primary actions |
| Success | Green | #10B981 | Income, positive indicators |
| Danger | Red | #EF4444 | Expenses, alerts |
| Warning | Orange | #F97316 | Warnings, caution |
| Neutral | Gray | #6B7280 | Text, backgrounds |

### Typography
- **Headings**: 3xl-4xl, font-bold
- **Subheadings**: xl-2xl, font-bold
- **Body**: sm-base, font-normal
- **Labels**: xs-sm, font-bold

### Spacing
- Cards: 6-8px padding
- Sections: 12-16px spacing
- Margins: 4-8px between elements

### Animations
- Page transitions: 500ms fade-in
- Button hovers: 300ms scale/shadow
- Chart data: 700ms smooth transitions
- Component entry: 100ms staggered delays

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.jsx           # Page wrapper
│   │   ├── OverviewCards.jsx       # Summary cards (improved)
│   │   ├── TrendChart.jsx          # Balance trend chart (improved)
│   │   └── CategoryChart.jsx       # Spending breakdown (improved)
│   ├── Transactions/
│   │   ├── Transactions.jsx        # Page wrapper
│   │   ├── TransactionFilters.jsx  # Filters (improved)
│   │   ├── TransactionList.jsx     # Table view (improved)
│   │   └── AddTransactionButton.jsx # Form modal (improved)
│   ├── Insights/
│   │   └── Insights.jsx            # Analytics cards (improved)
│   └── Layout/
│       ├── Header.jsx              # Top navigation bar
│       └── Sidebar.jsx             # Left sidebar navigation
├── pages/                          # NEW
│   ├── DashboardPage.jsx           # Dashboard route
│   ├── TransactionsPage.jsx        # Transactions route
│   └── InsightsPage.jsx            # Insights route
├── context/
│   └── FinanceContext.jsx          # Global state
├── hooks/
│   └── useFinance.js               # Custom hooks
├── data/
│   └── mockData.js                 # Mock transactions
├── App.jsx                         # Router setup (updated)
├── main.jsx
└── index.css                       # Styles (enhanced)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation

```bash
# Clone or setup project
cd Finance_app

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Available Routes
- `/` - Dashboard Page
- `/transactions` - Transactions Page
- `/insights` - Insights Page

## 🎯 User Experience Flow

### First Time User
1. App loads with Dashboard page
2. See overview of financial summary
3. Navigate via sidebar to explore features
4. Switch between Viewer/Admin modes (top right)

### Viewer Experience
```
Dashboard Page
    ↓ (view charts & summaries)
Transactions Page
    ↓ (view, search, filter, sort)
Insights Page
    ↓ (view analysis & recommendations)
```

### Admin Experience
```
Same as Viewer PLUS:
    ↓
Add Transaction (floating button)
    ↓
Form Modal (date, type, category, amount, description)
    ↓
Transaction added instantly
    ↓
Delete Individual Transactions
```

## 📊 Mock Data

30 transactions across 3 months (March - May 2024):
- Multiple income sources (Salary, Freelance)
- Various expense categories
- 10 spending categories
- Realistic date ranges

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.4 | UI Library |
| React Router | 6.x | Multi-page routing |
| Vite | 8.0.1 | Build tool & dev server |
| Tailwind CSS | 4.2.2 | Styling |
| @tailwindcss/vite | 4.2.2 | Tailwind integration |

## 💡 Key Improvements in v2.0

✅ **Routing**: Multi-page app with React Router
✅ **Sidebar Navigation**: Fixed left panel with active state
✅ **Better Header**: Role selector + user indicator
✅ **Improved Design**: 
- Gradient cards with animations
- Hover effects across all components
- Better color contrast
- Refined typography
✅ **Enhanced UX**:
- Page transitions
- Loading animations
- Active filter indicators
- Better empty states
✅ **Visual Hierarchy**: Clear page titles + descriptions
✅ **Responsive Layout**: Sidebar + main content area

## 🎓 Learning Points

This project demonstrates:
- ✅ React Router v6 implementation
- ✅ Multi-page application structure
- ✅ Context API state management
- ✅ Custom hooks for business logic
- ✅ Responsive design patterns
- ✅ Advanced Tailwind CSS
- ✅ SVG charts and animations
- ✅ Role-based UI rendering
- ✅ Form handling & validation
- ✅ Component composition

## 📈 Future Enhancements

- [ ] Dark mode toggle
- [ ] Export to CSV/PDF
- [ ] Budget tracking
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Date range picker
- [ ] Advanced charts (Recharts/Chart.js)
- [ ] Local storage persistence
- [ ] Backend API integration
- [ ] User authentication
- [ ] Mobile app version
- [ ] E-wallet integration

## 🎨 Customization

### Change Colors
Edit `src/data/mockData.js` - `getCategoryColor()` function

### Modify Categories
Edit `src/data/mockData.js` - `categories` array

### Update Layout
- Sidebar width: `src/App.jsx` - `ml-64` class
- Header height: `src/App.jsx` - `mt-20` class

### Add More Pages
1. Create component in `src/components/`
2. Create page in `src/pages/PageName.jsx`
3. Add route in `src/App.jsx` Routes
4. Add navigation item in `src/components/Layout/Sidebar.jsx`

## 📝 Browser Support

- Chrome/Edge: ✅ Latest 2 versions
- Firefox: ✅ Latest 2 versions
- Safari: ✅ Latest 2 versions
- Mobile browsers: ✅ Responsive design

## 🐛 Troubleshooting

**Dev server not starting?**
```bash
npm install
npm run dev
```

**Styles not loading?**
```bash
npm install tailwindcss @tailwindcss/vite
npm run dev
```

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📄 License

Open source for educational purposes.

## 🙏 Credits

Built with React, Vite, and Tailwind CSS.

---

## 🎯 Quick Start Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build           # Build for production
npm run preview         # Preview build locally

# Quality
npm run lint            # Check code quality
```

## 📞 Support

For issues or questions, check:
- Component files documentation
- README sections above
- Inline code comments
- Mock data structure

---

**Enjoy your Financial Dashboard! 💰✨**

Last Updated: April 2, 2026
Version: 2.0 (Multi-Page with Routing)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
