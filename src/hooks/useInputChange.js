import { useState } from "react";

export default function useInputChange(defaultObj) {
  let [obj, setObj] = useState(defaultObj || {});
  function onUpdate(event) {
    obj[event.target.id] = event.target.value || event.target.checked;
    setObj({...obj});
  }
  return [obj, onUpdate];
}
