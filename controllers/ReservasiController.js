// controllers/ReservasiController.js
import Reservasi from '../models/Reservasi.js';
import Pasien from '../models/Pasien.js';
import Dokter from '../models/Dokter.js';
import Poli from '../models/Poli.js';
import Antri from '../models/Antri.js';

class ReservasiController {
  // Tampilkan daftar reservasi dengan nama dokter dan poli
  static async index(req, res) {
    try {
      const results = await Reservasi.getAll();
      res.render('reservasi/index', { reservasis: results });
    } catch (err) {
      console.error("Error retrieving reservasi:", err);
      res.status(500).send("Error saat mengambil data reservasi.");
    }
  }

  // Tampilkan form tambah reservasi dengan data pasien dari tabel pasien
  static async newForm(req, res) {
    try {
      const pasienList = await Pasien.getAll();
      const poliList = await Poli.getAll();
      const dokterList = await Dokter.getAll();
      const antrianList = await Antri.getAll(); // Ambil data antrian

      res.render('reservasi/new', { pasienList, poliList, dokterList, antrianList });
    } catch (err) {
      console.error("Error retrieving data:", err);
      res.status(500).send("Error saat mengambil data.");
    }
  }

  // Proses tambah reservasi
  static async create(req, res) {
    try {
      await Reservasi.create(req.body);
      res.redirect('/reservasi');
    } catch (err) {
      console.error("Error creating reservasi:", err);
      res.status(500).send("Error saat menambahkan reservasi.");
    }
  }

  // Tampilkan form edit reservasi
  static async editForm(req, res) {
    try {
      const id = req.params.id;
      const results = await Reservasi.getById(id);
      if (results.length === 0) {
        return res.status(404).send("Data tidak ditemukan");
      }

      const pasienList = await Pasien.getAll();
      const poliList = await Poli.getAll();
      const dokterList = await Dokter.getAll();
      const antrianList = await Antri.getAll(); // Ambil data antrian

      res.render('reservasi/edit', { 
        reservasi: results[0], 
        pasienList, 
        poliList, 
        dokterList, 
        antrianList 
      });
    } catch (err) {
      console.error("Error retrieving reservasi by ID:", err);
      res.status(500).send("Error saat mengambil data reservasi.");
    }
  }

  // Proses update reservasi
  static async update(req, res) {
    try {
      const id = req.params.id;
      await Reservasi.update(id, req.body);
      res.redirect('/reservasi');
    } catch (err) {
      console.error("Error updating reservasi:", err);
      res.status(500).send("Error saat mengupdate reservasi.");
    }
  }

  // Proses hapus reservasi
  static async delete(req, res) {
    try {
      const id = req.params.id;
      await Reservasi.delete(id);
      res.redirect('/reservasi');
    } catch (err) {
      console.error("Error deleting reservasi:", err);
      res.status(500).send("Error saat menghapus reservasi.");
    }
  }
}

export default ReservasiController;
