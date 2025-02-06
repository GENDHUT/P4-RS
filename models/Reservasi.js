import pool from '../config/db.js';

class Reservasi {
  // Mengambil semua data reservasi dengan nama pasien, dokter, dan poli
  static async getAll() {
    const sql = `
      SELECT 
        r.id_reservasi, 
        ps.nama_pasien, 
        p.nama_poli, 
        d.nama_dokter, 
        r.no_antrian
      FROM reservasi r
      LEFT JOIN pasien ps ON r.no_rm = ps.no_rm
      LEFT JOIN poli p ON r.id_poli = p.id_poli
      LEFT JOIN dokter d ON r.id_dokter = d.id_dokter
    `;
    const [rows] = await pool.query(sql);
    return rows;
  }

  // Mengambil data reservasi berdasarkan id_reservasi
  static async getById(id_reservasi) {
    const sql = `
      SELECT 
        r.id_reservasi, 
        ps.nama_pasien, 
        p.nama_poli, 
        d.nama_dokter, 
        r.no_antrian
      FROM reservasi r
      LEFT JOIN pasien ps ON r.no_rm = ps.no_rm
      LEFT JOIN poli p ON r.id_poli = p.id_poli
      LEFT JOIN dokter d ON r.id_dokter = d.id_dokter
      WHERE r.id_reservasi = ?
    `;
    const [rows] = await pool.query(sql, [id_reservasi]);
    return rows;
  }

  // Menambahkan data reservasi baru
  static async create(data) {
    const { no_rm, id_poli, id_dokter, no_antrian } = data;
    const [result] = await pool.query(
      "INSERT INTO reservasi (no_rm, id_poli, id_dokter, no_antrian) VALUES (?, ?, ?, ?)",
      [no_rm, id_poli, id_dokter, no_antrian]
    );
    return result;
  }

  // Memperbarui data reservasi berdasarkan id_reservasi
  static async update(id_reservasi, data) {
    const { no_rm, id_poli, id_dokter, no_antrian } = data;
    const [result] = await pool.query(
      "UPDATE reservasi SET no_rm = ?, id_poli = ?, id_dokter = ?, no_antrian = ? WHERE id_reservasi = ?",
      [no_rm, id_poli, id_dokter, no_antrian, id_reservasi]
    );
    return result;
  }

  // Menghapus data reservasi berdasarkan id_reservasi
  static async delete(id_reservasi) {
    const [result] = await pool.query(
      "DELETE FROM reservasi WHERE id_reservasi = ?",
      [id_reservasi]
    );
    return result;
  }
}

export default Reservasi;
