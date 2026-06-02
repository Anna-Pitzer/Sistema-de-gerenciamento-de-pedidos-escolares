"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t_order = void 0;

var t_order = /** @class */ (function () {
    function t_order() {}

    t_order.read = {
        readMaxNumPedido: async function () {
            var db = require('./../../helpers/database').database;
            return (await db.select("SELECT max(t_pedido) as pedido FROM t_order")).results;
        },
        read: async function () {
            var db = require('./../../helpers/database').database;
            return (await db.select(
                "SELECT t_id as id, t_pedido as pedido, t_provider as provider, t_providername as providername, " +
                "t_datedeliver as datedeliver, t_date as date, t_item as item, t_product as product, " +
                "t_productname as productname, t_productname2 as productname2, t_school as school, " +
                "t_quantity as quantity, t_usercreated as usercreated, t_status as status " +
                "FROM t_order WHERE t_delete = 0"
            )).results;
        },
        readById: async function (param) {
            var db = require('./../../helpers/database').database;
            return (await db.select(
                "SELECT t_id as id, t_pedido as pedido, t_provider as provider, t_date as date, " +
                "t_item as item, t_product as product, t_productname as productname, " +
                "t_productname2 as productname2, t_school as school, t_quantity as quantity, " +
                "t_usercreated as usercreated, t_status as status " +
                "FROM t_order WHERE t_delete = 0 AND t_id = ?",
                [param.id]
            )).results;
        },
        readByPedido: async function (param) {
            var db = require('./../../helpers/database').database;
            return (await db.select(
                "SELECT t_id as id, t_pedido as pedido, t_provider as provider, t_providername as providername, " +
                "t_datedeliver as datedeliver, t_date as date, t_item as item, t_product as product, " +
                "t_productname as productname, t_productname2 as productname2, t_school as school, " +
                "t_quantity as quantity, t_usercreated as usercreated, t_status as status " +
                "FROM t_order WHERE t_delete = 0 AND t_pedido = ?",
                [param.pedido]
            )).results;
        }
    };

    t_order.create = {
        createWithTransaction: async function (items) {
            var db = require('./../../helpers/database').database;
            var result = await db.transaction(async function (conn) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    await conn.query(
                        "INSERT INTO t_order(t_pedido, t_provider, t_providername, t_datedeliver, t_date, " +
                        "t_item, t_product, t_productname, t_productname2, t_school, t_quantity, t_usercreated, t_status, t_delete) " +
                        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,0,0)",
                        [item.pedido, item.provider, item.providerName, item.dateDeliver, item.date,
                         item.item, item.product, item.productname, item.productname2,
                         item.school, item.quantity, item.usercreated]
                    );
                }
            });
            return result.success;
        }
    };

    t_order.delete = {
        deleteByPedido: async function (pedido) {
            var db = require('./../../helpers/database').database;
            return (await db.query("UPDATE t_order SET t_delete = 1 WHERE t_pedido = ?", [pedido])).rowsAffected > 0;
        }
    };

    t_order.finish = {
        finishByPedido: async function (pedido) {
            var db = require('./../../helpers/database').database;
            return (await db.query("UPDATE t_order SET t_status = 1 WHERE t_pedido = ? AND t_delete = 0", [pedido])).rowsAffected > 0;
        }
    };

    t_order.update = {
        updateWithTransaction: async function (pedido, items) {
            var db = require('./../../helpers/database').database;
            var result = await db.transaction(async function (conn) {
                await conn.query("UPDATE t_order SET t_delete = 1 WHERE t_pedido = ?", [pedido]);
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    await conn.query(
                        "INSERT INTO t_order(t_pedido, t_provider, t_providername, t_datedeliver, t_date, " +
                        "t_item, t_product, t_productname, t_productname2, t_school, t_quantity, t_usercreated, t_status, t_delete) " +
                        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,0,0)",
                        [item.pedido, item.provider, item.providerName, item.dateDeliver, item.date,
                         item.item, item.product, item.productname, item.productname2,
                         item.school, item.quantity, item.usercreated]
                    );
                }
            });
            return result.success;
        }
    };

    return t_order;
}());
exports.t_order = t_order;
