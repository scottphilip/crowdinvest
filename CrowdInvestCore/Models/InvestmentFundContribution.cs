using System;

namespace CrowdInvestCore.Models
{
	public class InvestmentFundContribution
	{
		public InvestmentFundContribution()
		{
			ConfirmedOnUtc = DateTime.UtcNow;
		}

		public Guid InvestmentFundId { get; set; }

		public Guid InvestorId { get; set; }

		public decimal Value { get; set; }

		public DateTime ConfirmedOnUtc { get; set; }
	}
}