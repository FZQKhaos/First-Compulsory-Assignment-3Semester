using System.Text.Json;
using API.Middleware;
using DataAccess;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Service;
using Service.Validators;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddOptionsWithValidateOnStart<AppOptions>()
            .Bind(builder.Configuration.GetSection(nameof(AppOptions)))
            .ValidateDataAnnotations()
            .Validate(options => new AppOptionsValidator().Validate(options).IsValid,
                $"{nameof(AppOptions)} validation failed");
        builder.Services.AddDbContext<DunderMifflinContext>((serviceProvider, options) =>
        {
            var appOptions = serviceProvider.GetRequiredService<IOptions<AppOptions>>().Value;
            options.UseNpgsql(Environment.GetEnvironmentVariable("DbConnectionString") 
                              ?? appOptions.DbConnectionString);
            options.EnableSensitiveDataLogging();
        });
        builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<CreateCustomerValidator>());
        builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<UpdateCustomerValidator>());
        builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<CreateOrderEntryValidator>());
        builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<UpdateOrderEntryValidator>());
        builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<CreatePaperValidator>());
        builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<CreatePropertyValidator>());
        builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<UpdatePaperValidator>());
        builder.Services.AddScoped<IDunderMifflinService, DunderMifflinService>();
        builder.Services.AddControllers();
        builder.Services.AddOpenApiDocument();

        var app = builder.Build();

        var options = app.Services.GetRequiredService<IOptions<AppOptions>>().Value;
        Console.WriteLine("APP OPTIONS: " + JsonSerializer.Serialize(options));

      //  app.UseHttpsRedirection();

        app.UseRouting();

        app.UseOpenApi();
        app.UseSwaggerUi();
        app.UseStatusCodePages();

        //app.UseMiddleware<RequestResponseLoggingMiddleware>();
      app.UseCors(config => config.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

        app.UseEndpoints(endpoints => endpoints.MapControllers());

        using (var scope = app.Services.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<DunderMifflinContext>();
            context.Database.EnsureCreated();
        }

        app.Run();
    }
    
}