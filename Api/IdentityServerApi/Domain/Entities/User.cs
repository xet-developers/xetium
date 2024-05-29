using System.ComponentModel.DataAnnotations.Schema;
using ExampleCore.Dal.Base;
using Medo;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;


[Table("users")]
public class User: IdentityUser<Guid>
{

    public async Task<IdentityResult> CreateAsync(UserManager<User> userManager, string password)
    {
        Id = new Uuid7().ToGuid();

        var createResult = await userManager.CreateAsync(this,password);

        return createResult;
    }
}