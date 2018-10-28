using System.Threading.Tasks;
using CrowdInvestCore.Models;

namespace CrowdInvestCore.Hubs
{
	public interface IInvestorHubClient
	{
		Task OnRequestComplete(InvestmentRequestResult result);
		Task OnFundChanged(InvestmentFundSummary investmentFund);
	}
}