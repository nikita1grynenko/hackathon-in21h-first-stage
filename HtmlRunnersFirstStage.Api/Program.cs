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
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using DotNetEnv;

namespace HtmlRunnersFirstStage.Api
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            if (builder.Environment.IsDevelopment())
            {
                var projectRoot = Directory.GetParent(Directory.GetCurrentDirectory())!.FullName;
                var envPath = Path.Combine(projectRoot, "client-app", ".env");

                if (File.Exists(envPath))
                {
                    Env.Load(envPath);
                    Console.WriteLine($"Завантажено .env із {envPath}");
                }
                else
                {
                    Console.WriteLine("Файл .env не знайдено!");
                }
            }

            var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION");
            
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(connectionString));

            // Налаштовуємо Identity (автентифікацію користувачів)
            builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>(options =>
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
            
            //Додаємо підтримку контролерів
            builder.Services.AddControllers();

            // Отримуємо налаштування JWT із `appsettings.json`
            var jwtKey = builder.Configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new ArgumentNullException("Jwt:Key", "JWT ключ не заданий у конфігурації.");
            }

            var jwtIssuer = builder.Configuration["Jwt:Issuer"];
            var jwtAudience = builder.Configuration["Jwt:Audience"];
            var key = Encoding.UTF8.GetBytes(jwtKey);

            // Налаштовуємо JWT-аутентифікацію
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false; // Для локального тестування (на продакшені включи!)
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = jwtIssuer,
                    ValidateAudience = true,
                    ValidAudience = jwtAudience,
                    ValidateLifetime = true
                };
            });

            // Додаємо авторизацію
            builder.Services.AddAuthorization();

            // Реєструємо сервіси та репозиторії
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IQuestRepository, QuestRepository>();
            builder.Services.AddScoped<IQuestService, QuestService>();
            builder.Services.AddScoped<IQuestAttemptRepository, QuestAttemptRepository>();
            builder.Services.AddScoped<IQuestAttemptService, QuestAttemptService>();
            builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();
            builder.Services.AddScoped<IFeedbackService, FeedbackService>();

            // Додаємо CORS (дозволяємо всі запити)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            // Додаємо Swagger + підтримку JWT
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "HtmlRunners API", Version = "v1" });

                // Додаємо кнопку "Authorize" у Swagger для JWT
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Введіть свій JWT-токен у форматі: Bearer {токен}"
                });

                // Додаємо JWT-авторизацію до всіх запитів
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

            var app = builder.Build();

            // Додаємо Swagger UI
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            
            // Активуємо CORS
            app.UseCors("AllowAll");
            
            app.UseRouting();
            // Аутентифікація та авторизація (ВАЖЛИВО: ПРАВИЛЬНИЙ ПОРЯДОК)
            app.UseAuthentication();
            
            app.UseAuthorization();

            app.UseStaticFiles(); // Дозволяє обслуговування статичних файлів (JS, CSS, HTML)
            app.MapControllers(); // API-контролери
            app.MapFallbackToFile("index.html"); // SPA fallback
            
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<AppDbContext>();
                await context.Database.MigrateAsync();
            }
            catch(Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occured during migration");
            }
            
            

            await app.RunAsync();
        }
    }
}
