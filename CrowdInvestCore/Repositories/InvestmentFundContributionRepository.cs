using System.Collections.Concurrent;
using CrowdInvestCore.Models;

namespace CrowdInvestCore.Repositories
{
	public class InvestmentFundContributionRepository
	{
		public ConcurrentBag<InvestmentFundContribution> All => FakeDatabase.InvestmentFundContributions;
	}
}