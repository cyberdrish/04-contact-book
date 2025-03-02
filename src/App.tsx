import React, { useEffect, useState } from "react";

interface Contact {
  name: string;
  city: string;
}

function App() {
  //should use uniqueId(crypto.randomUUID()) for this...
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isEditing, setIsEditing] = useState<Contact | undefined>();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    isEditing && (setName(isEditing.name), setCity(isEditing.city));
  }, [isEditing]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "" || city === "") {
      setIsError(true);
      return;
    }
    setContacts((oldVal) => [...oldVal, { name, city }]);
    resetedit();
  };
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setContacts((oldVal) =>
      oldVal.map((val) =>
        isEditing === val ? { ...val, name, city } : { ...val }
      )
    );

    resetedit();
  };
  const resetedit = () => {
    setCity("");
    setName("");
    setIsEditing(undefined);
    setIsError(false);
  };

  return (
    <>
      <div style={{ display: "grid", gridTemplateRows: "1fr,6fr" }}>
        <form
          style={{ border: "1px solid gray", padding: 10, borderRadius: "5px" }}
          onSubmit={(e) => (!isEditing ? handleSubmit(e) : handleSubmitEdit(e))}
        >
          <h2>Add a new contact</h2>
          <div style={{ display: "flex", gap: 40 }}>
            <div style={{ display: "flex", gap: 5 }}>
              <label>Name</label>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type="Text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {isError && name == "" && (
                  <div style={{ color: "red", marginTop: 1 }}>Enter Name</div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <label>City</label>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type="Text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {isError && city == "" && (
                  <div style={{ color: "red", marginTop: 1 }}>Enter City</div>
                )}
              </div>
            </div>
            {isEditing ? (
              <>
                <button>Save Edited contact</button>
                <button type="reset" onClick={resetedit}>
                  cancel
                </button>
              </>
            ) : (
              <button>Add contact</button>
            )}
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
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h2>{val.name}</h2>
                  <div>{val.city}</div>
                </div>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsEditing(val)}
                >
                  ✏️
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
