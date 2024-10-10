using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using API;
using DataAccess;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using PgCtx;
using Service.TransferModels.Requests;
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
    public async Task Get_All_Orders()
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
        var response = await client.GetAsync("/api/Orders");
        var content = await response.Content.ReadAsStringAsync();
        var orderList = JsonSerializer.Deserialize<List<OrderDto>>(content);
        Assert.Equal(2, orderList.Count);
        Assert.Equal(response.StatusCode, HttpStatusCode.OK);
        
        
    }

    [Fact]
    public async Task Get_Order_By_CustomerId()
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
                CustomerId = 2,
                TotalAmount = 300,
                Status = "Delivered"
            }
        };
     
        _pgCtxSetup.DbContextInstance.Customers.AddRange(customers);
        _pgCtxSetup.DbContextInstance.Orders.AddRange(orders);
        _pgCtxSetup.DbContextInstance.SaveChanges();
        
        var client = CreateClient();
        var response = await client.GetAsync("/api/Orders/2");
        var content = await response.Content.ReadAsStringAsync();
        var orderList = JsonSerializer.Deserialize<List<OrderDto>>(content);
        Assert.Equal(2, orderList.Count);
        Assert.Equal(response.StatusCode, HttpStatusCode.OK);

    }

    [Fact]
    public async Task UpdateOrder()
    {
        var customers = new List<Customer>
        {
            new Customer
            {
                Id = 1,
                Name = "Hans",
                Address = "12 Dundler Mifflin Way",
                Phone = "22345678",
                Email = "hans@tempmail.com"
            }
        };
        
        var orders = new List<Order>
        {
            new Order
            {
                Id = 1,
                OrderDate = DateTime.UtcNow,
                DeliveryDate = DateOnly.FromDateTime(DateTime.UtcNow),
                CustomerId = 1,
                TotalAmount = 100,
                Status = "Processing"
            }
        };
        
        
        _pgCtxSetup.DbContextInstance.Customers.AddRange(customers);
        _pgCtxSetup.DbContextInstance.Orders.AddRange(orders);
        _pgCtxSetup.DbContextInstance.SaveChanges();
        
        var client = CreateClient();
        
        var updateOrder = new UpdateOrderDto
        {
            Id = 1,
            OrderDate = DateTime.UtcNow,
            DeliveryDate = DateOnly.FromDateTime(DateTime.UtcNow),
            CustomerId = 1,
            TotalAmount = 100,
            Status = "Shipped"
        };

        
        var response = await client.PutAsJsonAsync("/api/orders/update/1", updateOrder);
        var responseContent = await response.Content.ReadAsStringAsync();
        var updatedOrder = JsonSerializer.Deserialize<OrderDto>(responseContent, new JsonSerializerOptions() {PropertyNameCaseInsensitive = true});
        _output.WriteLine(responseContent);
        Assert.Equivalent("Shipped", updatedOrder.Status);
    }

    [Fact]
    public async Task CreatePaper()
    {
        var paper = new Paper()
        {
                Id = 1,
                Name = "A4",
                Discontinued = false,
                Price = 10,
                Stock = 100,
                Picture = "A4.jpg"
        };
        
        var client = CreateClient();
        var response = await client.PostAsJsonAsync("/api/Paper/create", paper);
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
    }
    
    
    [Fact]
    public async Task CreateProperty()
    {
        
        var property = new Property()
        {
            Id = 1,
            PropertyName = "Red"
        };
        
        var client = CreateClient();
        var response = await client.PostAsJsonAsync("/api/Property/create", property);
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
    }
    
    
}