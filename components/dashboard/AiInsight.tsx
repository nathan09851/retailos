interface AiInsightProps {
  insight: string;
}

const AiInsight = ({ insight }: AiInsightProps) => {
  return (
    <div className="p-6 bg-gradient-to-r from-electric-purple to-electric-blue rounded-2xl shadow-lg text-white">
      <h3 className="text-lg font-semibold">AI Insight</h3>
      <p className="mt-2">{insight}</p>
    </div>
  );
};

export default AiInsight;
