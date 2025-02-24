import React, { useState } from "react";

interface Contact {
  name: string;
  city: string;
}

function App() {
  // can use nameRef = useRef() hook then get value like nameRef.current.value  or can use useState() hook
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContacts((oldVal) => [...oldVal, { name, city }]);
    setName("");
    setCity("");
    console.log(contacts);
  };

  return (
    <>
      <div style={{ display: "grid", gridTemplateRows: "1fr,6fr" }}>
        <form
          style={{ border: "1px solid gray", padding: 10, borderRadius: "5px" }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <h2>Add a new contact</h2>
          <div style={{ display: "flex", gap: 40 }}>
            <div style={{ display: "flex", gap: 5 }}>
              <label>Name</label>
              <input
                type="Text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <label>City</label>
              <input
                type="Text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <button>Add contact</button>
          </div>
        </form>
        <div>
          <h2>All Contacts:-</h2>
          {contacts &&
            contacts.map((val, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid teal",
                  padding: 10,
                  borderRadius: "5px",
                  marginTop: 3,
                }}
              >
                <h2>{val.name}</h2>
                <div>{val.city}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
