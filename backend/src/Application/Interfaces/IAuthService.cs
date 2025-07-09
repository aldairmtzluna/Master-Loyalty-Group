namespace Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponse> LoginAsync(string Email, string password);
    Task<AuthResponse> RegisterAsync(string Email, string password, string fullName);
}