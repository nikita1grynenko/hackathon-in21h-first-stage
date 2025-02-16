using System.Text;
using HtmlRunnersFirstStage.Application.Contracts;
using HtmlRunnersFirstStage.Application.Services;
using HtmlRunnersFirstStage.Domain.Entities;
using HtmlRunnersFirstStage.Infrastructure.Context;
using HtmlRunnersFirstStage.Infrastructure.Contracts;
using HtmlRunnersFirstStage.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace HtmlRunnersFirstStage.Api.Extensions;

public static class ServiceExtensions
{
    public static void LoadEnv()
    {
        var projectRoot = Directory.GetParent(Directory.GetCurrentDirectory())!.FullName;
        var envPath = Path.Combine(projectRoot, "client-app", ".env");

        if (File.Exists(envPath))
        {
            DotNetEnv.Env.Load(envPath);
            Console.WriteLine($"Loaded from .env {envPath}");
        }
        else
        {
            throw new FileNotFoundException(".env file not found!", envPath);
        }
    }
    
    public static void AddAppDbContext(this IServiceCollection services)
    {
        var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION")
            ?? throw new InvalidOperationException("DB_CONNECTION not found in environment variables.");

        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString, sqlOptions =>
            {
                sqlOptions.ExecutionStrategy(dependencies => new SqlServerRetryingExecutionStrategy(
                    dependencies,
                    maxRetryCount: 5,         // кількість повторів
                    maxRetryDelay: TimeSpan.FromSeconds(30), // максимальний інтервал між спробами
                    errorNumbersToAdd: null   // тут можна додати інші номери помилок
                ));
            })
        );

    }

    public static void ConfigureIdentity(this IServiceCollection services)
    {
        services.AddIdentity<ApplicationUser, IdentityRole<Guid>>(options =>
        {
            options.User.RequireUniqueEmail = true;
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = true;
        })
        .AddEntityFrameworkStores<AppDbContext>()
        .AddDefaultTokenProviders();
    }

    public static void ConfigureJwt(this IServiceCollection services)
    {
        var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY")
            ?? throw new InvalidOperationException("JWT_KEY not found in environment variables.");

        var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER")
            ?? throw new InvalidOperationException("JWT_ISSUER not found in environment variables.");

        var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUD")
            ?? throw new InvalidOperationException("JWT_AUD not found in environment variables.");

        var key = Encoding.UTF8.GetBytes(jwtKey);

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = !Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")?.Equals("Development") ?? true;
                options.SaveToken = true;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),

                    ValidateIssuer = true,
                    ValidIssuer = jwtIssuer,

                    ValidateAudience = true,
                    ValidAudience = jwtAudience,

                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,  // Виключаємо додатковий час після `exp`

                    NameClaimType = JwtRegisteredClaimNames.Sub,  // Тепер `User.Identity.Name` = `sub`
                    RoleClaimType = "role"  // Використовується для `[Authorize(Roles = "...")]`
                };
            });

    }

    public static void ConfigureSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "HtmlRunners API", Version = "v1" });

            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "Enter your JWT token in the format: Bearer {token}"
            });

            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                    },
                    new string[] {}
                }
            });
        });
    }

    public static void AddCorsPolicy(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader();
            });
        });
    }

    public static void RegisterAppServices(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IQuestRepository, QuestRepository>();
        services.AddScoped<IQuestService, QuestService>();
        services.AddScoped<IQuestAttemptRepository, QuestAttemptRepository>();
        services.AddScoped<IQuestAttemptService, QuestAttemptService>();
        services.AddScoped<IFeedbackRepository, FeedbackRepository>();
        services.AddScoped<IFeedbackService, FeedbackService>();
    }
}
