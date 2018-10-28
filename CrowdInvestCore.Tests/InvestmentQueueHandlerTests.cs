using System;
using System.Linq;
using System.Threading;
using CrowdInvestCore.Models;
using CrowdInvestCore.Models.Enums;
using CrowdInvestCore.Queues;
using CrowdInvestCore.Repositories;
using Moq;
using Xunit;

namespace CrowdInvestCore.Tests
{
	public class InvestmentQueueHandlerTests
	{
		public InvestmentQueueHandlerTests()
		{
			FakeDatabase.Seed();
		}


		[Fact]
		public void AddRequest_SingleSuccessfulAdd_Success()
		{
			var user = new UserRepository().All.Skip(1).First();
			var fund = new InvestmentFundRepository().All.Skip(3).First();

			var request = new InvestmentRequest
			{
				InvestmentFundId = fund.InvestmentFundId,
				Value = 100,
				RequestId = Guid.NewGuid(),
				UserId = user.UserId,
				RequestedByConnectionId = Guid.NewGuid().ToString()
			};

			var result = new InvestmentRequestResult
			{
				Result = ResultType.Pass,
				RequestId = request.RequestId,
				Contribution = new InvestmentFundContribution
				{
					InvestorId = user.UserId,
					Value = request.Value,
					InvestmentFundId = fund.InvestmentFundId,
					ConfirmedOnUtc = DateTime.UtcNow.AddSeconds(10)
				}
			};

			var waitHubCall = new AutoResetEvent(false);
			var mockHub = MockHelper.GetMockHubContext(() => { waitHubCall.Set(); });
			var mockHandler = MockHelper.GetMockInvestmentHandler(result);

			var queue = new InvestmentRequestQueue(
				mockHandler.Object,
				new InvestmentFundRepository(),
				mockHub.Object);

			queue.Add(request);

			waitHubCall.WaitOne(10000);

			mockHub.Verify(context =>
					context
						.Clients
						.Client(It.Is<string>(s => s.Equals(request.RequestedByConnectionId)))
						.OnRequestComplete(It.Is<InvestmentRequestResult>(r =>
							r.RequestId == result.RequestId
							&& r.Result == result.Result
							&& r.Contribution.InvestmentFundId == result.Contribution.InvestmentFundId)),
				Times.AtLeastOnce);
		}
	}
}