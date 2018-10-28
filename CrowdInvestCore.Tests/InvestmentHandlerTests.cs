using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CrowdInvestCore.Models;
using CrowdInvestCore.Models.Enums;
using CrowdInvestCore.Queues;
using CrowdInvestCore.Repositories;
using Moq;
using Xunit;

namespace CrowdInvestCore.Tests
{
	public class InvestmentHandlerTests
	{
		public InvestmentHandlerTests()
		{
			//TODO: Naughty, naughty!  Should be creating objects per test
			//TODO: Dependency injection... 
			FakeDatabase.Seed();
		}

		[Fact]
		public void AddItem_BelowMax_Success()
		{
			var waitHubCall = new AutoResetEvent(false);

			var hubMock = MockHelper.GetMockHubContext(() => waitHubCall.Set());

			var handler = new InvestmentHandler(
				new UserRepository(), 
				new InvestmentFundRepository(), 
				new InvestmentFundContributionRepository(), 
				hubMock.Object);

			var user = new UserRepository().All.First();
			var fund = new InvestmentFundRepository().All.Skip(1).First();

			var result = handler.AddContribution(new InvestmentRequest()
			{
				Value = fund.GetSummary().CurrentTotal / 2,
				InvestmentFundId = fund.InvestmentFundId,
				RequestedByConnectionId = Guid.NewGuid().ToString(),
				UserId = user.UserId
			});

			hubMock.Verify(i => i.Clients.All.OnFundChanged(It.Is<InvestmentFundSummary>(s => s.InvestmentFundId == fund.InvestmentFundId)), Times.AtLeastOnce);

			Assert.True(result.Result == ResultType.Pass);
		}

		[Fact]
		public void AddItem_AboveMax_Success()
		{
			var waitHubCall = new AutoResetEvent(false);

			var hubMock = MockHelper.GetMockHubContext(() => waitHubCall.Set());

			var handler = new InvestmentHandler(
				new UserRepository(), 
				new InvestmentFundRepository(), 
				new InvestmentFundContributionRepository(), 
				hubMock.Object);

			var user = new UserRepository().All.First();
			var fund = new InvestmentFundRepository().All.Skip(1).First();

			var result = handler.AddContribution(new InvestmentRequest()
			{
				Value = fund.MaximumValue + 1,
				InvestmentFundId = fund.InvestmentFundId,
				RequestedByConnectionId = Guid.NewGuid().ToString(),
				UserId = user.UserId,
				RequestId = Guid.NewGuid()
			});

			hubMock.Verify(i => i.Clients.All.OnFundChanged(It.Is<InvestmentFundSummary>(s => s.InvestmentFundId == fund.InvestmentFundId)), Times.Never);

			Assert.Equal(ResultType.FailBalance, result.Result);
		}
	}
}
