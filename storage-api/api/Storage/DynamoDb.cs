using api.Entities;

namespace api.Storage
{
    public class DynamoDb : IStorage
    {
        public void Connect()
        {

        }

        public void CreateTables()
        {
            throw new System.NotImplementedException();
        }

        public Station LoadStation(int id)
        {
            throw new System.NotImplementedException();
        }

        public void Save(Station station)
        {
            throw new System.NotImplementedException();
        }
    }
}