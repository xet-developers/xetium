using Medo;
using OfficeOpenXml;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal;
using xetiumAPI.ServerApp.Interfaces;

namespace xetiumAPI.ServerApp.Service
{
    public class ReportService : IReportService
    {
        private IProjectRepository _projectRepository;

        public ReportService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<FileStream> GetReportAsync(ReportInfoDto reportInfo, Guid userID)
        {
            var projects = await _projectRepository.GetAllUserProjectAsync(userID);

            if (projects == null || projects.Count == 0)
            {
                return null;
            }

            var fileName = new Uuid7().ToString();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                if(await FillSheetAsync(projects, fileName, package, reportInfo) is false)
                {
                    return null;
                };
            }

            var fs = File.Open($"{Directory.GetCurrentDirectory()}{fileName}.xlsx", FileMode.Open);
            return await Task.FromResult(fs);
        }

        private static async Task<bool> FillSheetAsync(List<ProjectDal> projects, string fileName,
            ExcelPackage package, ReportInfoDto reportInfo)
        {
            ExcelWorksheet sheet = package.Workbook.Worksheets.Add("report");
            FillHeaders(sheet);
            var row = 3;
            var column = 2;
            var project = projects.Find(proj => proj.ProjID == reportInfo.ProjID);
            var searches = project.Searches.Where(search => search.Date >= reportInfo.FirstDate && search.Date <= reportInfo.LastDate);
            foreach (var search in searches)
            {
                FillPreHeaders(sheet, column, search);

                foreach (var result in search.KeywordResults)
                {
                    var flag = false;
                    for (var i = 1; i < row; i++)
                    {
                        if ((string)sheet.Cells[i, 1].Value == result.Text)
                        {
                            FillTable(sheet, i, column, result);
                            flag = true;
                        }
                    }

                    if (flag)
                    {
                        continue;
                    }

                    sheet.Cells[row, 1].Value = result.Text;
                    FillTable(sheet, row, column, result);

                    row++;
                }
                column += 2;
            }

            if(column == 2)
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

        private static void FillTable(ExcelWorksheet sheet, int row, int column, KeywordResultDal result)
        {
            if (result.SearchDal.Type == "Yandex")
            {
                sheet.Cells[row, column].Value = result.Position;
            }

            if (result.SearchDal.Type == "Google")
            {
                sheet.Cells[row, column + 1].Value = result.Position;
            }
        }

        private static void FillPreHeaders(ExcelWorksheet sheet, int column, SearchDal? search)
        {
            sheet.Cells[1, column].Value = search.Date.ToString();
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
