using api.Entities;

namespace api.Storage
{
    public interface IStorage
    {
        void Connect();
        void CreateTables();
        void Save(Station station);
        Station LoadStation(int id);
    }
}