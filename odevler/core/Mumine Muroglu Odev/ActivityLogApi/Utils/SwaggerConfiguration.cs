using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.AspNetCore.Authorization;

namespace ActivityLogApi.Utils
{
    public static class SwaggerConfiguration
    {
        public static IServiceCollection AddSwaggerWithJwt(this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "🚀 Activity Log Api",
                    Version = "v1.0.0",
                    Description = @"**JWT ** destekli REST API örneği. Bu API'nin amacı; kullanıcıların Workout (egzersiz) ve Goal (hedef) verilerini yöneten bir REST API oluşturmaktır.
",
                    Contact = new OpenApiContact
                    {
                    Name = "Pro App",
                    Email = "pro.app@example.com",
                    Url = new Uri("https://www.example.com")
                    },
                    License = new OpenApiLicense
                    {
                    Name = "MIT License",
                    Url = new Uri("https://opensource.org/licenses/MIT")
                    },
                    TermsOfService = new Uri("https://www.example.com/terms"),
                });

                // ✅ JWT tanımı
                var jwtSecurityScheme = new OpenApiSecurityScheme
                {
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Description = "JWT token girin. Örn: **Bearer {token}**",
                    Reference = new OpenApiReference
                    {
                        Id = "Bearer",
                        Type = ReferenceType.SecurityScheme
                    }
                };

                options.AddSecurityDefinition("Bearer", jwtSecurityScheme);

                // ✅ Operation Filter
                options.OperationFilter<AuthorizeCheckOperationFilter>();
            });

            return services;
        }
    }

    // 🔒 [Authorize] attribute’una göre güvenlik gereksinimini ekler
    public class AuthorizeCheckOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var authorizeAttributes = context.MethodInfo
                .GetCustomAttributes(true)
                .OfType<AuthorizeAttribute>()
                .ToList();

            // Eğer controller seviyesinde de varsa ekle
            authorizeAttributes.AddRange(
                context.MethodInfo.DeclaringType?
                    .GetCustomAttributes(true)
                    .OfType<AuthorizeAttribute>()
                ?? Array.Empty<AuthorizeAttribute>()
            );

            if (authorizeAttributes.Any())
            {
                // 🔐 JWT Security
                operation.Security = new List<OpenApiSecurityRequirement>
                {
                    new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            Array.Empty<string>()
                        }
                    }
                };

                // 🧩 Rolleri açıklamaya ekle
                var roles = authorizeAttributes
                    .Where(a => !string.IsNullOrWhiteSpace(a.Roles))
                    .Select(a => a.Roles)
                    .Distinct();

                if (roles.Any())
                {
                    operation.Description +=
                        $"<br/><b>Gerekli Roller:</b> {string.Join(", ", roles)}";
                }
            }
        }
    }
}