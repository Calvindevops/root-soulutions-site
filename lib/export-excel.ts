import * as XLSX from "xlsx";

export function exportToExcel(
  data: Record<string, unknown>[],
  filename: string,
  sheetName = "Sheet1"
) {
  if (data.length === 0) return;

  const ws = XLSX.utils.json_to_sheet(data);

  // Auto-width columns
  const colWidths = Object.keys(data[0]).map((key) => {
    const maxLen = Math.max(
      key.length,
      ...data.map((row) => String(row[key] ?? "").length)
    );
    return { wch: Math.min(maxLen + 2, 50) };
  });
  ws["!cols"] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  const today = new Date().toISOString().split("T")[0];
  XLSX.writeFile(wb, `${filename}-${today}.xlsx`);
}
