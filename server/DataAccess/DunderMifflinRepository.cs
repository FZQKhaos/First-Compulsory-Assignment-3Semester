using DataAccess.Interfaces;
using DataAccess.Models;

namespace DataAccess;

public class DunderMifflinRepository(DunderMifflinContext context) : IDunderMifflinRepository
{
    public List<Customer> GetAllCustomers()
    {
        return context.Customers.ToList();
    }

    public int GetTotalNumberOfCustomers()
    {
        return context.Customers.Count();
    }

    public Customer InsertCustomer(Customer customer)
    {
        context.Customers.Add(customer);
        context.SaveChanges();
        return customer;
    }
}