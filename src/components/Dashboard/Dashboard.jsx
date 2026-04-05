import OverviewCards from './OverviewCards';
import TrendChart from './TrendChart';
import CategoryChart from './CategoryChart';

export default function Dashboard() {
  return (
    <div>
      {/* Overview Cards */}
      <section>
        <OverviewCards />
      </section>

      {/* Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TrendChart />
        <CategoryChart />
      </section>
    </div>
  );
}
