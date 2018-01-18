using System;
using Xunit;
using Shouldly;
using TestStack.BDDfy;
using TestStack.BDDfy.Xunit;
using api.Storage;

namespace tests.DynamoDbStorage
{
    public class CreateTables : IDisposable
    {
        private DynamoDb _tested;

        public CreateTables()
        {
            _tested = new DynamoDb();
        }
        public void Dispose()
        {
        }


        void GivenConnection()
        {
        }

        void WhenTablesAreCreated()
        {
        }

        void ThenExpectedTablesShouldExist()
        {
        }

        [BddfyFact]
        public void CreatesAllTables()
        {
            this.BDDfy();
        }
    }
}