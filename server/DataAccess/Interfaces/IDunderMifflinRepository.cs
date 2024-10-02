using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IDunderMifflinRepository
{
    public List<Customer> GetAllCustomers();

    public int GetTotalNumberOfCustomers();
    
    public Customer InsertCustomer(Customer customer);
    
    public Order InsertOrder(Order order);
    
    public Paper InsertPaper(Paper paper);
}