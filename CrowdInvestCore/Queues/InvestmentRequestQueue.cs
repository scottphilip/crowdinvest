using System.Collections.Concurrent;
using System.Threading;
using CrowdInvestCore.Hubs;
using CrowdInvestCore.Models;
using CrowdInvestCore.Repositories;
using Microsoft.AspNetCore.SignalR;

namespace CrowdInvestCore.Queues
{
	public class InvestmentRequestQueue
	{
		private static InvestmentRequestQueue _instance;
		protected IHubContext<InvestorHub, IInvestorHubClient> HubContext;
		protected InvestmentFundRepository InvestmentFundRepository;

		protected IInvestmentHandler InvestmentHandler;
		protected Thread ProcessThread;
		protected ConcurrentQueue<InvestmentRequest> RequestQueue;

		//TODO: Should be interfaces for dependency injection ...
		public InvestmentRequestQueue(
			IInvestmentHandler handler,
			InvestmentFundRepository investmentFundRepository,
			IHubContext<InvestorHub, IInvestorHubClient> hubContext)
		{
			InvestmentHandler = handler;
			InvestmentFundRepository = investmentFundRepository;
			HubContext = hubContext;
			RequestQueue = new ConcurrentQueue<InvestmentRequest>();
		}

		public static InvestmentRequestQueue Instance()
		{
			return _instance ?? (_instance =
				       new InvestmentRequestQueue(
					       new InvestmentHandler(),
					       new InvestmentFundRepository(),
					       InvestorHub.Instance));
		}

		public InvestmentRequest Add(InvestmentRequest request)
		{
			RequestQueue.Enqueue(request);

			//TODO: Should use a pool for scalability but for a PoC ... bleugh
			ProcessItems();

			return request;
		}

		/// <summary>
		///     Process each item in the queue
		/// </summary>
		protected void ProcessItems()
		{
			// Check if process thread already created
			if (ProcessThread?.IsAlive ?? false) return;

			ProcessThread = new Thread(() =>
			{
				while (!RequestQueue.IsEmpty)
				{
					// Simulate the queue being busy
					Thread.Sleep(3000);

					// Pop item from the queue
					if (!RequestQueue.TryDequeue(out var request)) continue;

					var result = InvestmentHandler.AddContribution(request);

					HubContext?.Clients
						.Client(request.RequestedByConnectionId)
						.OnRequestComplete(result);
				}
			});

			ProcessThread.Start();
		}
	}
}