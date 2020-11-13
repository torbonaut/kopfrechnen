import {Operator} from '../models/game.model';

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
    return operators[Term.randomIntInclusive(0, operators.length - 1)];
  }
}

export class TreeNode {
  public operator: Operator;
  public left: TreeNode | number;
  public right: TreeNode | number;

  constructor(treeLeft: TreeNode | number, treeRight: TreeNode | number, operator: Operator) {
    this.left = treeLeft;
    this.right = treeRight;
    this.operator = operator;
  }

  public toString(): string {
    return '(' + this.left.toString() + OperatorUtil.toString(this.operator) + this.right.toString();
  }
}

export class Tree {
  public root: TreeNode;

  constructor(root: TreeNode) {
    this.root = root;
  }

  public static toString(): string {
    return '';
  }

  public static calculateResult(): number {
    return 0;
  }

  public static buildTree(nodeCount: number, min: number, max: number): TreeNode | number {
    if (nodeCount === 1) {
      return Term.randomIntInclusive(min, max);
    }

    const numLeft = Math.floor(nodeCount / 2);
    const numRight = Math.ceil(nodeCount / 2);
    const leftSubTree = Tree.buildTree(numLeft, 0, 100);
    const rightSubTree = Tree.buildTree(numRight, 0, 100);
    const operator: Operator = OperatorUtil.getRandomOperator([0, 1, 2, 3]);

    return new TreeNode(leftSubTree, rightSubTree, operator);
  }

}

export class Term {
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
