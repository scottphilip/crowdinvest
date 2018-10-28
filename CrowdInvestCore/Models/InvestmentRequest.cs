using System;
using System.Collections.Generic;
using System.Text;

namespace CrowdInvestCore.Models
{
    public class InvestmentRequest
    {

	    public InvestmentRequest()
	    {
		    RequestId = Guid.NewGuid();
	    }

	    public Guid RequestId { get; set; }

	    public Guid UserId { get; set; }

	    public Guid InvestmentFundId { get; set; }

		public decimal Value { get; set; }

		public string RequestedByConnectionId { get; set; }
    }
}

