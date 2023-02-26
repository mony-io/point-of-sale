const Invoice = require("../models/InvoiceModel");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const send_message = (message) => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.CHAT_ID;
    const bot = new TelegramBot(token, { polling: true });
    bot.sendMessage(chatId, message);
  } catch (err) {}
};

module.exports.create = async (req, res, next) => {
  try {
    let invoice = new Invoice(
      req.body.payment_id,
      req.body.amount,
      req.body.remain
    );

    [invoice] = await invoice.save();
    const [invoice_number] = await Invoice.generateInvoiceNumber(
      invoice.insertId
    );
    res.send({ id: invoice.insertId });
  } catch (err) {
    next(err);
  }
};

module.exports.saleInvoice = async (req, res, next) => {
  try {
    const [invoice] = await Invoice.saleInvoice(req.params.id);

    // ========= send message to telegram ==========

    let text = "";
    let saller = "";
    let total = 0;
    let payment = "";
    let amount = 0;
    let moneyChange = 0;
    let invoiceNumber = "";

    invoice[0].map((item) => {
      total += item.subtotal;
      invoiceNumber = item.invoice_number;
      saller =
        "Saller: " +
        item.username +
        "\nInvoice number: " +
        invoiceNumber +
        "\nDate: " +
        item.sale_date +
        "\n\n";

      payment = "Payment By: " + item.payment_type;
      amount = "\nAmount: $" + item.amount + ".00";
      moneyChange = "\nChange: $" + item.money_change + ".00";
      text +=
        item.product_name +
        " " +
        "\nQty: " +
        item.qty +
        " " +
        "\nPrice: $" +
        item.subtotal +
        ".00" +
        "\n" +
        "---------------------\n";
    });
    if (text !== "" && saller !== "" && total !== 0) {
      send_message(
        saller +
          text +
          "Total: $" +
          total +
          ".00\n" +
          payment +
          amount +
          moneyChange
      );
    }
    // ========= end of message =============

    // ====== send invoice to user ==========
    //console.log(invoice);
    res.send(invoice);
  } catch (err) {
    next(err);
  }
};
