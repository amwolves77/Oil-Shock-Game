export const calculateScore = (correctCount: number, totalTimeMs: number) => {
  const REVENUE_PER_ANSWER = 1000;
  const COST_PER_SECOND = 10;
  const grossRevenue = correctCount * REVENUE_PER_ANSWER;
  const operationalCost = Math.floor((totalTimeMs / 1000) * COST_PER_SECOND);
  return Math.max(0, grossRevenue - operationalCost);
};
