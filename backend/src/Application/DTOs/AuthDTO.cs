namespace Application.DTOs;
public record AuthREsponse(bool Success, string Token, string Error = null);
public record LoginDTO(string Email, string Password);
public record RegisterDTO(string Email, string Password, string FullName);