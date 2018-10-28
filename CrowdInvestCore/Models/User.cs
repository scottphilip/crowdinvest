using System;
using System.Collections.Generic;
using System.Text;

namespace CrowdInvestCore.Models
{
    public class User
    {
	    public User()
	    {
		    UserId = Guid.NewGuid();
	    }

		public Guid UserId {get; set; }

	    public string FirstName {get; set; }

	    public string LastName {get; set; }

	    public string Email {get; set; }
    }
}
