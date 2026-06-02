"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;

var database = /** @class */ (function () {
    function database() {}

    database.connect = async function () {
        try {
            var mysql2 = require('mysql2/promise');
            var config = require('../config');
            return await mysql2.createConnection(config.database);
        } catch (err) {
            console.error('[database.connect] Falha ao conectar ao banco de dados:', err);
            throw err;
        }
    };

    database.query = async function (query, params) {
        if (params === undefined) params = {};
        var return1 = { rowsAffected: 0, error: false, errorMsg: '' };
        var conn = await database.connect();
        try {
            var result = await conn.query(query, params);
            return1.rowsAffected = result?.[0]?.affectedRows;
        } catch (err) {
            console.error('[database.query] Erro ao executar query:', err);
            return1.error = true;
            return1.errorMsg = String(err);
        } finally {
            conn.end();
        }
        return return1;
    };

    database.select = async function (query, params) {
        if (params === undefined) params = {};
        var return1 = { results: [], error: false, errorMsg: '' };
        if (['insert', 'update', 'delete'].indexOf(query.trim().substring(0, 6).toLowerCase()) > -1) {
            return1.error = true;
            return1.errorMsg = 'esta operacao nao e permitida';
            return return1;
        }
        var conn = await database.connect();
        try {
            var select = await conn.query(query, params);
            if (select[0] !== undefined) return1.results = select[0];
        } catch (err) {
            console.error('[database.select] Erro ao executar query:', err);
            return1.error = true;
            return1.errorMsg = String(err);
        } finally {
            conn.end();
        }
        return return1;
    };

    database.transaction = async function (fn) {
        var conn = await database.connect();
        try {
            await conn.beginTransaction();
            var result = await fn(conn);
            await conn.commit();
            return { success: true, result: result };
        } catch (err) {
            await conn.rollback();
            console.error('[database.transaction] Rollback executado. Erro:', err);
            return { success: false, result: null };
        } finally {
            conn.end();
        }
    };

    return database;
}());
exports.database = database;
