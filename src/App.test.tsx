import React from 'react';

describe('trivial test', () => {
  const whosAGoodPuppy = (goodDog?: string) => 'YOU ARE!!!'
  it('should pass', () => {
    const sut = whosAGoodPuppy
    expect(sut()).toStrictEqual('YOU ARE!!!')
  })
});
