import './style.css'
import {
  getChildren,
  nodeListToArray,
  setDraggbleAttribute, 
  createRandomId
} from './utils/utils'

const config = {
  dragg_container: 'data-dragg-container', 
}

//event handlers
const onDraggableStart = (event) => {
  const targetId = event.target.dataset.draggId
  event.dataTransfer.setData("text/plain", targetId)
}

const onDrop = (event) => {
  event.preventDefault()
}

const onDragover = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = "move"
}

const addDraggbleEvents = (node) => {
  node.addEventListener('dragstart', onDraggableStart)
}

const addEventForDraggbleZone = (node) => {
  node.addEventListener('drop', onDrop)
  node.addEventListener('dragover', onDragover)
}

const main = () => {
const draggContainers = document.querySelectorAll(`[${config.dragg_container}]`)
if(!draggContainers) return

draggContainers.forEach((draggContainer) => {
  addEventForDraggbleZone(draggContainer)
  const children = nodeListToArray(getChildren(draggContainer))

  children.forEach(node => {
    createRandomId(node)
    setDraggbleAttribute(node)
    addDraggbleEvents(node)
  })
})
}

document.addEventListener('DOMContentLoaded', main)