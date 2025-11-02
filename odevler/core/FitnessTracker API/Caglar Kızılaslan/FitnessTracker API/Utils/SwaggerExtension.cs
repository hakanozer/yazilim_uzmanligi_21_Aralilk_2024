using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Reflection;

namespace FitnessTracker_API.Utils
{
    // Default değerleri örnek olarak kullanmak için Schema Filter
    public class DefaultValueSchemaFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            if (schema.Properties == null || context.Type == null)
                return;

            var properties = context.Type.GetProperties(BindingFlags.Public | BindingFlags.Instance);
            
            foreach (var property in properties)
            {
                var camelCaseName = ToCamelCase(property.Name);
                if (schema.Properties.ContainsKey(camelCaseName))
                {
                    var propertySchema = schema.Properties[camelCaseName];
                    
                    // Property'nin default değerini al
                    try
                    {
                        var instance = Activator.CreateInstance(context.Type);
                        if (instance != null)
                        {
                            var defaultValue = property.GetValue(instance);
                            
                            if (defaultValue != null && !string.IsNullOrEmpty(defaultValue.ToString()))
                            {
                                propertySchema.Example = new Microsoft.OpenApi.Any.OpenApiString(defaultValue.ToString());
                            }
                        }
                    }
                    catch
                    {
                        // Hata durumunda devam et
                    }
                }
            }
        }

        private string ToCamelCase(string name)
        {
            if (string.IsNullOrEmpty(name) || char.IsLower(name[0]))
                return name;
            return char.ToLowerInvariant(name[0]) + name.Substring(1);
        }
    }

    // Login endpoint'i için özel örnek ayarlama
    public class LoginExampleFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            // Sadece User/Login endpoint'i için
            if (context.MethodInfo.Name == "Login" && context.MethodInfo.DeclaringType?.Name == "UserController")
            {
                if (operation.RequestBody?.Content != null)
                {
                    foreach (var content in operation.RequestBody.Content)
                    {
                        if (content.Key == "application/json")
                        {
                            // Örnek değeri ayarla
                            content.Value.Example = new Microsoft.OpenApi.Any.OpenApiObject
                            {
                                ["email"] = new Microsoft.OpenApi.Any.OpenApiString("veli@mail.com"),
                                ["password"] = new Microsoft.OpenApi.Any.OpenApiString("123456")
                            };
                            
                            // Schema'da da örnek değerleri ayarla
                            if (content.Value.Schema != null && content.Value.Schema.Properties != null)
                            {
                                if (content.Value.Schema.Properties.ContainsKey("email"))
                                {
                                    content.Value.Schema.Properties["email"].Example = new Microsoft.OpenApi.Any.OpenApiString("veli@mail.com");
                                }
                                if (content.Value.Schema.Properties.ContainsKey("password"))
                                {
                                    content.Value.Schema.Properties["password"].Example = new Microsoft.OpenApi.Any.OpenApiString("123456");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public static class SwaggerExtension
    {
        public static IServiceCollection AddSwaggerServices(this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Fitness Tracker API",
                    Version = "v1",
                    Description = "Fitness aktivitelerini ve kullanıcı yönetimini içeren JWT tabanlı kimlik doğrulama ile korunan bir API.",
                    Contact = new OpenApiContact
                    {
                        Name = "Fitness Tracker Team",
                    },
                });

                // Swagger Annotations'ı etkinleştir
                c.EnableAnnotations();

                // Default değerleri örnek olarak kullanmak için Schema Filter ekle
                c.SchemaFilter<DefaultValueSchemaFilter>();

                // Login endpoint'i için özel örnek ekle
                c.OperationFilter<LoginExampleFilter>();

                // Controller sıralamasını ayarla (User en üstte)
                c.OrderActionsBy(apiDesc =>
                {
                    var controllerName = apiDesc.ActionDescriptor.RouteValues["controller"] ?? "";
                    // User controller'ı en üstte, diğerleri alfabetik sırada
                    if (controllerName.Equals("User", StringComparison.OrdinalIgnoreCase))
                        return "0_" + controllerName;
                    return "1_" + controllerName;
                });

                // JWT kimlik doğrulama için Swagger yapılandırması
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token in the text input below. Example: \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
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
                });
            });

            return services;
        }

        public static WebApplication UseSwaggerServices(this WebApplication app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Fitness Tracker API v1");
                c.RoutePrefix = string.Empty; // Ana sayfada Swagger UI göster
                c.DisplayRequestDuration();
                c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.List);
                c.EnableFilter(); // Arama filtresini etkinleştir
                c.DefaultModelRendering(ModelRendering.Example); // Modelleri örnek olarak göster
            });

            return app;
        }
    }
}