// models/Antri.js
import pool from '../config/db.js';

class Antri {
  // Menghasilkan nomor antrian untuk hari ini
  static async generateNoAntrian() {
    // Hitung jumlah data antri pada tanggal hari ini
    const sqlCount = `SELECT COUNT(*) AS count FROM antri WHERE tanggal = CURDATE()`;
    const [rows] = await pool.query(sqlCount);
    const countToday = rows[0].count;
    const nextNumber = countToday + 1; // nomor urut hari ini

    // Format nomor urut ke 4 digit (misal: 0001, 0002, dst.)
    const formattedNumber = nextNumber.toString().padStart(4, '0');

    // Dapatkan tanggal dan waktu saat ini
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // getMonth() mulai dari 0
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    // Gabungkan informasi tersebut, misal: 0005-31082023-1530
    const formattedDateTime = `${day}${month}${year}-${hours}${minutes}`;
    const noAntrian = `${formattedNumber}-${formattedDateTime}`;
    return noAntrian;
  }

  // Mengambil semua data antri
  static async getAll() {
    const sql = `SELECT * FROM antri ORDER BY no_antrian ASC`;
    const [rows] = await pool.query(sql);
    return rows; // Mengembalikan semua data antrian
  }

  // Mengambil data antri berdasarkan no_antrian
  static async getByNo(no_antrian) {
    const sql = `SELECT * FROM antri WHERE no_antrian = ?`;
    const [rows] = await pool.query(sql, [no_antrian]);
    return rows[0];
  }

  // Menambahkan data antri baru dengan nomor antrian yang dihasilkan otomatis
  static async create(data) {
    // data harus memiliki: { tanggal, hari, jam }
    // Namun, kita akan menggantikan no_antrian dengan nilai yang dihasilkan secara otomatis
    const no_antrian = await this.generateNoAntrian();
    const { tanggal, hari, jam } = data;
    const sql = `INSERT INTO antri (no_antrian, tanggal, hari, jam) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [no_antrian, tanggal, hari, jam]);
    return result;
  }

  // Memperbarui data antri (jika diperlukan)
  static async update(no_antrian, data) {
    const { tanggal, hari, jam } = data;
    const sql = `UPDATE antri SET tanggal = ?, hari = ?, jam = ? WHERE no_antrian = ?`;
    const [result] = await pool.query(sql, [tanggal, hari, jam, no_antrian]);
    return result;
  }

  // Menghapus data antri
  static async delete(no_antrian) {
    const sql = `DELETE FROM antri WHERE no_antrian = ?`;
    const [result] = await pool.query(sql, [no_antrian]);
    return result;
  }
}

export default Antri;
