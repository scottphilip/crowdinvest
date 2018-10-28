using System;
using System.Collections.Generic;
using System.Text;
using CrowdInvestCore.Hubs;
using CrowdInvestCore.Models;
using CrowdInvestCore.Queues;
using Microsoft.AspNetCore.SignalR;
using Moq;

namespace CrowdInvestCore.Tests
{
    public static class MockHelper
    {
	    public static Mock<IInvestmentHandler> GetMockInvestmentHandler(InvestmentRequestResult result)
	    {
		    var ledger = new Mock<IInvestmentHandler>();
		    ledger.Setup(p => p.AddContribution(It.IsAny<InvestmentRequest>()))
			    .Returns(() => result);
		    return ledger;
	    }

	    public static Mock<IHubContext<InvestorHub, IInvestorHubClient>> 
		    GetMockHubContext(Action onClientCall)
	    {
		    var hubMock = new Mock<IHubContext<InvestorHub, IInvestorHubClient>>();

		    hubMock.Setup(i => 
				    i.Clients.Client(It.IsAny<string>())
				    .OnRequestComplete(It.IsAny<InvestmentRequestResult>()))
			    .Callback(onClientCall);

		    hubMock.Setup(i =>
				    i.Clients.All
					    .OnFundChanged(It.IsAny<InvestmentFundSummary>()))
			    .Callback(onClientCall);

		    return hubMock;
	    }
    }
}
