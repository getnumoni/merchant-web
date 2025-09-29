export type Admin = {
  id: number;
  name: string;
  adminId: string;
  avatar: string;
  dateCreated: string;
  email: string;
  phone: string;
  role: string;
  team: string;
  status: "Active" | "Suspended" | "Pending";
  statusColor: "green" | "red" | "orange";
};