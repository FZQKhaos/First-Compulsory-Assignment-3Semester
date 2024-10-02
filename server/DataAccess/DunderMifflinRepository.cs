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

    public Order InsertOrder(Order order)
    {
        context.Orders.Add(order);
        context.SaveChanges();
        return order;
    }

    public Paper InsertPaper(Paper paper)
    {
        context.Papers.Add(paper);
        context.SaveChanges();
        return paper;
    }
}