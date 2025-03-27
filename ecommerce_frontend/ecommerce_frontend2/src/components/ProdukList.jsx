// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ProdukList.css';

// function ProdukList() {
//   const [produk, setProduk] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [editName, setEditName] = useState('');
//   const [editPrice, setEditPrice] = useState('');
//   const [showEditForm, setShowEditForm] = useState(false);

//   useEffect(() => {
//     axios.get('http://localhost:3001/produk')
//       .then((response) => setProduk(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:3001/produk/${id}`)
//       .then(() => setProduk(produk.filter((p) => p.id !== id)))
//       .catch(err => console.error(err));
//   };

//   const handleEdit = (item) => {
//     setSelectedProduct(item);
//     setEditName(item.nama);
//     setEditPrice(item.harga);
//     setShowEditForm(true);
//   };

//   const handleUpdate = () => {
//     if (!selectedProduct) return;
//     axios.put(`http://localhost:3001/produk/${selectedProduct.id}`, {
//       nama: editName,
//       harga: editPrice
//     })
//     .then((response) => {
//       setProduk(produk.map((p) => p.id === selectedProduct.id ? response.data : p));
//       setSelectedProduct(null);
//       setShowEditForm(false);
//     })
//     .catch((err) => console.error(err));
//   };

//   const handleCancelEdit = () => {
//     setSelectedProduct(null);
//     setShowEditForm(false);
//   };

//   return (
//     <div className="produk-list-container">
//       <h2 className="produk-list-title">Daftar Produk</h2>
//       <ul className="produk-list">
//         {produk.map((item) => (
//           <li key={item.id} className="produk-item">
//             <span className="produk-name">{item.nama}</span>
//             <span className="produk-price">Rp{item.harga}</span>
//             <div className="produk-actions">
//               <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
//               <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {showEditForm && (
//         <div className="edit-form-container">
//           <h3>Edit Produk</h3>
//           <div className="form-group">
//             <label>Nama Produk: </label>
//             <input
//               type="text"
//               value={editName}
//               onChange={(e) => setEditName(e.target.value)}
//               className="form-input"
//             />
//           </div>
//           <div className="form-group">
//             <label>Harga: </label>
//             <input
//               type="number"
//               value={editPrice}
//               onChange={(e) => setEditPrice(e.target.value)}
//               className="form-input"
//             />
//           </div>
//           <button className="save-btn" onClick={handleUpdate}>Simpan</button>
//           <button className="cancel-btn" onClick={handleCancelEdit}>Batal</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProdukList;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProdukList.css'; // Pastikan file CSS ini diimport

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/produk')
      .then((response) => setProduk(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/produk/${id}`)
      .then(() => {
        setProduk(produk.filter((p) => p.id !== id));
        setNotification({ type: 'success', message: 'Produk berhasil dihapus!' });
      })
      .catch(err => {
        setNotification({ type: 'danger', message: 'Gagal menghapus produk!' });
        console.error(err);
      });
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
      setNotification({ type: 'success', message: 'Produk berhasil diperbarui!' });
    })
    .catch((err) => {
      setNotification({ type: 'danger', message: 'Gagal memperbarui produk!' });
      console.error(err);
    });
  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
    setShowEditForm(false);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="col-12 col-md-8 box-shadow p-4">

        {notification && (
          <div className={`alert alert-${notification.type} notification`} role="alert">
            {notification.message}
          </div>
        )}

        <h3 className="text-purple">Daftar Produk</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {produk.map((item) => (
              <tr key={item.id}>
                <td>{item.nama}</td>
                <td>Rp{item.harga}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-danger btn-sm mx-2" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showEditForm && (
          <div className="edit-form-overlay">
            <div className="edit-form">
              <h4>Edit Produk</h4>
              <div className="mb-3">
                <label>Nama Produk: </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Harga: </label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="form-control"
                />
              </div>
              <button className="btn btn-primary" onClick={handleUpdate}>Simpan</button>
              <button className="btn btn-secondary" onClick={handleCancelEdit}>Batal</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProdukList;
