using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Bogus;
using CrowdInvestCore.Models;

namespace CrowdInvestCore.Repositories
{
    public class UserRepository
    {
	    public ConcurrentBag<User> All => FakeDatabase.Users;
    }
}
