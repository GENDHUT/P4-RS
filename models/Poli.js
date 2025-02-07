import db from '../config/db.js';

class Poli {
  // Ambil semua data poli beserta nama pegawai
  static async getAll() {
    const sql = `
      SELECT Poli.*, Pegawai.nama_pegawai 
      FROM Poli 
      LEFT JOIN Pegawai ON Poli.id_peg = Pegawai.id_pegawai
    `;
    const [rows] = await db.query(sql);
    return rows;
  }

  // Hapus semua data poli yang mereferensikan pegawai tertentu
  static async deleteByPegawaiId(id_peg) {
    try {
      const [result] = await pool.query('DELETE FROM poli WHERE id_peg = ?', [id_peg]);
      return result;
    } catch (error) {
      console.error(`Error saat menghapus data poli dengan id_peg ${id_peg}:`, error);
      throw error;
    }
  }

  // Ambil data poli berdasarkan ID beserta nama pegawai dan dokter yang terkait
  static async getById(id) {
    const sql = `
      SELECT Poli.*, Pegawai.nama_pegawai 
      FROM Poli 
      LEFT JOIN Pegawai ON Poli.id_peg = Pegawai.id_pegawai
      WHERE Poli.id_poli = ?
    `;
    const [poliData] = await db.query(sql, [id]);
    
    if (poliData.length > 0) {
      const sqlDokter = `
        SELECT Dokter.id_dokter, Dokter.nama_dokter
        FROM Dokter
        WHERE Dokter.id_poli = ?
      `;
      const [dokters] = await db.query(sqlDokter, [id]);
      return { ...poliData[0], dokters };
    }
    return null;
  }

  // Tambah poli baru
  static async create(data) {
    const { nama_poli, id_peg } = data;
    const sql = 'INSERT INTO Poli (nama_poli, id_peg) VALUES (?, ?)';
    const [result] = await db.query(sql, [nama_poli, id_peg]);
    return result;
  }

  // Update data poli
static async update(id_poli, data) {
    const { nama_poli, id_peg } = data;
    const sql = 'UPDATE Poli SET nama_poli = ?, id_peg = ? WHERE id_poli = ?';
    try {
      const [result] = await db.query(sql, [nama_poli, id_peg, id_poli]);
      return result;
    } catch (err) {
      console.error("Error updating Poli:", err); // Log error jika ada masalah di query
      throw err;
    }
  }
  // Hapus poli
  static async delete(id) {
    const sql = 'DELETE FROM Poli WHERE id_poli = ?';
    const [result] = await db.query(sql, [id]);
    return result;
  }
}

export default Poli;
