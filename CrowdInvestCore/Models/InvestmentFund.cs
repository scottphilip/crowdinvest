using System;

namespace CrowdInvestCore.Models
{
	public class InvestmentFund
	{
		public InvestmentFund()
		{
			InvestmentFundId = Guid.NewGuid();
		}

		public Guid InvestmentFundId { get; set; }

		public string FundTitle { get; set; }

		public string FundDescription {get; set; }

		public decimal MaximumValue { get; set; }
	}
}