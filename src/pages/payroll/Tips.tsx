import Header from "../../components/Header";
import TableHeader from "../../components/TableHeader";
import SectionContainer from "../../components/SectionContainer";
import { trpc } from "../../utils/trpc";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useEffect, useState } from "react";
import { read, utils, writeFileXLSX } from "xlsx";

interface TipData {
  TipId: number;
  TipTypeKey: string;
  Amount: number;
  Date: Date;
  PercentOff: number;
  BusinessKey: string;
}

const tableHeaders = [
  {
    header: "Tip Type Key",
    classes:
      "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8",
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
    header: "Percent Off",
    classes: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
  },
  {
    header: "Business Key",
    classes: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
  },
  {
    header: "",
    classes: "relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8",
  },
];

const Tips = () => {
  const [tips, setTips] = useState<TipData | []>([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = utils.sheet_to_json(ws, {
          raw: false,
          dateNF: "dd/mm/yyyy",
        });

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d);
      setTips(d);
    });
  };

  return (
    <div>
      <Header title="Tips" />
      <SectionContainer>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto"></div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <div>
                {/*<Modal isOpen={isOpen} setIsOpen={setIsOpen}></Modal>*/}
                <input
                  type="file"
                  className="text-on-background"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                  }}
                />
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
                      {tips?.map((tip) => (
                        <tr key={tip.TipId}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {tip.TipTypeKey}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {tip.Amount}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {tip.Date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {tip.PercentOff}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {tip.BusinessKey}
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

Tips.auth = true;

export default Tips;
