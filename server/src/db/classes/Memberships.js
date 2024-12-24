import { CustomError } from "./CustomError.js";
import getFilter from "../../utils/filter.js";

export class MembershipDb {
  constructor(db) {
    this.db = db;
  }

  async initializeTable() {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS memberships (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL CHECK(length(name) > 0),
      dni TEXT NOT NULL UNIQUE CHECK(length(dni) > 0),
      phone TEXT NOT NULL UNIQUE CHECK(length(phone) > 0),
      payment REAL NOT NULL CHECK(payment >= 0),
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      CHECK(end_date >= start_date)
    )`);
  }

  async getMemberships({ page = 1, limit = 5, status = "all" }) {
    try {
      let whereClause = getFilter(status);

      const [{ total }] = await this.db.all(
        `SELECT COUNT(*) as total FROM memberships ${whereClause}`
      );

      const offset = (page - 1) * limit;

      const memberships = await this.db.all(
        `
          SELECT 
                    id,
                    name,
                    dni,
                    phone,
                    payment,
                    start_date as startDate,
                    end_date as endDate,
                    created_at as createdAt
                FROM memberships ${whereClause}
                ORDER BY created_at ASC
                LIMIT ? OFFSET ?
        `,
        [limit, offset]
      );

      return {
        memberships,
        meta: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getMembership(dni) {
    try {
      const membership = await this.db.get(
        `
        SELECT 
        id,
        name,
        dni,
        phone,
        payment,
        start_date as startDate,
        end_date as endDate,
        created_at as createdAt
        FROM memberships WHERE dni = ?
        `,
        [dni]
      );

      if (!membership)
        throw new CustomError(
          "Membership not found",
          404,
          "MEMBERSHIP_NOT_FOUND"
        );

      return {
        success: true,
        membership,
      };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError(error.message, 500, "INTERNAL_SERVER_ERROR");
    }
  }

  async createMembership(membership) {
    let transactionStarted = false;
    try {
      const startDate = new Date(membership.startDate);
      const endDate = new Date(membership.endDate);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()))
        throw new Error("Invalid date format");

      if (endDate < startDate)
        throw new Error("End date must be after start date");

      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      const existingMembership = await this.db.get(
        `SELECT id, dni, phone FROM memberships WHERE dni = ? OR phone = ?`,
        [membership.dni, membership.phone]
      );

      if (existingMembership) {
        if (existingMembership.dni === membership.dni) {
          const error = new Error("El DNI ya está registrado.");
          error.code = "ER_DUP_ENTRY";
          error.status = 409;
          throw error;
        }
        if (existingMembership.phone === membership.phone) {
          const error = new Error("El número de teléfono ya está registrado.");
          error.code = "ER_DUP_ENTRY";
          error.status = 409;
          throw error;
        }
      }

      await this.db.run("BEGIN TRANSACTION");
      transactionStarted = true;

      const result = await this.db.run(
        `INSERT INTO memberships (name, dni, phone, payment, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          membership.name,
          membership.dni,
          membership.phone,
          membership.payment,
          formattedStartDate,
          formattedEndDate,
        ]
      );

      const newMembership = await this.db.get(
        `SELECT 
                id,
                name,
                dni,
                phone,
                payment,
                start_date as startDate,
                end_date as endDate,
                created_at as createdAt
            FROM memberships 
            WHERE id = ?`,
        [result.lastID]
      );

      await this.db.run("COMMIT");

      return {
        success: true,
        membership: newMembership,
      };
    } catch (error) {
      if (transactionStarted) await this.db.run("ROLLBACK");
      throw new Error(error.message);
    }
  }

  async updateMembership(id, membership) {
    let transactionStarted = false;
    try {
      //Validar que el id exista
      const existingMembership = await this.db.get(
        "SELECT id FROM memberships WHERE id = ?",
        [id]
      );

      if (!existingMembership) {
        const error = new Error("Membership not found");
        error.code = 404;
        throw error;
      }

      //Validar fechas
      const startDate = new Date(membership.startDate);
      const endDate = new Date(membership.endDate);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()))
        throw new Error("Invalid date format");

      if (endDate < startDate)
        throw new Error("End date must be after start date");

      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      //Verificar duplicados de DNI y teléfono, excluyendo el registro actual
      const duplicateCheck = await this.db.get(
        "SELECT id, dni, phone FROM memberships WHERE (dni = ? OR phone = ?) AND id != ?",
        [membership.dni, membership.phone, id]
      );

      if (duplicateCheck) {
        if (duplicateCheck.dni === membership.dni) {
          const error = new Error("El DNI ya está registrado.");
          error.code = "ER_DUP_ENTRY";
          error.status = 409;
          throw error;
        }
        if (duplicateCheck.phone === membership.phone) {
          const error = new Error("El número de teléfono ya está registrado.");
          error.code = "ER_DUP_ENTRY";
          error.status = 409;
          throw error;
        }
      }

      //Iniciar transacción
      await this.db.run("BEGIN TRANSACTION");
      transactionStarted = true;

      //Actualizar membresía
      await this.db.run(
        `
        UPDATE memberships
        SET name = ?,
        dni = ?,
        phone = ?,
        payment = ?,
        start_date = ?,
        end_date = ?
        WHERE id = ?
        `,
        [
          membership.name,
          membership.dni,
          membership.phone,
          membership.payment,
          formattedStartDate,
          formattedEndDate,
          id,
        ]
      );

      const updatedMembership = await this.db.get(
        `
        SELECT id, 
        name,
        dni, 
        phone, 
        payment, 
        start_date as startDate, 
        end_date as endDate,
        created_at as createdAt
        FROM memberships WHERE id = ?
        `,
        [id]
      );

      //Confirmar transacción
      await this.db.run("COMMIT");

      return {
        success: true,
        membership: updatedMembership,
      };
    } catch (error) {
      if (transactionStarted) await this.db.run("ROLLBACK");
      throw new Error(error.message);
    }
  }
}
