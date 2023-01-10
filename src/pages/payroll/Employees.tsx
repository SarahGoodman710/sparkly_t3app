import Header from "../../components/Header";
import TableHeader from "../../components/TableHeader";
import SectionContainer from "../../components/SectionContainer";
import { trpc } from "../../utils/trpc";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "../../components/Modal";
import EmployeeForm from "../../components/EmployeeForm";
import { useState } from "react";

const tableHeaders = [
  {
    header: "Employee Id",
    classes:
      "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8",
  },
  {
    header: "First Name",
    classes: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
  },
  {
    header: "Last Name",
    classes: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
  },
  {
    header: "",
    classes: "relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8",
  },
];

const Employee = () => {
  interface EmployeeData {
    EmployeeId: string;
    FirstName: string;
    LastName: string;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const employees = trpc.employee.list.useQuery();

  return (
    <div>
      <Header title="Employees" />
      <SectionContainer>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto"></div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <div>
                <Modal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                >
					<EmployeeForm setIsOpen={setIsOpen} employee={employee}/>
				</Modal>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  onClick={() => {
                    setIsOpen(true);
                    setEmployee(null);
                  }}
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <TableHeader tableHeaders={tableHeaders} />
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {employees?.data?.map((employee) => (
                        <tr key={employee.EmployeeId}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                            {employee.EmployeeId}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.FirstName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.LastName}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <span className="inline-flex rounded-lg p-3 text-blue-500 ring-4 ring-white">
                                <PencilSquareIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                  onClick={() => {
                                    setIsOpen(true);
                                    setEmployee(employee);
                                  }}
                                />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <span className="inline-flex rounded-lg p-3 text-red-500 ring-4 ring-white">
                                <TrashIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

Employee.auth = true;

export default Employee;
