import mercadopago from "mercadopago";
import { CreatePaymentPayload } from "mercadopago/models/payment/create-payload.model";

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

interface CreatePaymentResponse {
  pix_id: string;
  qr_code: string;
  qr_code_base64: string;
  ticket_url: string;
}

async function createPayment(
  transaction_amount: number
): Promise<CreatePaymentResponse> {
  const payment_data: CreatePaymentPayload = {
    transaction_amount,
    payment_method_id: "pix",
    payer: {
      email: "email@email.com",
      first_name: "Name",
      last_name: "Last Name",
    },
    installments: 1,
  };

  const payment = await mercadopago.payment.create(payment_data);

  const pix_id = payment.body.id;
  const qr_code =
    payment.response.point_of_interaction.transaction_data.qr_code;
  const qr_code_base64 =
    payment.response.point_of_interaction.transaction_data.qr_code_base64;
  const ticket_url =
    payment.response.point_of_interaction.transaction_data.ticket_url;

  return {
    pix_id,
    qr_code,
    qr_code_base64,
    ticket_url,
  };
}

async function checkApprovedPayment(pix_id: number) {
  const verification = await mercadopago.payment.get(pix_id);
  const approved = verification.body.date_approved ? true : false;

  return approved;
}

export { createPayment, checkApprovedPayment };
