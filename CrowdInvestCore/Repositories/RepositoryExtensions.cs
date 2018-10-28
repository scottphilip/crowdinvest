using System.Linq;
using CrowdInvestCore.Models;

namespace CrowdInvestCore.Repositories
{
	public static class RepositoryExtensions
	{
		public static InvestmentFundSummary GetSummary(this InvestmentFund fund)
		{
			return new InvestmentFundSummary()
			{
				InvestmentFundId = fund.InvestmentFundId,
				MaximumValue = fund.MaximumValue,
				FundDescription = fund.FundDescription,
				FundTitle = fund.FundTitle,
				CurrentTotal = FakeDatabase.InvestmentFundContributions.Where(i => i.InvestmentFundId == fund.InvestmentFundId).Sum(i => i.Value)
			};
		}
	}
}