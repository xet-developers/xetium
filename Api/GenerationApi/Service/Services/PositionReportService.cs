using Domain.Entity;
using Medo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OfficeOpenXml;
using Service.Interfaces;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;

namespace Service.Services
{
    public class PositionReportService : IPositionReportService
    {
       
        PositionsAnalysisResponseDto _analysisResponseDto;//временное решение, надо придумать, как лучше будет.

        public async Task<FileStream> GetPositionReportAsync(ReportInfo reportInfo, Guid UserId)
        {
            var project = new List<PositionsAnalysisResponseDto>() { _analysisResponseDto};
            var fileName = new Uuid7().ToString();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                if (await FillSheetAsync(project, fileName, package, reportInfo) is false)
                {
                    return null;
                };
            }

            var fs = File.Open($"{Directory.GetCurrentDirectory()}{fileName}.xlsx", FileMode.Open);
            return await Task.FromResult(fs);
        }

        private static async Task<bool> FillSheetAsync(List<PositionsAnalysisResponseDto> project, string fileName,
            ExcelPackage package, ReportInfo reportInfo)
        {
            ExcelWorksheet sheet = package.Workbook.Worksheets.Add("report");
            FillHeaders(sheet);
            var row = 3;
            var column = 2;
            var searches = project.Where(search => search.PositionAnalysisData[0].Date >= reportInfo.FirstDate && search.PositionAnalysisData[0].Date <= reportInfo.LastDate);
            foreach (var search in searches)
            {
                FillPreHeaders(sheet, column, search.PositionAnalysisData.First().Date);

                foreach (var result in search.PositionAnalysisData)
                {
                    var flag = false;
                    for (var i = 1; i < row; i++)
                    {
                        if ((string)sheet.Cells[i, 1].Value == result.Keyword)
                        {
                            FillTable(sheet, i, column, result);
                            flag = true;
                        }
                    }

                    if (flag)
                    {
                        continue;
                    }

                    sheet.Cells[row, 1].Value = result.Keyword;
                    FillTable(sheet, row, column, result);

                    row++;
                }
                column += 2;
            }

            if (column == 2)
            {
                return false;
            }

            SetStyles(sheet, row, column);

            await package.SaveAsAsync(new FileInfo($"{Directory.GetCurrentDirectory()}{fileName}.xlsx"));
            return true;
        }

        private static void SetStyles(ExcelWorksheet sheet, int row, int column)
        {
            sheet.Cells[1, 1, row - 1, column - 1].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            sheet.Cells[1, 1, 1, column - 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Coral);
            sheet.Cells[2, 2, 2, column - 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.PeachPuff);
            sheet.Cells[2, 1, row - 1, 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.LightSkyBlue);
            sheet.Cells[3, 2, row - 1, column - 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.White);
            sheet.Cells.AutoFitColumns();


            foreach (var cell in sheet.Cells[1, 1, row - 1, column - 1])
            {
                cell.Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
            }
        }

        private static void FillTable(ExcelWorksheet sheet, int row, int column, PositionAnalysis result)
        {
            if (result.SearchSystem == 0)//yandex
            {
                sheet.Cells[row, column].Value = result.Position;
            }

            if (result.SearchSystem == 1)//google
            {
                sheet.Cells[row, column + 1].Value = result.Position;
            }
        }

        private static void FillPreHeaders(ExcelWorksheet sheet, int column, DateTime date)
        {
            sheet.Cells[1, column].Value = date.ToString();
            sheet.Cells[1, column, 1, column + 1].Merge = true;
            sheet.Cells[2, column].Value = "Yandex";
            sheet.Cells[2, column + 1].Value = "Google";
        }

        private static void FillHeaders(ExcelWorksheet sheet)
        {
            sheet.Cells["A1:Z50"].Value = string.Empty;
            sheet.Cells[1, 1].Value = "Дата и время:";
            sheet.Cells[2, 1].Value = "Ключевые фразы";
        }
    }
}
