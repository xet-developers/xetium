using xetiumAPI.Interfaces;
using xetiumAPI.Models;

namespace xetiumAPI.ServerApp.Dal.Models.Repository;

public class UserRepository: IUserRepository
{
    private readonly ApplicationContextDb _contextDb;
    public UserRepository(ApplicationContextDb userContextDb)
    {
        _contextDb = userContextDb;
    }
}