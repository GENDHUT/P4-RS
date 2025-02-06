// controllers/PegawaiController.js
import Pegawai from '../models/Pegawai.js';

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

  // Tampilkan detail pegawai berdasarkan ID
  static async showPegawai(id) {
    try {
      const pegawai = await Pegawai.getById(id);
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

  // Hapus pegawai
  static async removePegawai(id) {
    try {
      await Pegawai.delete(id);
    } catch (error) {
      console.error(`Error saat menghapus pegawai dengan ID ${id}:`, error);
      throw error;
    }
  }
}

export default PegawaiController;
