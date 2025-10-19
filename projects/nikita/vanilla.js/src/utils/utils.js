export const getChildren = (node) => node.children
export const nodeListToArray = (nodeList) => Array.from(nodeList)
export const setDraggbleAttribute = (node) => node.setAttribute('draggable', true)
export const createRandomId = (node) => node.setAttribute('data-dragg-id', performance.now() + Math.random())