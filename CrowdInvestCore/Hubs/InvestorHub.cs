using System;
using System.Collections.Generic;
using System.Linq;
using CrowdInvestCore.Models;
using CrowdInvestCore.Queues;
using CrowdInvestCore.Repositories;
using Microsoft.AspNetCore.SignalR;

namespace CrowdInvestCore.Hubs
{
	public class InvestorHub : Hub<IInvestorHubClient>
	{
		public static IHubContext<InvestorHub, IInvestorHubClient> Instance { get; set; }

		public InvestmentRequest CreateContributionRequest(
			Guid userId,
			Guid investmentFundId,
			decimal value)
		{
			return InvestmentRequestQueue.Instance().Add(new InvestmentRequest
			{
				UserId = userId,
				InvestmentFundId = investmentFundId,
				Value = value,
				RequestedByConnectionId = Context.ConnectionId
			});
		}

		public IEnumerable<InvestmentFundSummary> GetAllInvestmentFunds()
		{
			var contributionRepository = new InvestmentFundContributionRepository();
			var result = new InvestmentFundRepository().All.Select(f => new InvestmentFundSummary
			{
				InvestmentFundId = f.InvestmentFundId,
				FundTitle = f.FundTitle,
				FundDescription = f.FundDescription,
				MaximumValue = f.MaximumValue,
				CurrentTotal = contributionRepository.All.Where(i => i.InvestmentFundId == f.InvestmentFundId)
					.Sum(i => i.Value)
			});

			return result;
		}

		public IEnumerable<InvestmentFundContribution> GetAllInvestmentFundContributions(Guid userId)
		{
			var result = new InvestmentFundContributionRepository().All.Where(i => i.InvestorId == userId);

			return result;
		}

		public User GetRandomProfile()
		{
			var repository = new UserRepository();
			var index = new Random().Next(0, repository.All.Count - 1);
			return repository.All.ToArray()[index];
		}
	}
}