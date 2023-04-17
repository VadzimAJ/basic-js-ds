const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = this._root;
    if (node === null) {
      this._root = new Node(data);
      return;
    } else {
      const searchTree = function(node) {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;
          } else if (node.left !== null) {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }

  has(data) {
    const node = this._root;
    if (node === null) {
      return false;
    } else if (data === node.data) {
      return true;
    } else {
      const searchTree = function(node) {
        if (data < node.data) {
          if (node.left === null) {
            return false;
          } else
            return searchTree(node.left);
        } else if (data > node.data) {
          if (node.right === null) {
            return false;
          } else
            return searchTree(node.right);
        } else {
          return true;
        }
      };
      return searchTree(node);
    }
  }

  find(data) {
    let current = this._root;
    while (current && current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return current ? current : null;
  }

  remove(data) {
    const removeNode = function(node, data) {
      if (node === null) {
        return null;
      }
      if (data === node.data) {
        // node has no children
        if (node.left === null && node.right === null) {
          return null;
        }
        // node has no left child
        if (node.left === null) {
          return node.right;
        }
        // node has no right child
        if (node.right === null) {
          return node.left;
        }
        // node has two children
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this._root = removeNode(this._root, data);
  }

  min() {
    let current = this._root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};