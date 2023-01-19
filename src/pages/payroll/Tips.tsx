import Header from "../../components/Header";
import TipTable from "../../components/TipTable";
import SectionContainer from "../../components/SectionContainer";
import { trpc } from "../../utils/trpc";
import React, { useCallback, useEffect, useState } from "react";
import { read, utils, writeFileXLSX } from "xlsx";

// interface TipData {
//   TipId: number;
//   Amount: number;
//   Date: Date;
//   PercentOff: number;
//   TipType: {
//     TipTypeId: number;
//     TipTypeKey: string;
//   };
//   Business: {
//     BusinessId: number;
//     BusinessKey: string;
//   };
// }

const Tips = () => {
  const business = trpc.business.list.useQuery();
  const tipType = trpc.tipType.list.useQuery();
  const [tips, setTips] = useState([]);

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

        const tipData = data.map((d) => {
          return {
            Amount: parseFloat(d.Amount),
            Date: d.Date,
            PercentOff: parseFloat(d.PercentOff),
            TipType: {
              TipTypeId: tipType.data.find((t) => t.TipTypeKey === d.TipTypeKey)
                .TipTypeId,
              TipTypeKey: d.TipTypeKey,
            },
            Business: {
              BusinessId: business.data.find(
                (b) => b.BusinessKey === d.BusinessKey
              ).BusinessId,
              BusinessKey: d.BusinessKey,
            },
          };
        });

        resolve(tipData);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setTips(d);
    });
  };

  function createTips() {
    tips.forEach((tip) => {
      createTip.mutateAsync(tip);
    });
  }

  const createTip = trpc.tip.create.useMutation({});

  return (
    <div>
      <Header title="Tips" />
      <SectionContainer>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto"></div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <div>
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
          <TipTable />
        </div>
      </SectionContainer>
    </div>
  );
};

Tips.auth = true;

export default Tips;
