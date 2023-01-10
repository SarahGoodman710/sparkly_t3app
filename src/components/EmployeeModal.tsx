import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// validation schema is used by server
export const validationSchema = z.object({
  EmployeeId: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
});

export default function Modal({ isOpen, setIsOpen, employee }) {
  const isAddMode = !employee;
  const utils = trpc.useContext().employee;

  const createUser = trpc.employee.add.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
    },
  });

  const updateUser = trpc.employee.update.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
    },
  });

  function onSubmit(data) {
    return isAddMode
      ? createUser.mutateAsync(data)
      : updateUser.mutateAsync(data);
  }

  const formOptions = {
    resolver: zodResolver(validationSchema),
    defaultValues: {
      EmployeeId: "",
      FirstName: "",
      LastName: "",
    },
    values: {
      EmployeeId: "",
      FirstName: "",
      LastName: "",
    },
  };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.values = employee;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="float-right">
                  <XMarkIcon
                    className="block h-6 w-6 rounded-md bg-red-500 text-white hover:bg-red-600"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
                <form
                  onSubmit={handleSubmit(async (values) => {
                    await onSubmit(values);
                    reset();
                    setIsOpen(false);
                  })}
                >
                  <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Employee Information
                      </h3>
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="EmployeeId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Employee Id
                      </label>
                      <input
                        type="text"
                        {...register("EmployeeId", { required: true })}
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        disabled={!isAddMode}
                      />
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          {...register("FirstName", { required: true })}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          {...register("LastName", { required: true })}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
