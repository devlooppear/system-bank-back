export class Transaction {
  id: number;
  account_id: number;
  transaction_type: string;
  amount: number;
  transaction_date: Date;
  cpf_recipient?: string;
  cnpj_recipient?: string;
  recipient_name?: string;
  bank?: string;
  branch?: string;
  account_recipient?: string;
  pix_key?: string;
  transaction_password: string;
  created_at: Date;
  updated_at: Date;
}
