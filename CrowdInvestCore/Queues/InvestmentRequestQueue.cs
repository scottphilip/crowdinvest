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
		//TODO: ServiceBus for horizontal scaling [KISS!]
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

		/// <summary>
		/// Nasty singleton ... This "queue" should be running in a separate process.  Ideally
		/// something like ServiceBus [KISS!]
		/// </summary>
		/// <returns></returns>
		public static InvestmentRequestQueue Instance()
		{
			return _instance ?? (_instance =
				       new InvestmentRequestQueue(
					       new InvestmentHandler(),
					       new InvestmentFundRepository(),
					       InvestorHub.Instance));
		}

		/// <summary>
		/// Add to the "queue" .... again this should be sending to a ServiceBus [KISS!]
		/// </summary>
		/// <param name="request"></param>
		/// <returns></returns>
		public InvestmentRequest Add(InvestmentRequest request)
		{
			RequestQueue.Enqueue(request);

			// Make sure the worker is running 
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

			// Should be a pool so concurrent processing can happen [KISS!]
			ProcessThread = new Thread(() =>
			{
				while (!RequestQueue.IsEmpty)
				{
					// Simulate the queue being busy 
					Thread.Sleep(3000);

					// Pop item from the queue
					if (!RequestQueue.TryDequeue(out var request)) continue;

					// Pass over to the logic engine which can do the business logic on the request
					var result = InvestmentHandler.AddContribution(request);

					// Send event to the waiting client containing the result
					HubContext?.Clients
						.Client(request.RequestedByConnectionId)
						.OnRequestComplete(result);
				}
			});

			ProcessThread.Start();
		}
	}
}