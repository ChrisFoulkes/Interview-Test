const assert = require( 'assert' );
const evaluatePokerHand = require( '../js/evaluatePokerHand.js' );

// This file contains all the tests that will be executed against your implementation of the evaluatePokerHand function.
// You should not modify anything in here

describe( "Hand Tests", () => {
    // high cards
    it( "High Card 10", () => {
		const hand = [
			{ rank: 2, suit: "spade" },
			{ rank: 4, suit: "club" },
			{ rank: 6, suit: "diamond" },
			{ rank: 8, suit: "heart" },
			{ rank: 10, suit: "diamond" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "highcard", "Given a hand of no wins, evaluatePokerHand() should return 'highcard'" );
    } );

    it( "High Card king", () => {
		const hand = [
			{ rank: 1, suit: "heart" },
			{ rank: 4, suit: "club" },
			{ rank: 13, suit: "spade" },
			{ rank: 11, suit: "club" },
			{ rank: 9, suit: "diamond" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "highcard", "Given a hand of no wins, evaluatePokerHand() should return 'highcard'" );
    } );

    // pairs
    it( "Pair of twos", () => {
		const hand = [
			{ rank: 2, suit: "heart" },
			{ rank: 6, suit: "club" },
			{ rank: 2, suit: "spade" },
			{ rank: 7, suit: "club" },
			{ rank: 13, suit: "diamond" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "pair", "Given a hand containing a pair, evaluatePokerHand() should return 'pair'" );
    } );

    it( "Pair of kings", () => {
		const hand = [
			{ rank: 13, suit: "heart" },
			{ rank: 6, suit: "club" },
			{ rank: 2, suit: "spade" },
			{ rank: 7, suit: "club" },
			{ rank: 13, suit: "diamond" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "pair", "Given a hand containing a pair, evaluatePokerHand() should return 'pair'" );
    } );

    // two pairs
    it( "Two Pairs - low values", () => {
		const hand = [
			{ rank: 2, suit: "heart" },
			{ rank: 6, suit: "club" },
			{ rank: 2, suit: "spade" },
			{ rank: 7, suit: "club" },
			{ rank: 6, suit: "diamond" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "twopair", "Given a hand containing two pairs, evaluatePokerHand() should return 'twopair'" );
    } );

    it( "Two Pairs - high values", () => {
		const hand = [
			{ rank: 1, suit: "heart" },
			{ rank: 12, suit: "club" },
			{ rank: 1, suit: "spade" },
			{ rank: 9, suit: "club" },
			{ rank: 12, suit: "diamond" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "twopair", "Given a hand containing two pairs, evaluatePokerHand() should return 'twopair'" );
    } );

    // three of a kind
    it( "Three of a Kind", () => {
		const hand = [
			{ rank: 2, suit: "diamond" },
			{ rank: 2, suit: "spade" },
			{ rank: 8, suit: "spade" },
			{ rank: 3, suit: "heart" },
			{ rank: 2, suit: "club" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "threeofakind", "Given a hand containing 3 of a kind, evaluatePokerHand() should return 'threeofakind'" );
    } );

    // straight
    it( "Straight", () => {
		const hand = [
			{ rank: 4, suit: "diamond" },
			{ rank: 6, suit: "club" },
			{ rank: 2, suit: "spade" },
			{ rank: 5, suit: "spade" },
			{ rank: 3, suit: "heart" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "straight", "Given a hand containing a straight, evaluatePokerHand() should return 'straight'" );
    } );

    // straight (wheel)
    it( "Straight (Wheel)", () => {
		const hand = [
			{ rank: 1, suit: "spade" },
			{ rank: 2, suit: "heart" },
			{ rank: 3, suit: "diamond" },
			{ rank: 4, suit: "spade" },
			{ rank: 5, suit: "club" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "straight", "Given a hand containing a wheel straight, evaluatePokerHand() should return 'straight'" );
    } );

    // flush
    it( "Flush 1", () => {
		const hand = [
			{ rank: 2, suit: "heart" },
			{ rank: 12, suit: "heart" },
			{ rank: 1, suit: "heart" },
			{ rank: 9, suit: "heart" },
			{ rank: 6, suit: "heart" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "flush", "Given a hand containing a flush, evaluatePokerHand() should return 'flush'" );
    } );

    it( "Flush 2", () => {
		const hand = [
			{ rank: 9, suit: "spade" },
			{ rank: 10, suit: "spade" },
			{ rank: 11, suit: "spade" },
			{ rank: 12, suit: "spade" },
			{ rank: 6, suit: "spade" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "flush", "Given a hand containing a flush, evaluatePokerHand() should return 'flush'" );
    } );

    // full house
    it( "Full House", () => {
		const hand = [
			{ rank: 9, suit: "heart" },
			{ rank: 4, suit: "spade" },
			{ rank: 9, suit: "spade" },
			{ rank: 4, suit: "diamond" },
			{ rank: 9, suit: "club" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "fullhouse", "Given a hand containing a full house, evaluatePokerHand() should return 'fullhouse'" );
    } );

    // four of a kind
    it( "Four of a Kind", () => {
		const hand = [
			{ rank: 2, suit: "diamond" },
			{ rank: 2, suit: "spade" },
			{ rank: 8, suit: "spade" },
			{ rank: 2, suit: "heart" },
			{ rank: 2, suit: "club" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "fourofakind", "Given a hand containing 4 of a kind, evaluatePokerHand() should return 'fourofakind'" );
    } );

    // straight flush
    it( "Straight Flush", () => {
		const hand = [
			{ rank: 4, suit: "spade" },
			{ rank: 6, suit: "spade" },
			{ rank: 7, suit: "spade" },
			{ rank: 5, suit: "spade" },
			{ rank: 8, suit: "spade" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "straightflush", "Given a hand containing a straight flush, evaluatePokerHand() should return 'straightflush'" );
    } );

    // straight (broadway)
    it( "Straight (Broadway)", () => {
		const hand = [
			{ rank: 10, suit: "spade" },
			{ rank: 11, suit: "heart" },
			{ rank: 12, suit: "diamond" },
			{ rank: 13, suit: "spade" },
			{ rank: 1, suit: "club" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "straight", "Given a hand containing a broadway straight, evaluatePokerHand() should return 'straight'" );
    } );

    // royal flush
    it( "Royal Flush", () => {
		const hand = [
			{ rank: 10, suit: "spade" },
			{ rank: 13, suit: "spade" },
			{ rank: 11, suit: "spade" },
			{ rank: 12, suit: "spade" },
			{ rank: 1, suit: "spade" }
		];
		const winType = evaluatePokerHand( hand );
		assert.equal( winType, "royalflush", "Given a hand containing a royal flush, evaluatePokerHand() should return 'royalflush'" );
    } );
} );
