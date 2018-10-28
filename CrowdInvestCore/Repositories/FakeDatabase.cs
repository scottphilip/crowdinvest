using System;
using System.Collections.Concurrent;
using System.Linq;
using Bogus;
using CrowdInvestCore.Models;

namespace CrowdInvestCore.Repositories
{
	public static class FakeDatabase
	{
		public static ConcurrentBag<InvestmentFund> InvestmentFunds {get; set; }
		public static ConcurrentBag<InvestmentFundContribution> InvestmentFundContributions {get; set; }
		public static ConcurrentBag<User> Users { get; set; }

		public static void Seed()
		{
			SeedUsers();
			SeedFunds();
			SeedContributions();
		}

		private static void SeedUsers()
		{
			Randomizer.Seed = new Random(2525);

			var faker = new Faker<User>()
				.RuleFor(b => b.UserId, f => f.Random.Guid())
				.RuleFor(b => b.Email, f => f.Person.Email)
				.RuleFor(b => b.FirstName, f => f.Person.FirstName)
				.RuleFor(b => b.LastName, f => f.Person.LastName);

			Users = new ConcurrentBag<User>(faker.Generate(30));
		}
		
		private static void SeedFunds()
		{
			Randomizer.Seed = new Random(8525);

			var faker = new Faker<InvestmentFund>()
				.RuleFor(b => b.InvestmentFundId, f => f.Random.Guid())
				.RuleFor(b => b.FundTitle, f => f.Company.CompanyName())
				.RuleFor(b => b.FundDescription, f => f.Lorem.Paragraphs(1, 3))
				.RuleFor(b => b.MaximumValue, f => f.Finance.Amount(10000, 100000));

			InvestmentFunds = new ConcurrentBag<InvestmentFund>(faker.Generate(50));
		}

		private static void SeedContributions()
		{
			var fund = new InvestmentFundRepository().All.First();

			Randomizer.Seed = new Random(58258);

			var faker = new Faker<InvestmentFundContribution>()
				.RuleFor(b => b.ConfirmedOnUtc, f => f.Date.Recent(7))
				.RuleFor(b => b.Value, f => f.Random.Number(10, 50));

			InvestmentFundContributions = new ConcurrentBag<InvestmentFundContribution>();
			
			foreach(var user in Users)
			{
				var contribution = faker.Generate(1).First();
				contribution.InvestorId = user.UserId;
				contribution.InvestmentFundId = fund.InvestmentFundId;
				contribution.Value = (int)fund.MaximumValue * (contribution.Value / 1000);
				InvestmentFundContributions.Add(contribution);
			}
		}
	}
}