import moment from 'moment';
import * as XLSX from "xlsx";

export const downloadExcel = (arrays: any, filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(arrays);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${filename}-${moment().format("YYYY-MM-DD HH:mm:ss")}.xlsx`);
};

export const downloadReadOnlyExcel = (arrays: any, filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(arrays);

  // Create workbook with "read-only recommended" hint
  const workbook: XLSX.WorkBook = {
    SheetNames: ['Sheet1'],
    Sheets: {
      Sheet1: worksheet,
    },
    Workbook: {
      Views: [
        {
          // This suggests Excel to open in read-only mode (not enforced)
          // readOnly: true,
        },
      ],
    },
  };

  // Write and download the file
  XLSX.writeFile(
    workbook,
    `${filename}-${moment().format('YYYY-MM-DD HH-mm-ss')}.xlsx`
  );
};

