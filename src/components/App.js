import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then(setToys);
  }, []);

  function handleClick() {
    setShowForm((current) => !current);
  }

  function handleAddToy(newToy) {
    setToys((currentToys) => [...currentToys, newToy]);
  }

  function handleDeleteToy(toyToDelete) {
    setToys((currentToys) =>
      currentToys.filter((toy) => toy.id !== toyToDelete.id)
    );
  }

  function handleUpdateToy(updatedToy) {
    setToys((currentToys) =>
      currentToys.map((toy) =>
        toy.id === updatedToy.id ? updatedToy : toy
      )
    );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;
