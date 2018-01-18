using System;
using Xunit;
using Shouldly;
using TestStack.BDDfy;
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

        [Fact]
        public void CreatesAllTables()
        {
            this.BDDfy();
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
    }
}