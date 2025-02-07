// controllers/PegawaiController.js
import Pegawai from '../models/Pegawai.js';
import Dokter from '../models/Dokter.js';
import Poli from '../models/Poli.js';

class PegawaiController {
  // Tampilkan semua pegawai
  static async listPegawai() {
    try {
      const pegawais = await Pegawai.getAll();
      return pegawais;
    } catch (error) {
      console.error('Error saat mengambil data pegawai:', error);
      throw error;
    }
  }

  // Tampilkan detail pegawai beserta data dokter terkait
  static async showPegawai(id) {
    try {
      const pegawai = await Pegawai.getById(id);
      if (pegawai) {
        // Ambil data dokter berdasarkan id_pegawai
        const dokterData = await Dokter.getByPegawaiId(id);
        pegawai.dokters = dokterData;
      }
      return pegawai;
    } catch (error) {
      console.error(`Error saat mengambil pegawai dengan ID ${id}:`, error);
      throw error;
    }
  }

  // Tambahkan pegawai baru
  static async addPegawai(data) {
    try {
      await Pegawai.create(data);
    } catch (error) {
      console.error('Error saat menambahkan pegawai:', error);
      throw error;
    }
  }

  // Update pegawai
  static async editPegawai(id, data) {
    try {
      await Pegawai.update(id, data);
    } catch (error) {
      console.error(`Error saat mengupdate pegawai dengan ID ${id}:`, error);
      throw error;
    }
  }

  // Hapus pegawai (dan hapus data poli yang terkait terlebih dahulu)
  static async removePegawai(id) {
    try {
      // Hapus semua data poli yang terkait dengan pegawai ini
      await Poli.deleteByPegawaiId(id);
      // Kemudian hapus data pegawai
      await Pegawai.delete(id);
    } catch (error) {
      console.error(`Error saat menghapus pegawai dengan ID ${id}:`, error);
      throw error;
    }
  }
}

export default PegawaiController;
