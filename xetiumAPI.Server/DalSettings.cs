namespace xetiumAPI.ServerApp;

public class DalSettings
{
    public string ConnectionString { get; }

    public DalSettings(IConfiguration configuration)
    {
        ConnectionString = configuration.GetConnectionString("DefaultConnection");
    }
}