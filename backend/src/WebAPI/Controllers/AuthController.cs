using Application.DTOs;
using Application.Interfaces;
using Microsoft.AppNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttPost("login")]
    public async Task<IActionResult> Login(LoginDTO DTO)
    {
        var result = await _authService.LoginAsync(dto.Email, dto.Password);

        if (!result.Success)
            return BadRequest(new { result.Token });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDTO dto)
    {
        var result = await _authService.RegisterAsync(dto.Email, dto.Password, dto.FullName);

        if (!result.Success)
            return BadRequest(new { result.Error });

        return Ok(new { result.Token });
    }
}