
const excelJS = require("exceljs");
const path = require("path");
async function excelCreation(data) {
    const name = "testing";
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet(name);
  worksheet.spliceRows(1, 0, []);
  worksheet.views = [{ showGridLines: false }];
  worksheet.getCell("C2").value = "Rutvik Laxman Patil ";
  worksheet.getCell("C3").value = "patilrutvik501@gmail.com";
  worksheet.getCell("C4").value = "8591575654";
  worksheet.getCell("C5").value = "Kalyan- 421102, Maharashtra";
//   worksheet.getCell("C6").value =
//     "Mumbai - 400069 Tel No.: 22-61206160 ";
//   worksheet.getCell("C7").value =
//     "Email: compliance@gainn.co.in";
//   worksheet.getCell("C8").value =
//     "Compliance Officer: Rajesh Kumar";
  
   // Styling 
  worksheet.mergeCells("C2:F2");
  worksheet.mergeCells("C3:F3");
  worksheet.mergeCells("C4:F4");
  worksheet.mergeCells("C5:F5");
  worksheet.mergeCells("C6:F6");
//   worksheet.mergeCells("C7:F7");
//   worksheet.mergeCells("C8:F8");
//   worksheet.mergeCells("C9:F9");
  worksheet.getCell("C2").alignment = {
    horizontal: "center",
  };
  worksheet.getCell("C3").alignment = {
    horizontal: "center",
  };
  worksheet.getCell("C4").alignment = {
    horizontal: "center",
  };
  worksheet.getCell("C5").alignment = {
    horizontal: "center",
  };
//   worksheet.getCell("C6").alignment = {
//     horizontal: "center",
//   };
//   worksheet.getCell("C7").alignment = {
//     horizontal: "center",
//   };
//   worksheet.getCell("C8").alignment = {
//     horizontal: "center",
//   };
//   worksheet.getCell("C9").alignment = {
//     horizontal: "center",
//   };
  worksheet.getCell("C1").margins = {
    insetmode: "custom",
    inset: [0.13, 0.13, 0.25, 0.25],
  };
//   worksheet.getCell('A11').value = `Account : ${clientDetails?.client_code}`
//   worksheet.getCell('A12').value = `Name : ${clientDetails.client_name ? clientDetails.client_name : clientDetails.group_name ? clientDetails.group_name : clientDetails.user_name}`
//   worksheet.getCell('A13').value = `${clientDetails.peraddress1 ? clientDetails.peraddress1 : ""}`
//   worksheet.getCell('A14').value = `${clientDetails.peraddress2 ? clientDetails.peraddress2 : ""}`
//   worksheet.getCell('A15').value = `${clientDetails.peraddress3 ? clientDetails.peraddress3 : ""}`
//   worksheet.getCell('A16').value = `${clientDetails.per_pin_code ? clientDetails.per_pin_code : ""}`
//   // worksheet.mergeCells('B12:G16')
  worksheet.getRow(2).eachCell((cell) => {
    cell.font = {
      bold: true
    };
  });
  worksheet.getRow(9).eachCell((cell) => {
    cell.font = {
      bold: true
    };
  });
  worksheet.getRow(11).eachCell((cell) => {
    cell.font = {
      bold: true
    };
  });
  worksheet.getRow(12).eachCell((cell) => {
    cell.font = {
      bold: true
    };
  });
  //  END OF HEADER
  let rowNumber = 7
  let A = worksheet.getColumn("A");
  A.width = 35
  let B = worksheet.getColumn("B");
  B.width = 35
  let C = worksheet.getColumn("C");
  C.width = 35
  let D = worksheet.getColumn("D");
  D.width = 35
  let E = worksheet.getColumn("E");
  E.width = 35
  let F = worksheet.getColumn("F");
  F.width = 35
  let G = worksheet.getColumn("G");
  G.width = 35
  let H = worksheet.getColumn("H");
  H.width = 35
  let I = worksheet.getColumn("I");
  I.width = 35
  let J = worksheet.getColumn("J");
  J.width = 35

  //  START WORKING SHEET
  // _____________________________________________________________________________________________________________________________________

  
    
    columnHeaders = ["Name", "mobile No ", "gender"];

    columnHeaders.forEach((header, index) => {
      const cell = worksheet.getCell(rowNumber, index + 1);
      cell.value = header;
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'DBDFAA'
        }
      }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
      cell.alignment = {
        horizontal: "center"
      }
      cell.font = {
        bold: true,
      };
      cell.width = 15;
    });
    // const startingRow = 11;
   
    data.forEach((item, index) => {
        const [tableName, mobileNo, gender] = item;
      let row = [tableName,mobileNo,gender]
      const rowIndex = rowNumber + index;
      const dataRow = worksheet.addRow(row, `A${rowIndex}`);
      dataRow.eachCell((cell, cellNumber) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })
    });
    
    const nameColf = worksheet.getColumn(1);
    nameColf.width = 15;
    const nameCol = worksheet.getColumn(2);
    nameCol.width = 20;
    const nameCol1 = worksheet.getColumn(3);
    nameCol1.width = 45;
    const nameCol3 = worksheet.getColumn(4);
    nameCol3.width = 15;
    const nameCol5 = worksheet.getColumn(5);
    nameCol5.width = 15;
    const nameCol2 = worksheet.getColumn(6);
    nameCol2.width = 15;
    const nameCol7 = worksheet.getColumn(7);
    nameCol7.width = 3;
  


  let buffer
  try {
    buffer = await workbook.xlsx.writeBuffer({ suppressWarnings: false })
  }
  catch (error) {
    console.log(error)
    return store.enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }
  return buffer
}


module.exports = excelCreation;

