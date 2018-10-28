using System;
using CrowdInvestCore.Models.Enums;

namespace CrowdInvestCore.Models
{
	public class InvestmentRequestResult
	{
		public Guid RequestId { get; set; }
		public ResultType Result { get; set; }
		public InvestmentFundContribution Contribution { get; set; }
	}
}