using System;
using System.Linq;
using CrowdInvestCore.Hubs;
using CrowdInvestCore.Models;
using CrowdInvestCore.Models.Enums;
using CrowdInvestCore.Repositories;
using Microsoft.AspNetCore.SignalR;

namespace CrowdInvestCore.Queues
{
	public interface IInvestmentHandler
	{
		InvestmentRequestResult AddContribution(InvestmentRequest request);
	}

	public class InvestmentHandler : IInvestmentHandler
	{
		protected static object ConfirmationLock = new object();
		protected IHubContext<InvestorHub, IInvestorHubClient> HubContext;
		protected InvestmentFundContributionRepository InvestmentFundContributionRepository;
		protected InvestmentFundRepository InvestmentFundRepository;

		protected UserRepository UserRepository;

		public InvestmentHandler() : this(new UserRepository(),
			new InvestmentFundRepository(),
			new InvestmentFundContributionRepository(),
			InvestorHub.Instance)
		{
		}

		public InvestmentHandler(UserRepository userRepository,
		                         InvestmentFundRepository investmentFundRepository,
		                         InvestmentFundContributionRepository investmentFundContributionRepository,
		                         IHubContext<InvestorHub, IInvestorHubClient> hubContext)
		{
			UserRepository = userRepository;
			InvestmentFundRepository = investmentFundRepository;
			InvestmentFundContributionRepository = investmentFundContributionRepository;
			HubContext = hubContext;
		}

		public InvestmentRequestResult AddContribution(InvestmentRequest request)
		{
			var investor = UserRepository.All.FirstOrDefault(i => i.UserId == request.UserId);
			if (investor == null)
				return new InvestmentRequestResult
				{
					RequestId = request.RequestId,
					Result = ResultType.ErrorInvalidIdentity
				};

			var fund = InvestmentFundRepository.All.FirstOrDefault(i => i.InvestmentFundId == request.InvestmentFundId);
			if (fund == null)
				return new InvestmentRequestResult
				{
					RequestId = request.RequestId,
					Result = ResultType.ErrorInvalidIdentity
				};

			InvestmentFundContribution contribution;

			// Check outside the lock to save resources
			if (IsContributionExist(request.UserId, request.InvestmentFundId))
				return new InvestmentRequestResult
				{
					RequestId = request.RequestId,
					Result = ResultType.FailDuplicate
				};

			//TODO: Lock should be per fund not global
			lock (ConfirmationLock)
			{
				if (fund.GetSummary().CurrentTotal + request.Value > fund.MaximumValue)
					return new InvestmentRequestResult
					{
						RequestId = request.RequestId,
						Result = ResultType.FailBalance
					};

				// Verify again inside the lock
				if (IsContributionExist(request.UserId, request.InvestmentFundId))
					return new InvestmentRequestResult
					{
						RequestId = request.RequestId,
						Result = ResultType.FailDuplicate
					};

				contribution = new InvestmentFundContribution
				{
					InvestorId = request.UserId,
					InvestmentFundId = request.InvestmentFundId,
					Value = request.Value
				};
				InvestmentFundContributionRepository.All.Add(contribution);
			}

			HubContext?.Clients.All.OnFundChanged(fund.GetSummary());

			return new InvestmentRequestResult
			{
				RequestId = request.RequestId,
				Result = ResultType.Pass,
				Contribution = contribution
			};
		}

		private bool IsContributionExist(Guid investorId, Guid investmentFundId)
		{
			if (InvestmentFundContributionRepository.All.Any(i =>
				i.InvestorId == investorId && i.InvestmentFundId == investmentFundId))
				return true;

			return false;
		}
	}
}