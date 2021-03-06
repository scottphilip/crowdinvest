﻿using System.Collections.Concurrent;
using CrowdInvestCore.Models;

namespace CrowdInvestCore.Repositories
{
	public class InvestmentFundRepository
	{
		public ConcurrentBag<InvestmentFund> All => FakeDatabase.InvestmentFunds;
	}
}