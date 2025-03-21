// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ProdukList() {
//   const [produk, setProduk] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [editName, setEditName] = useState('');
//   const [editPrice, setEditPrice] = useState('');
//   const [showEditForm, setShowEditForm] = useState(false);

//   useEffect(() => {
//     // GET
//     axios.get('http://localhost:3001/produk')
//       .then((response) => setProduk(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   // DELETE
//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:3001/produk/${id}`)
//       .then(() => {
//         setProduk(produk.filter((p) => p.id !== id));
//       })
//       .catch(err => console.error(err));
//   };

//   // Fungsi untuk memunculkan form edit dan isi form dengan data produk terpilih
//   const handleEdit = (item) => {
//     setSelectedProduct(item);
//     setEditName(item.nama);
//     setEditPrice(item.harga);
//     setShowEditForm(true);
//   };

//   // PUT
//   const handleUpdate = () => {
//     if (!selectedProduct) return;
//     axios.put(`http://localhost:3001/produk/${selectedProduct.id}`, {
//       nama: editName,
//       harga: editPrice
//     })
//     .then((response) => {
//       setProduk(produk.map((p) => 
//         p.id === selectedProduct.id ? response.data : p
//       ));
//       setSelectedProduct(null);
//       setShowEditForm(false);
//     })
//     .catch((err) => console.error(err));
//   };

//   // Batal edit
//   const handleCancelEdit = () => {
//     setSelectedProduct(null);
//     setShowEditForm(false);
//   };

//   return (
//     <div>
//       <h2>Daftar Produk</h2>
//       <ul>
//         {produk.map((item) => (
//           <li key={item.id}>
//             {item.nama} - Rp{item.harga}
//             &nbsp;
//             <button onClick={() => handleEdit(item)}>Edit</button>
//             &nbsp;
//             <button onClick={() => handleDelete(item.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>

//       {/* Form edit hanya muncul ketika showEditForm bernilai true */}
//       {showEditForm && (
//         <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '16px' }}>
//           <h3>Edit Produk</h3>
//           <div>
//             <label>Nama Produk: </label>
//             <input
//               type="text"
//               value={editName}
//               onChange={(e) => setEditName(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Harga: </label>
//             <input
//               type="number"
//               value={editPrice}
//               onChange={(e) => setEditPrice(e.target.value)}
//             />
//           </div>
//           <button onClick={handleUpdate}>Simpan</button>
//           &nbsp;
//           <button onClick={handleCancelEdit}>Batal</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProdukList;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProdukList.css';

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/produk')
      .then((response) => setProduk(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/produk/${id}`)
      .then(() => setProduk(produk.filter((p) => p.id !== id)))
      .catch(err => console.error(err));
  };

  const handleEdit = (item) => {
    setSelectedProduct(item);
    setEditName(item.nama);
    setEditPrice(item.harga);
    setShowEditForm(true);
  };

  const handleUpdate = () => {
    if (!selectedProduct) return;
    axios.put(`http://localhost:3001/produk/${selectedProduct.id}`, {
      nama: editName,
      harga: editPrice
    })
    .then((response) => {
      setProduk(produk.map((p) => p.id === selectedProduct.id ? response.data : p));
      setSelectedProduct(null);
      setShowEditForm(false);
    })
    .catch((err) => console.error(err));
  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
    setShowEditForm(false);
  };

  return (
    <div className="produk-list-container">
      <h2 className="produk-list-title">Daftar Produk</h2>
      <ul className="produk-list">
        {produk.map((item) => (
          <li key={item.id} className="produk-item">
            <span className="produk-name">{item.nama}</span>
            <span className="produk-price">Rp{item.harga}</span>
            <div className="produk-actions">
              <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {showEditForm && (
        <div className="edit-form-container">
          <h3>Edit Produk</h3>
          <div className="form-group">
            <label>Nama Produk: </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Harga: </label>
            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              className="form-input"
            />
          </div>
          <button className="save-btn" onClick={handleUpdate}>Simpan</button>
          <button className="cancel-btn" onClick={handleCancelEdit}>Batal</button>
        </div>
      )}
    </div>
  );
}

export default ProdukList;
