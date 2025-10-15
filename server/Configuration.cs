namespace Server;

static class Configuration {
    internal static string JWT_SECRET { get; } = Environment.GetEnvironmentVariable("JWT_SECRET");

    internal static string SECRET_USER_PASSWORD { get; } =
        BCrypt.Net.BCrypt.HashPassword(Environment.GetEnvironmentVariable("SECRET_USER_PASSWORD"));
}