// import React, { useState } from 'react';
// import axios from 'axios';
// import './TambahProduk.css';

// function TambahProduk() {
//   const [nama, setNama] = useState('');
//   const [harga, setHarga] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!nama || !harga) {
//       setError('Nama dan Harga wajib diisi');
//       return;
//     }
//     setError('');

//     axios.post('http://localhost:3001/produk', { nama, harga })
//       .then((res) => {
//         console.log('Produk berhasil ditambah:', res.data);
//         setNama('');
//         setHarga('');
//       })
//       .catch((err) => {
//         console.error('Error menambah produk:', err);
//       });
//   };

//   return (
//     <div className="tambah-produk-container">
//       <h2>Tambah Produk</h2>
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleSubmit} className="form-container">
//         <div className="form-group">
//           <label>Nama Produk: </label>
//           <input
//             type="text"
//             value={nama}
//             onChange={(e) => setNama(e.target.value)}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label>Harga: </label>
//           <input
//             type="number"
//             value={harga}
//             onChange={(e) => setHarga(e.target.value)}
//             className="form-input"
//           />
//         </div>
//         <button type="submit" className="submit-btn">Simpan</button>
//       </form>
//     </div>
//   );
// }

// export default TambahProduk;




import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TambahProduk.css'; // Importing CSS

function TambahProduk() {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama || !harga) {
      setError('Nama dan Harga wajib diisi');
      return;
    }
    setError('');

    axios.post('http://localhost:3001/produk', { nama, harga })
      .then((res) => {
        setNama('');
        setHarga('');
        setNotification({ type: 'success', message: 'Produk berhasil ditambahkan!' });
      })
      .catch((err) => {
        setNotification({ type: 'danger', message: 'Gagal menambah produk!' });
      });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="col-12 col-md-8 box-shadow p-4">
        <h2 className="text-center text-purple mb-4">Selamat Datang di Aplikasi E-Commerce Sederhana</h2><br></br>
        <h3 className="text-purple">Tambah Produk</h3>

        {notification && (
          <div className={`alert alert-${notification.type} notification`} role="alert">
            {notification.message}
          </div>
        )}

        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nama Produk: </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Harga: </label>
            <input
              type="number"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Simpan</button>
        </form>
      </div>
    </div>
  );
}

export default TambahProduk;
