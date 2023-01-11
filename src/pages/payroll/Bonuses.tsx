import Header from "../../components/Header";
import TableAddButton from "../../components/TableAddButton";
import TableHeader from "../../components/TableHeader";
import SectionContainer from "../../components/SectionContainer";
import { trpc } from "../../utils/trpc";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { NumericFormat } from 'react-number-format';

const tableHeaders = [
  {
    header: "Employee Id",
    classes:
      "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8",
  },
  {
    header: "Bonus Type",
    classes: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
  },
  {
    header: "Amount",
    classes: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
  },
  {
    header: "Date",
    classes: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
  },
  {
    header: "",
    classes: "relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8",
  },
];

const Bonuses = () => {
  const bonuses = trpc.bonus.getAll.useQuery();

  return (
    <div>
      <Header title="Bonuses" />
      <SectionContainer>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto"></div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <TableAddButton text="Add Bonus" />
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <TableHeader tableHeaders={tableHeaders} />
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {bonuses?.data?.map((bonus) => (
                        <tr key={bonus.BonusId}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {bonus.EmployeeId}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {bonus.bonusType.BonusTypeKey}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
						  	{/*<NumericFormat value={bonus.Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />*/}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {bonus.Date.toDateString()}
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

Bonuses.auth = true;

export default Bonuses;
