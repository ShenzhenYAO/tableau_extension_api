
(async () => {

    // change page title
    d3.select("title").text("Getting Tableau Data")

    // listen to when document is ready
    $(document).ready(() => {
        // console.log("document is ready...")
        // when the sync is done
        tableau.extensions.initializeAsync().then(() => {
            // display the number of worksheets on the current dashboard page
            let n_sheets = tableau.extensions.dashboardContent.dashboard.worksheets.length
            console.log('number of sheets on this page', n_sheets)
            // display the name of the first worksheet
            let sheet1name = tableau.extensions.dashboardContent.dashboard.worksheets[0].name
            console.log('name of the first sheet is:', sheet1name)

            let worksheet1 = tableau.extensions.dashboardContent.dashboard.worksheets[0]
            worksheet1.getSummaryDataAsync().then(d => {
                console.log("summary of data is", d)
                // make a table according to the data

                let cols = d._columns._totalRowCount
                let rows = d._data.length
                let data = d._data

                let body_d3pn = d3.select("body")
                let tbl_d3pn = body_d3pn.append("table")

                for (let i = 0; i < rows; i++) {
                    // the data array is like [<for col1>{_value:, _nativeValue:, _formattedValue:}, <for col2>...]
                    data_thisrow_arr = data[i] // data of this row
                    // add a table row
                    let tr = tbl_d3pn.append("tr")
                    for (let j=0; j< data_thisrow_arr.length; j++){
                        tr.append('td').text(data_thisrow_arr[j]._value) // add a column and insert the data value
                    } // loop for cols
                } // for rows

            })
        }) // tableau.extensions.initializeAsync().then        
    }) // $(document).ready(function () 
})()