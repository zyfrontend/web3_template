interface Withdraw {
  amount: number;
  to_address: string;
}
interface Login {
  address: string;
  sign: string;
  code: string;
}

interface Node {
  type: number;
}
interface voteActionType {
  voteId: number;
  type: string;
}

interface buyNodeType {
  output_no: string;
  type: string | undefined;
  product_id?: number;
  num?: number;
  amount?: number;
}
interface withdrawType {
  amount: number;
  to_address?: string;
  type: string;
}

interface miningType {
  type: string;
}
interface miningPledgeType {
  type: string;
  amount: number;
}
interface redemptionType {
  type: string;
}
export {
  Withdraw,
  Login,
  Node,
  voteActionType,
  buyNodeType,
  withdrawType,
  miningType,
  miningPledgeType,
  redemptionType,
};
