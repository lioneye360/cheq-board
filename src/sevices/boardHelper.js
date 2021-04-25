export const createBoard = (title, items) => {
    return {
        id: `board-${Date.now() + (Math.random()*1000000).toFixed(0)}`,
        title: title ? title : 'Board Title',
        items: items && Array.isArray(items) ? items : []
    }
}

export const createItem = (title, content) => {
    return {
        id: `item-${new Date().getTime()}`,
        title: title ? title : 'Item Title',
        content: content ? content : '',
    }
}

// moves an item from one list to another list.
export const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
