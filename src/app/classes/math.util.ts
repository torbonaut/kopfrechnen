import {DEFAULT_OPERATORS, Difficulty, Operator, OperatorRange} from '../models/game.model';

export class OperatorUtil {
  public static toString(operator: Operator): string {
    switch ( operator ) {
      case Operator.ADD: return '+'; break;
      case Operator.SUBTRACT: return '-'; break;
      case Operator.MULTIPLY: return '*'; break;
      case Operator.DIVIDE: return '/'; break;
    }
  }
  public static getRandomOperator(operators: Operator[]): Operator {
    if (!operators || operators.length === 0) {
      return null;
    }
    return operators[MathUtil.randomIntInclusive(0, operators.length - 1 )];
  }
}

export class TreeNode {
  protected operator: Operator;
  protected left: TreeNode | number;
  protected right: TreeNode | number;
  protected encapsulateWithParenthesis: boolean;

  constructor(treeLeft: TreeNode | number, treeRight: TreeNode | number, operator: Operator, encapsulateWithParenthesis: boolean = true) {
    this.left = treeLeft;
    this.right = treeRight;
    this.operator = operator;
    this.encapsulateWithParenthesis = encapsulateWithParenthesis;
  }

  public toString(): string {
    return (this.encapsulateWithParenthesis === true ? '(' : '')
      + this.left.toString()
      + OperatorUtil.toString(this.operator)
      + this.right.toString() +
      (this.encapsulateWithParenthesis === true ? ')' : '');
  }

  public toFormattedString(): string {
    return (this.encapsulateWithParenthesis === true ? '<span class="parenthesis">(</span>' : '')
      + '<span class="number numberA">' + (typeof this.left === 'number' ? this.left.toString() : this.left.toFormattedString()) + '</span>'
      + '<span class="operator">' + OperatorUtil.toString(this.operator) + '</span>'
      + '<span class="number numberB">' + (typeof this.right === 'number' ? this.right.toString() : this.right.toFormattedString()) + '</span>'
      + (this.encapsulateWithParenthesis === true ? '<span class="parenthesis">)</span>' : '');
  }
}

export class TermTree {
  protected root: TreeNode;
  protected difficulty: number;
  protected nodeCount: number;
  protected operators: Operator[];

  constructor(difficulty: number, operators: Operator[] = DEFAULT_OPERATORS) {
    this.difficulty = difficulty;
    this.operators = operators;
    switch (difficulty) {
      case Difficulty.TODDLER: this.nodeCount = 2; break;
      case Difficulty.EASY: this.nodeCount = 2; break;
      case Difficulty.MEDIUM: this.nodeCount = 3; break;
      case Difficulty.HARD: this.nodeCount = 3; break;
      case Difficulty.MASTER: this.nodeCount = 4; break;
    }
    this.root = this.buildTree(this.nodeCount, difficulty, false, false) as TreeNode;
  }

  public toString(): string {
    return this.root.toString();
  }

  public toFormattedString(): string {
    return this.root.toFormattedString();
  }

  public calculateResult(): number {
    return 0;
  }

  protected buildTree(
    nodeCount: number,
    difficulty: number,
    leftOrRight: boolean = false,
    parenthesis = true
  ): TreeNode | number {

    if (nodeCount < 1) {
      throw new Error('Tree-->buildTree-->nodeCount < 1 given');
    }

    const operator: Operator = OperatorUtil.getRandomOperator(this.operators);

    const range = this.getOperatorRange(difficulty, operator);

    if (nodeCount === 1) {
      return MathUtil.randomIntInclusive(
        leftOrRight === false ? range.OperatorAMin : range.OperatorBMin,
        leftOrRight === false ? range.OperatorAMax : range.OperatorBMax);
    }

    const numLeft = Math.floor(nodeCount / 2);
    const numRight = Math.ceil(nodeCount / 2);
    const leftSubTree = this.buildTree(numLeft, difficulty, false, true);
    const rightSubTree = this.buildTree(numRight, difficulty, true, true);

    return new TreeNode(leftSubTree, rightSubTree, operator, parenthesis);
  }

  protected getOperatorRange(difficulty: Difficulty, operator: Operator): OperatorRange {
    switch (operator) {
      case Operator.ADD: return this.getAdditionRange(difficulty); break;
      case Operator.SUBTRACT: return this.getSubtractionRange(difficulty); break;
      case Operator.MULTIPLY: return this.getMultiplicationRange(difficulty); break;
      case Operator.DIVIDE: return this.getDivisionRange(difficulty); break;
    }
  }

