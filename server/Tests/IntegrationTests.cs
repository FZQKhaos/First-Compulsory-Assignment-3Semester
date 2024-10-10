using System.Net;
using System.Text.Json;
using API;
using DataAccess;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using PgCtx;
using Service;
using Service.TransferModels.Responses;
using Xunit.Abstractions;


namespace Tests;

public class IntegrationTests : WebApplicationFactory<Program>
{

    private readonly PgCtxSetup<DunderMifflinContext> _pgCtxSetup = new ();
    private readonly ITestOutputHelper _output;
    
    
    public IntegrationTests(ITestOutputHelper output)
    {
        _output = output;
        Environment.SetEnvironmentVariable("DbConnectionString", _pgCtxSetup._postgres.GetConnectionString());
    }
    
    [Fact]
    public async Task GetAllOrders()
    {
        var customers = new List<Customer>
        {
            new Customer
            {
                Id = 1,
                Name = "Michael Scott",
                Address = "123 Dundler Mifflin Way",
                Phone = "12345678",
                Email = "MichaelS@tempmail.com"
            },
            new Customer
            {
                Id = 2,
                Name = "John Johnson",
                Address = "123 Dundler Mifflin Way",
                Phone = "22446578",
                Email = "JohnJonsen@tempmail.com"
            }
        };
        
        var orders = new List<Order>
        {
            new Order
            {
                Id = 1,
                OrderDate = DateTime.UtcNow,
                CustomerId = 1,
                TotalAmount = 100,
                Status = "Processing"
            },
            new Order
            {
                Id = 2,
                OrderDate = DateTime.UtcNow,
                CustomerId = 2,
                TotalAmount = 200,
                Status = "Shipped"
            }
        };
        
        _pgCtxSetup.DbContextInstance.Customers.AddRange(customers);
        _pgCtxSetup.DbContextInstance.Orders.AddRange(orders);
        _pgCtxSetup.DbContextInstance.SaveChanges();
        
        var client = CreateClient();
        var response = await client.GetAsync("/api/orders");
        var content = await response.Content.ReadAsStringAsync();
        var orderList = JsonSerializer.Deserialize<List<OrderDto>>(content);
        Assert.Equal(2, orderList.Count);
        Assert.Equal(response.StatusCode, HttpStatusCode.OK);
        
    }

    [Fact]
    public async Task GetOrderByCustomerId()
    {
        var customers = new List<Customer>
        {
            new Customer
            {
                Id = 1,
                Name = "Michael Scott",
                Address = "123 Dundler Mifflin Way",
                Phone = "12345678",
                Email = "MichaelS@tempmail.com"
            },
            new Customer
            {
                Id = 2,
                Name = "John Johnson",
                Address = "123 Dundler Mifflin Way",
                Phone = "22446578",
                Email = "JohnJonsen@tempmail.com"
            }
        };
        
        var orders = new List<Order>
        {
            new Order
            {
                Id = 1,
                OrderDate = DateTime.UtcNow,
                CustomerId = 1,
                TotalAmount = 100,
                Status = "Processing"
            },
            new Order
            {
                Id = 2,
                OrderDate = DateTime.UtcNow,
                CustomerId = 2,
                TotalAmount = 200,
                Status = "Shipped"
            },
            new Order
            {
                Id = 3,
                OrderDate = DateTime.UtcNow,
                CustomerId = 1,
                TotalAmount = 300,
                Status = "Delivered"
            }
        };
     
        _pgCtxSetup.DbContextInstance.Customers.AddRange(customers);
        _pgCtxSetup.DbContextInstance.Orders.AddRange(orders);
        _pgCtxSetup.DbContextInstance.SaveChanges();
        
        var client = CreateClient();
        var response = await client.GetAsync($"/api/Orders/{1}");
        var content = await response.Content.ReadAsStringAsync();
        var orderList = JsonSerializer.Deserialize<OrderDto>(content);
        Assert.Equal(2, orderList.CustomerId);
        Assert.Equal(response.StatusCode, HttpStatusCode.OK);

    }
    
}