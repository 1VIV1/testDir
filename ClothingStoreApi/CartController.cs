using ClothingStoreApi.Data;
using ClothingStoreApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly AppDbContext _context;
    private const string UserId = "guest";

    public CartController(AppDbContext context)
    {
        _context = context;
    }
   
    [HttpPost("add")]
    public async Task<IActionResult> AddToCart(int productId, int quantity)
    {
        var product = await _context.Products.FindAsync(productId);
        if (product == null) return NotFound("Товар не найден");

        if (product.Quantity < quantity) return BadRequest("Недостаточно товара на складе");

        var cartItem = await _context.CartItems
            .FirstOrDefaultAsync(c => c.ProductId == productId && c.UserId == UserId);

        if (cartItem != null)
        {
            cartItem.Quantity += quantity;
        }
        else
        {
            _context.CartItems.Add(new CartItem
            {
                ProductId = productId,
                Quantity = quantity,
                UserId = UserId
            });
        }

        await _context.SaveChangesAsync();
        return Ok("Товар добавлен в корзину");
    }


    [HttpPost("decrease")]
    public async Task<IActionResult> DecreaseInCart(int productId, int quantity)
    {
        var product = await _context.Products.FindAsync(productId);
        if (product == null) return NotFound("Товар не найден");

        var cartItem = await _context.CartItems
            .FirstOrDefaultAsync(c => c.ProductId == productId && c.UserId == UserId);

        if (cartItem != null && cartItem.Quantity>1)
        {
            cartItem.Quantity -= quantity;
        }
        else
        {
            await RemoveFromCart(productId);
            return Ok("Товар удален из корзины");
        }

        await _context.SaveChangesAsync();
        return Ok("Количество товара уменьшено");
    }

    [HttpDelete("remove/{productId}")]
    public async Task<IActionResult> RemoveFromCart(int productId)
    {
        var item = await _context.CartItems
            .FirstOrDefaultAsync(c => c.ProductId == productId && c.UserId == UserId);

        if (item == null) return NotFound("Товар не в корзине");

        _context.CartItems.Remove(item);
        await _context.SaveChangesAsync();
        return Ok("Товар удален из корзины");
    }

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var items = await _context.CartItems.Include(c => c.Product).Where(c => c.UserId == UserId).ToListAsync();
        return Ok(items);
    }
}