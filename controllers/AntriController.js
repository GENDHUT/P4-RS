// controllers/AntriController.js
import Antri from '../models/Antri.js';

class AntriController {
  // Tampilkan semua antri
  static async index(req, res) {
    try {
      const antris = await Antri.getAll();
      res.render('antri/index', { antris });
    } catch (err) {
      console.error("Error retrieving antri:", err);
      res.status(500).send("Error saat mengambil data antri.");
    }
  }

  // Tampilkan form tambah antri
  static newForm(req, res) {
    res.render('antri/new');
  }

  // Proses tambah antri
  static async create(req, res) {
    try {
      // Data yang diterima: tanggal, hari, jam (dari input form)
      await Antri.create(req.body);
      res.redirect('/antri');
    } catch (err) {
      console.error("Error creating antri:", err);
      res.status(500).send("Error saat menambahkan antri.");
    }
  }

  // Tampilkan detail antri
  static async show(req, res) {
    try {
      const no_antrian = req.params.no_antrian;
      const antriData = await Antri.getByNo(no_antrian);
      if (!antriData) {
        return res.status(404).send("Data antri tidak ditemukan.");
      }
      res.render('antri/detail', { antri: antriData });
    } catch (err) {
      console.error("Error retrieving antri:", err);
      res.status(500).send("Error saat mengambil data antri.");
    }
  }

  // Proses update antri (jika diperlukan)
  static async update(req, res) {
    try {
      const no_antrian = req.params.no_antrian;
      await Antri.update(no_antrian, req.body);
      res.redirect('/antri');
    } catch (err) {
      console.error("Error updating antri:", err);
      res.status(500).send("Error saat mengupdate antri.");
    }
  }

  // Proses hapus antri
  static async delete(req, res) {
    try {
      const no_antrian = req.params.no_antrian;
      await Antri.delete(no_antrian);
      res.redirect('/antri');
    } catch (err) {
      console.error("Error deleting antri:", err);
      res.status(500).send("Error saat menghapus antri.");
    }
  }
}

export default AntriController;
