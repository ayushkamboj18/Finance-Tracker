import Insights from '../components/Insights/Insights';

export default function InsightsPage() {
  return (
    <div className="space-y-14 animate-fade-in bg-black flex flex-col items-center ">
        <p className="text-gray-600 dark:text-gray-400">Analyze your spending patterns and financial health</p>

      {/* Insights Component */}
      <Insights />
    </div>
  );
}
