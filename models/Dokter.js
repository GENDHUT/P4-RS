// models/Dokter.js
import db from '../config/db.js';

class Dokter {
  // Ambil semua dokter dengan status pegawai dan poli
  static async getAll() {
    const sql = `
      SELECT dokter.*, poli.nama_poli, pegawai.status_pegawai
      FROM dokter
      LEFT JOIN poli ON dokter.id_poli = poli.id_poli
      LEFT JOIN pegawai ON dokter.id_pegawai = pegawai.id_pegawai
    `;
    const [rows] = await db.query(sql);
    return rows;
  }

  // Ambil dokter berdasarkan ID dengan status pegawai dan poli
  static async getById(id) {
    const sql = `
      SELECT dokter.*, poli.nama_poli, pegawai.status_pegawai
      FROM dokter
      LEFT JOIN poli ON dokter.id_poli = poli.id_poli
      LEFT JOIN pegawai ON dokter.id_pegawai = pegawai.id_pegawai
      WHERE dokter.id_dokter = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  }

  // Ambil dokter berdasarkan ID Pegawai
  static async getByPegawaiId(id_pegawai) {
    const sql = `
      SELECT *
      FROM dokter
      WHERE id_pegawai = ?
    `;
    const [rows] = await db.query(sql, [id_pegawai]);
    return rows;
  }

  // Tambah dokter baru
  static async create(data) {
    const { id_pegawai, id_poli, nama_dokter, status_dokter } = data;
    const sql = 'INSERT INTO dokter (id_pegawai, id_poli, nama_dokter, status_dokter) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [id_pegawai, id_poli, nama_dokter, status_dokter]);
    return result;
  }

  // Update data dokter
  static async update(id_dokter, data) {
    const { id_pegawai, id_poli, nama_dokter, status_dokter } = data;
    const sql = 'UPDATE dokter SET id_pegawai = ?, id_poli = ?, nama_dokter = ?, status_dokter = ? WHERE id_dokter = ?';
    const [result] = await db.query(sql, [id_pegawai, id_poli, nama_dokter, status_dokter, id_dokter]);
    return result;
  }

  // Hapus dokter
  static async delete(id_dokter) {
    const sql = 'DELETE FROM dokter WHERE id_dokter = ?';
    const [result] = await db.query(sql, [id_dokter]);
    return result;
  }
}

export default Dokter;