  protected getAdditionRange(difficulty: Difficulty): OperatorRange {
    switch (difficulty) {
      case Difficulty.TODDLER:
        return { OperatorAMin: 0, OperatorAMax: 10, OperatorBMin: 0, OperatorBMax: 10 };
        break;
      case Difficulty.EASY:
        return { OperatorAMin: -10, OperatorAMax: 10, OperatorBMin: -10, OperatorBMax: 10 };
        break;
      case Difficulty.MEDIUM:
        return { OperatorAMin: -25, OperatorAMax: 25, OperatorBMin: -25, OperatorBMax: 25 };
        break;
      case Difficulty.HARD:
        return { OperatorAMin: -100, OperatorAMax: 100, OperatorBMin: -100, OperatorBMax: 100 };
        break;
      case Difficulty.MASTER:
        return { OperatorAMin: -500, OperatorAMax: 500, OperatorBMin: -500, OperatorBMax: 500 };
        break;
    }
  }

  protected getSubtractionRange(difficulty: Difficulty): OperatorRange {
    switch (difficulty) {
      case Difficulty.TODDLER:
        return { OperatorAMin: 0, OperatorAMax: 10, OperatorBMin: 0, OperatorBMax: 10 };
        break;
      case Difficulty.EASY:
        return { OperatorAMin: -10, OperatorAMax: 10, OperatorBMin: -10, OperatorBMax: 10 };
        break;
      case Difficulty.MEDIUM:
        return { OperatorAMin: -25, OperatorAMax: 25, OperatorBMin: -25, OperatorBMax: 25 };
        break;
      case Difficulty.HARD:
        return { OperatorAMin: -100, OperatorAMax: 100, OperatorBMin: -100, OperatorBMax: 100 };
        break;
      case Difficulty.MASTER:
        return { OperatorAMin: -500, OperatorAMax: 500, OperatorBMin: -500, OperatorBMax: 500 };
        break;
    }
  }

  protected getMultiplicationRange(difficulty: Difficulty): OperatorRange {
    switch (difficulty) {
      case Difficulty.TODDLER:
        return { OperatorAMin: 0, OperatorAMax: 10, OperatorBMin: 0, OperatorBMax: 10 };
        break;
      case Difficulty.EASY:
        return { OperatorAMin: -10, OperatorAMax: 10, OperatorBMin: -10, OperatorBMax: 10 };
        break;
      case Difficulty.MEDIUM:
        return { OperatorAMin: -25, OperatorAMax: 25, OperatorBMin: 0, OperatorBMax: 10 };
        break;
      case Difficulty.HARD:
        return { OperatorAMin: -100, OperatorAMax: 100, OperatorBMin: 0, OperatorBMax: 10 };
        break;
      case Difficulty.MASTER:
        return { OperatorAMin: -100, OperatorAMax: 100, OperatorBMin: -100, OperatorBMax: 100 };
        break;
    }
  }

  protected getDivisionRange(difficulty: Difficulty): OperatorRange {
    switch (difficulty) {
      case Difficulty.TODDLER:
        return { OperatorAMin: 0, OperatorAMax: 10, OperatorBMin: 1, OperatorBMax: 3 };
        break;
      case Difficulty.EASY:
        return { OperatorAMin: -10, OperatorAMax: 10, OperatorBMin: -1, OperatorBMax: 3 };
        break;
      case Difficulty.MEDIUM:
        return { OperatorAMin: -25, OperatorAMax: 25, OperatorBMin: -5, OperatorBMax: 5 };
        break;
      case Difficulty.HARD:
        return { OperatorAMin: -100, OperatorAMax: 100, OperatorBMin: -10, OperatorBMax: 10 };
        break;
      case Difficulty.MASTER:
        return { OperatorAMin: -500, OperatorAMax: 500, OperatorBMin: -25, OperatorBMax: 25 };
        break;
    }
  }

}

export class MathUtil {
  /* get a random int between range a,  b, including both*/
  public static randomIntInclusive(a, b): number {
    const min = Math.ceil(a);
    const max = Math.floor(b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /* get all integer divisors of an integer number */
  public static allDivisors(n: number): number[] {
    if (!n || n === 0) {
      return [];
    }

    const divisors: number[] = [];
    for (let i = 1; i <= n; i++) {
      if (!(n % i)) {
        divisors.push(i);
      }
    }
    return divisors;
  }

  /* greatest common divisor */
  public gcd(a: number, b: number): number {
    let x = Math.abs(a);
    let y = Math.abs(b);

    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

  /* least common multiple */
  public  lcm(x: number, y: number): number {
    return (!x || !y) ? 0 : Math.abs((x * y) / this.gcd(x, y));
  }
}
