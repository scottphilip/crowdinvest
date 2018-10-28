using System.Collections.Concurrent;
using CrowdInvestCore.Models;

namespace CrowdInvestCore.Repositories
{
	public class UserRepository
	{
		public ConcurrentBag<User> All => FakeDatabase.Users;
	}
}