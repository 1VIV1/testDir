using ClothingStoreApi.Data;
using ClothingStoreApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("restock")]
    public async Task<IActionResult> Restock([FromBody] Product incomingProduct)
    {
        var existingProduct = await _context.Products
            .FirstOrDefaultAsync(p => p.Barcode == incomingProduct.Barcode);

        if (existingProduct != null)
        {
            existingProduct.Quantity += incomingProduct.Quantity;
            existingProduct.Price = incomingProduct.Price;
        }
        else
        {
            _context.Products.Add(incomingProduct);
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Товар принят на склад" });
    }

    [HttpGet("report")]
    public async Task<IActionResult> GetReport([FromQuery] string? type, [FromQuery] string? size)
    {
        var query = _context.Products.AsQueryable();

        if (!string.IsNullOrEmpty(type))
            query = query.Where(p => p.Type.ToLower() == type.ToLower());

        if (!string.IsNullOrEmpty(size))
            query = query.Where(p => p.Size.ToLower() == size.ToLower());

        var result = await query.ToListAsync();
        return Ok(result);
    }

    [HttpPost("batch")]
    public async Task<IActionResult> BatchAdd([FromBody] List<Product> products)
    {
        if (products == null || !products.Any()) return BadRequest();

        await _context.Products.AddRangeAsync(products);
        await _context.SaveChangesAsync();
        return Ok("Товары добавлены");
    }

    [HttpPost("batch-delete")]
    public async Task<IActionResult> BatchDelete([FromBody] List<int> ids)
    {
        var products = await _context.Products.Where(p => ids.Contains(p.Id)).ToListAsync();
        _context.Products.RemoveRange(products);
        await _context.SaveChangesAsync();
        return Ok("Товары удалены");
    }

    [HttpPut("batch-update")]
    public async Task<IActionResult> BatchUpdate([FromBody] List<Product> products)
    {
        foreach (var p in products)
        {
            _context.Entry(p).State = EntityState.Modified;
        }
        await _context.SaveChangesAsync();
        return Ok("Товары обновлены");
    }

    [HttpGet("types")]
    public async Task<IActionResult> GetProductTypes()
    {
        var types = await _context.Products
            .Select(p => p.Type)
            .Distinct()
            .Where(t => !string.IsNullOrEmpty(t))
            .OrderBy(t => t)
            .ToListAsync();

        return Ok(types);
    }
}