using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.Admin;
using Server.Interfaces.Repositories;
using Server.Repositories;
using Server.Services;

namespace Server;

public class Program {
    public static void Main(string[] args) {
        // Load .env file
        Env.Load();
        
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Dependency Injection
        builder.Services.AddScoped<IAdminRepository, AdminRepository>();
        builder.Services.AddScoped<IAdminService, AdminService>();

        builder.Services.AddScoped<TokenService>();

        var app = builder.Build();

        if (app.Environment.IsDevelopment()) {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.UseAuthentication();
        app.MapControllers();

        app.Run();
    }
}