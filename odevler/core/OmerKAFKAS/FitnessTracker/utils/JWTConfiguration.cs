using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FitnessTracker.API.Utils
{
    public static class JWTConfiguration
    {
        public static void AddJwtAuthentication(this IServiceCollection services, IConfiguration config)
        {
            var jwtSettings = config.GetSection("Jwt");
            var keyString = jwtSettings["Key"];
            if (string.IsNullOrEmpty(keyString))
                throw new InvalidOperationException("JWT Key is missing in configuration.");

            var key = Encoding.UTF8.GetBytes(keyString);



            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            });
        }
    }
}