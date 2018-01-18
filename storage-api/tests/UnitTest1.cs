using System;
using Xunit;
using Shouldly;
using TestStack.BDDfy;
using TestStack.BDDfy.Xunit;
using api;

namespace tests
{
    public class UnitTest1
    {
        private int _arg1, _arg2;


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

        [BddfyFact]
        public void CanMultiply()
        {
            this.BDDfy();
        }
    }
}