import React from "react";

interface CrewMember {
  id: number;
  full_name: string;
  salary_per_hour: number;
}

const CrewAssignTable: React.FC<{
  crewMembers: CrewMember[];
  onAssign: (crewMember: CrewMember) => void;
}> = ({ crewMembers, onAssign }) => {
  return (
    <section className="container px-4 mx-auto">
      <h2 className="text-lg font-medium text-gray-800 dark:text-white">
        Crew Member List
      </h2>
      <div className="flex flex-col mt-3">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Full Name
                    </th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Salary per Hour
                    </th>
                    <th className="relative py-3.5 px-4">
                      <span className="sr-only">Assign</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {crewMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {member.full_name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {member.salary_per_hour}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button
                          onClick={() => onAssign(member)}
                          className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                  {crewMembers.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-4 text-center text-gray-500 dark:text-gray-300"
                      >
                        No crew members available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrewAssignTable;
