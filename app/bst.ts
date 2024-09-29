export class Node<T> {
    data: T;
    left: Node<T> | null = null;
    right: Node<T> | null = null;
    height: number = 1;

    constructor(data: T) {
        this.data = data;
    }
}

export class BalancedBST<T> {
    root: Node<T> | null = null;

    // Get height of the node
    getHeight(node: Node<T> | null): number {
        return node ? node.height : 0;
    }

    // Rotate right
    rotateRight(y: Node<T>): Node<T> {
        const x = y.left!;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x;
    }

    // Rotate left
    rotateLeft(x: Node<T>): Node<T> {
        const y = x.right!;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        return y;
    }

    // Balance factor
    getBalanceFactor(node: Node<T>): number {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    // Insert method
    insert(node: Node<T> | null, data: T): Node<T> {
        if (!node) {
            return new Node(data);
        }

        if (data < node.data) {
            node.left = this.insert(node.left, data);
        } else if (data > node.data) {
            node.right = this.insert(node.right, data);
        } else {
            return node;
        }

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

        const balance = this.getBalanceFactor(node);

        // Left heavy
        if (balance > 1 && data < node.left!.data) {
            return this.rotateRight(node);
        }

        // Right heavy
        if (balance < -1 && data > node.right!.data) {
            return this.rotateLeft(node);
        }

        // Left-right case
        if (balance > 1 && data > node.left!.data) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right-left case
        if (balance < -1 && data < node.right!.data) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Public insert method
    public add(data: T): void {
        this.root = this.insert(this.root, data);
    }

    // Find method
    public find(data: T): boolean {
        let current = this.root;

        while (current) {
            if (data === current.data) {
                return true;
            } else if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    // Delete method (AVL deletion with rebalance)
    delete(node: Node<T> | null, data: T): Node<T> | null {
        if (!node) {
            return null;
        }

        if (data < node.data) {
            node.left = this.delete(node.left, data);
        } else if (data > node.data) {
            node.right = this.delete(node.right, data);
        } else {
            // Node with one child or no child
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                // Node with two children
                const minLargerNode = this.getMinValueNode(node.right);
                node.data = minLargerNode.data;
                node.right = this.delete(node.right, minLargerNode.data);
            }
        }

        if (!node) return node;

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        const balance = this.getBalanceFactor(node);

        if (balance > 1 && this.getBalanceFactor(node.left!) >= 0) {
            return this.rotateRight(node);
        }

        if (balance > 1 && this.getBalanceFactor(node.left!) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        if (balance < -1 && this.getBalanceFactor(node.right!) <= 0) {
            return this.rotateLeft(node);
        }

        if (balance < -1 && this.getBalanceFactor(node.right!) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Helper to find the node with the smallest value
    getMinValueNode(node: Node<T>): Node<T> {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    public remove(data: T): void {
        this.root = this.delete(this.root, data);
    }
}
