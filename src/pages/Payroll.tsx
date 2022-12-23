import Grid from "../components/Grid";
import {
  BuildingOffice2Icon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  UsersIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";

const actions = [
  {
    title: "Process Payroll",
    href: "/payroll/ProcessPayroll",
    icon: BanknotesIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    title: "Timesheets",
    href: "/payroll/Timesheets",
    icon: ClockIcon,
    iconForeground: "text-orange-700",
    iconBackground: "bg-orange-50",
  },
  {
    title: "Tips",
    href: "/payroll/Tips",
    icon: CheckBadgeIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    title: "Employees",
    href: "/payroll/Employees",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    title: "Businesses",
    href: "/payroll/Businesses",
    icon: BuildingOffice2Icon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Bonuses",
    href: "/payroll/Bonuses",
    icon: GiftIcon,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
];

const Payroll = () => {
  return (
    <Grid title="Payroll" actions={actions} />
  );
};

Payroll.auth = true;

export default Payroll;