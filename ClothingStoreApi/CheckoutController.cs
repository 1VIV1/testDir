using ClothingStoreApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CheckoutController : ControllerBase
{
    private readonly AppDbContext _context;
    private const string UserId = "guest";

    public CheckoutController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Checkout()
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var cartItems = await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == UserId)
                .ToListAsync();

            if (!cartItems.Any()) return BadRequest("Корзина пуста");

            decimal totalSum = 0;

            foreach (var item in cartItems)
            {
                if (item.Product.Quantity < item.Quantity)
                {
                    return BadRequest($"Товара {item.Product.Name} недостаточно на складе");
                }

                item.Product.Quantity -= item.Quantity;
                totalSum += item.Product.Price * item.Quantity;
            }

            var balance = await _context.StoreBalance.FirstAsync();
            balance.TotalBalance += totalSum;

            _context.CartItems.RemoveRange(cartItems);

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new { message = "Покупка успешна", totalPaid = totalSum, storeBalance = balance.TotalBalance });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, "Ошибка при обработке заказа: " + ex.Message);
        }
    }
}