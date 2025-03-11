using HtmlRunnersFirstStage.Api.Extensions;

namespace HtmlRunnersFirstStage.Api
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Load environment variables during development
                ServiceExtensions.LoadEnv();

            // Configure services
            builder.Services.AddAppDbContext();
            builder.Services.ConfigureIdentity();
            builder.Services.ConfigureJwt();
            builder.Services.AddAuthorization();
            builder.Services.ConfigureSwagger();
            builder.Services.AddCorsPolicy();
            builder.Services.RegisterAppServices();

            builder.Services.AddControllers();
            
            builder.Services.AddHostedService<MigrationHostedService>();
            
            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("AllowAll");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles();
            app.MapControllers();
            
            app.MapFallbackToFile("index.html");
            
            await app.RunAsync();
        }
    }
}
