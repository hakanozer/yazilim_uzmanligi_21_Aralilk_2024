using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.AspNetCore.Authorization;

namespace RestApi.Utils
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
                    Title = "🚀 Fitness Rest API Dokümantasyonu",
                    Version = "v1.0.0",
                    Description = @"**JWT ve kimlik doğrulama** destekli REST API örneği. Bu API; kullanıcı kaydı, oturum açma, çalışma oluşturma ve takip etme işlemleri gibi endpoint'ler içerir.",
                    Contact = new OpenApiContact
                    {
                    Name = "Haktan Erbaktı",
                    Email = "haktan-e@hotmail.com",
                    Url = new Uri("https://www.example.com")
                    },
                    License = new OpenApiLicense
                    {
                    Name = "MIT License",
                    Url = new Uri("https://opensource.org/licenses/MIT")
                    },
                    TermsOfService = new Uri("https://www.example.com/terms"),
                });

                
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

                
                options.OperationFilter<AuthorizeCheckOperationFilter>();
            });

            return services;
        }
    }

    
    public class AuthorizeCheckOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var authorizeAttributes = context.MethodInfo
                .GetCustomAttributes(true)
                .OfType<AuthorizeAttribute>()
                .ToList();

            
            authorizeAttributes.AddRange(
                context.MethodInfo.DeclaringType?
                    .GetCustomAttributes(true)
                    .OfType<AuthorizeAttribute>()
                ?? Array.Empty<AuthorizeAttribute>()
            );

            if (authorizeAttributes.Any())
            {
                
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

            
            }
        }
    }
}