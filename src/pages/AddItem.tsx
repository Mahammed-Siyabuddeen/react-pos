import React, { useState } from "react";

const AddItem: React.FC = () => {
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemGroup, setItemGroup] = useState("All Item Groups");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ itemCode, itemName, itemGroup });
    // You can replace this with API call to Frappe or your backend
    const fetchAddItem = async () => {
        const apiurl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${apiurl}/api/resource/Item`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    item_code: itemCode,
                    item_name: itemName,
                    item_group: itemGroup
                }),
                credentials: "include"
            });
            if (response.ok) {
                console.log("Item added successfully");
            } else {
                console.log("Failed to add item");
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };
    fetchAddItem();
    // Reset form
    setItemCode("");
    setItemName("");
    setItemGroup("All Item Groups");
  };

  // useEffect(() => {
  //   // Fetch item groups from Frappe if needed
  //   const fetchItems = async () => {
  //       const apiurl = "http://127.0.0.1:8000";
  //       try {
  //           const response = await fetch(`${apiurl}/api/resource/Item Group`, {
  //               method: 'GET',
  //               headers: {
  //                   "Content-Type": "application/json"
  //               },
  //               credentials: "include"
  //           });
  //           if (response.ok) {
  //               const data = await response.json();
  //               console.log("Fetched item groups:", data);
  //               // You can set item groups to state if you want to populate a dropdown
  //           } else {
  //               console.log("Failed to fetch item groups");
  //           }
  //       } catch (error) {
  //           console.error('Error fetching item groups:', error);
  //       }
  //   };
  //   fetchItems();
  // }, []);

  return (
    <div className="add-item-container">
      <form className="add-item-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add Item</h2>

        <div className="form-group">
          <label htmlFor="item_code">Item Code</label>
          <input
            id="item_code"
            type="text"
            placeholder="Enter item code"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="item_name">Item Name</label>
          <input
            id="item_name"
            type="text"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="item_group">Item Group</label>
          <select
            id="item_group"
            value={itemGroup}
            onChange={(e) => setItemGroup(e.target.value)}
          >
            <option value="All Item Groups">All Item Groups</option>
            <option value="Electronics">Electronics</option>
            <option value="Stationery">Stationery</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
