import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import PegawaiController from './controllers/PegawaiController.js';
import PasienController from './controllers/PasienController.js';
import ReservasiController from './controllers/ReservasiController.js';
import PoliController from './controllers/PoliController.js';
import DokterController from './controllers/DokterController.js';
import AntriController from './controllers/AntriController.js';
import PembayaranController from './controllers/PembayaranController.js';  

const app = express();
const port = process.env.PORT || 3000;

// Menentukan __dirname pada ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS sebagai view engine dan tentukan direktori views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk parsing body (form data) dan json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ROUTES */

// === ROUTES UNTUK PEGAWAI ===
// Tampilkan daftar pegawai
app.get('/', async (req, res) => {
  try {
    const pegawais = await PegawaiController.listPegawai();
    res.render('pegawai/pegawai_list', { pegawais });
  } catch (error) {
    res.status(500).send('Error saat mengambil data pegawai.');
  }
});

// Tampilkan form tambah pegawai
app.get('/pegawai/new', (req, res) => {
  res.render('pegawai/pegawai_new');
});

// Proses tambah pegawai baru
app.post('/pegawai', async (req, res) => {
  try {
    await PegawaiController.addPegawai(req.body);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error saat menambahkan pegawai.');
  }
});

// Tampilkan detail pegawai
app.get('/pegawai/:id', async (req, res) => {
  try {
    const pegawai = await PegawaiController.showPegawai(req.params.id);
    res.render('pegawai/pegawai_detail', { pegawai });
  } catch (error) {
    res.status(500).send('Error saat mengambil detail pegawai.');
  }
});

// === ROUTES UNTUK PASIEN ===
app.get('/pasien', PasienController.index);
app.get('/pasien/new', PasienController.newForm);
app.post('/pasien', PasienController.create);
app.get('/pasien/:no_rm', PasienController.show);
app.get('/pasien/:no_rm/edit', PasienController.editForm);
app.post('/pasien/:no_rm/edit', PasienController.update);
app.post('/pasien/:no_rm/delete', PasienController.delete);

// === ROUTES UNTUK PEMBAYARAN ===
app.get('/pembayaran', PembayaranController.index);              // Menampilkan daftar pembayaran
app.get('/pembayaran/new', PembayaranController.createForm);       // Tampilkan form tambah pembayaran
app.post('/pembayaran', PembayaranController.create);              // Menambahkan pembayaran
app.get('/pembayaran/:id/edit', PembayaranController.editForm);      // Form edit pembayaran
app.post('/pembayaran/:id/edit', PembayaranController.update);       // Update pembayaran
app.post('/pembayaran/:id/delete', PembayaranController.delete);     // Hapus pembayaran


// === ROUTES UNTUK RESERVASI ===
app.get('/reservasi', ReservasiController.index); 
app.get('/reservasi/new', ReservasiController.newForm);           
app.post('/reservasi', ReservasiController.create);               
app.get('/reservasi/:id/edit', ReservasiController.editForm);      
app.post('/reservasi/:id/edit', ReservasiController.update);       
app.post('/reservasi/:id/delete', ReservasiController.delete);     

// === ROUTES UNTUK POLI ===
app.get('/poli', PoliController.index);
app.get('/poli/new', PoliController.newForm);
app.post('/poli', PoliController.create);
app.get('/poli/:id_poli', PoliController.show);
app.get('/poli/:id_poli/edit', PoliController.editForm);
app.post('/poli/:id_poli/edit', PoliController.update);
app.post('/poli/:id_poli/delete', PoliController.delete);

// === ROUTES UNTUK DOKTER ===
app.get('/dokter', DokterController.index);
app.get('/dokter/new', DokterController.newForm);
app.post('/dokter', DokterController.create);
app.get('/dokter/:id_dokter/edit', DokterController.editForm);
app.post('/dokter/:id_dokter/edit', DokterController.update);
app.post('/dokter/:id_dokter/delete', DokterController.delete);

// === ROUTES UNTUK ANTRI ===
app.get('/antri', AntriController.index);
app.get('/antri/new', AntriController.newForm);
app.post('/antri', AntriController.create);
app.get('/antri/:no_antrian', AntriController.show);
app.post('/antri/:no_antrian/edit', AntriController.update);
app.post('/antri/:no_antrian/delete', AntriController.delete);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
