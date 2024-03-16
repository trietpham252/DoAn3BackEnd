const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');

const sendEmailCreateOrder = async (email,orderItems) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD, 
    },
  });
  transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));

  let listItem = '';
  const attachImage = []
  orderItems.forEach((order) => {
    listItem += `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333333;">
    <div>
      <p style="margin-bottom: 10px;">
        <strong>Tên sản phẩm:</strong> <span style="font-weight: bold;">${order.name}</span><br>
        <strong>Số lượng:</strong> <span style="font-weight: bold;">${order.amount}</span><br>
        <strong>Giá:</strong> <span style="font-weight: bold;">${order.price} VND</span>
      </p>
      <p style="margin-bottom: 10px;">
        Chúng tôi xin cam đoan rằng đơn hàng của bạn sẽ được xử lý và gữi về cho bạn trong thời gian sớm nhất có thể. Bạn sẽ nhận được thông báo cập nhật về tiến trình đơn hàng qua email.
      </p>
      <p style="margin-bottom: 10px;">
        Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ thêm, vui lòng liên hệ với đội ngũ chăm sóc khách hàng của chúng tôi. Chúng tôi luôn sẵn lòng giúp đỡ bạn.
      </p>
      <p style="margin-bottom: 10px;">
        Một lần nữa, chúng tôi xin chân thành cảm ơn sự lựa chọn của bạn và hy vọng rằng bạn sẽ hài lòng với sản phẩm mà bạn đã chọn từ Louis Vuitton.
      </p>
      <strong>Trân trọng,</strong><br>
      Đội ngũ Louis Vuitton
    </div>
    <div style="margin-top: 20px;">
      <p style="margin-bottom: 10px;">Dưới đây là hình ảnh của sản phẩm:</p>
    </div>`
    attachImage.push({path: order.image})
  })

  let info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, 
    to: email,
    subject: "XÁC NHẬN ĐẶT HÀNG THÀNH CÔNG TẠI WEDSITE LOUIS VUITTON ", 
    text: "Xin chào bạn", 
    html: `<div><b>Chúng tôi xin gửi lời cảm ơn chân thành vì đã tin tưởng và đặt hàng trên website của LouisVuitton Chúng tôi đã nhận được thông tin chi tiết về đơn hàng của bạn, dưới đây là thông tin chi tiết sản phẩm bạn đã đặt:</b></div> ${listItem}`,
    attachments: attachImage,
  });
}

module.exports = {
  sendEmailCreateOrder
}