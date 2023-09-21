
/**
 * @typedef {Object} Card
 * @property {string} suit - Suit of the card - Either "club", "spade", "diamond" or "heart"
 * @property {number} rank - Number rank of the card - So 1 for Ace, 2 for Two, 3 for Three, and so on, until 10 for Ten, then 11 for Jack, 12 for Queen and 13 for King
 */

/**
 * Given a poker hand of 5 cards, examines the cards and returns a string describing the type of win.
 *
 * @param {Array.<Card>} hand - Array of the card objects that make up the poker hand.
 * @returns {string} - Returns a string for the type of the win detected:
 *		"highcard" - Five cards which do not form any of the combinations below
 *		"pair" - A hand with two cards of equal rank and three cards which are different from these and from each other
 *		"twopair" - A hand with two pairs of different ranks
 *		"threeofakind" - Three cards of the same rank plus two unequal cards
 *		"straight" - Five cards of mixed suits in sequence
 *		"flush" - Five cards of the same suit
 *		"fullhouse" - Three cards of one rank and two cards of another rank
 *		"fourofakind" - Four cards of the same rank and the fifth card can be anything
 *		"straightflush" - Five cards of the same suit in sequence
 *		"royalflush" - A 10, Jack, Queen, King and Ace ranked cards of the same suit
 */

const TOTAL_CARDS = 5;
const MAX_RANK_DIFF = 4;
const ROYAL_TAIL_LENGTH = 4;
const ACE_RANK = 1;
const BROADWAY_START = 10;
const VALID_RANKS = [...Array(13).keys()].map(i => i + 1);
const VALID_SUITS = ['club', 'spade', 'diamond', 'heart'];
const FOUR_OF_A_KIND_COUNT = 4;
const THREE_OF_A_KIND_COUNT = 3;
const PAIR_COUNT = 2;
const TWO_PAIR_COUNT = 2;

function evaluatePokerHand(hand) {
  validateHand(hand);

  const { rankCounts, suitCounts } = countRanksAndSuits(hand);
  const rankFrequencies = Object.values(rankCounts);
  const ranks = Object.keys(rankCounts).map(Number).sort((a, b) => a - b); // sorted for checking straights and broadway

  /**
   * Constructs an ordered list of hand type conditions.
   * This approach allows for efficient and clean checking of hand types.
   */
  const conditions = [
    [() => isFlush(suitCounts) && isRoyal(ranks), 'royalflush'],
    [() => isFlush(suitCounts) && isStraight(ranks), 'straightflush'],
    [() => rankFrequencies.includes(FOUR_OF_A_KIND_COUNT), 'fourofakind'],
    [() => rankFrequencies.includes(THREE_OF_A_KIND_COUNT) && rankFrequencies.includes(PAIR_COUNT), 'fullhouse'],
    [() => isFlush(suitCounts), 'flush'],
    [() => isStraight(ranks), 'straight'],
    [() => rankFrequencies.includes(THREE_OF_A_KIND_COUNT), 'threeofakind'],
    [() => rankFrequencies.filter(freq => freq === PAIR_COUNT).length === TWO_PAIR_COUNT, 'twopair'],
    [() => rankFrequencies.includes(PAIR_COUNT), 'pair']
  ];

  for (let [conditionFunc, result] of conditions) {
    if (conditionFunc()) return result;
  }

  return 'highcard';
}

/**
 * Count the occurrences of each rank and suit in a poker hand.
 * 
 * @param {Array.<Card>} hand - The poker hand.
 * @returns {Object} - An object containing the count of each rank and suit.
 */
function countRanksAndSuits(hand) {
  const rankCounts = {};
  const suitCounts = {};

  for (let { rank, suit } of hand) {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    suitCounts[suit] = (suitCounts[suit] || 0) + 1;
  }

  return { rankCounts, suitCounts };
}

/**
 * Check if the cards in the hand are of the same suit, thereby forming a flush.
 * 
 * @param {Object} suitCounts - Count of each suit in the hand.
 * @returns {boolean} - True if the hand is a flush, false otherwise.
 */
function isFlush(suitCounts) {
  return Math.max(...Object.values(suitCounts)) === TOTAL_CARDS;
}

/**
 * Check if the cards in the hand form a sequence, making it a straight.
 * Considers both regular straights and the special Ace-high Broadway straight.
 * 
 * @param {Array<number>} ranks - Sorted array of ranks present in the hand.
 * @returns {boolean} - True if the hand is a straight, false otherwise.
 */
function isStraight(ranks) {
  const isBroadway = isRoyal(ranks);
  return (ranks.length === TOTAL_CARDS && ranks[TOTAL_CARDS - 1] - ranks[0] === MAX_RANK_DIFF) || isBroadway;
}

/**
 * Check if the cards in the hand are of the high ranks (10 to King) and include an Ace, 
 * 
 * @param {Array<number>} ranks - Sorted array of ranks present in the hand.
 * @returns {boolean} - True if the hand contains the Broadway cards, false otherwise.
 */
function isRoyal(ranks) {
  return ranks.includes(ACE_RANK) && ranks.slice(-ROYAL_TAIL_LENGTH).every((val, index) => val === BROADWAY_START + index);
}

/**
 * Validates the provided poker hand.
 * Ensures there are exactly 5 cards, all with valid ranks and suits.
 * 
 * @param {Array.<Card>} hand - The poker hand to validate.
 * @throws {Error} - Throws an error if the hand is invalid.
 */
function validateHand(hand) {
  if (!Array.isArray(hand) || hand.length !== TOTAL_CARDS) {
    throw new Error('A valid poker hand must have exactly 5 cards.');
  }

  for (let { rank, suit } of hand) {
    if (!VALID_RANKS.includes(rank)) {
      throw new Error('Invalid rank detected.');
    }
    if (!VALID_SUITS.includes(suit)) {
      throw new Error('Invalid suit detected.');
    }
  }
}


module.exports = evaluatePokerHand;
