
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RPBooking.Infrastructure.Persistence;
using Scalar.AspNetCore;
using MediatR;
using RPBooking.Features;

namespace RPBooking
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            //DB Contexts
            builder.Services.AddDbContext<AppDbContext>
                (options => options.UseSqlServer
                (builder.Configuration.GetConnectionString("DomainDBConnection")));

            //Registering MediatR
            builder.Services.AddMediatR(typeof(Program));

            var app = builder.Build();

            //Endpoints
            app.MapGet("/api/test", () => Results.Ok(new
            {
                Status = "Online",
                Message = "Hello :)",
                Timestamp = DateTime.Now,
            }));

            app.MapFeatureEndpoints();



            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                //Temp scope to resolve scoped services
                using var scope = app.Services.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                
                //Run Migration and Seed data
                await AppDbContextSeed.SeedAsync(context); 

                app.MapOpenApi();

                app.MapScalarApiReference(options =>
                {
                    options.WithTitle("RP Booking Backend");
                    options.WithTheme(ScalarTheme.DeepSpace);
                    options.WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
