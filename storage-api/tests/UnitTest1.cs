using System;
using Xunit;
using Shouldly;
using TestStack.BDDfy;
using api;

namespace tests
{
    public class UnitTest1
    {
        private int _arg1, _arg2;

        [Fact]
        public void CanMultiply()
        {
            this.BDDfy();
        }

        void GivenISetArg1ToFive()
        {
            _arg1 = 5;
        }

        void AndGivenISetArg2ToFifty()
        {
            _arg2 = 50;
        }

        void ThenResultShouldBe250()
        {
            DummyForTest.Multiply(_arg1, _arg2).ShouldBe(250);
        }
    }
}