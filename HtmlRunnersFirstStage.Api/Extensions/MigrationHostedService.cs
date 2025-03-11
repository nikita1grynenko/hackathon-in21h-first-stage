using HtmlRunnersFirstStage.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace HtmlRunnersFirstStage.Api.Extensions;

public class MigrationHostedService(IServiceProvider serviceProvider, ILogger<MigrationHostedService> logger)
    : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        try
        {
            await context.Database.MigrateAsync(cancellationToken);
            logger.LogInformation("Database migration completed successfully.");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred during migration");
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}