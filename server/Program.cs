using System.Text;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Server.Data;
using Server.Interfaces.Repositories;
using Server.Interfaces.Services;
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
        builder.Services.AddScoped<IAuthService, AuthService>();

        builder.Services.AddScoped<IClassRepository, ClassRepository>();
        builder.Services.AddScoped<IClassService, ClassService>();
        
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();

        builder.Services.AddScoped<IStudentService, StudentService>();
        builder.Services.AddScoped<IStudentRepository, StudentRepository>();
        

        builder.Services.AddScoped<TokenService>();

        // JWT Authentication
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
            options.Events = new JwtBearerEvents {
                OnMessageReceived = context => {
                    context.Token = context.Request.Cookies["token"];
                    return Task.CompletedTask;
                }
            };
            options.TokenValidationParameters = new TokenValidationParameters {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.ASCII.GetBytes(Configuration.JWT_SECRET)
                )
            };
        });

        var app = builder.Build();

        if (app.Environment.IsDevelopment()) {
            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Server v1");
                c.RoutePrefix = "";
            });
            
        }

        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}