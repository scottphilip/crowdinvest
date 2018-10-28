using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using CrowdInvestCore.Models;

namespace CrowdInvestCore.Repositories
{
	public class InvestmentFundRepository
	{
		public ConcurrentBag<InvestmentFund> All => FakeDatabase.InvestmentFunds;
	}
}
