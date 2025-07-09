using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services;

public class AuthSevice : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthSerice(ApplicationDBContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Tas<AuthResponse> LoginAsync(string email, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.passwordHash))
            return new AuthResponse(false, null, "Invalid Credentials");

        var token = GanerateJwtToken(user);
        return new AuthResponse(true, token);
    }

    public async Task<AuthResponse> RegisterAsync(string email, string password, string fullName)
    {
        if (await _context.Users.AnyAsync(u => u.Email == email))
            return new AuthResponse(false, null, "Email already exists");

        var user = new User
        {
            Email = email,
            passwordHash = BCrypt.Net.BCrypt.HashPassword(password),
            fullName = fullName
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = GenerateJwtToken(user);
        return new AuthResponse(true, token);
    }

    private string GenerateJwtToken(User user)
    {
        var TokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.FullName)
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(
                new SymetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = TokenHandler.CreateTokens(tokenDescriptor);
        return TokenHandler.WriteToken(token);
    }
}
