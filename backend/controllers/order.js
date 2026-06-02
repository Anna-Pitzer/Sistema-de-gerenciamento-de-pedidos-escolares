"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = void 0;

function formatDatetime(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
        + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + ':' + String(d.getSeconds()).padStart(2, '0');
}

var order = /** @class */ (function () {
    function order() {}

    order.read = async function (data, token) {
        var user = new (require('./../helpers/user').user)(token);
        if (!await user.checkSessionActive()) return { code: 200, msg: 'sessao inativa', res: false };
        var res = await require('./../queries/tables/t_order').t_order.read.read();
        return { code: 200, msg: '', res: res };
    };

    order.readById = async function (data, token) {
        var user = new (require('./../helpers/user').user)(token);
        if (!await user.checkSessionActive()) return { code: 200, msg: 'sessao inativa', res: false };
        var res = await require('./../queries/tables/t_order').t_order.read.readById({ id: Number(data.id) });
        return { code: 200, msg: '', res: res };
    };

    order.readByPedido = async function (data, token) {
        var user = new (require('./../helpers/user').user)(token);
        if (!await user.checkSessionActive()) return { code: 200, msg: 'sessao inativa', res: false };
        var res = await require('./../queries/tables/t_order').t_order.read.readByPedido({ pedido: Number(data.pedido) });
        return { code: 200, msg: '', res: res };
    };

    order.create = async function (data, token) {
        var user = new (require('./../helpers/user').user)(token);
        if (!await user.checkSessionActive()) return { code: 200, msg: 'sessao inativa', res: false };

        var userData = await user.getData();
        var date = new Date();
        var maxNumPedido = 1;
        var getMaxNumPedido = await require('./../queries/tables/t_order').t_order.read.readMaxNumPedido();

        if (getMaxNumPedido?.[0]?.pedido !== undefined && getMaxNumPedido?.[0]?.pedido !== null) {
            maxNumPedido = getMaxNumPedido[0].pedido + 1;
        }

        var items = [];
        var c = 0;
        for (var i = 0; i < data.items.length; i++) {
            c++;
            items.push({
                pedido: maxNumPedido,
                provider: data.provider,
                providerName: data.providerName,
                dateDeliver: data.dateDeliver,
                date: formatDatetime(date),
                item: c,
                product: data.items[i].product,
                productname: data.items[i].productname,
                productname2: data.items[i].productname2,
                school: data.items[i].school,
                quantity: data.items[i].quantity,
                usercreated: userData.id
            });
        }

        var res = await require('./../queries/tables/t_order').t_order.create.createWithTransaction(items);
        return { code: 200, msg: '', res: res };
    };

    order.update = async function (data, token) {
        var user = new (require('./../helpers/user').user)(token);
        if (!await user.checkSessionActive()) return { code: 200, msg: 'sessao inativa', res: false };

        var userData = await user.getData();
        var date = new Date();
        var items = [];
        var c = 0;
        for (var i = 0; i < data.items.length; i++) {
            c++;
            items.push({
                pedido: Number(data.pedido),
                provider: data.provider,
                providerName: data.providerName,
                dateDeliver: data.dateDeliver,
                date: formatDatetime(date),
                item: c,
                product: data.items[i].product,
                productname: data.items[i].productname,
                productname2: data.items[i].productname2,
                school: data.items[i].school,
                quantity: data.items[i].quantity,
                usercreated: userData.id
            });
        }

        var res = await require('./../queries/tables/t_order').t_order.update.updateWithTransaction(Number(data.pedido), items);
        return { code: 200, msg: '', res: res };
    };

    order.deleteOrder = async function (data, token) {
        var user = new (require('./../helpers/user').user)(token);
        if (!await user.checkSessionActive()) return { code: 200, msg: 'sessao inativa', res: false };
        var res = await require('./../queries/tables/t_order').t_order.delete.deleteByPedido(Number(data.pedido));
        return { code: 200, msg: '', res: res };
    };

    order.finishOrder = async function (data, token) {
        var user = new (require('./../helpers/user').user)(token);
        if (!await user.checkSessionActive()) return { code: 200, msg: 'sessao inativa', res: false };
        var res = await require('./../queries/tables/t_order').t_order.finish.finishByPedido(Number(data.pedido));
        return { code: 200, msg: '', res: res };
    };

    order.espelho = async function (data, token) {
        var user = new (require('./../helpers/user').user)(token);
        if (!await user.checkSessionActive()) return { code: 200, msg: 'sessao inativa', res: false };

        var { spawn } = require('child_process');
        var path = require('path');
        var fs = require('fs');
        var scriptPath = path.join(__dirname, '..', 'espelho.py');
        var jsonData = JSON.stringify(data);

        return new Promise(function (resolve) {
            var py = spawn( //modfique este caminho
                'C:\\Users\\Notebook-Maria\\AppData\\Local\\Programs\\Python\\Python313\\python.exe',
                [scriptPath, jsonData]
            );
            var output = '';
            var errorOutput = '';

            py.stdout.on('data', function (d) { output += d.toString('utf8'); });
            py.stderr.on('data', function (d) { errorOutput += d.toString('utf8'); });

            py.on('close', function (code) {
                if (code !== 0) {
                    console.error('[order.espelho] Erro no script Python:', errorOutput);
                    resolve({ code: 500, msg: 'Erro ao gerar espelho', res: false });
                    return;
                }
                var filePath = output.trim();
                try {
                    var fileBuffer = fs.readFileSync(filePath);
                    var base64 = fileBuffer.toString('base64');
                    fs.unlinkSync(filePath);
                    resolve({ code: 200, msg: '', res: base64 });
                } catch (err) {
                    console.error('[order.espelho] Erro ao ler arquivo:', err);
                    resolve({ code: 500, msg: 'Erro ao ler arquivo gerado', res: false });
                }
            });
        });
    };

    return order;
}());
exports.order = order;
