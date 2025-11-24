import { useState, useCallback } from 'react';

const useUndoRedo = (initialState) => {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState(initialState);
  const [future, setFuture] = useState([]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setFuture([present, ...future]);
    setPresent(previous);
  }, [past, present, future, canUndo]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  }, [past, present, future, canRedo]);

  const set = useCallback((newPresent) => {
    if (newPresent === present) return;

    setPast([...past, present]);
    setPresent(newPresent);
    setFuture([]);
  }, [past, present]);

  // Helper to handle functional updates like setState(prev => ...)
  const update = useCallback((action) => {
    if (typeof action === 'function') {
      set(action(present));
    } else {
      set(action);
    }
  }, [present, set]);

  return [present, update, { undo, redo, canUndo, canRedo, past, future }];
};

export default useUndoRedo;
