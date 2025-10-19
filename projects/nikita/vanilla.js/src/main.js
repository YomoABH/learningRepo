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
  event.target.classList.add('dragging')
  event.dataTransfer.effectAllowed = 'move'
}

const onDraggableEnd = (event) => {
  event.target.classList.remove('dragging')
}

const onDrop = (event) => {
  event.preventDefault()
}

const onDragover = (event) => {
  event.preventDefault()
  const dragging = document.querySelector('.dragging')
  if (!dragging) return

  const container = document.querySelector(`[data-dragg-id="${dragging.dataset.parentId}"]`)
  console.log(event.target)
  container.insertBefore(dragging, event.target)
}

const addDraggbleEvents = (node) => {
  node.addEventListener('dragstart', onDraggableStart)
  node.addEventListener('dragend', onDraggableEnd)
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
  createRandomId(draggContainer)
  
  const children = nodeListToArray(getChildren(draggContainer))

  children.forEach(node => {
    createRandomId(node)
    node.dataset.parentId = draggContainer.dataset.draggId
    setDraggbleAttribute(node)
    addDraggbleEvents(node)
  })

})}

document.addEventListener('DOMContentLoaded', main)